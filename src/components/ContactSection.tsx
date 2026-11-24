import React, { useState } from 'react';
import { Send, CheckCircle2, History, Trash2, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';
import { Language, translations } from '../data/translations';

interface ContactSectionProps {
  language: Language;
  recipientEmail: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language, recipientEmail }) => {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [history, setHistory] = useState<ContactMessage[]>([]);

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedEmail.includes('@') || !trimmedMsg) {
      setErrorMsg(t.formValidationError);
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      subject: subject.trim() || (language === 'zh' ? '一般合作諮詢' : 'General Inquiry'),
      message: trimmedMsg,
      createdAt: new Date().toLocaleString(language === 'zh' ? 'zh-TW' : 'en-US'),
    };

    setHistory((prev) => [newMessage, ...prev]);
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="section-contact" className="space-y-6 no-print">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {t.contactSubtitle} ·{' '}
            <span className="font-mono-tech text-zinc-700">{recipientEmail}</span>
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 self-start">
          <button
            type="button"
            onClick={() => setActiveTab('compose')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'compose'
                ? 'bg-theme-primary text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.tabSendMessage}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-theme-primary text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>
              {t.tabSentHistory} ({history.length})
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'compose' ? (
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs">
          {isSubmitted && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold">{t.sendSuccessTitle}</div>
                <div className="text-xs text-emerald-700 mt-0.5">{t.sendSuccessDesc}</div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.yourNamePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  {t.yourEmail}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.yourEmailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.subject}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t.subjectPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.message}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-primary bg-theme-primary-hover text-white text-sm font-medium shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.sendMessage}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs space-y-4">
          {history.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-500">{t.noHistory}</div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearHistory}</span>
                </button>
              </div>
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-zinc-900">{item.subject}</span>
                      <span className="text-[11px] font-mono-tech text-zinc-400">
                        {item.createdAt}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500">
                      {item.name} ({item.email})
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed pt-1">{item.message}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};
