#!/bin/bash

# QuickCourt Development Script
# This script helps you start the development environment

echo "🏀 QuickCourt Development Environment Setup"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is available
if command_exists docker && command_exists docker-compose; then
    echo "🐳 Docker detected - You can use Docker Compose for development"
    DOCKER_AVAILABLE=true
else
    echo "ℹ️  Docker not available - Using local development setup"
    DOCKER_AVAILABLE=false
fi

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install backend dependencies
    cd backend
    npm install
    cd ..
    
    # Install frontend dependencies
    cd frontend
    npm install
    cd ..
    
    echo "✅ Dependencies installed successfully"
}

# Function to setup environment files
setup_environment() {
    echo "⚙️  Setting up environment files..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/env.example" ]; then
            cp backend/env.example backend/.env
            echo "✅ Backend environment file created from env.example"
            echo "⚠️  Please edit backend/.env with your configuration"
        else
            echo "⚠️  Backend env.example not found. Please create backend/.env manually"
        fi
    else
        echo "✅ Backend environment file already exists"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env.local" ]; then
        if [ -f "frontend/env.example" ]; then
            cp frontend/env.example frontend/.env.local
            echo "✅ Frontend environment file created from env.example"
            echo "⚠️  Please edit frontend/.env.local with your configuration"
        else
            echo "⚠️  Frontend env.example not found. Please create frontend/.env.local manually"
        fi
    else
        echo "✅ Frontend environment file already exists"
    fi
}

# Function to start development servers
start_development() {
    echo "🚀 Starting development servers..."
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "🐳 Starting with Docker Compose..."
        docker-compose up -d postgres redis
        echo "⏳ Waiting for database to be ready..."
        sleep 10
        
        # Run database migrations
        echo "🗄️  Setting up database..."
        cd backend
        npx prisma generate
        npx prisma db push
        cd ..
        
        echo "✅ Database setup complete"
        echo "🌐 Starting backend and frontend..."
        docker-compose up backend frontend
    else
        echo "💻 Starting with local development..."
        
        # Check if PostgreSQL is running
        if command_exists psql; then
            echo "ℹ️  Please ensure PostgreSQL is running and accessible"
        fi
        
        # Start both servers
        npm run dev
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  install     Install all dependencies"
    echo "  setup       Setup environment files"
    echo "  start       Start development servers"
    echo "  docker      Start with Docker Compose"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 install    # Install dependencies"
    echo "  $0 setup      # Setup environment"
    echo "  $0 start      # Start development"
    echo "  $0            # Full setup and start"
}

# Main script logic
case "${1:-}" in
    "install")
        install_dependencies
        ;;
    "setup")
        setup_environment
        ;;
    "start")
        start_development
        ;;
    "docker")
        if [ "$DOCKER_AVAILABLE" = true ]; then
            echo "🐳 Starting Docker Compose..."
            docker-compose up
        else
            echo "❌ Docker is not available"
            exit 1
        fi
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    "")
        # No arguments - do full setup
        echo "🔧 Full setup and start..."
        install_dependencies
        setup_environment
        start_development
        ;;
    *)
        echo "❌ Unknown option: $1"
        show_help
        exit 1
        ;;
esac
