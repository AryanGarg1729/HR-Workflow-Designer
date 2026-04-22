import { useRef, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useWorkflow } from '../../context/WorkflowContext'
import { StartNode } from '../nodes/StartNode'
import { TaskNode } from '../nodes/TaskNode'
import { ApprovalNode } from '../nodes/ApprovalNode'
import { AutomatedNode } from '../nodes/AutomatedNode'
import { EndNode } from '../nodes/EndNode'

const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
}

let id = 0
function getId() {
  id = id + 1
  return 'dndnode_' + id
}

function Canvas() {
  const reactFlowWrapper = useRef(null)
  const { screenToFlowPosition } = useReactFlow()
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setSelectedNode,
  } = useWorkflow()

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      const label = event.dataTransfer.getData('application/reactflow-label')

      if (!type) {
        return
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = {
        id: getId(),
        type: type,
        position: position,
        data: { title: label + ' Node' },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node)
    },
    [setSelectedNode]
  )

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ccc" gap={16} />
        <Controls />
        <MiniMap zoomable pannable nodeClassName="minimap-node" />
      </ReactFlow>
    </div>
  )
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}
