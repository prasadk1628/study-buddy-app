import { useState, useEffect, useCallback } from 'react';
import { Session } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { getToday } from '@/utils/dateHelpers';

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const savedSessions = storage.get<Session[]>(STORAGE_KEYS.SESSIONS);
    if (savedSessions) {
      setSessions(savedSessions);
    }
  }, []);

  const addSession = useCallback((subject: string, duration: number, date: string = getToday()): Session => {
    const newSession: Session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      subject,
      duration,
      date,
      xpEarned: duration, // 1 XP per minute
      createdAt: new Date().toISOString(),
    };

    const updatedSessions = [...sessions, newSession].sort((a, b) => 
      b.createdAt.localeCompare(a.createdAt)
    );

    setSessions(updatedSessions);
    storage.set(STORAGE_KEYS.SESSIONS, updatedSessions);

    return newSession;
  }, [sessions]);

  const deleteSession = useCallback((sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    storage.set(STORAGE_KEYS.SESSIONS, updatedSessions);
  }, [sessions]);

  const importSessions = useCallback((newSessions: Array<{ subject: string; duration: number; date: string; xp: number }>) => {
    const importedSessions: Session[] = newSessions.map(s => ({
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      subject: s.subject,
      duration: s.duration,
      date: s.date,
      xpEarned: s.xp,
      createdAt: new Date().toISOString(),
    }));

    const updatedSessions = [...sessions, ...importedSessions].sort((a, b) => 
      b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)
    );

    setSessions(updatedSessions);
    storage.set(STORAGE_KEYS.SESSIONS, updatedSessions);

    return importedSessions;
  }, [sessions]);

  const getRecentSessions = useCallback((count: number = 5): Session[] => {
    return sessions.slice(0, count);
  }, [sessions]);

  return {
    sessions,
    addSession,
    deleteSession,
    importSessions,
    getRecentSessions,
  };
};
