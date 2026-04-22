import { BaseNode } from './BaseNode'

export function ApprovalNode({ data, selected }) {
  return (
    <BaseNode
      title={data.title || 'Approval'}
      selected={selected}
      colorClass="node-approval"
    >
      {data.approverRole && <div className="node-detail">Role: {data.approverRole}</div>}
    </BaseNode>
  )
}
