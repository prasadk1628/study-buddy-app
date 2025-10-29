import { Session, SessionCSV } from '@/types';

export const exportSessionsToCSV = (sessions: Session[]): string => {
  const headers = 'Subject,Date,Duration,XP\n';
  const rows = sessions.map(session => 
    `${session.subject},${session.date},${session.duration},${session.xpEarned}`
  ).join('\n');
  
  return headers + rows;
};

export const downloadCSV = (csvContent: string, filename: string = 'study-sessions.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSV = (csvText: string): SessionCSV[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV file is empty or invalid');
  }

  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  // Validate headers
  const requiredHeaders = ['subject', 'date', 'duration', 'xp'];
  const hasAllHeaders = requiredHeaders.every(h => headers.includes(h));
  if (!hasAllHeaders) {
    throw new Error(`CSV must have headers: ${requiredHeaders.join(', ')}`);
  }

  const sessions: SessionCSV[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const session: any = {};

    headers.forEach((header, index) => {
      session[header] = values[index];
    });

    // Validate session data
    if (!session.subject || session.subject === '') {
      throw new Error(`Row ${i}: Subject cannot be empty`);
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(session.date)) {
      throw new Error(`Row ${i}: Invalid date format. Use YYYY-MM-DD`);
    }

    const duration = parseInt(session.duration);
    if (isNaN(duration) || duration <= 0) {
      throw new Error(`Row ${i}: Duration must be a positive number`);
    }

    sessions.push({
      Subject: session.subject,
      Date: session.date,
      Duration: duration,
      XP: parseInt(session.xp) || duration, // XP defaults to duration if not provided
    });
  }

  return sessions;
};

export const importCSVFile = (file: File): Promise<SessionCSV[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const sessions = parseCSV(text);
        resolve(sessions);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
