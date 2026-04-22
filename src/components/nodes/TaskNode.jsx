import { BaseNode } from './BaseNode'

export function TaskNode({ data, selected }) {
  return (
    <BaseNode
      title={data.title || 'Task'}
      selected={selected}
      colorClass="node-task"
    >
      {data.assignee && <div className="node-detail">Assignee: {data.assignee}</div>}
      {data.dueDate && <div className="node-detail">Due: {data.dueDate}</div>}
    </BaseNode>
  )
}
