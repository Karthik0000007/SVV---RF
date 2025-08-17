# 🚀 Quick Installation Guide

## Prerequisites

Before running IrisAI Predictor, make sure you have:

- **Docker Desktop** (version 20.10 or higher)
- **Docker Compose** (usually included with Docker Desktop)
- **4GB RAM** available
- **2GB free disk space**

## Installation Steps

### Option 1: One-Click Start (Recommended)

#### On Windows:
1. Double-click `start.bat`
2. Wait for the application to start
3. Open http://localhost in your browser

#### On Mac/Linux:
1. Open terminal in the project folder
2. Run: `chmod +x start.sh && ./start.sh`
3. Wait for the application to start
4. Open http://localhost in your browser

### Option 2: Manual Start

1. **Open terminal/command prompt**
2. **Navigate to the deploy folder:**
   ```bash
   cd deploy
   ```
3. **Start the application:**
   ```bash
   docker-compose up --build -d
   ```
4. **Wait 30-60 seconds** for everything to start
5. **Open your browser** and go to: http://localhost

## Verification

To make sure everything is working:

- **Frontend**: http://localhost (should show the beautiful UI)
- **API Health**: http://localhost/api/health (should return `{"status": "ok"}`)
- **Direct API**: http://localhost:8000/health (should return `{"status": "ok"}`)

## Troubleshooting

### Common Issues:

1. **"Docker is not running"**
   - Start Docker Desktop
   - Wait for it to fully load

2. **"Port 80 is already in use"**
   - Stop other web servers (Apache, IIS, etc.)
   - Or change the port in `deploy/docker-compose.yml`

3. **"Build failed"**
   - Check your internet connection
   - Try: `docker system prune -a` then restart

4. **"Application not loading"**
   - Wait longer (first run takes time)
   - Check logs: `cd deploy && docker-compose logs`

### Getting Help:

- Check the main README.md for detailed instructions
- View logs: `cd deploy && docker-compose logs`
- Restart: `cd deploy && docker-compose restart`

## Stopping the Application

To stop the application:

```bash
cd deploy
docker-compose down
```

## Next Steps

Once running, you can:

1. **Make predictions** by entering iris measurements
2. **View prediction history** in the History tab
3. **Explore the API** at http://localhost:8000/docs
4. **Customize the application** by modifying the code

---

**Need help?** Check the main README.md or create an issue in the repository.
