import { useState } from 'react'
import { primitiveGroups, semanticGroups } from '../generated/token-docs'
import { Alert } from '../components/Alert/Alert'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Icon, type IconName } from '../components/Icon/Icon'
import { InputField } from '../components/InputField/InputField'
import { Link } from '../components/Link/Link'
import { Radio } from '../components/Radio/Radio'
import { Select } from '../components/Select/Select'
import { Tabs } from '../components/Tab/Tab'
import { Textarea } from '../components/Textarea/Textarea'
import { Toggle } from '../components/Toggle/Toggle'
import {
  AccessibilityNotes,
  DoDontExamples,
  SpecPageLayout,
  StateMatrix,
  TokenMappingTable,
  UsageGuidance,
} from './components/SpecPrimitives'

export interface DocsRoute {
  path: string
  label: string
  section: 'Overview' | 'Foundations' | 'Components'
  element: React.ReactElement
}

const primitiveMap = new Map<string, (typeof primitiveGroups)[number]>(primitiveGroups.map(group => [group.key, group]))
function getPrimitiveGroup(key: string) {
  const group = primitiveMap.get(key)
  if (!group) {
    throw new Error(`Missing primitive group: ${key}`)
  }
  return group
}

function getSemanticToken(cssVar: string) {
  for (const group of semanticGroups) {
    const token = group.tokens.find(candidate => candidate.cssVar === cssVar)
    if (token) {
      return token
    }
  }

  throw new Error(`Missing semantic token: ${cssVar}`)
}

