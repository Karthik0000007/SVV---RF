import os, sys, json, time
import urllib.request as r

BASE = os.getenv("BASE", "http://localhost:8000")

def test_health():
    with r.urlopen(f"{BASE}/health") as resp:
        assert resp.status == 200

def test_predict():
    data = {
        "sepal_length": 5.1, "sepal_width": 3.5,
        "petal_length": 1.4, "petal_width": 0.2
    }
    req = r.Request(f"{BASE}/predict", data=json.dumps(data).encode(), headers={"Content-Type":"application/json"})
    with r.urlopen(req) as resp:
        assert resp.status == 200
        body = json.loads(resp.read())
        assert "species" in body and "proba" in body
