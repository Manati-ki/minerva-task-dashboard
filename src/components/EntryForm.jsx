import { useState } from 'react'
import { DEFAULT_PLATFORMS } from '../data/platforms'

export default function EntryForm({ onAdd }) {
  const [platform, setPlatform] = useState(DEFAULT_PLATFORMS[0].name)
  const [hours, setHours] = useState('')
  const [earnings, setEarnings] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))

  function handleSubmit(e) {
    e.preventDefault()
    if (!hours || !earnings) return
    onAdd({ platform, hours, earnings, date })
    setHours('')
    setEarnings('')
  }

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        {DEFAULT_PLATFORMS.map((p) => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        step="0.25"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Earnings ($)"
        value={earnings}
        onChange={(e) => setEarnings(e.target.value)}
      />
      <button type="submit">Log entry</button>
    </form>
  )
}
