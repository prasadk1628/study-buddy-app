import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getToday } from '@/utils/dateHelpers';
import { BookOpen, Clock } from 'lucide-react';

interface SessionFormProps {
  onAddSession: (subject: string, duration: number, date: string) => void;
}

export const SessionForm = ({ onAddSession }: SessionFormProps) => {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(getToday());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !duration || parseInt(duration) <= 0) {
      return;
    }

    setIsSubmitting(true);
    
    onAddSession(subject.trim(), parseInt(duration), date);
    
    // Reset form
    setSubject('');
    setDuration('');
    setDate(getToday());
    
    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg gradient-primary">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold">Log Study Session</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            type="text"
            placeholder="e.g., Mathematics, History, Programming"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={50}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="1440"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={getToday()}
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : `Add Session (+${duration || 0} XP)`}
        </Button>
      </form>
    </div>
  );
};
