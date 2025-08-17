export type PredictRequest = {
  sepal_length: number
  sepal_width: number
  petal_length: number
  petal_width: number
}

export type PredictResponse = {
  species: string
  proba: Record<string, number>
}

// 👇 Use relative path for production (Docker) or full URL for development
const API_BASE = import.meta.env.DEV ? 'http://localhost:8000' : '/api'

export async function predict(input: PredictRequest): Promise<PredictResponse> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
