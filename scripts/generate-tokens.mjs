import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const primitivesPath = path.join(rootDir, 'src/tokens/primitives.json')
const semanticsPath = path.join(rootDir, 'src/tokens/semantic.json')
const outputDir = path.join(rootDir, 'src/generated')

const outputFiles = {
  primitivesCss: path.join(outputDir, 'primitives.css'),
  semanticCss: path.join(outputDir, 'semantic.css'),
  tokenDocs: path.join(outputDir, 'token-docs.ts'),
}

const checkMode = process.argv.includes('--check')

function isLeafToken(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.prototype.hasOwnProperty.call(value, 'value') &&
      Object.keys(value).every(key => key === 'value' || key === 'description')
  )
}

function toKebabCase(segment) {
  return String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

function toTitleCase(segment) {
  return String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function flattenTokens(tree, prefix = []) {
  const entries = []

  for (const [key, value] of Object.entries(tree)) {
    const nextPath = [...prefix, key]
    if (isLeafToken(value)) {
      entries.push({
        path: nextPath,
        rawValue: value.value,
      })
      continue
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenTokens(value, nextPath))
    }
  }

  return entries
}

function getToken(tree, tokenPath) {
  return tokenPath.reduce((current, segment) => {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      throw new Error(`Unknown token reference: ${tokenPath.join('.')}`)
    }
    return current[segment]
  }, tree)
}

function buildGroupedDocs(entries, prefix, type) {
  const groups = new Map()

  for (const entry of entries) {
    const [first, second, ...rest] = entry.path
    const groupKey = first === 'color' && second ? `${first}.${second}` : first
    const labelSegments = first === 'color' ? rest : [second, ...rest]
    const label = labelSegments.filter(Boolean).map(toTitleCase).join(' ')
    const groupLabel =
      first === 'color' && second
        ? `Color / ${toTitleCase(second)}`
        : toTitleCase(first)

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        key: groupKey,
        label: groupLabel,
        type,
        tokens: [],
      })
    }

    groups.get(groupKey).tokens.push({
      path: entry.path.join('.'),
      label,
      cssVar: entry.cssVar,
      value: entry.rawValue,
      resolvedValue: entry.resolvedValue,
    })
  }

  return Array.from(groups.values())
}

function resolveReferenceValue(referencePath, tokenSets, stack = []) {
  const refKey = referencePath.join('.')
  if (stack.includes(refKey)) {
    throw new Error(`Circular token reference detected: ${[...stack, refKey].join(' -> ')}`)
  }

  const sources = [
    { tree: tokenSets.primitives, type: 'primitive' },
    { tree: tokenSets.semantics, type: 'semantic' },
  ]

  for (const source of sources) {
    try {
      const token = getToken(source.tree, referencePath)
      if (!isLeafToken(token)) {
        throw new Error(`Reference does not point to a leaf token: ${refKey}`)
      }

      return {
        type: source.type,
        rawValue: token.value,
        resolvedValue: resolveValue(token.value, tokenSets, [...stack, refKey]),
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Unknown token reference:')) {
        continue
      }
      throw error
    }
  }

  throw new Error(`Unknown token reference: ${refKey}`)
}

function replaceReferences(value, tokenSets, mode, stack = []) {
  return String(value).replace(/\{([^}]+)\}/g, (_, rawReference) => {
    const referencePath = rawReference.split('.')
    const resolved = resolveReferenceValue(referencePath, tokenSets, stack)
    if (mode === 'css') {
      return resolved.type === 'primitive'
        ? `var(--primitive-${referencePath.map(toKebabCase).join('-')})`
        : `var(--${referencePath.map(toKebabCase).join('-')})`
    }

    return String(resolved.resolvedValue)
  })
}

function resolveValue(value, tokenSets, stack = []) {
  if (typeof value === 'string' && /\{[^}]+\}/.test(value)) {
    return replaceReferences(value, tokenSets, 'resolved', stack)
  }

  return value
}

function formatCssRule(name, value) {
  return `  ${name}: ${value};`
}

