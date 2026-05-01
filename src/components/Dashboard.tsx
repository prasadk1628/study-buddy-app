import { UserStats } from '@/types';
import { formatDuration } from '@/utils/dateHelpers';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';
import AnalyticsDashboard from "./AnalyticsDashboard";

interface DashboardProps {
  stats: UserStats;
  weeklyProgress?: { current: number; target: number; percentage: number };
}

export const Dashboard = ({ stats, weeklyProgress }: DashboardProps) => {
  const progressPercentage = (stats.currentLevelXP / stats.xpToNextLevel) * 100;

  const motivationalMessages = [
    "Keep up the great work! 🌟",
    "You're on fire! 🔥",
    "Consistency is key! 💪",
    "Learning every day! 📚",
    "Making progress! ⭐",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero Card - XP & Level */}
      <div className="card-glow p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
                Level {stats.level}
              </h2>
              {stats.streak > 0 && (
                <div className="badge-fire animate-pulse-glow">
                  🔥 {stats.streak}
                </div>
              )}
            </div>
            <p className="text-muted-foreground">{randomMessage}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {stats.totalXP.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {stats.level + 1}</span>
            <span className="font-semibold text-primary">
              {stats.currentLevelXP} / {stats.xpToNextLevel} XP
            </span>
          </div>
          <div className="progress-xp">
            <div 
              className="progress-xp-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Study Time */}
        <div className="card-elevated p-5 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm text-muted-foreground">Study Time</div>
          </div>
          <div className="text-2xl font-bold">{formatDuration(stats.totalStudyTime)}</div>
        </div>

        {/* Weekly Goal */}
        {weeklyProgress && weeklyProgress.target > 0 && (
          <div className="card-elevated p-5 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-success/20">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div className="text-sm text-muted-foreground">Weekly Goal</div>
            </div>
            <div className="text-2xl font-bold">{weeklyProgress.percentage}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatDuration(weeklyProgress.current)} / {formatDuration(weeklyProgress.target)}
            </div>
          </div>
        )}

        {/* Current Streak */}
        <div className="card-elevated p-5 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/20">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div className="text-sm text-muted-foreground">Streak</div>
          </div>
          <div className="text-2xl font-bold">{stats.streak} days</div>
        </div>
      </div>
      <div className="space-y-6">
        <AnalyticsDashboard />
      </div>
    </div>
  );
};
