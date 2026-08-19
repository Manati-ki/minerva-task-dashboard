import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import EntryFilters from './EntryFilters'

describe('EntryFilters', () => {
  it('calls onChange when platform filter changes', async () => {
    const onChange = vi.fn()
    render(
      <EntryFilters filters={{ platform: '', from: '', to: '' }} onChange={onChange} />
    )

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Outlier AI')

    expect(onChange).toHaveBeenCalledWith({ platform: 'Outlier AI', from: '', to: '' })
  })

  it('shows a clear button only when a filter is active', () => {
    const { rerender } = render(
      <EntryFilters filters={{ platform: '', from: '', to: '' }} onChange={() => {}} />
    )
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument()

    rerender(
      <EntryFilters filters={{ platform: 'Appen', from: '', to: '' }} onChange={() => {}} />
    )
    expect(screen.getByText('Clear filters')).toBeInTheDocument()
  })
})
