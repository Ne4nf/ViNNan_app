@echo off
echo 🏥 ViMedical - Complete Setup and Start
echo =====================================

echo 1. Setting up Backend...
cd /d "%~dp0\backend"

if not exist "venv" (
    echo 🔧 Creating virtual environment...
    python -m venv venv
)

echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

echo 📦 Installing backend dependencies...
pip install -r requirements.txt

if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo ⚠️  Please edit backend\.env with your API keys
    )
)

echo 🚀 Starting backend server...
start "ViMedical Backend" cmd /k "call venv\Scripts\activate.bat && python run.py"

cd /d "%~dp0"

echo.
echo 2. Setting up Frontend...
cd /d "%~dp0\frontend"

if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
)

if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo ✅ Frontend environment file created
    )
)

echo 🚀 Starting frontend server...
start "ViMedical Frontend" cmd /k "npm start"

echo.
echo 🎉 ViMedical is starting!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo ⚠️  Don't forget to configure your API keys in backend\.env
echo.
pause
