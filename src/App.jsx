import { WorkflowProvider } from './context/WorkflowContext'
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas'
import { Sidebar } from './components/panels/Sidebar'
import { NodeConfigPanel } from './components/panels/NodeConfigPanel'
import { SandboxPanel } from './components/panels/SandboxPanel'
import './index.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
        <p>Design, configure, and simulate internal HR processes</p>
      </header>

      <main className="app-main">
        <WorkflowProvider>
          <Sidebar />
          <div className="canvas-container">
            <WorkflowCanvas />
          </div>
          <aside className="right-panel">
            <NodeConfigPanel />
            <SandboxPanel />
          </aside>
        </WorkflowProvider>
      </main>
    </div>
  )
}

export default App
