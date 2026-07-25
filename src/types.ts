export interface ProfileData {
  name: string;
  englishName: string;
  avatarInitials: string;
  avatarUrl?: string;
  title: string;
  titleEn?: string;
  company: string;
  companyEn?: string;
  location: string;
  locationEn?: string;
  bio: string;
  bioEn?: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  behance: string;
  blog?: string;
  yearsExperience: number;
  completedProjects: number;
  openToWork: boolean;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  roleEn?: string;
  company: string;
  companyEn?: string;
  description: string;
  descriptionEn?: string;
  highlights: string[];
  highlightsEn?: string[];
  skills: string[];
  type: 'work' | 'education';
  achievements?: string[];
  achievementsEn?: string[];
}

export interface SkillCategory {
  category: string;
  categoryEn?: string;
  skills: {
    name: string;
    level: number; // 1-100
    tag: string;
    years: number;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  titleEn?: string;
  category: 'Frontend' | 'Fullstack' | 'UI/UX' | 'Mobile';
  description: string;
  descriptionEn?: string;
  tags: string[];
  year: string;
  imageUrl: string;
  link?: string;
  githubUrl?: string;
  details?: string;
  detailsEn?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
