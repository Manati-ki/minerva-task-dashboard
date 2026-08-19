export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) return null

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <ul className="entry-list">
      {sorted.map((e) => (
        <li key={e.id}>
          <span>{e.date}</span>
          <span>{e.platform}</span>
          <span>{e.hours}h</span>
          <span>${Number(e.earnings).toFixed(2)}</span>
          <button onClick={() => onDelete(e.id)}>×</button>
        </li>
      ))}
    </ul>
  )
}
