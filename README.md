# Study Buddy 📚✨

A gamified study tracking app that helps you level up your learning! Track study sessions, earn XP, maintain streaks, unlock achievements, and set weekly goals—all offline-first with localStorage.

## Features

- 🎯 **XP & Levels**: Earn 1 XP per minute studied, level up every 1000 XP
- 🔥 **Daily Streaks**: Maintain your study momentum day by day
- 🏆 **Achievements**: Unlock 8 predefined achievements as you progress
- 📊 **Weekly Goals**: Set and track weekly study time targets
- 📱 **Mobile-Ready**: Built with Capacitor for native Android/iOS apps
- 🌙 **Dark Mode**: Beautiful light and dark themes
- 💾 **Offline-First**: All data stored locally with localStorage
- 📤 **Import/Export**: CSV support for backing up and migrating data

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom purple-blue gradient theme
- **Capacitor** for native mobile builds
- **localStorage** for offline-first data persistence
- **Vite** for fast development and builds

## Getting Started

### Web Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:8080`

### Mobile Development (Android)

#### Prerequisites
- Node.js & npm installed
- Android Studio installed
- Git (for version control)

#### Steps

1. **Build the web app**:
```bash
npm install
npm run build
```

2. **Initialize Capacitor** (if not done):
```bash
npx cap init
```

3. **Add Android platform**:
```bash
npx cap add android
```

4. **Sync web assets to Android**:
```bash
npx cap sync android
```

5. **Open in Android Studio**:
```bash
npx cap open android
```

6. **Or run directly** (if emulator/device connected):
```bash
npx cap run android
```

#### Building APK

In Android Studio:
1. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. APK will be in `android/app/build/outputs/apk/debug/`

For production:
1. Go to **Build** → **Generate Signed Bundle / APK**
2. Follow the wizard to create a release APK

### iOS Development

```bash
# Add iOS platform (requires macOS with Xcode)
npx cap add ios

# Sync and open in Xcode
npx cap sync ios
npx cap open ios
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── SessionForm.tsx
│   ├── SessionList.tsx
│   ├── GoalsPage.tsx
│   ├── AchievementsPage.tsx
│   ├── SettingsPage.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useStudyStats.ts
│   ├── useSessions.ts
│   ├── useGoals.ts
│   ├── useAchievements.ts
│   └── useTheme.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── storage.ts
│   ├── csv.ts
│   ├── notifications.ts
│   └── dateHelpers.ts
└── pages/              # Page components
    └── Index.tsx

public/
├── icons/              # App icons (various sizes)
└── manifest.webmanifest
```

## Data Model

### Session
```typescript
{
  id: string;
  subject: string;
  duration: number;      // minutes
  date: string;          // YYYY-MM-DD
  xpEarned: number;
  createdAt: string;
}
```

### UserStats
```typescript
{
  totalXP: number;
  level: number;
  currentLevelXP: number;
  xpToNextLevel: 1000;
  totalStudyTime: number;
  streak: number;
  lastStudyDate: string;
}
```

### localStorage Keys
- `studybuddy_sessions` - Array of sessions
- `studybuddy_stats` - User stats object
- `studybuddy_goals` - Array of goals
- `studybuddy_achievements` - Array of achievements
- `studybuddy_settings` - App settings (theme, notifications)

## XP & Level Calculation

- **XP Earned**: 1 XP per minute studied
- **Level Formula**: `Level = floor(totalXP / 1000) + 1`
- **Progress in Level**: `currentLevelXP = totalXP % 1000`

## Streak Logic

- First session ever: streak = 1
- Session today, last study today: no change
- Session today, last study yesterday: streak + 1
- Session today, last study before yesterday: reset to 1
- Historical imports don't affect current streak

## Weekly Goals

- Week starts on Monday
- Progress auto-calculates from sessions in current week
- Create or update goal anytime
- Persists across weeks

## Achievements

Predefined achievements unlock automatically:
1. 🎯 **Getting Started** - First session
2. 🔥 **Week Warrior** - 7-day streak
3. ⭐ **Rising Scholar** - Level 5
4. 💎 **XP Master** - 5000 XP
5. 📚 **Dedicated Learner** - 1000 minutes
6. 🏆 **Unstoppable** - 30-day streak
7. 👑 **Expert Scholar** - Level 10
8. 🎓 **Consistency King** - 50 sessions

## CSV Import/Export

### Export Format
```csv
Subject,Date,Duration,XP
Mathematics,2024-01-15,60,60
History,2024-01-16,45,45
```

### Import Validation
- Subject: non-empty string
- Date: YYYY-MM-DD format
- Duration: positive integer (minutes)
- XP: positive integer (defaults to duration)

## Notifications (Native Only)

On native platforms, the app can schedule daily reminders using Capacitor Local Notifications plugin. This feature gracefully degrades on web.

## Customization

### Theme Colors

Edit `src/index.css` for color customization:

```css
--primary-start: 258 80% 62%;  /* Purple */
--primary-end: 195 100% 66%;   /* Cyan */
--accent: 340 85% 70%;          /* Pink */
```

### Animations

Custom animations defined in `src/index.css`:
- `.gradient-primary` - Purple to cyan gradient
- `.badge-fire` - Streak badge styling
- `.animate-pulse-glow` - Pulsing glow effect
- `.animate-level-up` - Scale animation for level up
- `.animate-slide-up` - Slide up entrance

## Testing

To test the app functionality:

1. **Add a session** and verify XP increases
2. **Add session today** after yesterday's session → streak increments
3. **Delete a session** and verify stats recalculate
4. **Set a weekly goal** and add sessions → progress updates
5. **Export CSV** and verify data format
6. **Import CSV** with valid data
7. **Toggle theme** and verify persistence
8. **Check achievements** unlock at milestones

## Capacitor Configuration

The `capacitor.config.ts` file is configured for development with hot-reload from Lovable's sandbox. For production builds, update the `server.url` or remove it entirely.

```typescript
server: {
  url: 'https://7227275f-4432-499b-941e-727d274cd550.lovableproject.com?forceHideBadge=true',
  cleartext: true,
}
```

## Troubleshooting

### Android Build Issues

- Make sure Java JDK 11+ is installed
- Set `ANDROID_HOME` environment variable
- Run `npx cap sync android` after code changes
- Clean build: `cd android && ./gradlew clean`

### iOS Build Issues

- Requires macOS with Xcode installed
- Run `pod install` in `ios/App` directory if needed
- Check signing certificates in Xcode

### Data Not Persisting

- Check browser's localStorage isn't disabled
- Verify no extensions blocking localStorage
- Check browser console for errors

## License

MIT License - Feel free to use this project for learning and building!

## Contributing

This is an educational project. Feel free to fork, modify, and make it your own!

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Capacitor
