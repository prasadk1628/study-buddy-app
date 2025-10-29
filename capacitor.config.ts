import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.studybuddy',
  appName: 'Study Buddy',
  webDir: 'dist',
  server: {
    url: 'https://7227275f-4432-499b-941e-727d274cd550.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#6C4BF0',
    },
  },
};

export default config;
