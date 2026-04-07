import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Button } from '../components/Button/Button'

describe('Button', () => {
  it('disables interaction and exposes busy state while loading', () => {
    render(<Button loading>Saving</Button>)

    const button = screen.getByRole('button', { name: 'Saving' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('receives keyboard focus', async () => {
    const user = userEvent.setup()
    render(<Button>Continue</Button>)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveFocus()
  })

  it('has no basic accessibility violations', async () => {
    const { container } = render(<Button>Submit</Button>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
