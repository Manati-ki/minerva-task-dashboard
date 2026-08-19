import { useState } from 'react'
import EntryRow from './EntryRow'
import { downloadCsv, entriesToCsv } from '../utils/exportCsv'
import { sortEntries } from '../utils/sortEntries'

export default function EntryList({ entries, onUpdate, onDelete }) {
  const [sortBy, setSortBy] = useState('date')
  const [direction, setDirection] = useState('desc')

  if (entries.length === 0) return null

  const sorted = sortEntries(entries, sortBy, direction)

  function handleExport() {
    downloadCsv(entriesToCsv(sorted), 'minerva-entries.csv')
  }

  function toggleDirection() {
    setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div>
      <div className="entry-list-controls">
        <label htmlFor="sort-by">
          Sort by
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="platform">Platform</option>
            <option value="hours">Hours</option>
            <option value="earnings">Earnings</option>
          </select>
        </label>
        <button type="button" onClick={toggleDirection}>
          {direction === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
        </button>
        <button type="button" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <ul className="entry-list">
        {sorted.map((e) => (
          <EntryRow key={e.id} entry={e} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  )
}
