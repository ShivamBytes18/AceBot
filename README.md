<div align="center">

# AceBot

### AI-powered interview preparation, built as a real SaaS product

Upload a resume. Get role-specific questions. Practice technical and HR rounds with an AI interviewer. Get scored, get feedback, get better.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white)](https://razorpay.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT--4o--mini-6C5CE7)](https://openrouter.ai)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

<br>

## About

AceBot is a full-stack interview preparation platform that turns a candidate's resume into a personalized mock interview. Instead of generic question banks, it parses the actual resume content — role, skills, experience, projects — and generates technical and HR questions tailored to that candidate, then scores their answers and tells them exactly what to improve.

It's built end-to-end as a credit-based SaaS application: authentication, payments, AI integration, and deployment, not just a CRUD demo.

<br>

## Features

**Resume-aware question generation** — Upload a PDF resume. AceBot extracts role, skills, experience, and project history, then generates questions specific to that profile rather than a static bank.

**Two interview modes** — Technical rounds and HR rounds, each with a different question style and evaluation focus.

**AI scoring and feedback** — Every answer is scored out of 10, with strengths, gaps, and concrete improvement suggestions rather than a pass/fail grade.

**Credit-based access** — Interviews consume credits. Users top up via Razorpay, so the product has a real monetization loop rather than unlimited free usage.

**Google sign-in** — Firebase Authentication handles login and session management.

**Performance dashboard** — Past sessions, scores, and trends in one place.

<br>

## How it works

```
Resume (PDF)
     │
     ▼
Resume parser  ──────────────►  role · skills · experience · projects
     │
     ▼
OpenRouter (GPT-4o-mini)
     │
     ├─► Question generation (technical / HR)
     │
     ▼
Candidate answers
     │
     ▼
OpenRouter (GPT-4o-mini)
     │
     ├─► Score out of 10
     ├─► Strengths & gaps
     └─► Improvement suggestions
     │
     ▼
Dashboard
```

The same model handles three distinct jobs — reading the resume, writing the questions, and grading the answers — each called separately so the prompt for each step stays focused.

<br>

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux, Tailwind CSS, Framer Motion, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Firebase (Google sign-in) |
| AI | OpenRouter API — GPT-4o-mini |
| Payments | Razorpay |
| Deployment | Render |

<br>

## Project structure

```
AceBot/
├── client/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.js
└── README.md
```

<br>

## Running locally

**Clone the repo**
```bash
git clone https://github.com/ShivamBytes18/AceBot.git
cd AceBot
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

**Backend**
```bash
cd server
npm install
npm run dev
```

**Environment variables** — create a `.env` in `server/`:
```env
PORT=8000
MONGODB_URI=
OPENROUTER_API_KEY=
FIREBASE_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
```

<br>

## Roadmap

- [ ] Voice-based interviews with real-time speech evaluation
- [ ] Interview session recording
- [ ] ATS resume scoring
- [ ] AI-generated career roadmaps
- [ ] Subscription plans alongside credits
- [ ] Multi-language support

<br>

## Author

**Shivam Upadhyay**

[GitHub](https://github.com/ShivamBytes18) · [LinkedIn](https://www.linkedin.com/in/shivam-upadhyay-0811182aa) · [LeetCode](https://leetcode.com/u/_Shivam18/)

<br>

<div align="center">

If this was useful, a star on the repo helps it reach more people.

</div>
