import { useState, useRef } from 'react'

export default function EntryRow({ entry, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [hours, setHours] = useState(entry.hours)
  const [earnings, setEarnings] = useState(entry.earnings)
  const editButtonRef = useRef(null)

  function save() {
    onUpdate(entry.id, { hours, earnings })
    setEditing(false)
    editButtonRef.current?.focus()
  }

  function cancel() {
    setHours(entry.hours)
    setEarnings(entry.earnings)
    setEditing(false)
    editButtonRef.current?.focus()
  }

  if (editing) {
    return (
      <li>
        <span>{entry.date}</span>
        <span>{entry.platform}</span>
        <label>
          <span className="sr-only">Hours for {entry.date} {entry.platform}</span>
          <input
            type="number"
            step="0.25"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Earnings for {entry.date} {entry.platform}</span>
          <input
            type="number"
            step="0.01"
            value={earnings}
            onChange={(e) => setEarnings(e.target.value)}
          />
        </label>
        <button onClick={save}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </li>
    )
  }

  return (
    <li>
      <span>{entry.date}</span>
      <span>{entry.platform}</span>
      <span>{entry.hours}h</span>
      <span>${Number(entry.earnings).toFixed(2)}</span>
      <button
        ref={editButtonRef}
        onClick={() => setEditing(true)}
        aria-label={`Edit entry for ${entry.date} ${entry.platform}`}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(entry.id)}
        aria-label={`Delete entry for ${entry.date} ${entry.platform}`}
      >
        ×
      </button>
    </li>
  )
}
