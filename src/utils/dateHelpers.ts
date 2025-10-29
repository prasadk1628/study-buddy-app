// Date utility functions for streak and goal calculations

export const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getYesterday = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

export const getMondayOfWeek = (date: Date = new Date()): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
};

export const isSameWeek = (date1: string, date2: string): boolean => {
  return getMondayOfWeek(new Date(date1)) === getMondayOfWeek(new Date(date2));
};

export const calculateStreak = (lastStudyDate: string, sessionDate: string): number => {
  const today = getToday();
  const yesterday = getYesterday();

  // If this is the first session ever
  if (!lastStudyDate) {
    return 1;
  }

  // If session is from today and last study was also today
  if (sessionDate === today && lastStudyDate === today) {
    return 1; // Keep current streak (no increment for same day)
  }

  // If session is from today and last study was yesterday
  if (sessionDate === today && lastStudyDate === yesterday) {
    return 1; // Will be incremented by caller
  }

  // If session is from today but last study was before yesterday
  if (sessionDate === today && lastStudyDate < yesterday) {
    return 1; // Reset streak
  }

  // If importing old sessions, don't modify streak
  return 1; // Default to keeping/resetting streak
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};
