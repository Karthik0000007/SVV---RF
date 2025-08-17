from joblib import dump
from sklearn.datasets import load_iris
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from pathlib import Path

ARTIFACT = Path("../model/artifacts/model.joblib")
ARTIFACT.parent.mkdir(parents=True, exist_ok=True)

data = load_iris()
pipe = Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression(max_iter=500))])
pipe.fit(data.data, data.target)
dump({"pipeline": pipe, "class_names": ["setosa","versicolor","virginica"]}, ARTIFACT)
print("Saved", ARTIFACT.resolve())
