# Study Behavior Analytics System 📊

A data-driven study tracking system that analyzes student learning patterns using session data, productivity trends, and consistency metrics.

---

## 🚨 Problem

Most students track study time, but they don’t understand:

* When they are most productive
* Which subjects consume the most effort
* How consistency (streaks) impacts performance

Without insights, tracking alone has **low value**.

---

## ✅ Solution

This system collects structured study session data and transforms it into meaningful metrics such as:

* Productivity trends over time
* Subject-wise effort distribution
* Consistency patterns (streak analysis)
* Goal tracking vs actual performance

The application combines **data collection + behavioral analytics + gamification** to improve learning efficiency.

---

## 🧠 Key Insights (Derived from Study Data)

* Evening hours (6–10 PM) show peak study activity
* Subjects like Mathematics require significantly more time than others
* Users maintaining streaks >5 days demonstrate higher total study time
* Study activity drops noticeably after weekends

👉 These insights help students **optimize study schedules and improve consistency**

---

## 📊 Features

### 📈 Data Tracking

* Logs study sessions (subject, duration, date)
* Tracks total study time and XP

### 🔥 Behavioral Analytics

* Daily streak calculation
* Weekly goal tracking
* Performance trends

### 🎮 Gamification Layer

* XP system (1 XP per minute)
* Level progression (1000 XP per level)
* Achievement system (8 milestones)

### 💾 Data Management

* Offline-first storage using localStorage
* CSV import/export for data portability

### 📱 Cross-Platform

* Web app (React + Vite)
* Mobile-ready via Capacitor (Android/iOS)

---

## 📊 Data Model

### Study Session

```ts
{
  subject: string;
  duration: number;   // minutes
  date: string;
  xpEarned: number;
}
```

### User Metrics

```ts
{
  totalXP: number;
  level: number;
  totalStudyTime: number;
  streak: number;
}
```

---

## 📈 Analytics Opportunities (Future Enhancements)

* Subject difficulty analysis
* Productivity heatmaps (time-of-day trends)
* Weekly performance comparison
* Consistency scoring system
* Predictive study recommendations

---

## 🖼️ Dashboard Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/e5e693b5-bd0b-4c2a-aa8a-b0bd18b10c20" width="300"/>
  <img src="SmartSelect_20251208-212809_Study Buddy.jpg" width="300"/>
</p>

<p align="center">
  <img src="SmartSelect_20251208-212845_Study Buddy.jpg>" width="300"/>
  <img src="SmartSelect_20251208-212859_Study Buddy.jpg" width="300"/>
</p>

<p align="center">
  <img src="SmartSelect_20251208-212910_Study Buddy.jpg" width="300"/>
 
</p>

Suggested visuals:

* Study time by subject (bar chart)
* XP growth over time (line chart)
* Weekly progress vs goal
* Streak trend

---

## ⚙️ Tech Stack

* React 18 + TypeScript
* Tailwind CSS
* Capacitor (mobile support)
* localStorage (offline persistence)
* Vite

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 🎯 Why This Project Matters

This project goes beyond a simple tracking app by introducing:

* **Data-driven decision making**
* **Behavioral pattern analysis**
* **User productivity insights**

It demonstrates the ability to:

✔ Collect structured data
✔ Transform it into meaningful metrics
✔ Derive actionable insights

---

## 📌 Future Scope

* Streamlit / Power BI analytics dashboard
* Cloud database integration
* Multi-user analytics
* AI-based study recommendations

---

## 📬 Contact

* GitHub: https://github.com/prasadk1628
* https://www.linkedin.com/in/vara-prasad-k-4a6026230/
