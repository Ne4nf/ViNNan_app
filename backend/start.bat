@echo off
echo 🏥 Starting ViMedical Backend...
cd /d "%~dp0"

REM Check if virtual environment exists
if not exist "venv" (
    echo 🔧 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📦 Installing dependencies...
pip install -r requirements.txt

REM Copy environment file if it doesn't exist
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo ⚠️  Please edit .env with your API keys
    )
)

REM Start the server
echo 🚀 Starting FastAPI server...
python run.py

pause
