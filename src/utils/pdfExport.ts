import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Helper to convert any color string (including oklch/oklab) to standard rgb/hex via canvas 2d context
function convertColorToRgb(colorStr: string): string {
  if (!colorStr) return colorStr;
  if (!colorStr.includes('oklch') && !colorStr.includes('oklab') && !colorStr.includes('color-mix')) {
    return colorStr;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = colorStr;
      const converted = ctx.fillStyle;
      if (
        converted &&
        !converted.includes('oklch') &&
        !converted.includes('oklab') &&
        !converted.includes('color-mix')
      ) {
        return converted;
      }
    }
  } catch (e) {
    // fallback
  }
  return '#18181b';
}

// Regex to match oklch(...), oklab(...), color-mix(...) handling 1-level nested parentheses like var(...)
const COLOR_FUNC_REGEX = /(?:oklch|oklab|color-mix)\s*\((?:[^()]+|\([^()]*\))*\)/gi;

function sanitizeCssText(cssText: string): string {
  if (!cssText) return cssText;
  return cssText.replace(COLOR_FUNC_REGEX, '#18181b');
}

export async function exportToPDF(
  elementId: string,
  filename: string = 'resume.pdf',
  onProgress?: (status: string) => void
): Promise<void> {
  try {
    if (onProgress) onProgress('準備檔案內容中...');

    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      throw new Error(`Element with id #${elementId} not found`);
    }

    if (onProgress) onProgress('正在渲染高解析度頁面...');

    const canvas = await html2canvas(targetElement, {
      scale: 2, // 2x DPI for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: targetElement.scrollWidth,
      onclone: (clonedDoc) => {
        // 1. Replace all <style> tags in clonedDoc with sanitized ones so CSSStyleSheet re-parses cleanly
        const styleTags = Array.from(clonedDoc.querySelectorAll('style'));
        styleTags.forEach((oldStyle) => {
          if (oldStyle.textContent) {
            const sanitizedText = sanitizeCssText(oldStyle.textContent);
            const newStyle = clonedDoc.createElement('style');
            newStyle.textContent = sanitizedText;
            if (oldStyle.parentNode) {
              oldStyle.parentNode.replaceChild(newStyle, oldStyle);
            }
          }
        });

        // 2. Sanitize any inline style attributes on all nodes
        const allNodes = clonedDoc.querySelectorAll('*');
        allNodes.forEach((node) => {
          if (node instanceof HTMLElement || node instanceof SVGElement) {
            const styleAttr = node.getAttribute('style');
            if (
              styleAttr &&
              (styleAttr.includes('oklab') || styleAttr.includes('oklch') || styleAttr.includes('color-mix'))
            ) {
              node.setAttribute('style', sanitizeCssText(styleAttr));
            }
          }
        });

        // 3. Ensure cloned target element has explicit clean styling for PDF export
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (clonedTarget) {
          clonedTarget.style.padding = '32px';
          clonedTarget.style.backgroundColor = '#ffffff';
          clonedTarget.style.maxWidth = '1200px';

          // Hide interactive buttons & forms in cloned print view
          const noPrintElems = clonedTarget.querySelectorAll('.no-print, button, form');
          noPrintElems.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.display = 'none';
            }
          });

          // 4. Safely apply computed colors converted to standard RGB/Hex
          const origElements = Array.from(targetElement.querySelectorAll('*'));
          origElements.unshift(targetElement);

          const clonedElements = Array.from(clonedTarget.querySelectorAll('*'));
          clonedElements.unshift(clonedTarget);

          const count = Math.min(origElements.length, clonedElements.length);
          for (let i = 0; i < count; i++) {
            const origEl = origElements[i];
            const clonedEl = clonedElements[i];

            if (origEl instanceof HTMLElement && clonedEl instanceof HTMLElement) {
              try {
                const cs = window.getComputedStyle(origEl);

                if (cs.color) {
                  clonedEl.style.color = convertColorToRgb(cs.color);
                }
                if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                  clonedEl.style.backgroundColor = convertColorToRgb(cs.backgroundColor);
                }
                if (cs.borderColor) {
                  clonedEl.style.borderColor = convertColorToRgb(cs.borderColor);
                }
              } catch (e) {
                // Ignore any computed style access errors
              }
            }
          }
        }
      },
    });

    if (onProgress) onProgress('正在打包 PDF 檔案...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Additional pages if needed
    while (heightLeft > 2) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    if (onProgress) onProgress('下載完成！');
    pdf.save(filename);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
}


