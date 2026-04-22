function onDragStart(event, nodeType, label) {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.setData('application/reactflow-label', label)
  event.dataTransfer.effectAllowed = 'move'
}

export function Sidebar() {
  return (
    <aside className="sidebar panel">
      <h3>Node Types</h3>
      <div className="description">Drag nodes to the canvas.</div>
      <div className="node-list">
        <div
          className="sidebar-node node-start"
          onDragStart={(event) => onDragStart(event, 'startNode', 'Start')}
          draggable
        >
          Start Node
        </div>
        <div
          className="sidebar-node node-task"
          onDragStart={(event) => onDragStart(event, 'taskNode', 'Task')}
          draggable
        >
          Task Node
        </div>
        <div
          className="sidebar-node node-approval"
          onDragStart={(event) => onDragStart(event, 'approvalNode', 'Approval')}
          draggable
        >
          Approval Node
        </div>
        <div
          className="sidebar-node node-automated"
          onDragStart={(event) => onDragStart(event, 'automatedNode', 'Automated')}
          draggable
        >
          Automated Step
        </div>
        <div
          className="sidebar-node node-end"
          onDragStart={(event) => onDragStart(event, 'endNode', 'End')}
          draggable
        >
          End Node
        </div>
      </div>
    </aside>
  )
}
