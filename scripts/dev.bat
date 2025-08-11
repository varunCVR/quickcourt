@echo off
setlocal enabledelayedexpansion

REM QuickCourt Development Script for Windows
REM This script helps you start the development environment

echo 🏀 QuickCourt Development Environment Setup
echo ==========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=!NODE_VERSION:~1!
if !NODE_VERSION! lss 18 (
    echo ❌ Node.js version 18+ is required. Current version: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm detected
npm --version

REM Check if Docker is available
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    docker-compose --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo 🐳 Docker detected - You can use Docker Compose for development
        set DOCKER_AVAILABLE=true
    ) else (
        echo ℹ️  Docker detected but docker-compose not available
        set DOCKER_AVAILABLE=false
    )
) else (
    echo ℹ️  Docker not available - Using local development setup
    set DOCKER_AVAILABLE=false
)

REM Function to install dependencies
:install_dependencies
echo 📦 Installing dependencies...

REM Install root dependencies
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo ✅ Dependencies installed successfully
goto :eof

REM Function to setup environment files
:setup_environment
echo ⚙️  Setting up environment files...

REM Backend environment
if not exist "backend\.env" (
    if exist "backend\env.example" (
        copy "backend\env.example" "backend\.env" >nul
        echo ✅ Backend environment file created from env.example
        echo ⚠️  Please edit backend\.env with your configuration
    ) else (
        echo ⚠️  Backend env.example not found. Please create backend\.env manually
    )
) else (
    echo ✅ Backend environment file already exists
)

REM Frontend environment
if not exist "frontend\.env.local" (
    if exist "frontend\env.example" (
        copy "frontend\env.example" "frontend\.env.local" >nul
        echo ✅ Frontend environment file created from env.example
        echo ⚠️  Please edit frontend\.env.local with your configuration
    ) else (
        echo ⚠️  Frontend env.example not found. Please create frontend\.env.local manually
    )
) else (
    echo ✅ Frontend environment file already exists
)
goto :eof

REM Function to start development servers
:start_development
echo 🚀 Starting development servers...

if "%DOCKER_AVAILABLE%"=="true" (
    echo 🐳 Starting with Docker Compose...
    docker-compose up -d postgres redis
    echo ⏳ Waiting for database to be ready...
    timeout /t 10 /nobreak >nul
    
    REM Run database migrations
    echo 🗄️  Setting up database...
    cd backend
    call npx prisma generate
    call npx prisma db push
    cd ..
    
    echo ✅ Database setup complete
    echo 🌐 Starting backend and frontend...
    docker-compose up backend frontend
) else (
    echo 💻 Starting with local development...
    echo ℹ️  Please ensure PostgreSQL is running and accessible
    
    REM Start both servers
    call npm run dev
)
goto :eof

REM Function to show help
:show_help
echo Usage: %0 [OPTION]
echo.
echo Options:
echo   install     Install all dependencies
echo   setup       Setup environment files
echo   start       Start development servers
echo   docker      Start with Docker Compose
echo   help        Show this help message
echo.
echo Examples:
echo   %0 install    # Install dependencies
echo   %0 setup      # Setup environment
echo   %0 start      # Start development
echo   %0            # Full setup and start
goto :eof

REM Main script logic
if "%1"=="" (
    REM No arguments - do full setup
    echo 🔧 Full setup and start...
    call :install_dependencies
    call :setup_environment
    call :start_development
    goto :eof
)

if "%1"=="install" (
    call :install_dependencies
    goto :eof
)

if "%1"=="setup" (
    call :setup_environment
    goto :eof
)

if "%1"=="start" (
    call :start_development
    goto :eof
)

if "%1"=="docker" (
    if "%DOCKER_AVAILABLE%"=="true" (
        echo 🐳 Starting Docker Compose...
        docker-compose up
    ) else (
        echo ❌ Docker is not available
        pause
        exit /b 1
    )
    goto :eof
)

if "%1"=="help" (
    call :show_help
    goto :eof
)

if "%1"=="-h" (
    call :show_help
    goto :eof
)

if "%1"=="--help" (
    call :show_help
    goto :eof
)

echo ❌ Unknown option: %1
call :show_help
pause
exit /b 1
