import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import EntryRow from './EntryRow'

const entry = { id: '1', date: '2026-08-01', platform: 'Outlier AI', hours: '2', earnings: '15' }

describe('EntryRow', () => {
  it('enters edit mode and saves changes', async () => {
    const onUpdate = vi.fn()
    render(<EntryRow entry={entry} onUpdate={onUpdate} onDelete={() => {}} />)

    await userEvent.click(screen.getByLabelText(/edit entry/i))

    const hoursInput = screen.getByLabelText(/edit hours/i)
    await userEvent.clear(hoursInput)
    await userEvent.type(hoursInput, '3')
    await userEvent.click(screen.getByText('Save'))

    expect(onUpdate).toHaveBeenCalledWith('1', { hours: '3', earnings: '15' })
  })

  it('cancel discards changes', async () => {
    const onUpdate = vi.fn()
    render(<EntryRow entry={entry} onUpdate={onUpdate} onDelete={() => {}} />)

    await userEvent.click(screen.getByLabelText(/edit entry/i))
    await userEvent.click(screen.getByText('Cancel'))

    expect(onUpdate).not.toHaveBeenCalled()
    expect(screen.getByLabelText(/edit entry/i)).toBeInTheDocument()
  })
})
