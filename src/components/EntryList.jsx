import EntryRow from './EntryRow'
import { downloadCsv, entriesToCsv } from '../utils/exportCsv'

export default function EntryList({ entries, onUpdate, onDelete }) {
  if (entries.length === 0) return null

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  function handleExport() {
    downloadCsv(entriesToCsv(sorted), 'minerva-entries.csv')
  }

  return (
    <div>
      <button type="button" onClick={handleExport}>
        Export CSV
      </button>
      <ul className="entry-list">
        {sorted.map((e) => (
          <EntryRow key={e.id} entry={e} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  )
}
