import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MonthlySummary from './MonthlySummary'

describe('MonthlySummary', () => {
  it('renders a row per month with totals', () => {
    const entries = [
      { date: '2026-07-15', hours: '2', earnings: '10' },
      { date: '2026-08-01', hours: '3', earnings: '20' },
    ]

    render(<MonthlySummary entries={entries} />)

    expect(screen.getByText('2026-07')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('2026-08')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('shows a fallback message with no entries', () => {
    render(<MonthlySummary entries={[]} />)
    expect(screen.getByText('No entries yet.')).toBeInTheDocument()
  })
})
