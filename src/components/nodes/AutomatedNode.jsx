import { BaseNode } from './BaseNode'

export function AutomatedNode({ data, selected }) {
  return (
    <BaseNode
      title={data.title || 'Automated Step'}
      selected={selected}
      colorClass="node-automated"
    >
      {data.actionId && <div className="node-detail">Action: {data.actionId}</div>}
    </BaseNode>
  )
}
