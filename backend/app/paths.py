from pathlib import Path
import os

MODEL_PATH = Path(os.getenv("MODEL_PATH", "/models/model.joblib"))
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
