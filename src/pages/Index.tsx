import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { SessionForm } from '@/components/SessionForm';
import { SessionList } from '@/components/SessionList';
import { GoalsPage } from '@/components/GoalsPage';
import { AchievementsPage } from '@/components/AchievementsPage';
import { SettingsPage } from '@/components/SettingsPage';
import { LevelUpModal } from '@/components/LevelUpModal';
import { AchievementUnlockModal } from '@/components/AchievementUnlockModal';
import { useStudyStats } from '@/hooks/useStudyStats';
import { useSessions } from '@/hooks/useSessions';
import { useGoals } from '@/hooks/useGoals';
import { useAchievements } from '@/hooks/useAchievements';
import { useTheme } from '@/hooks/useTheme';
import { Achievement } from '@/types';
import { Sparkles } from 'lucide-react';
import { useAchievements } from "@/hooks/useAchievements";
import { AchievementUnlockModal } from "@/components/AchievementUnlockModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ level: 0, xp: 0 });
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<Achievement[]>([]);

  const { stats, addSessionXP, recalculateStats } = useStudyStats();
  const { sessions, addSession, deleteSession, importSessions, getRecentSessions } = useSessions();
  const { currentGoal, createOrUpdateGoal, updateGoalProgress, getGoalProgress } = useGoals(sessions);
  const { achievements, checkAchievements, getUnlockedCount, getProgress } = useAchievements(stats, sessions);
  const { theme, toggleTheme } = useTheme();

  const goalProgress = getGoalProgress();

  // Check for achievements whenever stats or sessions change
  useEffect(() => {
    const newAchievements = checkAchievements();
    if (newAchievements.length > 0) {
      setNewlyUnlockedAchievements(prev => [...prev, ...newAchievements]);
    }
  }, [stats, sessions]);

  const handleAddSession = (subject: string, duration: number, date: string) => {
    const previousLevel = stats.level;
    
    // Add session
    const newSession = addSession(subject, duration, date);
    
    // Update stats
    addSessionXP(duration, duration, date);
    
    // Update goal progress
    updateGoalProgress();
    
    // Check for level up
    const newLevel = Math.floor((stats.totalXP + duration) / 1000) + 1;
    if (newLevel > previousLevel) {
      setLevelUpData({ level: newLevel, xp: duration });
      setShowLevelUp(true);
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
    // Recalculate all stats from remaining sessions
    const remainingSessions = sessions.filter(s => s.id !== sessionId);
    recalculateStats(remainingSessions);
    updateGoalProgress();
  };

  const handleImportSessions = (importedSessions: Array<{ subject: string; duration: number; date: string; xp: number }>) => {
    const imported = importSessions(importedSessions);
    // Recalculate all stats from all sessions (existing + imported)
    const allSessions = [...sessions, ...imported];
    recalculateStats(allSessions);
    updateGoalProgress();
  };

  const handleCloseAchievement = () => {
    setNewlyUnlockedAchievements(prev => prev.slice(1));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary">Study Buddy</h1>
              <p className="text-xs text-muted-foreground">Level up your learning</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Navigation */}
          <aside className="md:w-48 lg:w-64">
            <div className="hidden md:block">
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <Dashboard stats={stats} weeklyProgress={goalProgress} />
                <SessionForm onAddSession={handleAddSession} />
                <SessionList 
                  sessions={getRecentSessions(5)} 
                  onDeleteSession={handleDeleteSession}
                />
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-6">
                <SessionForm onAddSession={handleAddSession} />
                <SessionList 
                  sessions={sessions} 
                  onDeleteSession={handleDeleteSession}
                  maxDisplay={sessions.length}
                />
              </div>
            )}

            {activeTab === 'goals' && (
              <GoalsPage
                currentGoal={currentGoal}
                goalProgress={goalProgress}
                onCreateGoal={createOrUpdateGoal}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsPage
                achievements={achievements}
                getProgress={getProgress}
                unlockedCount={getUnlockedCount()}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsPage
                theme={theme}
                onToggleTheme={toggleTheme}
                sessions={sessions}
                onImportSessions={handleImportSessions}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Modals */}
      {showLevelUp && (
        <LevelUpModal
          level={levelUpData.level}
          xpGained={levelUpData.xp}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {newlyUnlockedAchievements.length > 0 && (
        <AchievementUnlockModal
          achievement={newlyUnlockedAchievements[0]}
          onClose={handleCloseAchievement}
        />
      )}
    </div>
  );
};

export default Index;
