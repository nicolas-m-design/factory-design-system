import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tabs } from '../components/Tab/Tab'

describe('Tabs', () => {
  it('supports keyboard navigation and selection changes', async () => {
    const user = userEvent.setup()

    function Harness() {
      const [value, setValue] = useState('first')
      return (
        <Tabs
          items={[
            { value: 'first', label: 'First', content: <p>First panel</p> },
            { value: 'second', label: 'Second', content: <p>Second panel</p> },
            { value: 'third', label: 'Third', disabled: true, content: <p>Third panel</p> },
          ]}
          onValueChange={setValue}
          value={value}
        />
      )
    }

    render(<Harness />)

    await user.tab()
    expect(screen.getByRole('tab', { name: 'First' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Second panel')).toBeVisible()
  })
})
