import { Handle, Position } from '@xyflow/react'

export function BaseNode({ title, icon, selected, colorClass = 'node-default', children, hasInput = true, hasOutput = true }) {
  let nodeClass = 'custom-node ' + colorClass
  if (selected) {
    nodeClass = nodeClass + ' selected'
  }

  return (
    <div className={nodeClass}>
      {hasInput && <Handle type="target" position={Position.Top} className="handle-target" />}

      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <strong className="node-title">{title}</strong>
      </div>

      {children && <div className="node-content">{children}</div>}

      {hasOutput && <Handle type="source" position={Position.Bottom} className="handle-source" />}
    </div>
  )
}
