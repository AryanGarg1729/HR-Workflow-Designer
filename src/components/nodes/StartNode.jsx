import { BaseNode } from './BaseNode'

export function StartNode({ data, selected }) {
  return (
    <BaseNode
      title={data.title || 'Start'}
      // icon="🟢"
      selected={selected}
      colorClass="node-start"
      hasInput={false}
    />
  )
}
