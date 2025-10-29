import { Achievement } from '@/types';
import { Lock, CheckCircle2, TrendingUp } from 'lucide-react';

interface AchievementsPageProps {
  achievements: Achievement[];
  getProgress: (achievement: Achievement) => number;
  unlockedCount: number;
}

export const AchievementsPage = ({ achievements, getProgress, unlockedCount }: AchievementsPageProps) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="card-glow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Achievements</h2>
            <p className="text-muted-foreground">
              Unlock achievements by completing study milestones
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-primary">
              {unlockedCount}/{achievements.length}
            </div>
            <div className="text-sm text-muted-foreground">Unlocked</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-4">
          <div className="progress-xp">
            <div 
              className="progress-xp-fill" 
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Unlocked ({unlockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="card-elevated p-5 border-2 border-success/20 bg-success/5"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      {achievement.name}
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlockedAt && (
                      <p className="text-xs text-success">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Locked ({lockedAchievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => {
              const progress = getProgress(achievement);
              
              return (
                <div
                  key={achievement.id}
                  className="card-elevated p-5 opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl grayscale">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 flex items-center gap-2">
                        {achievement.name}
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-primary">{progress}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-muted">
                          <div 
                            className="h-full bg-primary/50 transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
