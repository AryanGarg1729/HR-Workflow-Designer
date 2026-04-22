import { useState } from 'react'
import { useWorkflow } from '../../context/WorkflowContext'
import { simulateWorkflow } from '../../api/mockApi.js'

export function SandboxPanel() {
  const { nodes, edges } = useWorkflow()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function handleSimulate() {
    setLoading(true)
    setResult(null)
    try {
      const response = await simulateWorkflow({ nodes, edges })
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        logs: [],
        errors: ['An unexpected error occurred during simulation.'],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel sandbox-panel">
      <h3>Test Workflow</h3>
      <p className="help-text">Simulate the current workflow configuration.</p>

      <button
        className="simulate-btn"
        onClick={handleSimulate}
        disabled={loading}
      >
        {loading ? 'Simulating...' : 'Run Simulation'}
      </button>

      {result && (
        <div className={'simulation-results ' + (result.success ? 'success' : 'error')}>
          <h4>Results</h4>

          {result.errors.length > 0 && (
            <div className="error-logs">
              <strong>Errors:</strong>
              <ul>
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {result.logs.length > 0 && (
            <div className="execution-logs">
              <strong>Execution Log:</strong>
              <ul>
                {result.logs.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
