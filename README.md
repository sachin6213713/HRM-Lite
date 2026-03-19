# HRMS Lite (Human Resource Management System)

A lightweight, production-ready HRMS web application for managing employee records and tracking daily attendance.

## 🚀 Features

- **Dashboard**: Quick stats on total employees and today's attendance summary.
- **Employee Management**: Add, view (with search), and delete employee records.
- **Attendance Management**: Mark daily attendance (Present/Absent) and view per-employee history.
- **Responsive Design**: Clean and professional UI that works on all devices.
- **Robust Backend**: RESTful API with MongoDB for persistent storage.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, Lucide React, React Router.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **Icons**: Lucide React for consistent and modern iconography.

## 📦 Project Structure

```text
/backend
  /controllers - Business logic for APIs
  /models      - Mongoose schemas
  /routes      - API route definitions
  server.js    - Entry point
/frontend
  /src
    /components - Reusable UI elements
    /pages      - Main application views
    /services   - API communication logic
    App.jsx     - Routing
    main.jsx    - Entry point
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file (copied from `.env.example` or use defaults in `server.js`).
4. Start the server: `npm run dev`.

### Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Start the Vite dev server: `npm run dev`.
4. Open `http://localhost:5173` in your browser.

## 📝 Assumptions & Limitations

- **No Authentication**: The system is designed for a single admin user and does not currently include login functionality.
- **Single Status**: Attendance is marked as either 'Present' or 'Absent'.
- **Local Development**: Default connection strings are set for local development (`localhost:5000` for API and `localhost:27017` for DB).

## 🚀 Deployment

- **Frontend**: Deploy to Vercel/Netlify. Ensure `VITE_API_URL` environment variable is set.
- **Backend**: Deploy to Render/Railway. Ensure `MONGODB_URI` and `PORT` are set.
