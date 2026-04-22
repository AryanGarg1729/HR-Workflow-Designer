import { useEffect, useState } from 'react'
import { useWorkflow } from '../../context/WorkflowContext'
import { getAutomations } from '../../api/mockApi.js'

export function NodeConfigPanel() {
  const { selectedNode, updateNodeData } = useWorkflow()
  const [actions, setActions] = useState([])

  useEffect(() => {
    if (selectedNode && selectedNode.type === 'automatedNode') {
      getAutomations().then(setActions)
    }
  }, [selectedNode?.type])

  if (!selectedNode) {
    return (
      <div className="panel config-panel empty">
        <p>Select a node to configure its properties</p>
      </div>
    )
  }

  const id = selectedNode.id
  const type = selectedNode.type
  const data = selectedNode.data

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const inputType = e.target.type

    let finalValue = value
    if (inputType === 'checkbox') {
      finalValue = e.target.checked
    } else if (inputType === 'number') {
      finalValue = Number(value)
    }

    updateNodeData(id, { [name]: finalValue })
  }

  return (
    <div className="panel config-panel">
      <h3>Node Configuration</h3>
      <div className="form-group">
        <label>ID</label>
        <input type="text" value={id} disabled className="disabled-input" />
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={data.title || ''}
          onChange={handleChange}
          placeholder="Enter title..."
        />
      </div>

      {type === 'startNode' && (
        <div className="form-group">
          <label>Metadata Info</label>
          <p className="help-text">Start node initiates the flow.</p>
        </div>
      )}

      {type === 'taskNode' && (
        <>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={data.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <input
              type="text"
              name="assignee"
              value={data.assignee || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={data.dueDate || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {type === 'approvalNode' && (
        <>
          <div className="form-group">
            <label>Approver Role</label>
            <select name="approverRole" value={data.approverRole || ''} onChange={handleChange}>
              <option value="">Select Role...</option>
              <option value="Manager">Manager</option>
              <option value="HRBP">HRBP</option>
              <option value="Director">Director</option>
            </select>
          </div>
          <div className="form-group">
            <label>Auto-Approve Threshold (Days)</label>
            <input
              type="number"
              name="autoApproveThreshold"
              value={data.autoApproveThreshold || 0}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {type === 'automatedNode' && (
        <div className="form-group">
          <label>Action</label>
          <select name="actionId" value={data.actionId || ''} onChange={handleChange}>
            <option value="">Select Action...</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {type === 'endNode' && (
        <>
          <div className="form-group">
            <label>End Message</label>
            <textarea
              name="endMessage"
              value={data.endMessage || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              name="summaryFlag"
              id="summaryFlag"
              checked={!!data.summaryFlag}
              onChange={handleChange}
            />
            <label htmlFor="summaryFlag">Include Summary</label>
          </div>
        </>
      )}
    </div>
  )
}
