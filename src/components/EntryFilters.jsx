import { DEFAULT_PLATFORMS } from '../data/platforms'

export default function EntryFilters({ filters, onChange }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="entry-filters">
      <select
        value={filters.platform}
        onChange={(e) => update('platform', e.target.value)}
      >
        <option value="">All platforms</option>
        {DEFAULT_PLATFORMS.map((p) => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </select>
      <label>
        From
        <input
          type="date"
          value={filters.from}
          onChange={(e) => update('from', e.target.value)}
        />
      </label>
      <label>
        To
        <input
          type="date"
          value={filters.to}
          onChange={(e) => update('to', e.target.value)}
        />
      </label>
      {(filters.platform || filters.from || filters.to) && (
        <button
          type="button"
          onClick={() => onChange({ platform: '', from: '', to: '' })}
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
