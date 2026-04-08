import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '../components/Badge/Badge'

describe('Badge', () => {
  it('shows raw counts by default', () => {
    render(<Badge count={1245} tone="info" />)

    expect(screen.getByText('1245')).toBeInTheDocument()
    expect(screen.getByLabelText('informational notifications: 1245')).toBeInTheDocument()
  })

  it('respects explicit overflow maximum', () => {
    render(<Badge count={125} max={99} tone="info" />)

    expect(screen.getByText('99+')).toBeInTheDocument()
    expect(screen.getByLabelText('informational notifications: 99+')).toBeInTheDocument()
  })

  it('applies informational tone classes', () => {
    render(<Badge count={5} tone="info" />)
    expect(screen.getByText('5').closest('.badge')).toHaveClass('badge--info')
  })
})
