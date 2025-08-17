#!/bin/bash

# 🌺 IrisAI Predictor - Startup Script
# This script makes it easy to run the IrisAI Predictor application

set -e

echo "🌺 Welcome to IrisAI Predictor!"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop or Docker service."
    exit 1
fi

echo "✅ Docker and Docker Compose are ready!"

# Navigate to deploy directory
if [ ! -d "deploy" ]; then
    echo "❌ Deploy directory not found. Please run this script from the project root."
    exit 1
fi

cd deploy

echo "🚀 Starting IrisAI Predictor..."
echo "   This may take a few minutes on first run..."

# Start the application
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to start..."

# Wait for services to be ready
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "🎉 IrisAI Predictor is now running!"
    echo "================================"
    echo "🌐 Frontend: http://localhost"
    echo "🔧 API: http://localhost:8000"
    echo "❤️  Health Check: http://localhost/api/health"
    echo ""
    echo "📱 Open your browser and go to: http://localhost"
    echo ""
    echo "🛑 To stop the application, run:"
    echo "   cd deploy && docker-compose down"
    echo ""
    echo "📊 To view logs, run:"
    echo "   cd deploy && docker-compose logs"
else
    echo "❌ Failed to start services. Check the logs:"
    docker-compose logs
    exit 1
fi
