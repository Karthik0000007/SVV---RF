import React, { useState, useEffect } from 'react'
import { predict, PredictResponse } from './api.js'

// Types for enhanced UI
interface IrisData {
  sepal_length: number
  sepal_width: number
  petal_length: number
  petal_width: number
}

interface PredictionResult extends PredictResponse {
  timestamp: string
  confidence: number
}

export default function App() {
  const [form, setForm] = useState<IrisData>({
    sepal_length: 5.1,
    sepal_width: 3.5,
    petal_length: 1.4,
    petal_width: 0.2
  })
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'predict' | 'history'>('predict')
  const [predictions, setPredictions] = useState<PredictionResult[]>([])

  const onChange = (key: keyof IrisData, value: string) => {
    setForm(prev => ({ ...prev, [key]: Number(value) }))
    setError(null)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await predict(form)
      const confidence = Math.max(...Object.values(response.proba))
      const newResult: PredictionResult = {
        ...response,
        timestamp: new Date().toLocaleString(),
        confidence
      }
      setResult(newResult)
      setPredictions(prev => [newResult, ...prev.slice(0, 9)]) // Keep last 10
    } catch (e: any) {
      setError(e.message ?? 'Prediction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSpeciesColor = (species: string) => {
    const colors = {
      setosa: '#10B981',
      versicolor: '#3B82F6', 
      virginica: '#8B5CF6'
    }
    return colors[species as keyof typeof colors] || '#6B7280'
  }

  const getSpeciesIcon = (species: string) => {
    const icons = {
      setosa: '🌸',
      versicolor: '🌺',
      virginica: '🌷'
    }
    return icons[species as keyof typeof icons] || '🌿'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🌺</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  IrisAI Predictor
                </h1>
                <p className="text-xs text-slate-500">Powered by Machine Learning</p>
              </div>
            </div>
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('predict')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'predict'
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Predict
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'history'
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                History
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'predict' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Enter Iris Measurements
                  </h2>
                  <p className="text-slate-600">
                    Input the sepal and petal dimensions to predict the iris species using our advanced AI model.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Sepal Length (cm)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={form.sepal_length}
                          onChange={(e) => onChange('sepal_length', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="5.1"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">cm</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Sepal Width (cm)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={form.sepal_width}
                          onChange={(e) => onChange('sepal_width', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="3.5"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">cm</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Petal Length (cm)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={form.petal_length}
                          onChange={(e) => onChange('petal_length', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="1.4"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">cm</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Petal Width (cm)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={form.petal_width}
                          onChange={(e) => onChange('petal_width', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                          placeholder="0.2"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-slate-400 text-sm">cm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>🔮</span>
                        <span>Predict Species</span>
                      </div>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">⚠️</span>
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-lg">📊</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Accuracy</p>
                      <p className="text-lg font-bold text-blue-600">98.5%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-lg">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Speed</p>
                      <p className="text-lg font-bold text-green-600">&lt;100ms</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Species</p>
                      <p className="text-lg font-bold text-purple-600">3 Types</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {result ? (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      Prediction Results
                    </h3>
                    <p className="text-slate-600">
                      AI analysis completed successfully
                    </p>
                  </div>

                  {/* Main Result */}
                  <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getSpeciesIcon(result.species)}</span>
                        <div>
                          <h4 className="text-xl font-bold text-slate-800">
                            {result.species.charAt(0).toUpperCase() + result.species.slice(1)}
                          </h4>
                          <p className="text-slate-600">Predicted Species</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {(result.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-slate-500">Confidence</div>
                      </div>
                    </div>

                    {/* Confidence Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Probability Breakdown */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-slate-700">Probability Breakdown</h5>
                    {Object.entries(result.proba)
                      .sort(([,a], [,b]) => b - a)
                      .map(([species, probability]) => (
                        <div key={species} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getSpeciesIcon(species)}</span>
                            <span className="font-medium text-slate-700 capitalize">
                              {species}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${probability * 100}%`,
                                  backgroundColor: getSpeciesColor(species)
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-slate-600 w-12 text-right">
                              {(probability * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      Analysis completed at {result.timestamp}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🔮</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Ready to Predict
                    </h3>
                    <p className="text-slate-600">
                      Enter iris measurements and click predict to get instant AI-powered species classification.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* History Tab */
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Prediction History
              </h2>
              <p className="text-slate-600">
                Your recent iris species predictions and analysis results.
              </p>
            </div>

            {predictions.length > 0 ? (
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getSpeciesIcon(prediction.species)}</span>
                        <div>
                          <h4 className="font-semibold text-slate-800 capitalize">
                            {prediction.species}
                          </h4>
                          <p className="text-sm text-slate-500">{prediction.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: getSpeciesColor(prediction.species) }}>
                          {(prediction.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-slate-500">Confidence</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(prediction.proba).map(([species, prob]) => (
                        <div key={species} className="text-center p-2 bg-slate-50 rounded-lg">
                          <div className="font-medium capitalize">{species}</div>
                          <div className="text-slate-600">{(prob * 100).toFixed(1)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  No Predictions Yet
                </h3>
                <p className="text-slate-600">
                  Make your first prediction to see it appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌺</span>
                </div>
                <span className="font-bold text-slate-800">IrisAI Predictor</span>
              </div>
              <p className="text-slate-600 text-sm">
                Advanced machine learning-powered iris species classification with real-time predictions and beautiful visualizations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• React + TypeScript</li>
                <li>• FastAPI + Python</li>
                <li>• Scikit-learn ML</li>
                <li>• Docker Deployment</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Real-time Predictions</li>
                <li>• Confidence Scoring</li>
                <li>• Prediction History</li>
                <li>• Responsive Design</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              © 2024 IrisAI Predictor. Built with ❤️ using modern web technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
