import { useState, useEffect, useCallback } from 'react';
import { Goal, Session } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { getMondayOfWeek, isSameWeek } from '@/utils/dateHelpers';

export const useGoals = (sessions: Session[]) => {
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const savedGoals = storage.get<Goal[]>(STORAGE_KEYS.GOALS);
    if (savedGoals && savedGoals.length > 0) {
      // Get the most recent goal
      const latestGoal = savedGoals.sort((a, b) => 
        b.createdAt.localeCompare(a.createdAt)
      )[0];
      
      // Check if it's for current week
      const thisWeekMonday = getMondayOfWeek();
      if (latestGoal.weekStart === thisWeekMonday) {
        setCurrentGoal(latestGoal);
      }
    }
  }, []);

  const calculateWeekProgress = useCallback((weekStart: string): number => {
    const weekSessions = sessions.filter(session => 
      isSameWeek(session.date, weekStart)
    );
    return weekSessions.reduce((total, session) => total + session.duration, 0);
  }, [sessions]);

  const createOrUpdateGoal = useCallback((targetMinutes: number) => {
    const thisWeekMonday = getMondayOfWeek();
    const currentMinutes = calculateWeekProgress(thisWeekMonday);

    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      weekStart: thisWeekMonday,
      targetMinutes,
      currentMinutes,
      createdAt: new Date().toISOString(),
    };

    setCurrentGoal(newGoal);

    // Save to storage (keep only recent goals)
    const savedGoals = storage.get<Goal[]>(STORAGE_KEYS.GOALS) || [];
    const updatedGoals = [newGoal, ...savedGoals.filter(g => g.weekStart !== thisWeekMonday)];
    storage.set(STORAGE_KEYS.GOALS, updatedGoals);

    return newGoal;
  }, [calculateWeekProgress]);

  const updateGoalProgress = useCallback(() => {
    if (!currentGoal) return;

    const currentMinutes = calculateWeekProgress(currentGoal.weekStart);
    const updatedGoal = { ...currentGoal, currentMinutes };
    
    setCurrentGoal(updatedGoal);

    const savedGoals = storage.get<Goal[]>(STORAGE_KEYS.GOALS) || [];
    const updatedGoals = savedGoals.map(g => 
      g.id === updatedGoal.id ? updatedGoal : g
    );
    storage.set(STORAGE_KEYS.GOALS, updatedGoals);
  }, [currentGoal, calculateWeekProgress]);

  const getGoalProgress = useCallback((): { current: number; target: number; remaining: number; percentage: number } => {
    if (!currentGoal) {
      return { current: 0, target: 0, remaining: 0, percentage: 0 };
    }

    const current = calculateWeekProgress(currentGoal.weekStart);
    const target = currentGoal.targetMinutes;
    const remaining = Math.max(0, target - current);
    const percentage = Math.min(100, Math.round((current / target) * 100));

    return { current, target, remaining, percentage };
  }, [currentGoal, calculateWeekProgress]);

  return {
    currentGoal,
    createOrUpdateGoal,
    updateGoalProgress,
    getGoalProgress,
  };
};
