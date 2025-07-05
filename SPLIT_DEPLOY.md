# ViMedical - Split Deployment Guide

## 🚀 Deployed Apps

### Frontend (Vercel)
- URL: `https://vinnan4.vercel.app`
- Repository: `Ne4nf/ViNNan_app`
- Root Directory: `frontend`
- Framework: Create React App

### Backend (Railway)
- URL: `https://[your-railway-url].railway.app`
- Repository: `Ne4nf/ViNNan_app`
- Root Directory: `backend`
- Framework: FastAPI

## 📋 Deployment Steps

### 1. Deploy Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: `Ne4nf/ViNNan_app`
5. Root Directory: `backend`
6. Environment Variables:
   ```
   OPENROUTER_API_KEY=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
   QDRANT_URL=https://9ec27c7f-0e81-4803-b508-ab20ac7998be.us-east4-0.gcp.cloud.qdrant.io:6333
   QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.A4srYOH99pXp3rfwX-Sd8fPXvdO4IL1L9c80TmzAAbQ
   ```
7. Click "Deploy"
8. Copy the Railway URL after deployment

### 2. Deploy Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project" → Import from GitHub
4. Select: `Ne4nf/ViNNan_app`
5. Configure:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Environment Variables:
   ```
   REACT_APP_API_URL=https://[your-railway-url].railway.app/api/v1
   ```
7. Click "Deploy"

## 🔧 Configuration Files

### Backend Railway Config
- `backend/railway.json`: Railway deployment config
- `backend/Procfile`: Process file for Railway
- `backend/requirements.txt`: Python dependencies

### Frontend Vercel Config
- `frontend/package.json`: Node.js dependencies
- `frontend/.env.example`: Environment variables template

## 🌐 URLs Structure

After deployment:
- **Frontend**: `https://vinnan4.vercel.app`
- **Backend API**: `https://[your-railway-url].railway.app/api/v1`
- **Health Check**: `https://[your-railway-url].railway.app/health`

## 📝 Post-Deployment

1. Test frontend loads correctly
2. Test backend API responds at `/health`
3. Test chat functionality works
4. Test dark/light theme
5. Test mobile responsiveness

## 🆓 Free Tier Limits

### Railway Free Tier:
- ✅ 512MB RAM
- ✅ 1GB disk space
- ✅ $5/month usage credit
- ⚠️ Sleeps after 30 minutes of inactivity

### Vercel Free Tier:
- ✅ 100GB bandwidth/month
- ✅ Unlimited static deployments
- ✅ Global CDN
- ⚠️ 10GB storage

## 🔄 Updates

To update the application:
1. Push changes to GitHub
2. Railway and Vercel will auto-deploy
3. No manual intervention needed

---

**Happy Deploying! 🚀**
