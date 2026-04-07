import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

function collectCssFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      return collectCssFiles(fullPath)
    }

    return entry.name.endsWith('.css') ? [fullPath] : []
  })
}

describe('token generation', () => {
  it('keeps generated artifacts in sync', () => {
    expect(() => {
      execFileSync('node', ['scripts/generate-tokens.mjs', '--check'], {
        cwd: process.cwd(),
        stdio: 'pipe',
      })
    }).not.toThrow()
  })

  it('does not reference primitive color tokens directly in component CSS', () => {
    const cssFiles = collectCssFiles(path.join(process.cwd(), 'src/components'))

    for (const filePath of cssFiles) {
      const contents = fs.readFileSync(filePath, 'utf8')
      expect(contents, filePath).not.toContain('var(--primitive-color-')
    }
  })
})
