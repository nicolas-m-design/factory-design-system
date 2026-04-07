interface SpecPageLayoutProps {
  eyebrow: string
  title: string
  lede: string
  children: React.ReactNode
}

interface StateMatrixRow {
  state: string
  description: string
  tokens: string[]
  preview: React.ReactNode
}

interface StateMatrixProps {
  title?: string
  rows: StateMatrixRow[]
}

interface UsageGuidanceProps {
  title?: string
  items: string[]
}

interface AccessibilityNotesProps {
  title?: string
  items: string[]
}

interface TokenMappingRow {
  slot: string
  token: string
  rationale: string
}

interface TokenMappingTableProps {
  rows: TokenMappingRow[]
}

interface DoDontPair {
  do: string
  dont: string
}

interface DoDontExamplesProps {
  pairs: DoDontPair[]
}

export function SpecPageLayout({ eyebrow, title, lede, children }: SpecPageLayoutProps) {
  return (
    <article className="spec-page">
      <header className="spec-page__header">
        <p className="spec-page__eyebrow">{eyebrow}</p>
        <h1 className="spec-page__title">{title}</h1>
        <p className="spec-page__lede">{lede}</p>
      </header>
      <div className="spec-page__body">{children}</div>
    </article>
  )
}

export function StateMatrix({ title = 'Variants & States', rows }: StateMatrixProps) {
  return (
    <section className="spec-section" data-testid="state-matrix">
      <div className="spec-section__header">
        <h2 className="spec-section__title">{title}</h2>
      </div>
      <div className="state-matrix">
        {rows.map(row => (
          <section className="state-matrix__row" key={row.state}>
            <div className="state-matrix__preview">{row.preview}</div>
            <div className="state-matrix__meta">
              <h3 className="state-matrix__state">{row.state}</h3>
              <p className="state-matrix__description">{row.description}</p>
              <div className="state-matrix__tokens">
                {row.tokens.map(token => (
                  <code className="spec-token-chip" key={token}>{token}</code>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export function UsageGuidance({ title = 'Principles', items }: UsageGuidanceProps) {
  return (
    <section className="spec-section" data-testid="usage-guidance">
      <div className="spec-section__header">
        <h2 className="spec-section__title">{title}</h2>
      </div>
      <ul className="spec-list">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export function AccessibilityNotes({ title = 'Accessibility Notes', items }: AccessibilityNotesProps) {
  return (
    <section className="spec-section" data-testid="accessibility-notes">
      <div className="spec-section__header">
        <h2 className="spec-section__title">{title}</h2>
      </div>
      <ul className="spec-list">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export function TokenMappingTable({ rows }: TokenMappingTableProps) {
  return (
    <section className="spec-section" data-testid="token-mapping">
      <div className="spec-section__header">
        <h2 className="spec-section__title">Token Usage</h2>
      </div>
      <div className="token-table">
        <div className="token-table__head">
          <span>Component Slot</span>
          <span>Semantic Token</span>
          <span>Usage</span>
        </div>
        {rows.map(row => (
          <div className="token-table__row" key={`${row.slot}-${row.token}`}>
            <span>{row.slot}</span>
            <code className="spec-token-chip">{row.token}</code>
            <span>{row.rationale}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DoDontExamples({ pairs }: DoDontExamplesProps) {
  return (
    <section className="spec-section">
      <div className="spec-section__header">
        <h2 className="spec-section__title">Best Practices</h2>
      </div>
      <div className="do-dont-grid">
        {pairs.map(pair => (
          <div className="do-dont-grid__pair" key={`${pair.do}-${pair.dont}`}>
            <div className="do-dont-grid__card do-dont-grid__card--do">
              <p className="do-dont-grid__label">Do</p>
              <p>{pair.do}</p>
            </div>
            <div className="do-dont-grid__card do-dont-grid__card--dont">
              <p className="do-dont-grid__label">Don't</p>
              <p>{pair.dont}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
