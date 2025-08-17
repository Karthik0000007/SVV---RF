from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictRequest, PredictResponse
from .ml import predict_one, train_model

app = FastAPI(title="Iris ML API", version="0.1.0")

# CORS: safe for local dev; lock down in prod with env var if needed.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/train")
def train():
    acc = train_model()
    return {"status": "trained", "accuracy": acc}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    species, proba = predict_one([
        req.sepal_length, req.sepal_width, req.petal_length, req.petal_width
    ])
    return PredictResponse(species=species, proba=proba)
