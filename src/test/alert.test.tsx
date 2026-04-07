import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Alert } from '../components/Alert/Alert'

describe('Alert', () => {
  it('uses status for non-disruptive tones', () => {
    render(<Alert title="Neutral" tone="neutral" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('uses alert for disruptive tones', () => {
    render(<Alert title="Failure" tone="error" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders dismiss control when dismissible', () => {
    render(<Alert dismissible title="Dismiss me" />)
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })
})