function sortEntries(entries) {
  const compareSegments = (left, right) => {
    const maxLength = Math.max(left.length, right.length)

    for (let index = 0; index < maxLength; index += 1) {
      const leftSegment = left[index]
      const rightSegment = right[index]

      if (leftSegment === undefined) {
        return -1
      }

      if (rightSegment === undefined) {
        return 1
      }

      const leftNumber = /^\d+$/.test(leftSegment) ? Number.parseInt(leftSegment, 10) : null
      const rightNumber = /^\d+$/.test(rightSegment) ? Number.parseInt(rightSegment, 10) : null

      if (leftNumber !== null && rightNumber !== null && leftNumber !== rightNumber) {
        return leftNumber - rightNumber
      }

      const comparison = leftSegment.localeCompare(rightSegment)
      if (comparison !== 0) {
        return comparison
      }
    }

    return 0
  }

  return [...entries].sort((a, b) => compareSegments(a.path.map(String), b.path.map(String)))
}

async function writeFileOrCheck(filePath, content) {
  if (checkMode) {
    const existing = await fs.readFile(filePath, 'utf8').catch(() => null)
    if (existing !== content) {
      throw new Error(`Generated file is out of date: ${path.relative(rootDir, filePath)}`)
    }
    return
  }

  await fs.writeFile(filePath, content)
}

async function main() {
  const primitives = JSON.parse(await fs.readFile(primitivesPath, 'utf8'))
  const semantics = JSON.parse(await fs.readFile(semanticsPath, 'utf8'))
  const tokenSets = { primitives, semantics }

  const primitiveEntries = sortEntries(
    flattenTokens(primitives).map(entry => ({
      ...entry,
      cssVar: `--primitive-${entry.path.map(toKebabCase).join('-')}`,
      resolvedValue: resolveValue(entry.rawValue, tokenSets),
    })),
  )

  const semanticEntries = sortEntries(
    flattenTokens(semantics).map(entry => ({
      ...entry,
      cssVar: `--${entry.path.map(toKebabCase).join('-')}`,
      resolvedValue: resolveValue(entry.rawValue, tokenSets),
      cssValue: replaceReferences(entry.rawValue, tokenSets, 'css'),
    })),
  )

  const primitivesCss = `/* This file is generated by scripts/generate-tokens.mjs. */\n:root {\n${primitiveEntries
    .map(entry => formatCssRule(entry.cssVar, entry.rawValue))
    .join('\n')}\n}\n`

  const semanticCss = `/* This file is generated by scripts/generate-tokens.mjs. */\n[data-brand="factory"] {\n${semanticEntries
    .map(entry => formatCssRule(entry.cssVar, entry.cssValue))
    .join('\n')}\n}\n`

  const primitiveGroups = buildGroupedDocs(primitiveEntries, 'primitive', 'primitive')
  const semanticGroups = buildGroupedDocs(semanticEntries, 'semantic', 'semantic')
  const feedbackTones = semanticEntries
    .filter(entry => entry.path[0] === 'color' && entry.path[1] === 'feedback' && !entry.path[2].includes('surface') && !entry.path[2].includes('border') && !entry.path[2].includes('text'))
    .map(entry => ({
      value: entry.path[2],
      label: toTitleCase(entry.path[2]),
      cssVar: entry.cssVar,
    }))

  const tokenDocs = `/* This file is generated by scripts/generate-tokens.mjs. */\nexport const primitiveGroups = ${JSON.stringify(primitiveGroups, null, 2)} as const;\n\nexport const semanticGroups = ${JSON.stringify(semanticGroups, null, 2)} as const;\n\nexport const semanticFeedbackTones = ${JSON.stringify(feedbackTones, null, 2)} as const;\n`

  await fs.mkdir(outputDir, { recursive: true })
  await writeFileOrCheck(outputFiles.primitivesCss, primitivesCss)
  await writeFileOrCheck(outputFiles.semanticCss, semanticCss)
  await writeFileOrCheck(outputFiles.tokenDocs, tokenDocs)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
