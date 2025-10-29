# Study Buddy - Mobile Build Guide

Complete guide to building Study Buddy as a native Android/iOS app using Capacitor.

## Prerequisites

### For Android
- **Node.js** (v16+) and **npm** installed
- **Android Studio** (latest version)
- **Java JDK** 11 or higher
- **Git** for version control

### For iOS (macOS only)
- **Xcode** (latest version from Mac App Store)
- **CocoaPods** (`sudo gem install cocoapods`)

## Quick Start - Android Build

### 1. Initial Setup

```bash
# Clone/pull the project
git pull

# Install dependencies
npm install

# Build the web app
npm run build
```

### 2. Initialize Capacitor (First Time Only)

The `capacitor.config.ts` is already configured. Verify it exists:

```typescript
// capacitor.config.ts
{
  appId: 'com.yourname.studybuddy',
  appName: 'Study Buddy',
  webDir: 'dist',
  // ... other config
}
```

### 3. Add Android Platform

```bash
# Add Android platform
npx cap add android

# This creates android/ folder with native Android project
```

### 4. Sync Web Assets

```bash
# Copy web build to Android project
npx cap sync android

# Run this command after every code change
```

### 5. Open in Android Studio

```bash
# Open Android project in Android Studio
npx cap open android
```

### 6. Build APK

**Option A: From Android Studio**
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for build to complete
3. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

**Option B: From Command Line**
```bash
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### 7. Install on Device

**Via Android Studio:**
1. Connect device via USB (enable USB debugging)
2. Click the **Run** button (green triangle)
3. Select your device

**Via Command Line:**
```bash
npx cap run android

# Or manually install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Development Workflow

### Hot Reload During Development

The app is configured to load from the Lovable sandbox for live updates:

```typescript
// capacitor.config.ts
server: {
  url: 'https://7227275f-4432-499b-941e-727d274cd550.lovableproject.com?forceHideBadge=true',
  cleartext: true,
}
```

**To test with hot-reload:**
1. Run `npx cap sync android`
2. Run `npx cap run android`
3. App loads from live URL - changes in Lovable reflect immediately

### Building Standalone APK (Offline)

For production, remove or comment out the `server` config:

```typescript
// capacitor.config.ts
{
  appId: 'com.yourname.studybuddy',
  appName: 'Study Buddy',
  webDir: 'dist',
  // server: { ... } // Remove this for production
}
```

Then rebuild:
```bash
npm run build
npx cap sync android
# Build APK as described above
```

## iOS Build (macOS Required)

### 1. Add iOS Platform

```bash
npx cap add ios
```

### 2. Install Dependencies

```bash
cd ios/App
pod install
cd ../..
```

### 3. Open in Xcode

```bash
npx cap open ios
```

### 4. Configure Signing

1. In Xcode, select the project in left sidebar
2. Select the **Study Buddy** target
3. Go to **Signing & Capabilities**
4. Select your development team
5. Xcode will auto-generate provisioning profile

### 5. Build & Run

1. Select device/simulator from top toolbar
2. Click **Run** button (▶️)
3. App installs and launches

## Production Release

### Android Production APK

1. **Generate Signing Key:**

```bash
cd android/app
keytool -genkey -v -keystore study-buddy-release.keystore \
  -alias study-buddy -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing:**

Create `android/key.properties`:
```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=study-buddy
storeFile=study-buddy-release.keystore
```

3. **Update `android/app/build.gradle`:**

```gradle
android {
    signingConfigs {
        release {
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles ...
        }
    }
}
```

4. **Build Release APK:**

```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### iOS Production Build

1. **Archive in Xcode:**
   - Product → Archive
   - Wait for archive to complete
   
2. **Upload to App Store Connect:**
   - Window → Organizer
   - Select archive → Distribute App
   - Follow wizard to upload

## Troubleshooting

### Android Studio Can't Find Java

```bash
# Set JAVA_HOME
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
```

### Gradle Build Fails

```bash
# Clean build
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Changes Not Appearing

```bash
# Always rebuild and sync after code changes
npm run build
npx cap sync android
```

### Plugin Not Found Errors

```bash
# Reinstall dependencies
npm install
npx cap sync android
```

### App Crashes on Launch

1. Check Android Studio Logcat for errors
2. Verify all Capacitor plugins are properly installed
3. Check `capacitor.config.ts` is valid

## Local Notifications Setup (Optional)

For daily study reminders on native platforms:

### Android Permissions

Already configured in app. Notifications will request permission on first use.

### iOS Permissions

Add to `ios/App/App/Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
    <string>remote-notification</string>
</array>
```

## Performance Optimization

### Reduce APK Size

1. Enable minification (already in release builds)
2. Use Android App Bundle instead of APK:

```bash
cd android
./gradlew bundleRelease
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

3. Upload AAB to Google Play (generates optimized APKs per device)

### Improve Load Time

- Web assets are already optimized via Vite
- localStorage operations are instant (offline-first)
- No network calls = instant app performance

## Testing Checklist

Before releasing, test:

- ✅ App launches without errors
- ✅ Add study session works
- ✅ XP and level update correctly
- ✅ Streak logic is accurate
- ✅ Goals track weekly progress
- ✅ Achievements unlock properly
- ✅ CSV export/import functions
- ✅ Theme toggle persists
- ✅ Data persists after closing app
- ✅ App works completely offline
- ✅ Back button behavior is correct
- ✅ Status bar colors match theme

## Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/studio)
- [iOS Developer Guide](https://developer.apple.com/xcode/)

---

**Need help?** Check the main README.md for web development instructions or open an issue on GitHub.
