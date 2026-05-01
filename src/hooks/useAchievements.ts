import { useState, useEffect, useCallback } from 'react';
import { Achievement, UserStats, Session } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';

const PREDEFINED_ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first_session',
    name: 'Getting Started',
    description: 'Complete your first study session',
    icon: '🎯',
    requirement: { type: 'sessions', value: 1 },
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'level_5',
    name: 'Rising Scholar',
    description: 'Reach level 5',
    icon: '⭐',
    requirement: { type: 'level', value: 5 },
  },
  {
    id: 'xp_5000',
    name: 'XP Master',
    description: 'Earn 5000 total XP',
    icon: '💎',
    requirement: { type: 'xp', value: 5000 },
  },
  {
    id: 'time_1000',
    name: 'Dedicated Learner',
    description: 'Study for 1000 total minutes',
    icon: '📚',
    requirement: { type: 'time', value: 1000 },
  },
  {
    id: 'streak_30',
    name: 'Unstoppable',
    description: 'Maintain a 30-day study streak',
    icon: '🏆',
    requirement: { type: 'streak', value: 30 },
  },
  {
    id: 'level_10',
    name: 'Expert Scholar',
    description: 'Reach level 10',
    icon: '👑',
    requirement: { type: 'level', value: 10 },
  },
  {
    id: 'sessions_50',
    name: 'Consistency King',
    description: 'Complete 50 study sessions',
    icon: '🎓',
    requirement: { type: 'sessions', value: 50 },
  },
];

export const useAchievements = (stats: UserStats, sessions: Session[]) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // 🔹 Initialize from storage
  useEffect(() => {
    const saved = storage.get<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS);

    if (saved) {
      setAchievements(saved);
    } else {
      const initial: Achievement[] = PREDEFINED_ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: false,
      }));

      setAchievements(initial);
      storage.set(STORAGE_KEYS.ACHIEVEMENTS, initial);
    }
  }, []);

  // 🔹 Core unlock logic
  const checkAchievements = useCallback((): Achievement[] => {
    if (!achievements.length) return [];

    const newlyUnlocked: Achievement[] = [];

    const updated = achievements.map((achievement) => {
      if (achievement.unlocked) return achievement;

      let current = 0;

      switch (achievement.requirement.type) {
        case 'sessions':
          current = sessions.length;
          break;
        case 'streak':
          current = stats.streak;
          break;
        case 'level':
          current = stats.level;
          break;
        case 'xp':
          current = stats.totalXP;
          break;
        case 'time':
          current = stats.totalStudyTime;
          break;
      }

      if (current >= achievement.requirement.value) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: achievement.unlockedAt || new Date().toISOString(),
        };

        newlyUnlocked.push(unlockedAchievement);
        return unlockedAchievement;
      }

      return achievement;
    });

    setAchievements(updated);
    storage.set(STORAGE_KEYS.ACHIEVEMENTS, updated);

    return newlyUnlocked;
  }, [achievements, stats, sessions]);

  // 🔥 AUTO TRIGGER (important fix)
  useEffect(() => {
    if (achievements.length > 0) {
      checkAchievements();
    }
  }, [stats, sessions]);

  // 🔹 Helpers
  const getUnlockedCount = useCallback(() => {
    return achievements.filter(a => a.unlocked).length;
  }, [achievements]);

  const getProgress = useCallback((achievement: Achievement): number => {
    if (achievement.unlocked) return 100;

    let current = 0;
    const target = achievement.requirement.value;

    switch (achievement.requirement.type) {
      case 'sessions':
        current = sessions.length;
        break;
      case 'streak':
        current = stats.streak;
        break;
      case 'level':
        current = stats.level;
        break;
      case 'xp':
        current = stats.totalXP;
        break;
      case 'time':
        current = stats.totalStudyTime;
        break;
    }

    return Math.min(100, Math.round((current / target) * 100));
  }, [stats, sessions]);

  return {
    achievements,
    checkAchievements,
    getUnlockedCount,
    getProgress,
  };
};