# 🌺 IrisAI Predictor

A beautiful, modern machine learning application for iris species classification built with React, FastAPI, and Docker.

![IrisAI Predictor](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Required-blue)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![React](https://img.shields.io/badge/React-18+-blue)

## ✨ Features

- 🎯 **AI-Powered Predictions**: Real-time iris species classification using scikit-learn
- 🎨 **Modern UI**: Beautiful, responsive design with glass morphism effects
- 📊 **Confidence Scoring**: Detailed probability breakdowns for each prediction
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- 🔄 **Prediction History**: Track and review your previous predictions
- ⚡ **Fast Performance**: Sub-100ms prediction times
- 🐳 **Docker Ready**: Easy deployment with containerization

## 🚀 Quick Start

### Prerequisites

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher)

### Installation & Running

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd iris-predictor
   ```

2. **Navigate to the deploy directory**
   ```bash
   cd deploy
   ```

3. **Start the application**
   ```bash
   docker-compose up --build -d
   ```

4. **Access the application**
   - **Frontend**: http://localhost
   - **API**: http://localhost:8000
   - **Health Check**: http://localhost/api/health

## 📁 Project Structure

```
iris-predictor/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── api.ts           # API integration
│   │   └── index.css        # Tailwind CSS styles
│   ├── Dockerfile           # Frontend container
│   └── nginx.conf           # Nginx configuration
├── backend/                  # FastAPI + Python backend
│   ├── app/
│   │   ├── main.py          # API endpoints
│   │   ├── ml.py            # Machine learning model
│   │   ├── schemas.py       # Pydantic models
│   │   └── paths.py         # File paths
│   ├── Dockerfile           # Backend container
│   └── requirements.txt     # Python dependencies
├── deploy/
│   └── docker-compose.yml   # Container orchestration
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables (optional):

```bash
MODEL_PATH=/models/iris_model.joblib  # Path for ML model storage
```

### Port Configuration

- **Frontend**: Port 80 (http://localhost)
- **Backend**: Port 8000 (http://localhost:8000)

To change ports, modify the `docker-compose.yml` file:

```yaml
ports:
  - "YOUR_PORT:80"    # Frontend
  - "YOUR_API_PORT:8000"  # Backend
```

## 🎯 How to Use

1. **Open the application** in your browser at http://localhost
2. **Enter iris measurements**:
   - Sepal Length (cm)
   - Sepal Width (cm)
   - Petal Length (cm)
   - Petal Width (cm)
3. **Click "Predict Species"** to get instant AI-powered classification
4. **View results** with confidence scores and probability breakdowns
5. **Check history** to see your previous predictions

## 🛠️ Development

### Running in Development Mode

If you want to run the application in development mode:

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

#### Backend Development
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Building from Source

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
pip install -r requirements.txt
```

## 📊 API Endpoints

### Health Check
```bash
GET /health
Response: {"status": "ok"}
```

### Train Model
```bash
POST /train
Response: {"status": "trained", "accuracy": 0.98}
```

### Predict Species
```bash
POST /predict
Content-Type: application/json

{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}

Response:
{
  "species": "setosa",
  "proba": {
    "setosa": 0.98,
    "versicolor": 0.01,
    "virginica": 0.01
  }
}
```

## 🐳 Docker Commands

### Basic Operations
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs

# Stop the application
docker-compose down

# Rebuild and start
docker-compose up --build -d

# View running containers
docker-compose ps
```

### Troubleshooting
```bash
# Check container status
docker-compose ps

# View specific service logs
docker-compose logs api
docker-compose logs web

# Restart a specific service
docker-compose restart api

# Remove all containers and volumes
docker-compose down -v
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :80
   # or
   lsof -i :80
   ```

2. **Docker not running**
   - Ensure Docker Desktop is started
   - Check Docker service status

3. **Build failures**
   ```bash
   # Clean Docker cache
   docker system prune -a
   # Rebuild
   docker-compose up --build -d
   ```

4. **Permission issues**
   ```bash
   # On Linux/Mac, ensure proper permissions
   sudo chown -R $USER:$USER .
   ```

### Health Checks

- **Frontend**: http://localhost (should show the application)
- **Backend**: http://localhost:8000/health (should return `{"status": "ok"}`)
- **API Proxy**: http://localhost/api/health (should return `{"status": "ok"}`)

## 📈 Performance

- **Prediction Speed**: < 100ms
- **Model Accuracy**: ~98.5%
- **Memory Usage**: ~200MB total
- **Startup Time**: ~30 seconds

## 🛡️ Security

- CORS enabled for development
- Input validation with Pydantic
- No sensitive data storage
- Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Scikit-learn** for machine learning capabilities
- **FastAPI** for the backend framework
- **React** for the frontend framework
- **Tailwind CSS** for styling
- **Docker** for containerization

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the Docker logs: `docker-compose logs`
3. Ensure all prerequisites are met
4. Create an issue in the repository

---

**Made using modern web technologies**
