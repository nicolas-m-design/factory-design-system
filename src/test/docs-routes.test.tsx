import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../App'
import { docsRoutes } from '../docs/routes'

describe('docs routes', () => {
  for (const route of docsRoutes) {
    it(`renders the documented route contract for ${route.path}`, () => {
      window.location.hash = `#${route.path}`
      render(<App />)

      expect(screen.getByTestId('state-matrix')).toBeInTheDocument()
      expect(screen.getByTestId('accessibility-notes')).toBeInTheDocument()

      if (route.path !== '/overview') {
        expect(screen.getByTestId('usage-guidance')).toBeInTheDocument()
        expect(screen.getByTestId('token-mapping')).toBeInTheDocument()
      }
    })
  }
})
