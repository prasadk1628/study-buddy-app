// Study Buddy Type Definitions

export interface Session {
  id: string;
  subject: string;
  duration: number; // minutes
  date: string; // ISO date string (YYYY-MM-DD)
  xpEarned: number;
  createdAt: string; // ISO timestamp
}

export interface UserStats {
  totalXP: number;
  level: number;
  currentLevelXP: number; // XP within current level (0-999)
  xpToNextLevel: number; // Always 1000
  totalStudyTime: number; // minutes
  streak: number;
  lastStudyDate: string; // ISO date string (YYYY-MM-DD)
}

export interface Goal {
  id: string;
  weekStart: string; // ISO date string for Monday of the week
  targetMinutes: number;
  currentMinutes: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: {
    type: 'sessions' | 'streak' | 'level' | 'xp' | 'time';
    value: number;
  };
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
}

// Helper type for CSV export
export interface SessionCSV {
  Subject: string;
  Date: string;
  Duration: number;
  XP: number;
}
