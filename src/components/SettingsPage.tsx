import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Session } from '@/types';
import { exportSessionsToCSV, downloadCSV, importCSVFile } from '@/utils/csv';
import { Settings, Moon, Sun, Download, Upload, Bell, BellOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsPageProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  sessions: Session[];
  onImportSessions: (sessions: Array<{ subject: string; duration: number; date: string; xp: number }>) => void;
}

export const SettingsPage = ({ theme, onToggleTheme, sessions, onImportSessions }: SettingsPageProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  const handleExportCSV = () => {
    if (sessions.length === 0) {
      toast({
        title: 'No sessions to export',
        description: 'Log some study sessions first!',
        variant: 'destructive',
      });
      return;
    }

    const csv = exportSessionsToCSV(sessions);
    downloadCSV(csv);
    
    toast({
      title: 'Export successful!',
      description: `Exported ${sessions.length} sessions to CSV`,
    });
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedSessions = await importCSVFile(file);
      
      const formattedSessions = importedSessions.map(s => ({
        subject: s.Subject,
        duration: s.Duration,
        date: s.Date,
        xp: s.XP,
      }));

      onImportSessions(formattedSessions);

      toast({
        title: 'Import successful!',
        description: `Imported ${importedSessions.length} sessions`,
      });
    } catch (error: any) {
      toast({
        title: 'Import failed',
        description: error.message || 'Failed to parse CSV file',
        variant: 'destructive',
      });
    }

    // Reset input
    e.target.value = '';
  };

  const handleToggleNotifications = async () => {
    // Note: This would require Capacitor LocalNotifications plugin on native
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    
    toast({
      title: newState ? 'Notifications enabled' : 'Notifications disabled',
      description: newState 
        ? 'You will receive daily study reminders'
        : 'Daily reminders have been turned off',
    });
  };

  return (
    <div className="space-y-6">
      <div className="card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg gradient-primary">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Settings</h2>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-warning" />
              )}
              <div>
                <Label className="text-base font-semibold">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={onToggleTheme} />
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-primary" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <Label className="text-base font-semibold">Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified to log your study sessions
                </p>
              </div>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={handleToggleNotifications}
            />
          </div>

          {/* Data Management */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Data Management</Label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="flex-1 justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Sessions (CSV)
              </Button>

              <Button
                variant="outline"
                className="flex-1 justify-start relative"
                asChild
              >
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Sessions (CSV)
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              CSV format: Subject, Date (YYYY-MM-DD), Duration (minutes), XP
            </p>
          </div>

          {/* App Info */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h3 className="font-semibold mb-2">About Study Buddy</h3>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0 • Built with React & Capacitor
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Offline-first study tracking with XP, levels, and achievements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
