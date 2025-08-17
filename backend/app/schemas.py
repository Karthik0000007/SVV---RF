from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    sepal_length: float = Field(..., ge=0)
    sepal_width: float = Field(..., ge=0)
    petal_length: float = Field(..., ge=0)
    petal_width: float = Field(..., ge=0)

class PredictResponse(BaseModel):
    species: str
    proba: dict[str, float]
