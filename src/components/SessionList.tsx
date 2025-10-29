import { Session } from '@/types';
import { Button } from '@/components/ui/button';
import { formatDuration } from '@/utils/dateHelpers';
import { Trash2, BookOpen, Calendar, Zap } from 'lucide-react';

interface SessionListProps {
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
  maxDisplay?: number;
}

export const SessionList = ({ sessions, onDeleteSession, maxDisplay = 5 }: SessionListProps) => {
  const displaySessions = sessions.slice(0, maxDisplay);

  if (sessions.length === 0) {
    return (
      <div className="card-elevated p-8 text-center">
        <div className="inline-flex p-4 rounded-full bg-muted mb-4">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
        <p className="text-muted-foreground">Log your first study session to get started!</p>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Sessions</h2>
        <span className="text-sm text-muted-foreground">{sessions.length} total</span>
      </div>

      <div className="space-y-3">
        {displaySessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-semibold truncate">{session.subject}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(session.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-primary" />
                  +{session.xpEarned} XP
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <div className="font-semibold text-primary">
                  {formatDuration(session.duration)}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteSession(session.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {sessions.length > maxDisplay && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing {maxDisplay} of {sessions.length} sessions
        </div>
      )}
    </div>
  );
};
