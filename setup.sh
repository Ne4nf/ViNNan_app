#!/bin/bash

# ViMedical Setup Script
echo "🏥 Setting up ViMedical project..."

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Python and Node.js are installed."

# Setup Backend
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment
python -m venv venv
echo "✅ Virtual environment created."

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows
    source venv/Scripts/activate
else
    # macOS/Linux
    source venv/bin/activate
fi

# Install Python dependencies
pip install -r requirements.txt
echo "✅ Backend dependencies installed."

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your API keys"
fi

cd ..

# Setup Frontend
echo "🔧 Setting up frontend..."
cd frontend

# Install Node.js dependencies
npm install
echo "✅ Frontend dependencies installed."

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Frontend environment file created."
fi

cd ..

echo "🎉 ViMedical setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your API keys"
echo "2. Run backend: cd backend && python run.py"
echo "3. Run frontend: cd frontend && npm start"
echo ""
echo "Backend will run at: http://localhost:8000"
echo "Frontend will run at: http://localhost:3000"
