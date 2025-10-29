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

  useEffect(() => {
    const savedAchievements = storage.get<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS);
    if (savedAchievements) {
      setAchievements(savedAchievements);
    } else {
      // Initialize with predefined achievements
      const initialAchievements: Achievement[] = PREDEFINED_ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: false,
      }));
      setAchievements(initialAchievements);
      storage.set(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements);
    }
  }, []);

  const checkAchievements = useCallback((): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];

    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'sessions':
          shouldUnlock = sessions.length >= achievement.requirement.value;
          break;
        case 'streak':
          shouldUnlock = stats.streak >= achievement.requirement.value;
          break;
        case 'level':
          shouldUnlock = stats.level >= achievement.requirement.value;
          break;
        case 'xp':
          shouldUnlock = stats.totalXP >= achievement.requirement.value;
          break;
        case 'time':
          shouldUnlock = stats.totalStudyTime >= achievement.requirement.value;
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        };
        newlyUnlocked.push(unlockedAchievement);
        return unlockedAchievement;
      }

      return achievement;
    });

    setAchievements(updatedAchievements);
    storage.set(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);

    return newlyUnlocked;
  }, [achievements, stats, sessions]);

  const getUnlockedCount = useCallback((): number => {
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
