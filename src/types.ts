export interface ProfileData {
  name: string;
  englishName: string;
  avatarInitials: string;
  avatarUrl?: string;
  title: string;
  company: string;
  location: string;
  bio: string;
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
  company: string;
  description: string;
  highlights: string[];
  skills: string[];
  type: 'work' | 'education';
}

export interface SkillCategory {
  category: string;
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
  category: 'Frontend' | 'Fullstack' | 'UI/UX' | 'Mobile';
  description: string;
  tags: string[];
  year: string;
  imageUrl: string;
  link?: string;
  githubUrl?: string;
  details?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
