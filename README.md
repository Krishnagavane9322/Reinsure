# Reinsure Insurance Platform

A modern insurance platform offering Commercial Vehicle Insurance, Two Wheeler Insurance, Long Term Two Wheeler Insurance, and Health Insurance with flexible EMI options.

## 🚀 Tech Stack

**Frontend:** React + TypeScript + Vite + Tailwind CSS + Shadcn/ui  
**Backend:** Node.js + Express + TypeScript + MongoDB + Nodemailer  
**Deployment:** Vercel (Frontend) + Render (Backend)

## Project Structure

```
reinsure/
├── apex-insure/          # React frontend
└── backend/              # Node.js/Express backend
```

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Gmail account (for email notifications)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env      # Configure environment variables
npm run seed              # Populate database
npm run dev               # Start on port 5000
```

### 2. Frontend Setup

```bash
cd apex-insure
npm install
cp .env.example .env      # Configure API URL
npm run dev               # Start on port 8080
```

### 3. Access Application

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api

## 🌟 Features

- 🏢 Insurance service catalog (Vehicle, Health, Long-term plans)
- 📝 Quote request system with EMI options
- 📧 **Email notifications** for quote submissions
- ⭐ Customer testimonials
- ❓ Comprehensive FAQ section
- 📱 Fully responsive design

## 🚀 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Create new Web Service from your GitHub repo
4. Select `backend` directory
5. Add environment variables (see `.env.example`)
6. Deploy!

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import GitHub repository
4. Set root directory to `apex-insure`
5. Add `VITE_API_URL` environment variable
6. Deploy!

## 📧 Email Configuration

See [backend/EMAIL_SETUP.md](backend/EMAIL_SETUP.md) for Gmail SMTP setup instructions.

## 📝 Environment Variables

**Backend (.env):**

```
MONGODB_URI=              # MongoDB connection string
CORS_ORIGIN=              # Frontend URL
COMPANY_EMAIL=            # Email to receive quote notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=                # Gmail address
SMTP_PASS=                # Gmail app password
SMTP_FROM=                # From email address
```

**Frontend (.env):**

```
VITE_API_URL=             # Backend API URL
```

## 📄 License

ISC
