import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Save } from 'lucide-react';
import { ProfileData } from '../types';
import { Language, translations } from '../data/translations';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
  language: Language;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
  language,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const t = translations[language];

  useEffect(() => {
    setFormData(profile);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = formData.englishName
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
    onSave({
      ...formData,
      avatarInitials: initials || formData.avatarInitials,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">{t.modalTitle}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.modalSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label={t.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldName}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldEnglishName}
              </label>
              <input
                type="text"
                required
                value={formData.englishName}
                onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldTitle}
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldTitleEn}
              </label>
              <input
                type="text"
                value={formData.titleEn || ''}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldCompany}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldLocation}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldEmail}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldPhone}
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldYears}
              </label>
              <input
                type="number"
                min={0}
                max={60}
                value={formData.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, yearsExperience: Number(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {t.fieldProjects}
              </label>
              <input
                type="number"
                min={0}
                max={500}
                value={formData.completedProjects}
                onChange={(e) =>
                  setFormData({ ...formData, completedProjects: Number(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              {t.fieldBio}
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              {t.fieldBioEn}
            </label>
            <textarea
              rows={3}
              value={formData.bioEn || ''}
              onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 focus:border-zinc-400"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.openToWork}
              onChange={(e) => setFormData({ ...formData, openToWork: e.target.checked })}
              className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
            />
            <span className="text-sm text-zinc-700">{t.fieldOpenToWork}</span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDefault}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-theme-primary bg-theme-primary-hover text-white text-xs font-medium transition-colors cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t.saveChanges}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
