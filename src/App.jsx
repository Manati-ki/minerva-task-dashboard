import { useEntries } from './hooks/useEntries'
import EntryForm from './components/EntryForm'
import EntryFilters from './components/EntryFilters'
import PlatformSummary from './components/PlatformSummary'
import EntryList from './components/EntryList'
import './App.css'

export default function App() {
  const {
    entries,
    filters,
    setFilters,
    addEntry,
    deleteEntry,
    totalsByPlatform,
    grandTotal,
  } = useEntries()

  return (
    <div className="dashboard">
      <h1>Minerva Task Dashboard</h1>

      <section>
        <h2>Log an entry</h2>
        <EntryForm onAdd={addEntry} />
      </section>

      <section>
        <h2>Filters</h2>
        <EntryFilters filters={filters} onChange={setFilters} />
      </section>

      <section>
        <h2>By platform</h2>
        <PlatformSummary totalsByPlatform={totalsByPlatform} />
        <p className="grand-total">
          Total: {grandTotal.hours.toFixed(2)}h — ${grandTotal.earnings.toFixed(2)}
        </p>
      </section>

      <section>
        <h2>Recent entries</h2>
        <EntryList entries={entries} onDelete={deleteEntry} />
      </section>
    </div>
  )
}
