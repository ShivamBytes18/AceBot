<div align="center">

#  🤖 AceBot

### AI-Powered Interview Preparation Platform

**Upload a resume → Get role-specific questions → Practice with an AI interviewer → Get scored → Get better.**

A full-stack, credit-based SaaS product built end-to-end: authentication, payments, AI interview generation, voice interaction, analytics, and PDF reporting — not a CRUD demo.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-Server-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white)](https://razorpay.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT--4o--mini-6C5CE7)](https://openrouter.ai)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://render.com)

[**🚀 Live App**](https://acebot-client.onrender.com/) · [**⚙️ Backend API**](https://acebot-oc5a.onrender.com) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

<br>

## 📖 About

AceBot is a Full-Stack AI Interview preparation platform that turns a candidate's actual resume into a personalized mock interview. Instead of recycling a generic question bank, it parses the resume's role, skills, experience, and projects, then generates technical and HR questions tailored to that specific profile — and scores the answers with concrete, actionable feedback instead of a pass/fail grade.

It's architected as a real SaaS product: Google authentication, a credit-based payment system via Razorpay, AI integration through OpenRouter, voice-based interaction, analytics dashboards, downloadable reports, and a deployed production environment.

<br>

## ✨ Features

| | Feature | Description |
|---|---|---|
| 📄 | **Resume parsing** | Upload a PDF resume; AceBot extracts role, skills, experience, and project history automatically. |
| 🤖 | **AI question generation** | Technical and HR questions generated specifically from the parsed resume, not a static bank. |
| 🗣️ | **AI voice interviewer** | Human-like interview experience with speech synthesis and an animated avatar. |
| 🎤 | **Voice-based answering** | Respond out loud during the interview, in addition to typed answers. |
| ⌨️ | **Manual answer support** | Type answers directly when voice isn't preferred. |
| 🧠 | **AI answer evaluation** | Every response is graded by the model against the question's intent. |
| ⭐ | **Question-wise scoring** | Each answer scored out of 10 with strengths, gaps, and improvement suggestions. |
| 📊 | **Analytics dashboard** | Visual breakdown of performance across sessions using Recharts. |
| 📑 | **Interview history** | Every past session stored and reviewable. |
| 📥 | **Downloadable PDF reports** | Export a full interview report — questions, answers, scores, feedback — as a PDF. |
| 🔐 | **Google sign-in** | Firebase Authentication handles login and session management. |
| 🛡️ | **Protected routes** | JWT and cookie-based session validation on the backend. |
| 💳 | **Razorpay payments** | Real payment gateway integration for topping up credits. |
| 🪙 | **Credit-based SaaS model** | Interviews consume credits, giving the product a genuine monetization loop. |
| 👤 | **Profile & credit management** | Users can view and manage their balance and account. |
| 📱 | **Responsive UI** | Built with Tailwind CSS and Framer Motion across screen sizes. |

<br>

## 🏗️ System Architecture

```
                          ┌──────────────────────────┐
                          │      React Frontend       │
                          │  (Redux · Tailwind · FM)  │
                          └─────────────┬─────────────┘
                                        │ Axios / REST
                                        ▼
                          ┌──────────────────────────┐
                          │   Express.js API Server   │
                          │  (Auth · Routes · Logic)  │
                          └──┬───────┬────────┬───────┘
                             │       │        │
              ┌──────────────┘       │        └──────────────┐
              ▼                      ▼                       ▼
     ┌─────────────────┐   ┌──────────────────┐   ┌────────────────────┐
     │    Firebase      │   │     MongoDB       │   │     Razorpay        │
     │ (Google Auth)    │   │  (Mongoose ODM)   │   │ (Credit Payments)   │
     └─────────────────┘   └──────────────────┘   └────────────────────┘
                                        │
                                        ▼
                          ┌──────────────────────────┐
                          │    OpenRouter (GPT-4o-mini)│
                          │  Resume parsing            │
                          │  Question generation       │
                          │  Answer scoring & feedback  │
                          └──────────────────────────┘
```

**Interview flow:**

```
Resume (PDF)
     │
     ▼
Resume Parser ───────────────►  role · skills · experience · projects
     │
     ▼
OpenRouter (GPT-4o-mini)
     │
     ├─► Technical question generation
     └─► HR question generation
     │
     ▼
Candidate answers (voice or text)
     │
     ▼
OpenRouter (GPT-4o-mini)
     │
     ├─► Score out of 10 per question
     ├─► Strengths & gaps
     └─► Improvement suggestions
     │
     ▼
Analytics Dashboard ──► PDF Report Export
```

The same model handles three distinct jobs — reading the resume, writing the questions, and grading the answers — each invoked separately so every prompt stays narrowly scoped and accurate.

<br>

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (v19), Redux, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Firebase (Google Sign-In), JWT, Cookies |
| **AI** | OpenRouter API — GPT-4o-mini |
| **Voice** | Speech synthesis for AI interviewer, voice input for answers |
| **Analytics** | Recharts |
| **Payments** | Razorpay |
| **PDF Generation** | Downloadable interview report export |
| **Deployment** | Render (Frontend + Backend) |

<br>

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend** | [https://acebot-client.onrender.com/](https://acebot-client.onrender.com/) |
| **Backend API** | [https://acebot-oc5a.onrender.com](https://acebot-oc5a.onrender.com) |

> ⚠️ Hosted on Render's free tier — the backend may take 30–60 seconds to spin up after inactivity.

<br>

## 📂 Project Structure

```
AceBot/
├── client/
│   └── src/
│       ├── assets/          # Images, icons, static media
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level views
│       ├── redux/           # State management
│       ├── utils/           # Helper functions
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── config/              # DB, Firebase, Razorpay config
│   ├── controllers/         # Route logic
│   ├── middlewares/         # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── services/            # OpenRouter / AI logic
│   └── index.js
└── README.md
```

<br>

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/google` | Google sign-in via Firebase |
| `POST` | `/api/resume/upload` | Upload and parse a resume PDF |
| `POST` | `/api/interview/generate` | Generate technical/HR questions from parsed resume |
| `POST` | `/api/interview/submit` | Submit an answer for AI evaluation |
| `GET` | `/api/interview/history` | Fetch past interview sessions |
| `GET` | `/api/interview/:id/report` | Download a session's PDF report |
| `POST` | `/api/payment/create-order` | Create a Razorpay order for credit top-up |
| `POST` | `/api/payment/verify` | Verify payment and credit the user's account |
| `GET` | `/api/user/profile` | Fetch user profile and credit balance |

> Exact route names may vary slightly — check `server/routes/` for the current set.

<br>

## ⚠️ Known Limitations

- Voice interview functionality relies on the browser's Web Speech API, so support varies by browser.
- Recommended browsers: Chrome, Edge (Chromium-based).
- Safari (macOS/iOS) has limited or inconsistent support for speech recognition and text-to-speech.

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Firebase project (Google Auth enabled)
- Razorpay account (test or live keys)
- OpenRouter API key

### Clone the repo

```bash
git clone https://github.com/ShivamBytes18/AceBot.git
cd AceBot
```

### Frontend setup

```bash
cd client
npm install
npm run dev
```

### Backend setup

```bash
cd server
npm install
npm run dev
```

### Environment variables

Create a `.env` file inside `server/`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id

# AI
OPENROUTER_API_KEY=your_openrouter_api_key

# Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

Create a `.env` file inside `client/` for frontend-facing keys (Firebase config, API base URL, etc.) as required by your setup.

<br>

## ☁️ Deployment

Both frontend and backend are deployed on **Render**:

- **Frontend** — deployed as a static/web service serving the React build
- **Backend** — deployed as a Node web service connected to MongoDB Atlas
- Environment variables configured directly in the Render dashboard for each service
- CORS configured on the backend to accept requests from the deployed frontend origin

<br>

## 📸 Screenshots

> Add screenshots or GIFs of the dashboard, interview screen, and report export here for maximum impact.

| Landing Page | Interview Screen | Analytics Dashboard |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |

<br>

## 🔮 Future Enhancements

- [ ] Real-time speech evaluation during voice interviews
- [ ] Full interview session recording and playback
- [ ] ATS resume scoring
- [ ] AI-generated personalized career roadmaps
- [ ] Subscription plans alongside the credit system
- [ ] Multi-language interview support
- [ ] Peer/mentor review mode

<br>

## 👨‍💻 Author

**Shivam Upadhyay**

[GitHub](https://github.com/ShivamBytes18) · [LinkedIn](https://www.linkedin.com/in/shivam-upadhyay-0811182aa) · [LeetCode](https://leetcode.com/u/_Shivam18/)

<br>

## ⭐ Support the Project

If AceBot was useful or interesting, consider starring the repo — it helps the project reach more people.

<div align="center">

Made with ❤️ and a lot of debugging by **Shivam Upadhyay**

</div>