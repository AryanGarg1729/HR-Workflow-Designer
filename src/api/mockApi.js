const mockActions = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'slack_message', label: 'Send Slack Message', params: ['channel', 'message'] },
  { id: 'webhook', label: 'Trigger Webhook', params: ['url', 'method'] }
]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAutomations = async () => {
  console.log('Mock API: Fetching automations...')
  await delay(500)
  return mockActions
}

export const simulateWorkflow = async (workflowData) => {
  console.log('Mock API: Simulating workflow...', workflowData)
  await delay(800)

  const { nodes, edges } = workflowData
  const logs = []
  const errors = []

  if (!nodes || nodes.length === 0) {
    errors.push('Workflow is empty.')
    return { success: false, logs, errors }
  }

  const startNodes = nodes.filter((n) => n.type === 'startNode')
  if (startNodes.length === 0) {
    errors.push('Missing Start Node. Workflow must begin with a Start Node.')
  } else if (startNodes.length > 1) {
    errors.push('Multiple Start Nodes found. Only one Start Node is allowed.')
  }

  if (errors.length === 0) {
    let currentNode = startNodes[0]
    let visited = new Set()

    while (currentNode) {
      if (visited.has(currentNode.id)) {
        errors.push('Cycle detected at node: ' + (currentNode.data.title || currentNode.id))
        break
      }
      visited.add(currentNode.id)

      logs.push('Executed: ' + (currentNode.data.title || currentNode.type) + ' (' + currentNode.id + ')')

      const outgoingEdges = edges.filter((e) => e.source === currentNode.id)

      if (outgoingEdges.length > 1) {
        logs.push('Warning: Multiple outgoing edges from ' + currentNode.data.title + '. Taking the first one.')
      }

      if (outgoingEdges.length > 0) {
        const nextNodeId = outgoingEdges[0].target
        currentNode = nodes.find((n) => n.id === nextNodeId)
      } else {
        if (currentNode.type !== 'endNode') {
          errors.push('Workflow ended prematurely at non-End Node: ' + currentNode.data.title)
        } else {
          logs.push('Workflow completed successfully at End Node.')
        }
        currentNode = null
      }
    }

    if (visited.size < nodes.length) {
      errors.push('Found ' + (nodes.length - visited.size) + ' disconnected node(s).')
    }
  }

  return {
    success: errors.length === 0,
    logs,
    errors
  }
}
