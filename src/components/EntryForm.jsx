import { useState } from 'react'
import { DEFAULT_PLATFORMS } from '../data/platforms'

export default function EntryForm({ onAdd }) {
  const [platform, setPlatform] = useState(DEFAULT_PLATFORMS[0].name)
  const [hours, setHours] = useState('')
  const [earnings, setEarnings] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [status, setStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!hours || !earnings) {
      setStatus('Please enter both hours and earnings.')
      return
    }
    onAdd({ platform, hours, earnings, date })
    setHours('')
    setEarnings('')
    setStatus('Entry logged.')
  }

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <label htmlFor="entry-platform">
        Platform
        <select
          id="entry-platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {DEFAULT_PLATFORMS.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </label>

      <label htmlFor="entry-date">
        Date
        <input
          id="entry-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label htmlFor="entry-hours">
        Hours
        <input
          id="entry-hours"
          type="number"
          step="0.25"
          placeholder="0"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </label>

      <label htmlFor="entry-earnings">
        Earnings ($)
        <input
          id="entry-earnings"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={earnings}
          onChange={(e) => setEarnings(e.target.value)}
        />
      </label>

      <button type="submit">Log entry</button>

      <p role="status" aria-live="polite">{status}</p>
    </form>
  )
}
