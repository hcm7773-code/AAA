import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { Language, translations } from '../data/translations';
import { Send, CheckCircle, Mail, MessageSquare, Clock, Trash2 } from 'lucide-react';

interface ContactSectionProps {
  onSendMessage?: (msg: ContactMessage) => void;
  lang?: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage, lang = 'zh' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || (lang === 'en' ? 'No subject' : '未填寫主旨'),
      message: formData.message,
      createdAt: new Date().toLocaleString(lang === 'en' ? 'en-US' : 'zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [newMessage, ...prev]);
    if (onSendMessage) onSendMessage(newMessage);

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  return (
    <section className="flex-1 flex flex-col space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-theme-primary"></span>
          {t.contactTitle}
        </h2>

        {/* Tab switch between Form and Sent Messages */}
        <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('form');
              setSubmitted(false);
            }}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-white text-zinc-900 font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t.formTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-zinc-900 font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.sentTab} ({messages.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-lg shadow-xs flex-1 flex flex-col justify-between">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{t.msgSuccessTitle}</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  {t.msgSuccessDesc}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black transition-colors"
                >
                  {t.sendAnotherBtn}
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className="px-5 py-2.5 border border-zinc-200 text-zinc-700 text-xs font-bold rounded hover:bg-zinc-50 transition-colors"
                >
                  {t.viewSentHistoryBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  {t.yourNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., Alex Chen' : '例如：林先生 / Ms. Chen'}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded text-sm outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  {t.yourEmailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@example.com"
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded text-sm outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Subject */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  {t.subjectLabel}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., Project Opportunity / Consulting' : '例如：合作洽談 / 專案諮詢'}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded text-sm outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2 space-y-2 flex flex-col flex-1">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  {t.messageLabel} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'en' ? 'Write your message details here...' : '請輸入您的詳細需求或想交流的內容...'}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded text-sm outline-none focus:border-zinc-500 transition-colors flex-1 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-theme-primary bg-theme-primary-hover text-white text-xs font-bold uppercase tracking-[0.2em] rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.sendMessageBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* History View */
        <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-xs space-y-4 flex-1">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <span className="text-xs font-mono text-zinc-400">
              {lang === 'en' ? 'Locally Stored Messages (Simulated Inbox)' : '本地已紀錄訊息 (Simulated Inbox)'}
            </span>
            {messages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Clear Messages' : '清除紀錄'}</span>
              </button>
            )}
          </div>

          {messages.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-xs">{t.noMessagesYet}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-md space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">{m.name} ({m.email})</span>
                    <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {m.createdAt}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-700 border-b border-zinc-200/60 pb-1">
                    {lang === 'en' ? 'Subject: ' : '主旨：'}{m.subject}
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
