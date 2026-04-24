# SAMANVAYA Health Connect

A full-stack healthcare application with React.js (Tailwind CSS, Recharts) and Node.js/Express.js (MongoDB).

## Project Setup

### 1. Database Setup (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string (`MONGO_URI`).
3. Add it to `backend/.env`

### 2. Run Backend Locally
```bash
cd backend
npm install
npm run dev # Starts server on http://localhost:5000 (Make sure nodemon is installed)
```
*(Make sure you have `PORT`, `MONGO_URI`, and `JWT_SECRET` in `backend/.env`)*

### 3. Run Frontend Locally
```bash
cd frontend
npm install
npm run dev # Starts Vite dev server
```

## Features
- **Role-Based Auth**: Users, Volunteers, and Admins.
- **Health Tracking**: Users log steps, calories, heart rate. Dashboard visualizations via Recharts.
- **Community Requests**: Users can post emergency/help requests.
- **Volunteer Action**: Volunteers/Admins can accept/resolve requests.
- **Background Cron**: Generates realistic sample health data every 15 minutes for users.

## Deployment Guide

### A. Database (MongoDB Atlas)
Already cloud-hosted if using Atlas. Ensure you allow network access (0.0.0.0/0) so Render can reach it.

### B. Backend (Render)
1. Push this code to a GitHub repository.
2. Sign in to [Render](https://render.com) and click **New > Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. In Environment Variables, add:
   - `MONGO_URI`
   - `JWT_SECRET`
8. Deploy! Note the Render URL (e.g., `https://samanvaya-api.onrender.com`).

### C. Frontend (Vercel)
1. In `frontend/src/services/api.js`, change `baseURL` from `http://localhost:5000` to your new Render Backend URL.
2. Push your code.
3. Sign in to [Vercel](https://vercel.com) and click **Add New > Project**.
4. Import your GitHub repository.
5. Set Root Directory to `frontend`.
6. Framework Preset should auto-detect as `Vite`.
7. Click **Deploy**.

Your application is now fully deployed!
