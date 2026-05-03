# 🧠 Smart Wellness Monitor

A full-stack mental health tracking and analysis system that evaluates user mood through an adaptive questionnaire and provides intelligent insights, trends, and predictions.

---

## 🚀 Features

### 1. Adaptive Questionnaire System
- Dynamic question flow based on user responses  
- Conditional branching (positive / negative emotional paths)  
- Includes behavioral inputs:
  - Routine  
  - Sleep  
  - Stress  
  - Social interaction  

---

### 2. Intelligent Mood Scoring
- Multi-factor scoring based on:
  - Emotion  
  - Stress  
  - Sleep  
  - Productivity  
  - Social connection  
- Weighted scoring system for improved accuracy  

---

### 3. Self-Learning Algorithm
- User-specific learning profile  
- Dynamically adjusts category weights over time  
- Uses moving average baseline for personalization  

---

### 4. Insights & Suggestions Engine
- Detects emotional patterns  
- Generates:
  - ⚠️ Insights (problem areas)  
  - 💡 Actionable suggestions (5–7 recommendations)  

---

### 5. Mood History & Trend Analysis
- Stores user mood entries in MongoDB  
- Displays:
  - Mood trends (Improving / Declining / Stable)  
- Data visualization using Chart.js  

---

### 6. Mood Prediction System
- Predicts future mood based on recent entries  
- Uses moving average logic for short-term forecasting  

---

### 7. Authentication & Security
- JWT-based authentication  
- Protected API routes  
- Token-based session handling  

---

### 8. UI/UX Features
- Clean and responsive UI (Vanilla CSS)  
- Progress indicators and smooth transitions  
- Emoji-based emotional feedback system  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- CSS (Custom Styling)  
- Chart.js  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Local)  

### Authentication
- JSON Web Tokens (JWT)  

---

## 📊 System Workflow

1. User logs in / registers  
2. Completes adaptive questionnaire  
3. Backend processes responses using weighted algorithm  
4. System returns:
   - Mood  
   - Score  
   - Insights  
   - Suggestions  
5. Data is stored in MongoDB  
6. History page displays trends and predictions  

---

## 📁 Project Structure
Smart-Wellness-Monitor/
│
├── client/ # React Frontend
├── server/ # Node + Express Backend
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/smart-wellness-monitor.git
cd smart-wellness-monitor

** ### 2. Backend Setup**
cd server
npm install
npm run dev

** ### 3. Frontend Setup**
cd client
npm install
npm run dev

**## 📬 Contact Me**

I'm open to connecting, collaborating, or discussing this project.

- **Name:** Shubham Jha  
- **Email:** [dm.shubhamjha@gmail.com](mailto:dm.shubhamjha@gmail.com)  
- **GitHub:** [shubhamjha65](https://github.com/shubhamjha65)  
- **LinkedIn:** [Shubham Jha](https://www.linkedin.com/in/shubham-jha-74b590258)

Feel free to reach out via email or connect on GitHub/LinkedIn.
