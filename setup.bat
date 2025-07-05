@echo off
echo 🏥 Setting up ViMedical project...

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

echo ✅ Python and Node.js are installed.

:: Setup Backend
echo 🔧 Setting up backend...
cd backend

:: Create virtual environment
python -m venv venv
echo ✅ Virtual environment created.

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install Python dependencies
pip install -r requirements.txt
echo ✅ Backend dependencies installed.

:: Copy environment file
if not exist .env (
    copy .env.example .env
    echo ⚠️  Please edit backend/.env with your API keys
)

cd ..

:: Setup Frontend
echo 🔧 Setting up frontend...
cd frontend

:: Install Node.js dependencies
npm install
echo ✅ Frontend dependencies installed.

:: Copy environment file
if not exist .env (
    copy .env.example .env
    echo ✅ Frontend environment file created.
)

cd ..

echo 🎉 ViMedical setup complete!
echo.
echo Next steps:
echo 1. Edit backend/.env with your API keys
echo 2. Run backend: cd backend ^&^& python run.py
echo 3. Run frontend: cd frontend ^&^& npm start
echo.
echo Backend will run at: http://localhost:8000
echo Frontend will run at: http://localhost:3000

pause
