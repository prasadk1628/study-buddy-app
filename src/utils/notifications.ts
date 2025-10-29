// Capacitor Local Notifications wrapper for native platforms

import { Capacitor } from '@capacitor/core';

let LocalNotifications: any = null;

// Dynamically import only on native platforms
const initNotifications = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      const module = await import('@capacitor/local-notifications');
      LocalNotifications = module.LocalNotifications;
      return true;
    } catch (error) {
      console.warn('Local Notifications plugin not available:', error);
      return false;
    }
  }
  return false;
};

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const available = await initNotifications();
  if (!available) return false;

  try {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const scheduleDailyReminder = async (hour: number = 19, minute: number = 0): Promise<boolean> => {
  const available = await initNotifications();
  if (!available) {
    console.log('Notifications only available on native platforms');
    return false;
  }

  try {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Study Buddy Reminder 📚',
          body: "Don't forget to log your study session today!",
          id: 1,
          schedule: {
            at: scheduledTime,
            repeats: true,
            every: 'day',
          },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null,
        },
      ],
    });

    return true;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return false;
  }
};

export const cancelAllNotifications = async (): Promise<void> => {
  const available = await initNotifications();
  if (!available) return;

  try {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
  } catch (error) {
    console.error('Error canceling notifications:', error);
  }
};
