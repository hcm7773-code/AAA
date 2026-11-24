import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Resolves modern CSS color functions (oklch, oklab, color-mix) to standard
 * sRGB hex/rgba values using an offscreen 2D canvas so html2canvas v1.4.x
 * can parse computed styles from Tailwind CSS v4 without throwing errors.
 */
function normalizeCssColor(colorValue: string): string {
  if (
    !colorValue ||
    (!colorValue.includes('oklch') &&
      !colorValue.includes('oklab') &&
      !colorValue.includes('color('))
  ) {
    return colorValue;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#18181b';
    ctx.fillStyle = colorValue;
    return ctx.fillStyle;
  } catch {
    return '#18181b';
  }
}

export async function exportToPDF(
  elementId: string,
  filename: string,
  onProgress?: (status: string) => void
): Promise<void> {
  const target = document.getElementById(elementId);
  if (!target) {
    throw new Error(`Element #${elementId} not found`);
  }

  onProgress?.('正在準備版面...');

  const canvas = await html2canvas(target, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    onclone: (clonedDoc) => {
      const noPrintEls = clonedDoc.querySelectorAll('.no-print');
      noPrintEls.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      const allElements = clonedDoc.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computed = clonedDoc.defaultView?.getComputedStyle(htmlEl);
        if (!computed) return;

        const colorProps: Array<
          'color' | 'backgroundColor' | 'borderTopColor' | 'borderRightColor' | 'borderBottomColor' | 'borderLeftColor'
        > = [
          'color',
          'backgroundColor',
          'borderTopColor',
          'borderRightColor',
          'borderBottomColor',
          'borderLeftColor',
        ];

        colorProps.forEach((prop) => {
          const val = computed[prop];
          if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
            htmlEl.style[prop] = normalizeCssColor(val);
          }
        });
      });
    },
  });

  onProgress?.('正在編排 PDF 頁面...');

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const usableWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * usableWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = margin;

  pdf.addImage(imgData, 'JPEG', margin, position, usableWidth, imgHeight);
  heightLeft -= pageHeight - margin * 2;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', margin, position, usableWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;
  }

  onProgress?.('正在下載檔案...');
  pdf.save(filename);
}
