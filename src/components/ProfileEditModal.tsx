import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X, Save, RotateCcw } from 'lucide-react';

interface ProfileEditModalProps {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
  onClose: () => void;
  onReset: () => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profile,
  onSave,
  onClose,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-lg max-w-lg w-full p-6 space-y-5 relative shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <h3 className="font-bold text-base text-zinc-900">編輯個人簡歷資料</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                中文姓名
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                英文姓名 / 縮寫
              </label>
              <input
                type="text"
                required
                value={formData.englishName}
                onChange={(e) => setFormData({ ...formData, englishName: e.target.value, avatarInitials: e.target.value.substring(0, 2).toUpperCase() })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                中文職稱 / Chinese Title
              </label>
              <input
                type="text"
                required
                placeholder="例如：高級資深前端架構師"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                英文職稱 / English Title
              </label>
              <input
                type="text"
                placeholder="例如：Senior Frontend Architect"
                value={formData.titleEn || ''}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                現職公司 / 單位
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                所在地 / Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
              個人簡介 / Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                年資 (年)
              </label>
              <input
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                完成專案數
              </label>
              <input
                type="number"
                min="0"
                value={formData.completedProjects}
                onChange={(e) => setFormData({ ...formData, completedProjects: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                聯絡電話 / Phone
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
              社群媒體與個人網站連結 (Social Links)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  GitHub 網址
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  LinkedIn 網址
                </label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Behance / 作品集網址
                </label>
                <input
                  type="text"
                  placeholder="https://behance.net/username"
                  value={formData.behance}
                  onChange={(e) => setFormData({ ...formData, behance: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  個人網站 / 部落格 (Blog)
                </label>
                <input
                  type="text"
                  placeholder="https://yourwebsite.com"
                  value={formData.blog || ''}
                  onChange={(e) => setFormData({ ...formData, blog: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="openToWorkCheck"
              checked={formData.openToWork}
              onChange={(e) => setFormData({ ...formData, openToWork: e.target.checked })}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            <label htmlFor="openToWorkCheck" className="text-xs text-zinc-700 cursor-pointer">
              標示為「尋找新機會中 (Open to Work)」
            </label>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="px-3 py-2 text-zinc-500 hover:text-zinc-900 text-xs font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置為預設範例</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-zinc-200 text-zinc-700 text-xs font-medium rounded hover:bg-zinc-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-theme-primary bg-theme-primary-hover text-white text-xs font-bold rounded flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>儲存修改</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
