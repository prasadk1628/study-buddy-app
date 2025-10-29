import { useState, useEffect, useCallback } from 'react';
import { UserStats } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { getToday, getYesterday } from '@/utils/dateHelpers';

const DEFAULT_STATS: UserStats = {
  totalXP: 0,
  level: 1,
  currentLevelXP: 0,
  xpToNextLevel: 1000,
  totalStudyTime: 0,
  streak: 0,
  lastStudyDate: '',
};

export const useStudyStats = () => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    const savedStats = storage.get<UserStats>(STORAGE_KEYS.STATS);
    if (savedStats) {
      setStats(savedStats);
    }
  }, []);

  const calculateLevel = (totalXP: number): { level: number; currentLevelXP: number } => {
    const level = Math.floor(totalXP / 1000) + 1;
    const currentLevelXP = totalXP % 1000;
    return { level, currentLevelXP };
  };

  const updateStreak = useCallback((sessionDate: string, currentStats: UserStats): number => {
    const today = getToday();
    const yesterday = getYesterday();

    // First session ever
    if (!currentStats.lastStudyDate) {
      return 1;
    }

    // Session from today
    if (sessionDate === today) {
      if (currentStats.lastStudyDate === today) {
        return currentStats.streak; // Same day, no change
      } else if (currentStats.lastStudyDate === yesterday) {
        return currentStats.streak + 1; // Consecutive day
      } else {
        return 1; // Streak broken, reset
      }
    }

    // Historical session import - don't modify streak
    return currentStats.streak;
  }, []);

  const addSessionXP = useCallback((xp: number, duration: number, sessionDate: string = getToday()) => {
    setStats((prevStats) => {
      const newTotalXP = prevStats.totalXP + xp;
      const { level, currentLevelXP } = calculateLevel(newTotalXP);
      const newStreak = updateStreak(sessionDate, prevStats);
      const leveledUp = level > prevStats.level;

      const newStats: UserStats = {
        totalXP: newTotalXP,
        level,
        currentLevelXP,
        xpToNextLevel: 1000,
        totalStudyTime: prevStats.totalStudyTime + duration,
        streak: newStreak,
        lastStudyDate: sessionDate,
      };

      storage.set(STORAGE_KEYS.STATS, newStats);
      
      return newStats;
    });
  }, [updateStreak]);

  const recalculateStats = useCallback((sessions: Array<{ duration: number; xpEarned: number; date: string }>) => {
    // Sort sessions by date
    const sortedSessions = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
    
    let newStats = { ...DEFAULT_STATS };

    sortedSessions.forEach((session) => {
      newStats.totalXP += session.xpEarned;
      newStats.totalStudyTime += session.duration;
      newStats.streak = updateStreak(session.date, newStats);
      newStats.lastStudyDate = session.date;
    });

    const { level, currentLevelXP } = calculateLevel(newStats.totalXP);
    newStats.level = level;
    newStats.currentLevelXP = currentLevelXP;

    setStats(newStats);
    storage.set(STORAGE_KEYS.STATS, newStats);
  }, [updateStreak]);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    storage.set(STORAGE_KEYS.STATS, DEFAULT_STATS);
  }, []);

  return {
    stats,
    addSessionXP,
    recalculateStats,
    resetStats,
  };
};