function PrimitiveRampGroup({ group }: { group: ReturnType<typeof getPrimitiveGroup> }) {
  return (
    <section className="palette-ramp">
      <div className="palette-ramp__header">
        <h3 className="spec-card__title">{group.label}</h3>
      </div>
      <div className="palette-ramp__track">
        {group.tokens.map(token => (
          <div className="palette-ramp__stop" key={token.path}>
            <div className="palette-ramp__sample" style={{ background: `var(${token.cssVar})` }} />
            <div className="palette-ramp__meta">
              <strong>{token.label}</strong>
              <span>{token.resolvedValue}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CuratedPaletteGroup({
  title,
  description,
  tokens,
}: {
  title: string
  description: string
  tokens: string[]
}) {
  return (
    <section className="curated-palette__group">
      <div className="curated-palette__intro">
        <h3 className="spec-card__title">{title}</h3>
        <p className="spec-card__copy">{description}</p>
      </div>
      <div className="curated-palette__swatches">
        {tokens.map(cssVar => {
          const token = getSemanticToken(cssVar)
          return (
            <div className="curated-swatch" key={cssVar}>
              <div className="curated-swatch__sample" style={{ background: `var(${token.cssVar})` }} />
              <div className="curated-swatch__meta">
                <strong>{token.label}</strong>
                <code>{token.cssVar}</code>
                <span>{token.resolvedValue}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TokenScale({ group }: { group: ReturnType<typeof getPrimitiveGroup> }) {
  return (
    <section className="spec-card">
      <h3 className="spec-card__title">{group.label}</h3>
      <div className="measure-list">
        {group.tokens.map(token => (
          <div className="measure-list__row" key={token.path}>
            <div className="measure-list__meta">
              <strong>{token.label}</strong>
              <code>{token.cssVar}</code>
            </div>
            <div className="measure-list__sample">
              {group.key === 'space' && <span className="measure-list__bar" style={{ width: `var(${token.cssVar})` }} />}
              {group.key === 'radius' && <span className="measure-list__pill" style={{ borderRadius: `var(${token.cssVar})` }} />}
              {group.key === 'borderWidth' && <span className="measure-list__line" style={{ borderBottomWidth: `var(${token.cssVar})` }} />}
              {group.key === 'elevation' && <span className="measure-list__shadow" style={{ boxShadow: `var(${token.cssVar})` }} />}
              {group.key === 'iconSize' && <Icon className="measure-list__icon" name="star-line" size={Number.parseInt(String(token.resolvedValue), 10)} />}
            </div>
            <span>{token.resolvedValue}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function OverviewPage() {
  return (
    <SpecPageLayout
      eyebrow="Overview"
      lede="A design token library generated from Figma variables and components. Every primitive, semantic, and component token, visualized."
      title="Factory Design System"
    >
      <section className="spec-section">
        <div className="overview-hero">
          <div className="overview-hero__body">
            <div className="spec-section__header">
              <h2 className="spec-section__title">What This System Is</h2>
              <p className="spec-section__copy">Factory Design System uses design-md and token-system methodology to turn Figma variables and components into a structured, inspectable interface system. The goal is not only to display tokens, but to show how primitives become semantics and how semantics drive component behavior.</p>
            </div>
            <div className="overview-showcase">
              <section className="overview-showcase__item">
                <p className="overview-showcase__label">Action</p>
                <Button leadingIcon={<Icon name="download-line" size={16} />} size="lg" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
              </section>
              <section className="overview-showcase__item">
                <p className="overview-showcase__label">Field</p>
                <InputField label="Project name" placeholder="Factory" />
              </section>
              <section className="overview-showcase__item">
                <p className="overview-showcase__label">Feedback</p>
                <Alert description="Blue stays informational only." title="Info" tone="info" />
              </section>
            </div>
          </div>
          <div className="overview-pillars">
            <section className="overview-pillar">
              <strong>Source</strong>
              <span>Figma variables and components</span>
            </section>
            <section className="overview-pillar">
              <strong>Method</strong>
              <span>{'primitive -> semantic -> component'}</span>
            </section>
            <section className="overview-pillar">
              <strong>Identity</strong>
              <span>orange, ink, square edges</span>
            </section>
            <section className="overview-pillar">
              <strong>Output</strong>
              <span>generated tokens and inspectable specs</span>
            </section>
          </div>
        </div>
      </section>

      <StateMatrix
        title="Token Flow"
        rows={[
          {
            state: 'Primitive',
            description: 'Raw scales coming from the token source: color ramps, spacing steps, border widths, elevation values, and type scales.',
            tokens: ['--primitive-color-orange-9', '--primitive-space-4', '--primitive-border-width-default'],
            preview: (
              <div className="example-row">
                <code className="spec-token-chip">orange.9</code>
                <code className="spec-token-chip">space.4</code>
                <code className="spec-token-chip">borderWidth.default</code>
              </div>
            ),
          },
          {
            state: 'Semantic',
            description: 'Role-based aliases that components actually consume: action, surface, text, border, feedback, focus, and layout.',
            tokens: ['--color-action-primary', '--color-surface-panel', '--color-feedback-info'],
            preview: (
              <div className="example-row">
                <Button size="sm">Primary</Button>
                <Badge tone="info" />
                <Alert title="Info" tone="info" />
              </div>
            ),
          },
          {
            state: 'Component',
            description: 'Runtime components bind semantic tokens to real slots and states so behavior stays consistent across the system.',
            tokens: ['--focus-outline-color', '--color-border-default', '--color-text-brand'],
            preview: (
              <div className="overview-strip">
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <InputField label="Project name" placeholder="Factory" />
                <Card description="Static card shell driven by semantic tokens." linkLabel="Inspect" title="Card" />
              </div>
            ),
          },
        ]}
      />

      <section className="spec-section">
        <div className="overview-grid">
          <section className="spec-card">
            <h2 className="spec-section__title">Reference Implementation</h2>
            <p className="spec-card__copy">The codebase for this system lives in the public repository and acts as the implementation-side companion to the Figma library.</p>
            <p className="spec-card__copy">
              <a className="spec-inline-link" href="https://github.com/nicolas-m-design/factory-design-system" rel="noreferrer" target="_blank">
                github.com/nicolas-m-design/factory-design-system
              </a>
            </p>
          </section>
          <section className="spec-card">
            <h2 className="spec-section__title">Design Inspiration</h2>
            <p className="spec-card__copy">The system draws from industrial editorial references rather than soft product-UI defaults. The main influence is not copied literally, but used to calibrate pace, tone, and confidence.</p>
            <p className="spec-card__copy">
              Brass Hands / Kyle Anthony Miller:
              {' '}
              <a className="spec-inline-link" href="https://brasshands.com" rel="noreferrer" target="_blank">
                brasshands.com
              </a>
            </p>
          </section>
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Documentation Sources</h2>
          <p className="spec-section__copy">These authored documents define policy, handoff rules, and component contracts. The routed spec pages render the system; they do not replace the underlying authored guidance.</p>
        </div>
        <div className="overview-grid">
          <section className="spec-card">
            <p className="spec-card__eyebrow">System Policy</p>
            <h3 className="spec-card__title">DESIGN.md</h3>
            <p className="spec-card__copy">Canonical design-language rules, route contract, artifact governance, and token policy.</p>
            <p className="spec-card__copy">
              <a className="spec-inline-link" href="https://github.com/nicolas-m-design/factory-design-system/blob/main/DESIGN.md" rel="noreferrer" target="_blank">
                Open DESIGN.md
              </a>
            </p>
          </section>
          <section className="spec-card">
            <p className="spec-card__eyebrow">Component Contracts</p>
            <h3 className="spec-card__title">component-specs.md</h3>
            <p className="spec-card__copy">Normalized anatomy, states, behavior, placement, accessibility, and responsive-stress rules for each component family.</p>
            <p className="spec-card__copy">
              <a className="spec-inline-link" href="https://github.com/nicolas-m-design/factory-design-system/blob/main/docs/component-specs.md" rel="noreferrer" target="_blank">
                Open component-specs.md
              </a>
            </p>
          </section>
          <section className="spec-card">
            <p className="spec-card__eyebrow">Figma Workflow</p>
            <h3 className="spec-card__title">figma-edit-checklist.md</h3>
            <p className="spec-card__copy">Execution checklist for token edits, component updates, page annotation rules, and responsive validation in Figma.</p>
            <p className="spec-card__copy">
              <a className="spec-inline-link" href="https://github.com/nicolas-m-design/factory-design-system/blob/main/docs/figma-edit-checklist.md" rel="noreferrer" target="_blank">
                Open figma-edit-checklist.md
              </a>
            </p>
          </section>
          <section className="spec-card">
            <p className="spec-card__eyebrow">Icon Policy</p>
            <h3 className="spec-card__title">icon-guidelines.md</h3>
            <p className="spec-card__copy">Approved icon subset, semantic sizing, color rules, placement rules, and growth policy for expanding the set.</p>
            <p className="spec-card__copy">
              <a className="spec-inline-link" href="https://github.com/nicolas-m-design/factory-design-system/blob/main/docs/icon-guidelines.md" rel="noreferrer" target="_blank">
                Open icon-guidelines.md
              </a>
            </p>
          </section>
        </div>
      </section>

      <AccessibilityNotes
        items={[
          'The system baseline is semantic-first: components should consume semantic tokens, not ad hoc values or primitive colors directly.',
          'Brutalist styling does not reduce accessibility obligations; focus visibility, labelling, contrast, and keyboard interaction remain first-order requirements.',
          'Overview pages should explain the system model clearly enough that product teams can understand how tokens, Figma, and runtime components relate.',
        ]}
      />
    </SpecPageLayout>
  )
}

function ColorsPage() {
  const primitiveColorKeys = ['color.orange', 'color.ink', 'color.sand', 'color.red', 'color.green', 'color.blue']

  return (
    <SpecPageLayout
      eyebrow="Foundations"
      lede="Orange and ink define the brand. Blue exists only as semantic information, never as a competing brand accent."
      title="Colors"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Curated Semantic Palette</h2>
          <p className="spec-section__copy">The first screen should show the few semantic decisions people actually need: action, surfaces, text, borders, and feedback. Full ramps stay below as reference material.</p>
        </div>
        <div className="curated-palette">
          <CuratedPaletteGroup
            description="Orange is the only brand and action family. Use it for calls to action and interactive emphasis."
            title="Brand & action"
            tokens={['--color-action-primary', '--color-action-primary-hover', '--color-action-primary-pressed', '--color-text-brand']}
          />
          <CuratedPaletteGroup
            description="Surfaces and reading hierarchy stay neutral so orange remains the only accent with brand weight."
            title="Surfaces & text"
            tokens={['--color-surface-page', '--color-surface-panel', '--color-text-primary', '--color-text-secondary']}
          />
          <CuratedPaletteGroup
            description="Borders stay structural by default. Semantic borders appear only when status meaning needs to surface."
            title="Boundaries"
            tokens={['--color-border-default', '--color-border-strong', '--color-border-brand', '--color-border-error']}
          />
          <CuratedPaletteGroup
            description="Feedback stays semantic. Blue is informational only; success, attention, and error stay role-based."
            title="Feedback"
            tokens={['--color-feedback-info', '--color-feedback-success', '--color-feedback-attention', '--color-feedback-error']}
          />
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Primitive Ramps</h2>
          <p className="spec-section__copy">The full ramps remain visible as reference material for token authorship, but they sit below semantics so the page starts with meaning rather than volume.</p>
        </div>
        <div className="palette-ramp-list">
          {primitiveColorKeys.map(key => (
            <PrimitiveRampGroup group={getPrimitiveGroup(key)} key={key} />
          ))}
        </div>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Brand emphasis',
            description: 'Orange handles interactive emphasis, primary actions, and brand-level highlights.',
            tokens: ['--color-action-primary', '--color-text-brand'],
            preview: (
              <div className="example-row">
                <Button>Primary action</Button>
                <Link>Brand link</Link>
              </div>
            ),
          },
          {
            state: 'Ink surfaces',
            description: 'Ink shades drive page surfaces, text hierarchy, and neutral boundaries.',
            tokens: ['--color-surface-page', '--color-text-primary', '--color-border-default'],
            preview: (
              <div className="spec-card">
                <p className="spec-card__eyebrow">Surface</p>
                <p className="spec-card__copy">Panels stay white or ink-tinted so orange remains the only brand signal.</p>
              </div>
            ),
          },
          {
            state: 'Informational blue',
            description: 'Blue appears only in semantic info states such as badges, alerts, and status messaging.',
            tokens: ['--color-feedback-info', '--color-feedback-info-surface'],
            preview: (
              <div className="example-row">
                <Badge tone="info" />
                <Alert description="Blue is informational only." tone="info" title="Info" />
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Treat orange as the only brand accent. If a decision is between orange and blue, orange wins unless the meaning is explicitly informational.',
          'Use ink surfaces and text for hierarchy; do not introduce cold neutrals or secondary brand hues in components.',
          'Choose semantic feedback tokens for badges and alerts instead of reusing action tokens as a shortcut.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Primary button fill', token: '--color-action-primary', rationale: 'Brand action color for all default calls to action.' },
          { slot: 'Page and panel surfaces', token: '--color-surface-page', rationale: 'Keeps the system anchored in ink-tinted neutrals.' },
          { slot: 'Default body text', token: '--color-text-primary', rationale: 'High-contrast ink text on light surfaces.' },
          { slot: 'Informational feedback', token: '--color-feedback-info', rationale: 'Reserved for semantic info only, never general branding.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use blue for informational UI such as info alerts, help badges, or passive status.',
            dont: 'Use blue for primary tabs, primary actions, or general section accents.',
          },
          {
            do: 'Map every component color to a semantic alias before using it in CSS.',
            dont: 'Reach for primitive swatches directly inside component styles.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Keep text and icon contrast at or above 4.5:1 on standard body-sized content.',
          'Do not rely on color alone to distinguish informational versus neutral meaning; use labels and icons where needed.',
          'Reserve the stronger orange focus ring for keyboard focus so interaction states remain visible on light and tinted surfaces.',
        ]}
      />
    </SpecPageLayout>
  )
}

function TypographyPage() {
  const roles = [
    {
      name: 'display',
      sample: 'Factory makes the system visible.',
      note: 'Page-level titles and high-importance system framing.',
    },
    {
      name: 'heading',
      sample: 'Section headings anchor the page.',
      note: 'Primary section titles inside docs and component specs.',
    },
    {
      name: 'body',
      sample: 'Body copy explains behavior, tradeoffs, and usage decisions.',
      note: 'Default reading copy for principles, notes, and guidance.',
    },
    {
      name: 'label',
      sample: 'Field label',
      note: 'UI labels and concise control-facing language.',
    },
    {
      name: 'caption',
      sample: 'Caption and support text',
      note: 'Support copy, metadata, and secondary descriptive text.',
    },
    {
      name: 'code',
      sample: '--color-action-primary',
      note: 'Token labels and implementation-facing references.',
    },
  ] as const

  return (
    <SpecPageLayout
      eyebrow="Foundations"
      lede="Geist Mono is the only display and interface typeface in the system. Roles, not ad hoc font sizes, drive usage."
      title="Typography"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Type Scale</h2>
          <p className="spec-section__copy">Typography roles are semantic, not decorative. The page starts with a readable specimen stack so the hierarchy is visible before the implementation detail.</p>
        </div>
        <div className="type-scale">
          {roles.map(role => (
            <section className="type-scale__row" key={role.name}>
              <p className={`type-role__sample type-role__sample--${role.name}`}>{role.sample}</p>
              <div className="type-scale__meta">
                <p className="type-role__name">{role.name}</p>
                <p className="spec-card__copy">{role.note}</p>
                <code className="spec-token-chip">{`--typography-${role.name}-size`}</code>
              </div>
            </section>
          ))}
        </div>
      </section>

      <StateMatrix
        rows={roles.map(role => ({
          state: role.name,
          description: `${role.name} is a semantic role, not a page-specific styling exception.`,
          tokens: [
            `--typography-${role.name}-size`,
            `--typography-${role.name}-line-height`,
            `--typography-${role.name}-weight`,
          ],
          preview: <p className={`type-role__sample type-role__sample--${role.name}`}>{role.sample}</p>,
        }))}
      />

      <UsageGuidance
        items={[
          'Use display only for high-importance hero or route titles. Do not downscale display into regular section titles.',
          'Use label for inputs, toggles, and compact control labelling; use caption for helper text and supporting metadata.',
          'Treat code as documentation language, not a second font family. Geist Mono stays canonical in both UI and specs.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Route title', token: '--typography-display-size', rationale: 'Large page-level titles that orient the reader.' },
          { slot: 'Section heading', token: '--typography-heading-size', rationale: 'Anchors major sections within spec pages and cards.' },
          { slot: 'Field label', token: '--typography-label-size', rationale: 'Compact, medium-weight labels for controls and metadata.' },
          { slot: 'Helper and token metadata', token: '--typography-caption-size', rationale: 'Small supporting text that stays readable but secondary.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use the predefined roles directly instead of introducing page-specific font stacks or one-off sizing.',
            dont: 'Bring back a second mono font for token labels or docs chrome.',
          },
          {
            do: 'Let weight and size change through semantic roles.',
            dont: 'Encode meaning by manually tweaking individual text nodes in component CSS.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Maintain readable line heights for dense monospace content; do not tighten body copy below the semantic line-height tokens.',
          'Use caption sparingly and keep it off critical instructions or primary action text.',
          'Preserve text contrast across light and inverse surfaces, especially for label and caption roles.',
        ]}
      />
    </SpecPageLayout>
  )
}

function LayoutPage() {
  const scaleKeys = ['space', 'radius', 'borderWidth', 'elevation', 'iconSize']
  const spaceGroup = getPrimitiveGroup('space')
  const borderWidthGroup = getPrimitiveGroup('borderWidth')
  const elevationGroup = getPrimitiveGroup('elevation')
  const iconSizeGroup = getPrimitiveGroup('iconSize')

  return (
    <SpecPageLayout
      eyebrow="Foundations"
      lede="Spacing, border width, hard corners, elevation, and icon sizing are documented as one structural system. Corner treatment is fixed at zero radius."
      title="Spacing & Structure"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Core Structure</h2>
          <p className="spec-section__copy">This page starts with the few structural rules teams need most often: spacing rhythm, border weight, hard corners, elevation, and icon-size slots.</p>
        </div>
        <div className="structure-grid">
          <section className="spec-card">
            <h3 className="spec-card__title">Spacing scale</h3>
            <div className="space-scale">
              {spaceGroup.tokens.map(token => (
                <div className="space-scale__item" key={token.path}>
                  <span className="space-scale__sample" style={{ width: `var(${token.cssVar})` }} />
                  <span className="space-scale__label">{token.label}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="spec-card">
            <h3 className="spec-card__title">Border and edge rules</h3>
            <div className="structure-stack">
              {borderWidthGroup.tokens.map(token => (
                <div className="measure-list__row" key={token.path}>
                  <div className="measure-list__meta">
                    <strong>{token.label}</strong>
                    <code>{token.cssVar}</code>
                  </div>
                  <div className="measure-list__sample">
                    <span className="measure-list__line" style={{ borderBottomWidth: `var(${token.cssVar})` }} />
                  </div>
                  <span>{token.resolvedValue}</span>
                </div>
              ))}
              <div className="hard-edge-note">
                <strong>Corner radius</strong>
                <span>0px everywhere</span>
              </div>
            </div>
          </section>
          <section className="spec-card">
            <h3 className="spec-card__title">Elevation</h3>
            <div className="structure-stack">
              {elevationGroup.tokens.map(token => (
                <div className="elevation-scale__item" key={token.path}>
                  <span className="measure-list__shadow" style={{ boxShadow: `var(${token.cssVar})` }} />
                  <div className="palette__meta">
                    <strong>{token.label}</strong>
                    <span>{token.resolvedValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="spec-card">
            <h3 className="spec-card__title">Icon slots</h3>
            <div className="icon-slot-scale">
              {iconSizeGroup.tokens.map(token => (
                <div className="icon-slot-scale__item" key={token.path}>
                  <Icon name="settings-3-line" size={Number.parseInt(String(token.resolvedValue), 10)} />
                  <div className="palette__meta">
                    <strong>{token.label}</strong>
                    <span>{token.resolvedValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Full Token Reference</h2>
          <p className="spec-section__copy">The complete raw scales remain below for authorship and implementation reference.</p>
        </div>
        <div className="spec-grid spec-grid--2">
          {scaleKeys.map(key => (
            <TokenScale group={getPrimitiveGroup(key)} key={key} />
          ))}
        </div>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Dense control spacing',
            description: 'Use the tighter end of the spacing scale for inline control layouts and icon-to-label gaps.',
            tokens: ['--primitive-space-2', '--layout-touch-target-min'],
            preview: <div className="measure-list__bar" style={{ width: 'var(--primitive-space-2)' }} />,
          },
          {
            state: 'Hard corners',
            description: 'The system uses zero radius everywhere. Shape differentiation comes from border weight, spacing, and contrast, not softened corners.',
            tokens: ['--radius-control', '--radius-panel'],
            preview: <div className="spec-card"><p className="spec-card__copy">All shells and controls keep square corners.</p></div>,
          },
          {
            state: 'Icon hierarchy',
            description: 'Icons scale by slot, not by guesswork. Control icons stay smaller than emphasis icons.',
            tokens: ['--icon-size-control', '--icon-size-body', '--icon-size-emphasis'],
            preview: (
              <div className="example-row">
                <Icon name="settings-3-line" size={16} />
                <Icon name="settings-3-line" size={20} />
                <Icon name="settings-3-line" size={24} />
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Use semantic layout tokens such as page inset and section gap to structure docs pages before reaching for raw spacing primitives.',
          'Keep controls at or above the touch target minimum and preserve the fixed square-corner treatment across the system.',
          'Use raised elevation sparingly for hover/focus emphasis and keep overlay elevation for menus or modal layers.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Control border width', token: '--border-width-control', rationale: 'Default control and divider thickness.' },
          { slot: 'Control corners', token: '--radius-control', rationale: 'Controls are intentionally square, with no secondary rounding system.' },
          { slot: 'Panel corners', token: '--radius-panel', rationale: 'Cards, alerts, and spec panels stay in the same hard-edge family.' },
          { slot: 'Hover elevation', token: '--elevation-raised', rationale: 'Used for interactive card lift and similar emphasis.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use the icon-size tokens to keep icon rhythm consistent across buttons, tabs, and alerts.',
            dont: 'Hardcode slightly different icon sizes per component because they “look right” in isolation.',
          },
          {
            do: 'Keep the corner treatment consistently square across every component family.',
            dont: 'Reintroduce rounded cards, pill tabs, or soft inputs that dilute the identity.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Touch targets should stay at or above 44px on interactive controls and tappable card variants.',
          'Keep focus outlines outside the control bounds so they remain visible on tinted surfaces.',
          'Use elevation to reinforce interactivity, not to replace contrast or focus visibility.',
        ]}
      />
    </SpecPageLayout>
  )
}

function IconsPage() {
  const iconGroups: Array<{ label: string; icons: IconName[] }> = [
    { label: 'Navigation', icons: ['menu-line', 'arrow-left-line', 'arrow-right-line', 'search-line'] },
    { label: 'Actions', icons: ['add-line', 'download-line', 'upload-line', 'settings-3-line', 'delete-bin-line'] },
    { label: 'Feedback', icons: ['information-fill', 'checkbox-circle-fill', 'error-warning-fill', 'close-line'] },
    { label: 'Content', icons: ['file-text-line', 'folder-line', 'clipboard-line', 'image-line'] },
    { label: 'People & Media', icons: ['user-line', 'group-line', 'play-circle-line', 'chat-3-line'] },
  ]

  return (
    <SpecPageLayout
      eyebrow="Foundations"
      lede="The icon page is a curated approved subset. It documents what is allowed in the system and how those icons map to semantic sizes."
      title="Icons"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Approved Subset</h2>
          <p className="spec-section__copy">These are the icons currently approved for repeated design-system use. Adding more icons should be intentional and category-driven.</p>
        </div>
        <div className="spec-grid spec-grid--2">
          {iconGroups.map(group => (
            <section className="spec-card" key={group.label}>
              <h3 className="spec-card__title">{group.label}</h3>
              <div className="icon-grid">
                {group.icons.map(icon => (
                  <div className="icon-grid__item" key={icon}>
                    <Icon name={icon} size={24} />
                    <code>{icon}</code>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Control icon',
            description: 'Used inside buttons, tabs, and compact controls.',
            tokens: ['--icon-size-control'],
            preview: <Icon name="download-line" size={16} />,
          },
          {
            state: 'Body icon',
            description: 'Used beside text in alerts and inline descriptive UI.',
            tokens: ['--icon-size-body'],
            preview: <Icon name="information-fill" size={20} />,
          },
          {
            state: 'Emphasis icon',
            description: 'Used when the icon itself needs to read as a stronger signal, such as curated illustrations or highlighted states.',
            tokens: ['--icon-size-emphasis'],
            preview: <Icon name="star-fill" size={24} />,
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Use the approved subset first. If a product flow needs a new icon, add it to the curated set with a clear category and reason.',
          'Prefer line icons for navigation and actions, and filled icons for feedback/status contexts.',
          'Keep icons semantic: they reinforce meaning, they do not replace visible labels on their own.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Button and tab adornments', token: '--icon-size-control', rationale: 'Compact size for high-density controls.' },
          { slot: 'Alert and helper icon', token: '--icon-size-body', rationale: 'Balances with body text without overpowering it.' },
          { slot: 'Highlighted motifs', token: '--icon-size-emphasis', rationale: 'Largest icon size for stronger emphasis or decorative support.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Keep the primary artifact curated and intentional.',
            dont: 'Present the system as a full upstream icon dump.',
          },
          {
            do: 'Scale icons through the icon-size semantic tokens.',
            dont: 'Hand-tune icon sizes per component or per route.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Icons that communicate meaning should be paired with visible text or accessible labelling.',
          'Decorative icons should be marked decorative in component usage so screen readers are not forced to announce them.',
          'Keep icon contrast consistent with the text or state they accompany.',
        ]}
      />
    </SpecPageLayout>
  )
}

function ButtonsPage() {
  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Buttons use a square, hard-edge shell. Primary carries the orange brand fill; secondary stays white with orange border and type."
      title="Buttons"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Size Specimens</h2>
          <p className="spec-section__copy">The first view of the button spec should read like a reference board: one size per row, with primary, secondary, and disabled treated as side-by-side specimens rather than a mini data table.</p>
        </div>
        <section className="button-board">
          <section className="button-board__row">
            <div className="button-board__heading">
              <span className="button-board__label">Large</span>
              <p className="button-board__copy">High-emphasis actions in spacious layouts and hero-level decisions.</p>
            </div>
            <div className="button-board__specimens">
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="lg" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="lg" trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              <Button disabled leadingIcon={<Icon name="download-line" size={16} />} size="lg" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
            </div>
          </section>
          <section className="button-board__row">
            <div className="button-board__heading">
              <span className="button-board__label">Medium</span>
              <p className="button-board__copy">Default action size for forms, toolbars, and most in-flow product surfaces.</p>
            </div>
            <div className="button-board__specimens">
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="md" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="md" trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              <Button disabled leadingIcon={<Icon name="download-line" size={16} />} size="md" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
            </div>
          </section>
          <section className="button-board__row">
            <div className="button-board__heading">
              <span className="button-board__label">Small</span>
              <p className="button-board__copy">Dense utility contexts where the action still needs a full, readable shell.</p>
            </div>
            <div className="button-board__specimens">
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="sm" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
              <Button leadingIcon={<Icon name="download-line" size={16} />} size="sm" trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              <Button disabled leadingIcon={<Icon name="download-line" size={16} />} size="sm" trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
            </div>
          </section>
        </section>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Default',
            description: 'Primary owns the brand fill. Secondary stays white and only borrows orange for border and type.',
            tokens: ['--color-action-primary', '--color-text-brand'],
            preview: (
              <div className="example-row">
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              </div>
            ),
          },
          {
            state: 'Hover',
            description: 'Hover darkens primary and warms the secondary fill without introducing new colors.',
            tokens: ['--color-action-primary-hover', '--color-action-secondary-surface-hover'],
            preview: (
              <div className="example-row example-state--button-hover">
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              </div>
            ),
          },
          {
            state: 'Focus',
            description: 'Focus uses an external orange frame instead of soft glows or shadow blur.',
            tokens: ['--focus-outline-color', '--focus-outline-width'],
            preview: (
              <div className="example-row example-state--button-focus">
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              </div>
            ),
          },
          {
            state: 'Pressed',
            description: 'Pressed states move deeper into the same semantic family instead of shifting to unrelated tones.',
            tokens: ['--color-action-primary-pressed', '--color-action-secondary-surface-pressed'],
            preview: (
              <div className="example-row example-state--button-pressed">
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <Button leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              </div>
            ),
          },
          {
            state: 'Disabled',
            description: 'Disabled buttons keep the square shell but switch to neutral border and muted text instead of fading away.',
            tokens: ['--color-border-subtle', '--color-text-muted'],
            preview: (
              <div className="example-row">
                <Button disabled leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />}>Primary</Button>
                <Button disabled leadingIcon={<Icon name="download-line" size={16} />} trailingIcon={<Icon name="arrow-right-line" size={16} />} variant="secondary">Secondary</Button>
              </div>
            ),
          },
          {
            state: 'Loading',
            description: 'Loading keeps layout stable, swaps icon affordance for an inline spinner, and blocks repeated activation.',
            tokens: ['--icon-size-control', '--opacity-disabled'],
            preview: (
              <div className="example-row">
                <Button loading>Saving</Button>
                <Button loading variant="secondary">Loading</Button>
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Reserve primary for the highest-priority action in a given region and let secondary handle supporting actions.',
          'Prefer explicit leading and trailing icons only when they add directional or status meaning.',
          'Loading buttons should keep their label so users do not lose context once progress begins.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Primary fill and border', token: '--color-action-primary', rationale: 'Default brand action state.' },
          { slot: 'Secondary hover fill', token: '--color-action-secondary-surface-hover', rationale: 'Warm hover feedback without changing to a different family.' },
          { slot: 'Focus outline', token: '--focus-outline-color', rationale: 'Shared keyboard focus treatment across components.' },
          { slot: 'Disabled affordance', token: '--color-text-muted', rationale: 'Disabled actions keep the shell but mute the label and border language.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Show loading inline in the button that initiated the action.',
            dont: 'Replace the label with a spinner-only treatment that removes action context.',
          },
          {
            do: 'Keep the primary/secondary distinction semantic and stable across the app.',
            dont: 'Invent per-page button color treatments or ghost variants without token support.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Buttons must keep a clearly visible focus ring on keyboard focus.',
          'Do not rely on color alone to signal disabled or loading; preserve label text and cursor/interaction changes.',
          'Maintain the minimum touch target height across all button sizes.',
        ]}
      />
    </SpecPageLayout>
  )
}

function FormsPage() {
  const [radioValue, setRadioValue] = useState('selected')
  const [checkOne, setCheckOne] = useState(false)
  const [checkTwo, setCheckTwo] = useState(true)
  const [toggleValue, setToggleValue] = useState(true)

  const options = [
    { value: 'alpha', label: 'Alpha' },
    { value: 'beta', label: 'Beta' },
    { value: 'gamma', label: 'Gamma' },
  ]

  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Forms use the same hard-edge system as the rest of the library: square fields, visible labels, external focus frames, and no decorative rounding."
      title="Forms"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Field Patterns</h2>
          <p className="spec-section__copy">The first read of Forms should show the field family clearly: text entry on one side, binary controls on the other, with the same square shell and focus language carried across both.</p>
        </div>
        <div className="forms-board">
          <section className="spec-card">
            <h3 className="spec-card__title">Text fields</h3>
            <div className="forms-preview forms-preview--stacked">
              <InputField helperText="Supporting detail" label="Project name" placeholder="Factory" />
              <Select helperText="Choose one" label="Theme" options={options} placeholder="Choose a theme" />
              <Textarea helperText="Describe the setup" label="Notes" placeholder="Warm industrial direction" />
            </div>
          </section>
          <section className="spec-card">
            <h3 className="spec-card__title">Selection controls</h3>
            <div className="example-stack">
              <Checkbox checked={checkOne} label="Unchecked / checked" onChange={setCheckOne} />
              <Checkbox checked={checkTwo} label="Persisted value" onChange={setCheckTwo} />
              <Radio checked={radioValue === 'selected'} label="Selected" name="radio-demo" onChange={setRadioValue} value="selected" />
              <Radio checked={radioValue === 'default'} label="Default" name="radio-demo" onChange={setRadioValue} value="default" />
              <Toggle checked={toggleValue} label="Receive updates" onChange={setToggleValue} />
            </div>
          </section>
        </div>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Default',
            description: 'Standard label, field shell, and helper text behavior across input, select, and textarea.',
            tokens: ['--color-border-default', '--typography-label-size', '--typography-body-size'],
            preview: (
              <div className="forms-preview">
                <InputField helperText="Supporting detail" label="Project name" placeholder="Factory" />
                <Select helperText="Choose one" label="Theme" options={options} placeholder="Choose a theme" />
              </div>
            ),
          },
          {
            state: 'Hover and focus',
            description: 'Hover strengthens the border; focus adds an external frame without changing the field box model.',
            tokens: ['--color-border-strong', '--focus-outline-color'],
            preview: (
              <div className="forms-preview">
                <div className="example-state--field-hover"><InputField label="Hover" placeholder="Hover state" /></div>
                <div className="example-state--field-focus"><InputField label="Focus" placeholder="Focus state" /></div>
              </div>
            ),
          },
          {
            state: 'Error',
            description: 'Error state changes border and message semantics while preserving the shared field shell.',
            tokens: ['--color-border-error', '--color-feedback-error-text'],
            preview: (
              <div className="forms-preview">
                <InputField error="Name is required." label="Name" placeholder="Required" />
                <Select error="Choose a valid option." label="Category" options={options} value="alpha" />
              </div>
            ),
          },
          {
            state: 'Disabled and read-only',
            description: 'Disabled removes interaction; read-only stays visible and legible while preventing edits.',
            tokens: ['--opacity-disabled', '--color-surface-panel-muted'],
            preview: (
              <div className="forms-preview">
                <InputField disabled label="Disabled field" value="Locked" />
                <InputField label="Read-only field" readOnly value="Stable" />
                <Select label="Read-only select" options={options} readOnly value="beta" />
              </div>
            ),
          },
        ]}
      />

      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Date and Extension Guidance</h2>
          <p className="spec-section__copy">Future field types should inherit the same shell rather than introducing a new surface language.</p>
        </div>
        <section className="spec-card">
          <p className="spec-card__copy">Date input remains documentation-only in this phase. It should inherit the same field shell, helper and error text, read-only treatment, keyboard focus framing, and square-corner construction as the existing field components.</p>
        </section>
      </section>

      <UsageGuidance
        items={[
          'Every field should have a visible label. Helper text explains intent; error text explains correction.',
          'Use read-only when a value should remain selectable and visible but not editable; use disabled when the control should drop out of the interaction flow.',
          'Apply the same field shell and messaging conventions to future select/date patterns rather than branching into a separate visual language.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Default control border', token: '--color-border-default', rationale: 'Base field outline for neutral state.' },
          { slot: 'Focused control outline', token: '--focus-outline-color', rationale: 'Shared keyboard focus affordance.' },
          { slot: 'Read-only surface', token: '--color-surface-panel-muted', rationale: 'Differentiates non-editable values without lowering contrast too far.' },
          { slot: 'Error text and border', token: '--color-feedback-error-text', rationale: 'Pairs message semantics with error state borders.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Keep labels, helper text, and error text wired through one field shell.',
            dont: 'Let select and textarea variants invent their own labelling or message placement.',
          },
          {
            do: 'Document date-field behavior as part of the forms contract even before shipping a runtime component.',
            dont: 'Leave future field types to guess their states independently.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Every form field needs a visible label and programmatic association via `htmlFor` and control `id`.',
          'Preserve keyboard focus visibility and do not remove the outline for custom controls.',
          'Read-only fields should remain perceivable and selectable; disabled fields should not receive focus.',
        ]}
      />
    </SpecPageLayout>
  )
}

function LinksPage() {
  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Links now document default, hover, focus, visited, disabled, and inverse appearances so inline actions follow the same rules everywhere."
      title="Links"
    >
      <StateMatrix
        rows={[
          {
            state: 'Default',
            description: 'Default links use the brand token and underline from the start.',
            tokens: ['--color-text-link'],
            preview: <Link>Inline link</Link>,
          },
          {
            state: 'Hover',
            description: 'Hover deepens the brand signal without changing the component family.',
            tokens: ['--color-text-link-hover'],
            preview: <div className="example-state--link-hover"><Link>Hovered link</Link></div>,
          },
          {
            state: 'Focus',
            description: 'Keyboard focus keeps the link recognisable while applying the shared outline.',
            tokens: ['--focus-outline-color'],
            preview: <div className="example-state--link-focus"><Link>Focused link</Link></div>,
          },
          {
            state: 'Visited',
            description: 'Visited is a browser state expressed through its own semantic text token.',
            tokens: ['--color-text-link-visited'],
            preview: <div className="example-state--link-visited"><Link href="/visited">Visited link</Link></div>,
          },
          {
            state: 'Disabled',
            description: 'Disabled links reduce emphasis and drop out of the interaction model.',
            tokens: ['--opacity-disabled'],
            preview: <Link disabled>Unavailable link</Link>,
          },
          {
            state: 'Inverse',
            description: 'Inverse links are reserved for dark surfaces and keep contrast against ink backgrounds.',
            tokens: ['--color-text-inverse'],
            preview: (
              <div className="inverse-surface">
                <Link appearance="inverse">Inverse link</Link>
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Keep links inline and textual; use buttons for primary calls to action.',
          'Use inverse links only on clearly dark surfaces and keep them rare.',
          'Visited state should help orientation, not become a second design accent.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Default label and underline', token: '--color-text-link', rationale: 'Brand-colored inline action state.' },
          { slot: 'Hover response', token: '--color-text-link-hover', rationale: 'Deeper brand emphasis on hover.' },
          { slot: 'Visited state', token: '--color-text-link-visited', rationale: 'Browser-driven memory signal.' },
          { slot: 'Inverse surface use', token: '--color-text-inverse', rationale: 'Maintains readability on ink surfaces.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use links for navigation and secondary inline actions.',
            dont: 'Style links like primary buttons or remove the underline until hover.',
          },
          {
            do: 'Allow visited state to remain a subtle memory aid.',
            dont: 'Override visited state per page and lose browsing context.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Inline links need a visible focus state and enough contrast against the surrounding text.',
          'Do not rely on color alone; the underline should remain visible so links are identifiable before hover.',
          'Disabled links should not be focusable or clickable.',
        ]}
      />
    </SpecPageLayout>
  )
}

function TabsPage() {
  const [value, setValue] = useState('overview')

  const items = [
    {
      value: 'overview',
      label: 'Overview',
      content: <p className="spec-card__copy">Tabs are a navigation control, not a second page heading system.</p>,
    },
    {
      value: 'assets',
      label: 'Assets',
      icon: 'image-line' as const,
      content: <p className="spec-card__copy">Icon tabs stay in the same orange/ink family rather than reverting to a legacy blue style.</p>,
    },
    {
      value: 'activity',
      label: 'Activity',
      count: 12,
      content: <p className="spec-card__copy">Counts use the tab’s secondary surface, not badge action tokens.</p>,
    },
  ]

  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Tabs now follow the canonical orange/ink system and include keyboard behavior, icon/count patterns, and overflow guidance."
      title="Tabs"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Interactive Demo</h2>
          <p className="spec-section__copy">The runtime tab component supports keyboard navigation, explicit tab-panel ids, icons, counts, and disabled items.</p>
        </div>
        <Tabs
          ariaLabel="Factory tabs"
          items={[
            ...items,
            {
              value: 'disabled',
              label: 'Disabled',
              disabled: true,
              content: <p className="spec-card__copy">Disabled tabs stay visible but unavailable.</p>,
            },
          ]}
          onValueChange={setValue}
          value={value}
        />
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Default',
            description: 'Default tabs use secondary text and strengthen on selection.',
            tokens: ['--color-text-secondary', '--color-text-brand'],
            preview: <Tabs items={items} value="overview" />,
          },
          {
            state: 'With icon',
            description: 'Icons support meaning but do not replace labels.',
            tokens: ['--icon-size-control'],
            preview: <Tabs items={items} value="assets" />,
          },
          {
            state: 'With number',
            description: 'Counts remain secondary to the tab label and use the tab surface family.',
            tokens: ['--color-surface-panel-muted', '--color-border-subtle'],
            preview: <Tabs items={items} value="activity" />,
          },
          {
            state: 'Focus',
            description: 'Tabs follow the same keyboard-visible focus ring as the rest of the system.',
            tokens: ['--focus-outline-color'],
            preview: <div className="example-state--tab-focus"><Tabs items={items} value="overview" /></div>,
          },
          {
            state: 'Overflow / mobile',
            description: 'When labels overflow, keep the list horizontally scrollable rather than shrinking hit areas below the touch target minimum.',
            tokens: ['--layout-touch-target-min', '--layout-page-inset'],
            preview: (
              <div className="narrow-example">
                <Tabs
                  items={[
                    { value: 'first', label: 'Overview' },
                    { value: 'second', label: 'Specifications' },
                    { value: 'third', label: 'Accessibility' },
                    { value: 'fourth', label: 'Release Notes' },
                  ]}
                  value="first"
                />
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Tabs switch sibling content panels. Use route navigation when the content deserves a URL and standalone page state.',
          'Preserve readable labels even on narrow screens. Horizontal overflow is preferable to tiny or truncated tap targets.',
          'Icon and count adornments are supporting metadata; labels remain the primary affordance.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Selected label', token: '--color-text-brand', rationale: 'Selected tab state aligned to the brand color system.' },
          { slot: 'Unselected label', token: '--color-text-secondary', rationale: 'Keeps inactive tabs visible but secondary.' },
          { slot: 'Indicator bar', token: '--color-action-primary', rationale: 'Selected tab underline uses the canonical action tone.' },
          { slot: 'Count chip surface', token: '--color-surface-panel-muted', rationale: 'Count surface stays secondary and non-brand-dominant.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Keep tabs in the canonical orange/ink language.',
            dont: 'Reintroduce a separate blue tab system or legacy type styling.',
          },
          {
            do: 'Support arrow-key, Home, and End navigation.',
            dont: 'Ship tabs that only work by pointer input.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Tabs require `role="tablist"`, `role="tab"`, `role="tabpanel"`, and correct `aria-selected`, `aria-controls`, and `aria-labelledby` wiring.',
          'Arrow key navigation should move between enabled tabs; Home and End should jump to the first and last enabled tab.',
          'Keep focus visible on tabs and do not hide overflow in a way that makes off-screen tabs unreachable on touch devices.',
        ]}
      />
    </SpecPageLayout>
  )
}

function BadgesPage() {
  const tones = [
    { label: 'Brand', tone: 'brand' as const },
    { label: 'Informational', tone: 'info' as const },
  ]

  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Keep the badge system to two states and an explicit max overflow rule so informational badges stay structural instead of borrowing action fills."
      title="Badges"
    >
      <section className="spec-section">
        <div className="spec-section__header">
          <h2 className="spec-section__title">Tone Gallery</h2>
          <p className="spec-section__copy">Brand is the only action-toned badge. Informational stays structural and neutral.</p>
        </div>
        <div className="spec-grid spec-grid--3">
          {tones.map(({ label, tone }) => (
            <section className="spec-card" key={tone}>
              <h3 className="spec-card__title">{label}</h3>
              <div className="example-row">
                <Badge tone={tone} />
                <Badge count={5} tone={tone} />
                <Badge count={245} max={99} tone={tone} />
              </div>
            </section>
          ))}
        </div>
      </section>

      <StateMatrix
        rows={[
          {
            state: 'Dot',
            description: 'Dot badges signal presence without numeric detail.',
            tokens: ['--border-width-control'],
            preview: <Badge tone="info" />,
          },
          {
            state: 'Count',
            description: 'Single or multi-digit counts stay legible without shifting to a different component family.',
            tokens: ['--color-feedback-info-surface', '--color-feedback-info-text'],
            preview: <div className="example-row"><Badge count={7} tone="info" /><Badge count={42} tone="info" /></div>,
          },
          {
            state: 'Overflow',
            description: 'Overflow is explicit through `max`, which keeps layout predictable and avoids oversized pills.',
            tokens: ['--border-width-control'],
            preview: <Badge count={120} max={99} tone="brand" />,
          },
          {
            state: 'Placement',
            description: 'Use badges as supporting metadata near controls, tabs, or navigation entries rather than as primary UI.',
            tokens: ['--color-surface-page'],
            preview: (
              <div className="example-row">
                <span className="placement-chip">Inbox <Badge count={9} tone="info" /></span>
                <span className="placement-chip">Updates <Badge tone="info" /></span>
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Use brand tone only when the badge is explicitly part of the core brand/action language.',
          'Prefer neutral or informational tones for passive metadata; reserve success, attention, and error for semantic status.',
          'Set overflow rules explicitly with `max` so counts remain predictable in dense UI.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Brand badge fill', token: '--color-action-primary', rationale: 'The only action-toned badge treatment.' },
          { slot: 'Neutral badge surface', token: '--color-feedback-neutral-surface', rationale: 'Passive metadata without action semantics.' },
          { slot: 'Info badge surface', token: '--color-feedback-info-surface', rationale: 'Semantic informational count or marker.' },
          { slot: 'Error badge text', token: '--color-feedback-error-text', rationale: 'Critical status signalling inside the feedback family.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use semantic feedback tones for informational and neutral badges.',
            dont: 'Borrow the action-orange tokens for every badge fill.',
          },
          {
            do: 'Treat badges as secondary metadata near a parent control or object.',
            dont: 'Use badges as the primary label or only visible text in a layout.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Badge counts should be paired with accessible labels so assistive tech announces what the number refers to.',
          'Keep badge sizes readable and avoid shrinking them below legible text thresholds.',
          'Do not use tone alone to convey meaning when the badge appears without nearby explanatory text.',
        ]}
      />
    </SpecPageLayout>
  )
}

function AlertsPage() {
  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Alerts now separate neutral and informational semantics, support optional icon/action/dismiss behavior, and document when `status` versus `alert` is appropriate."
      title="Alerts"
    >
      <StateMatrix
        rows={[
          {
            state: 'Neutral vs info',
            description: 'Neutral stays white and ink-based. Informational blue is a true semantic info variant.',
            tokens: ['--color-feedback-neutral-surface', '--color-feedback-info-surface'],
            preview: (
              <div className="alert-stack">
                <Alert description="Neutral status uses the white/ink family." title="Neutral" tone="neutral" />
                <Alert description="Informational messaging uses the blue semantic family." title="Info" tone="info" />
              </div>
            ),
          },
          {
            state: 'Dismissible / non-dismissible',
            description: 'Dismiss affordances are optional and should only appear when the message lifecycle supports user dismissal.',
            tokens: ['--border-width-control', '--focus-outline-color'],
            preview: (
              <div className="alert-stack">
                <Alert description="Dismiss can be explicit when the product supports it." dismissible title="Dismissible" tone="success" />
                <Alert description="Some status messages should remain present without user dismissal." title="Persistent" tone="neutral" />
              </div>
            ),
          },
          {
            state: 'Icon / no icon',
            description: 'Icons are optional reinforcement. The tone and copy should still read correctly without them.',
            tokens: ['--icon-size-control'],
            preview: (
              <div className="alert-stack">
                <Alert description="Icon shown." title="With icon" tone="attention" />
                <Alert description="No icon shown." showIcon={false} title="Without icon" tone="attention" />
              </div>
            ),
          },
          {
            state: 'Title / body / action',
            description: 'Title, body, and action compose into one panel rather than separate visual treatments.',
            tokens: ['--color-text-primary', '--color-feedback-error-text'],
            preview: <Alert action={{ label: 'Review details', href: '#' }} description="Body copy explains the issue and what the action does." title="Actionable alert" tone="error" />,
          },
          {
            state: 'Stacked behavior',
            description: 'Alert stacks should keep consistent panel spacing and avoid collapsing into one merged surface.',
            tokens: ['--layout-panel-gap'],
            preview: (
              <div className="alert-stack">
                <Alert description="First stack item." title="Queued sync" tone="neutral" />
                <Alert description="Second stack item." title="Upload paused" tone="attention" />
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Use neutral for passive system status, info for blue informational messaging, attention for caution, and error for disruptive failure.',
          'Alert actions should be few and clear; if the message carries the primary screen action, it likely wants a different layout.',
          'Stack alerts with deliberate spacing and consistent panel widths rather than letting them collapse into generic content boxes.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Neutral alert border', token: '--color-feedback-neutral-border', rationale: 'White/ink alert without implying semantic blue info.' },
          { slot: 'Info alert surface', token: '--color-feedback-info-surface', rationale: 'Dedicated informational background.' },
          { slot: 'Attention and error copy', token: '--color-feedback-attention-text', rationale: 'Tone-specific text that remains readable on tinted surfaces.' },
          { slot: 'Dismiss control', token: '--color-border-subtle', rationale: 'Dismiss affordance uses the same square bordered control language as the rest of the system.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Keep the current white alert as neutral and add true blue info as a separate tone.',
            dont: 'Call every white alert “info” and lose the semantic distinction.',
          },
          {
            do: 'Use `status` for non-disruptive messaging and `alert` for disruptive caution/error.',
            dont: 'Announce every passive update assertively to assistive technology.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Use `role="status"` for non-disruptive alerts and `role="alert"` only for disruptive attention/error messages.',
          'Keep dismiss buttons keyboard reachable and clearly labelled.',
          'Alert stacks should remain readable in source order so assistive technologies announce them predictably.',
        ]}
      />
    </SpecPageLayout>
  )
}

function CardsPage() {
  return (
    <SpecPageLayout
      eyebrow="Components"
      lede="Cards are documented as either static panels or clickable containers, with explicit image ratio guidance and CTA hierarchy."
      title="Cards"
    >
      <StateMatrix
        rows={[
          {
            state: 'Static',
            description: 'Static cards hold content without implying full-surface interaction.',
            tokens: ['--color-surface-panel', '--color-border-default'],
            preview: <Card description="Static cards use explicit CTAs when needed." linkLabel="Open detail" title="Static card" />,
          },
          {
            state: 'Clickable',
            description: 'Clickable cards lift on hover/focus and let the entire surface behave as the link target.',
            tokens: ['--elevation-raised', '--color-border-brand'],
            preview: <Card description="The whole card is interactive." interactive linkHref="#" linkLabel="Read more" title="Clickable card" />,
          },
          {
            state: 'Hover / focus',
            description: 'Interactive cards use subtle lift and border emphasis instead of inventing a separate color family.',
            tokens: ['--elevation-raised', '--focus-outline-color'],
            preview: (
              <div className="example-state--card-hover">
                <Card description="Hover preview" interactive linkHref="#" linkLabel="Inspect" title="Hover card" />
              </div>
            ),
          },
          {
            state: 'Image ratio',
            description: 'Square and landscape imagery are both documented so media treatments remain predictable.',
            tokens: ['--color-border-default', '--color-surface-panel'],
            preview: (
              <div className="card-grid">
                <Card image="/star.png" imageRatio="square" title="Square media" />
                <Card image="/star.png" imageRatio="landscape" title="Landscape media" />
              </div>
            ),
          },
          {
            state: 'CTA hierarchy',
            description: 'Static cards can expose an explicit CTA; interactive cards should not duplicate the same action as an inner link.',
            tokens: ['--color-text-brand'],
            preview: (
              <div className="card-grid">
                <Card description="Explicit CTA inside a static card." linkLabel="Learn more" title="Static CTA" />
                <Card description="Whole surface click target." interactive linkHref="#" linkLabel="Open card" title="Interactive CTA" />
              </div>
            ),
          },
        ]}
      />

      <UsageGuidance
        items={[
          'Choose static or clickable cards intentionally; do not combine a full-surface link with redundant inner action links.',
          'Keep the card family visually consistent with other panels by reusing the same square shell and border treatment.',
          'Document media ratios up front so content teams know which card patterns are available.',
        ]}
      />

      <TokenMappingTable
        rows={[
          { slot: 'Card shell', token: '--color-surface-panel', rationale: 'Base panel surface for static and interactive cards.' },
          { slot: 'Card border', token: '--color-border-default', rationale: 'Default separation on light surfaces.' },
          { slot: 'Interactive hover lift', token: '--elevation-raised', rationale: 'Hover/focus emphasis for clickable cards.' },
          { slot: 'CTA text', token: '--color-text-brand', rationale: 'Explicit CTA accent within the brand language.' },
        ]}
      />

      <DoDontExamples
        pairs={[
          {
            do: 'Use hover/focus lift to signal clickable cards.',
            dont: 'Make static cards look interactive or interactive cards look inert.',
          },
          {
            do: 'Keep image ratios explicit and reusable.',
            dont: 'Let each card invent its own media framing without documentation.',
          },
        ]}
      />

      <AccessibilityNotes
        items={[
          'Clickable cards need clear focus visibility and a discernible accessible name from their text content.',
          'Avoid nested interactive targets that create conflicting keyboard or screen-reader behavior.',
          'Keep CTA hierarchy clear so users know whether the whole card or only a specific link is actionable.',
        ]}
      />
    </SpecPageLayout>
  )
}

export const docsRoutes: DocsRoute[] = [
  { path: '/overview', label: 'Overview', section: 'Overview', element: <OverviewPage /> },
  { path: '/foundations/colors', label: 'Colors', section: 'Foundations', element: <ColorsPage /> },
  { path: '/foundations/typography', label: 'Typography', section: 'Foundations', element: <TypographyPage /> },
  { path: '/foundations/layout', label: 'Spacing & Structure', section: 'Foundations', element: <LayoutPage /> },
  { path: '/foundations/icons', label: 'Icons', section: 'Foundations', element: <IconsPage /> },
  { path: '/components/buttons', label: 'Buttons', section: 'Components', element: <ButtonsPage /> },
  { path: '/components/forms', label: 'Forms', section: 'Components', element: <FormsPage /> },
  { path: '/components/links', label: 'Links', section: 'Components', element: <LinksPage /> },
  { path: '/components/tabs', label: 'Tabs', section: 'Components', element: <TabsPage /> },
  { path: '/components/badges', label: 'Badges', section: 'Components', element: <BadgesPage /> },
  { path: '/components/alerts', label: 'Alerts', section: 'Components', element: <AlertsPage /> },
  { path: '/components/cards', label: 'Cards', section: 'Components', element: <CardsPage /> },
]
