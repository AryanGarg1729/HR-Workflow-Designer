import { BaseNode } from './BaseNode'

export function EndNode({ data, selected }) {
  return (
    <BaseNode
      title={data.title || 'End'}
      selected={selected}
      colorClass="node-end"
      hasOutput={false}
    />
  )
}
