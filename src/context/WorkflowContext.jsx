import { createContext, useContext, useState, useCallback } from 'react'
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react'

const WorkflowContext = createContext(undefined)

const initialNodes = [
  {
    id: 'start-1',
    type: 'startNode',
    position: { x: 250, y: 50 },
    data: { title: 'Start Workflow' },
  },
]

export function WorkflowProvider({ children }) {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState([])
  const [selectedNodeId, setSelectedNodeId] = useState(null)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  )

  const updateNodeData = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          }
        }
        return node;
      })
    );
  }, [])

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null

  const setSelectedNode = (node) => {
    setSelectedNodeId(node ? node.id : null)
  }

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        setNodes,
        setEdges,
        selectedNode,
        setSelectedNode,
        updateNodeData,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}
