# 📊 Study Behavior Analytics System

> Transform raw study activity into behavioral insights — because what gets measured, gets improved.

A data-driven, gamified study tracking app that analyzes learning patterns and drives consistency through analytics, achievements, and real-time feedback.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-brightgreen)](https://studybehavioranalyticssystem.netlify.app)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)](https://react.dev)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://studybehavioranalyticssystem.netlify.app)

---

## 🧠 What Is This?

Most study apps just track time. This one analyzes *behavior*.

Users log study sessions and the system computes consistency scores, subject dominance patterns, streak data, and XP progression — turning raw activity into actionable insights. A rule-based achievement engine reinforces positive habits through gamification.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📝 **Session Logging** | Log subject, duration, and date with persistent localStorage |
| 📈 **Behavioral Analytics** | Consistency score, study frequency, subject distribution, most active day |
| 🏆 **Achievement Engine** | Rule-based unlocking across XP, streaks, session count, long sessions, subject specialization |
| ⚡ **Gamification Layer** | XP progression, level system, streak tracking, progress visualization |
| 📊 **Data Visualization** | Bar charts (subject vs time), line charts (progress over time), real-time dashboard |
| 🐍 **Python Extension** | Offline deeper analysis via `analytics_dashboard.py` using Pandas |

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/e5e693b5-bd0b-4c2a-aa8a-b0bd18b10c20" width="300"/>
  <img src="assets/SmartSelect_20251208-212910_Study Buddy.jpg" width="300"/>
</p>
<p align="center">
  <img src="assets/SmartSelect_20251208-212845_Study Buddy.jpg" width="300"/>
  <img src="assets/SmartSelect_20251208-212859_Study Buddy.jpg" width="300"/>
</p>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + TypeScript |
| Visualization | Recharts |
| State Management | Custom React Hooks |
| Storage | localStorage (offline-first) |
| Styling | Tailwind CSS |
| Deployment | Netlify |
| Analytics Extension | Python + Pandas |

---

## ⚙️ How It Works

```
User logs session → Stored in localStorage → Metrics computed dynamically
→ Achievement conditions evaluated → Insights rendered via charts & summaries
```

**Example insights generated:**
- Study consistency percentage over time
- Subject dominance patterns
- Daily activity trends
- Performance growth curve

---

## 📂 Project Structure

```
src/
├── components/       # UI components
├── hooks/            # Core logic (sessions, stats, achievements)
├── pages/            # Main views
├── utils/            # Helper functions
└── types/            # TypeScript type definitions
```

---

## 🔮 Future Improvements

- Timestamp-based analysis (hour-level insights)
- Cloud sync via Supabase
- Predictive analytics and study recommendations
- Multi-user support

---

## 🧩 Key Takeaways

- Designed a modular achievement engine with dynamic multi-condition rule evaluation
- Implemented behavioral analytics pipeline on real-time session data
- Combined data insights with gamification loops to reinforce consistent study habits

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

*Built by [K Vara Prasad](https://github.com/prasadk1628)*
