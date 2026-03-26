# Sarthi Wellness Platform

Sarthi is a full-stack wellness platform that blends guided self-care, activity tracking, and spiritual reflection into a single experience. The app helps users explore the three core wellness pillars of mind, body, and soul through personalized recommendations, daily shlok content, and a progress-driven dashboard.

## Highlights

- Personalized wellness plans for body and mind generated through AI workflows
- Daily shlok flow with meaning, story, and life lesson content
- Secure authentication, profile management, and protected user routes
- Activity logging with streaks, points, and progress summaries
- Admin dashboard for user, activity, and leaderboard monitoring

## Tech Stack

- Frontend: React 19, Vite, Redux Toolkit, Tailwind CSS, Axios, Recharts
- Backend: Node.js, Express 5, MongoDB, Mongoose, JWT, Cookie-based auth
- AI services: Gemini API for shlok and wellness generation

## Repository Structure

```text
.
|-- backend/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- .env.example
|   |-- package.json
|   `-- server.js
|-- docs/
|   `-- archive/         # local-only ignored design/reference files
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- config/
|   |   |-- hooks/
|   |   `-- redux/
|   |-- .env.example
|   `-- package.json
|-- .gitignore
`-- README.md
```

## Getting Started

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure environment variables

Create these files before starting the app:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`

Backend variables:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/sarthi
JWT_SECRET=replace-with-a-secure-secret
GEMINI_API_KEY=replace-with-your-gemini-key
NODE_ENV=development
```

Frontend variables:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Run the application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a new terminal:

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Core Modules

- `frontend/src/components/home`: landing page and marketing sections
- `frontend/src/components/dashboard`: user profile and wellness onboarding
- `frontend/src/components/mind`, `body`, `soul`: daily wellness experiences
- `frontend/src/components/activity`: progress, streaks, and activity history
- `frontend/src/components/admin`: admin analytics, user management, and leaderboard views
- `backend/routes`: route groups for auth, activity, wellness, soul, and admin APIs

## Notes for GitHub

- Root-level structure is flattened for easier cloning and review
- Environment secrets are excluded and sample files are included instead
- API URLs and CORS origin are now environment-driven for safer local/deployment setup
