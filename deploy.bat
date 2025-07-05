@echo off
echo 🚀 Deploy ViMedical to Vercel
echo ===============================

echo 1. Building frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

cd ..

echo 2. Installing Vercel CLI...
npm install -g vercel

echo 3. Deploying to Vercel...
vercel --prod

echo 🎉 Deployment complete!
echo.
echo Don't forget to:
echo 1. Set environment variables in Vercel dashboard
echo 2. Configure custom domain (optional)
echo.
pause
