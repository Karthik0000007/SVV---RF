from __future__ import annotations
from joblib import dump, load
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import numpy as np
from pathlib import Path
from .paths import MODEL_PATH

CLASS_NAMES = ["setosa", "versicolor", "virginica"]

def train_model(model_path: Path = MODEL_PATH) -> float:
    data = load_iris()
    X_train, X_test, y_train, y_test = train_test_split(
        data.data, data.target, test_size=0.2, random_state=42, stratify=data.target
    )

    pipe = Pipeline([
        ("scaler", StandardScaler()),
        ("clf", LogisticRegression(max_iter=500))
    ])
    pipe.fit(X_train, y_train)
    preds = pipe.predict(X_test)
    acc = accuracy_score(y_test, preds)
    model_path.parent.mkdir(parents=True, exist_ok=True)
    dump({"pipeline": pipe, "class_names": CLASS_NAMES}, model_path)
    return float(acc)

def load_model(model_path: Path = MODEL_PATH):
    if not model_path.exists():
        train_model(model_path)
    artifact = load(model_path)
    return artifact["pipeline"], artifact["class_names"]

def predict_one(features: list[float]) -> tuple[str, dict[str, float]]:
    pipe, class_names = load_model()
    proba = pipe.predict_proba(np.array(features).reshape(1, -1))[0]
    idx = int(np.argmax(proba))
    return class_names[idx], {class_names[i]: float(proba[i]) for i in range(len(class_names))}
