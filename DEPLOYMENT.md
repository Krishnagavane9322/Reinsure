# Deployment Guide - Reinsure Insurance Platform

This guide will walk you through deploying the Reinsure platform to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Render account (free tier available)
- MongoDB Atlas database
- Gmail account with App Password

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not already done)

```bash
cd "f:\My Projects\reinsure"
git init
git add .
git commit -m "Initial commit - Reinsure Insurance Platform"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `reinsure`
3. Don't initialize with README (we already have one)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/reinsure.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your `reinsure` repository
5. Configure the service:
   - **Name**: `reinsure-backend`
   - **Region**: Choose closest to your users (e.g., Singapore)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.2 Add Environment Variables

In the Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
CORS_ORIGIN=https://your-frontend-url.vercel.app
COMPANY_EMAIL=your-company-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=Reinsure <your-email@gmail.com>
```

**Important Notes:**

- You'll update `CORS_ORIGIN` after deploying the frontend
- Get MongoDB URI from MongoDB Atlas dashboard
- Get Gmail App Password from [Google Account Security](https://myaccount.google.com/apppasswords)

### 2.3 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Note your backend URL: `https://reinsure-backend.onrender.com`

### 2.4 Seed the Database

After deployment, you need to seed the database once:

1. In Render dashboard, go to your service
2. Click **"Shell"** tab
3. Run: `npm run seed`
4. Verify success message

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `apex-insure`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### 3.2 Add Environment Variable

Add this environment variable:

```
VITE_API_URL=https://reinsure-backend.onrender.com/api
```

Replace with your actual Render backend URL from Step 2.3.

### 3.3 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Note your frontend URL: `https://your-app.vercel.app`

## Step 4: Update CORS Configuration

Now that you have your frontend URL, update the backend:

1. Go back to Render dashboard
2. Open your backend service
3. Go to **"Environment"** tab
4. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
5. Save changes (this will trigger a redeploy)

## Step 5: Verify Deployment

### 5.1 Test Backend

Visit: `https://reinsure-backend.onrender.com/api/health`

Should return:

```json
{
  "status": "OK",
  "timestamp": "..."
}
```

### 5.2 Test Frontend

1. Visit your Vercel URL
2. Navigate through the site
3. Check that services load correctly
4. Verify testimonials and FAQs display

### 5.3 Test Quote Submission

1. Click on any insurance service
2. Fill out the quote form
3. Submit the form
4. Verify:
   - Success message appears
   - Email received at your company email
   - Quote saved in MongoDB (check MongoDB Atlas)

## Troubleshooting

### Backend Issues

**Problem**: 500 errors or service not starting

- Check Render logs: Dashboard → Service → Logs
- Verify all environment variables are set correctly
- Ensure MongoDB URI is correct and database is accessible

**Problem**: CORS errors

- Verify `CORS_ORIGIN` matches your Vercel URL exactly
- Include `https://` protocol
- No trailing slash

### Frontend Issues

**Problem**: API calls failing

- Check `VITE_API_URL` environment variable
- Verify backend is running (visit health endpoint)
- Check browser console for errors

**Problem**: Build failures

- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors

### Email Issues

**Problem**: Emails not sending

- Verify Gmail App Password is correct (16 characters, no spaces)
- Check Render logs for email errors
- Ensure 2-Step Verification is enabled on Gmail
- Try regenerating App Password

## Post-Deployment

### Custom Domain (Optional)

**Vercel:**

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Render:**

1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records

### Monitoring

**Render:**

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid plan for always-on service

**Vercel:**

- Free tier includes analytics
- Monitor deployment status and performance

### Database Backups

**MongoDB Atlas:**

1. Go to your cluster
2. Enable automated backups
3. Configure backup schedule

## Environment Variables Reference

### Backend (Render)

| Variable        | Description            | Example                     |
| --------------- | ---------------------- | --------------------------- |
| `NODE_ENV`      | Environment            | `production`                |
| `PORT`          | Server port            | `5000`                      |
| `MONGODB_URI`   | Database connection    | `mongodb+srv://...`         |
| `CORS_ORIGIN`   | Frontend URL           | `https://app.vercel.app`    |
| `COMPANY_EMAIL` | Notification recipient | `info@company.com`          |
| `SMTP_HOST`     | Email server           | `smtp.gmail.com`            |
| `SMTP_PORT`     | Email port             | `587`                       |
| `SMTP_USER`     | Email username         | `your@gmail.com`            |
| `SMTP_PASS`     | Email password         | `abcd efgh ijkl mnop`       |
| `SMTP_FROM`     | From address           | `Reinsure <your@gmail.com>` |

### Frontend (Vercel)

| Variable       | Description     | Example                            |
| -------------- | --------------- | ---------------------------------- |
| `VITE_API_URL` | Backend API URL | `https://backend.onrender.com/api` |

## Support

If you encounter issues:

1. Check service logs (Render/Vercel dashboards)
2. Verify environment variables
3. Test locally first
4. Check MongoDB Atlas connectivity

## Next Steps

- Set up custom domains
- Configure monitoring and alerts
- Enable database backups
- Consider upgrading to paid tiers for better performance
