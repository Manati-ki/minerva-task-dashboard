import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import EntryList from './EntryList'

const entries = [
  { id: '1', date: '2026-08-02', platform: 'Appen', hours: '1', earnings: '5' },
  { id: '2', date: '2026-08-01', platform: 'Outlier AI', hours: '3', earnings: '20' },
]

describe('EntryList', () => {
  it('defaults to date descending', () => {
    render(<EntryList entries={entries} onUpdate={() => {}} onDelete={() => {}} />)
    const rows = screen.getAllByRole('listitem')
    expect(rows[0]).toHaveTextContent('2026-08-02')
  })

  it('toggles sort direction', async () => {
    render(<EntryList entries={entries} onUpdate={() => {}} onDelete={() => {}} />)

    await userEvent.click(screen.getByText(/descending/i))

    const rows = screen.getAllByRole('listitem')
    expect(rows[0]).toHaveTextContent('2026-08-01')
  })
})
