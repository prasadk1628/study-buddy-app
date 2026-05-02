# Study Behavior Analytics System 📊

A data-driven, gamified study tracking application that analyzes user learning patterns and improves consistency through behavioral insights and achievements.

---

## Overview

This application allows users to log study sessions and transforms raw activity data into meaningful insights. It combines analytics with gamification to encourage consistent learning behavior.

---

## 🧠 Key Features

- **Study Session Tracking**
  - Log subject, duration, and date
  - Persistent data storage using localStorage

- **Behavioral Analytics**
  - Total study time
  - Average session duration
  - Study frequency and trends
  - Consistency score
  - Subject-wise time distribution
  - Most active study day

- **Achievement System**
  - Rule-based unlocking system
  - Supports multiple conditions:
    - XP milestones
    - streak tracking
    - total study time
    - session count
    - consistency score
    - long-session detection
    - subject specialization
  - Real-time progress tracking

- **Gamification Layer**
  - XP-based level progression
  - Streak tracking
  - Achievement rewards
  - Progress visualization

- **Data Visualization**
  - Bar charts (subject vs time)
  - Line charts (progress over time)
  - Real-time insights dashboard

---

## Tech Stack

- **Frontend:** React, TypeScript  
- **Visualization:** Recharts  
- **State Management:** Custom React Hooks  
- **Storage:** localStorage  
- **Styling:** Tailwind CSS  

---

## Project Structure
src/
├── components/ # UI components
├── hooks/ # core logic (sessions, stats, achievements)
├── pages/ # main views
├── utils/ # helper functions
├── types/ # TypeScript types


---

## How It Works

1. User logs study sessions  
2. Data is stored locally  
3. Metrics are computed dynamically  
4. Achievement conditions are evaluated  
5. Insights are displayed through charts and summaries  

---



## Example Insights

- Study consistency percentage  
- Subject dominance patterns  
- Daily activity trends  
- Performance growth over time  

---

## Analytics Extension (Python)

The project includes a Python script for deeper analysis:

analytics_dashboard.py

Used for:
- Data aggregation using pandas  
- Additional offline analysis  
- Extending insights beyond frontend  

---

## Live Demo

Deployed using netlify.app
👉 studybehavioranalyticssystem.netlify.app

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/e5e693b5-bd0b-4c2a-aa8a-b0bd18b10c20" width="300"/>
  <img src="![alt text](image.png)"width = "300"/>
</p>

<p align="center">
  <img src="assests/SmartSelect_20251208-212845_Study Buddy.jpg" width="300"/>
  <img src="assests/SmartSelect_20251208-212859_Study Buddy.jpg" width="300"/>
</p>



## Future Improvements

- Timestamp-based analysis (hour-level insights)  
- Cloud database integration (Supabase)  
- Predictive analytics and recommendations  
- Multi-user support  

---

## Key Takeaways

- Designed a modular achievement engine with dynamic rule evaluation  
- Implemented behavioral analytics using real-time data  
- Combined data insights with gamification to improve engagement  

---

## Author

Prasad