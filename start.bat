@echo off
chcp 65001 >nul

echo 🌺 Welcome to IrisAI Predictor!
echo ================================

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker first:
    echo    https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first:
    echo    https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are ready!

REM Navigate to deploy directory
if not exist "deploy" (
    echo ❌ Deploy directory not found. Please run this script from the project root.
    pause
    exit /b 1
)

cd deploy

echo 🚀 Starting IrisAI Predictor...
echo    This may take a few minutes on first run...

REM Start the application
docker-compose up --build -d

echo.
echo ⏳ Waiting for services to start...

REM Wait for services to be ready
timeout /t 10 /nobreak >nul

REM Check if services are running
docker-compose ps | findstr "Up" >nul
if errorlevel 1 (
    echo ❌ Failed to start services. Check the logs:
    docker-compose logs
    pause
    exit /b 1
) else (
    echo.
    echo 🎉 IrisAI Predictor is now running!
    echo ================================
    echo 🌐 Frontend: http://localhost
    echo 🔧 API: http://localhost:8000
    echo ❤️  Health Check: http://localhost/api/health
    echo.
    echo 📱 Open your browser and go to: http://localhost
    echo.
    echo 🛑 To stop the application, run:
    echo    cd deploy ^&^& docker-compose down
    echo.
    echo 📊 To view logs, run:
    echo    cd deploy ^&^& docker-compose logs
    echo.
    pause
)
