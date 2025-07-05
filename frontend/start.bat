@echo off
echo 🌐 Starting ViMedical Frontend...
cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Copy environment file if it doesn't exist
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo ✅ Environment file created
    )
)

REM Start the development server
echo 🚀 Starting React development server...
npm start
