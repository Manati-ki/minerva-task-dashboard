import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PlatformSummary from './PlatformSummary'

describe('PlatformSummary', () => {
  it('renders a row per platform with totals and rate', () => {
    render(
      <PlatformSummary
        totalsByPlatform={{
          'Outlier AI': { hours: 4, earnings: 40 },
        }}
      />
    )

    expect(screen.getByText('Outlier AI')).toBeInTheDocument()
    expect(screen.getByText('4.00')).toBeInTheDocument()
    expect(screen.getByText('$40.00')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })

  it('shows a fallback message with no totals', () => {
    render(<PlatformSummary totalsByPlatform={{}} />)
    expect(screen.getByText('No entries yet.')).toBeInTheDocument()
  })
})
