import { useState } from 'react';
import { Goal } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDuration } from '@/utils/dateHelpers';
import { Target, TrendingUp, CheckCircle2 } from 'lucide-react';

interface GoalsPageProps {
  currentGoal: Goal | null;
  goalProgress: { current: number; target: number; remaining: number; percentage: number };
  onCreateGoal: (targetMinutes: number) => void;
}

export const GoalsPage = ({ currentGoal, goalProgress, onCreateGoal }: GoalsPageProps) => {
  const [targetMinutes, setTargetMinutes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const target = parseInt(targetMinutes);
    if (isNaN(target) || target <= 0) {
      return;
    }

    setIsSubmitting(true);
    onCreateGoal(target);
    setTargetMinutes('');
    setTimeout(() => setIsSubmitting(false), 500);
  };

  const isGoalReached = currentGoal && goalProgress.current >= goalProgress.target;

  return (
    <div className="space-y-6">
      {/* Create/Update Goal Form */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg gradient-primary">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">
            {currentGoal ? 'Update Weekly Goal' : 'Set Weekly Goal'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target">Target Study Time (minutes per week)</Label>
            <div className="flex gap-2">
              <Input
                id="target"
                type="number"
                placeholder="e.g., 300 (5 hours)"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(e.target.value)}
                min="1"
                max="10080"
                className="flex-1"
                required
              />
              <Button 
                type="submit" 
                className="gradient-primary text-white"
                disabled={isSubmitting}
              >
                {currentGoal ? 'Update' : 'Set Goal'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: 300-600 minutes (5-10 hours) per week
            </p>
          </div>
        </form>
      </div>

      {/* Current Goal Progress */}
      {currentGoal && (
        <div className="card-glow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">This Week's Progress</h3>
            {isGoalReached ? (
              <div className="badge-success flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Goal Reached!
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {goalProgress.remaining} min remaining
              </div>
            )}
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-primary">
                {formatDuration(goalProgress.current)}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {formatDuration(goalProgress.target)}
              </div>
              <div className="text-xs text-muted-foreground">Target</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-gradient-primary">
                {goalProgress.percentage}%
              </div>
              <div className="text-xs text-muted-foreground">Achievement</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-xp">
            <div 
              className="progress-xp-fill" 
              style={{ width: `${Math.min(100, goalProgress.percentage)}%` }}
            />
          </div>

          {/* Motivational Message */}
          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {isGoalReached 
                    ? "Fantastic work! You've crushed your goal this week! 🎉" 
                    : `You're ${goalProgress.percentage}% of the way there. Keep it up! 💪`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
