import './App.css'
import { Button } from './components/Button/Button'
import { Card } from './components/Card/Card'
import { InputField } from './components/InputField/InputField'
import { Badge } from './components/Badge/Badge'
import { Tag } from './components/Tag/Tag'
import { Alert } from './components/Alert/Alert'

export function App() {
  return (
    <div className="demo" data-brand="default">
      <header className="demo__header">
        <h1 className="demo__title">Token Brand System</h1>
        <p className="demo__subtitle">
          Foundations → Components → Patterns
        </p>
      </header>

      {/* Colors — Semantics */}
      <section className="demo__section">
        <h2 className="demo__section-title">Colors — Semantics</h2>
        <div className="palette">
          <div className="palette__category">
            <p className="palette__category-label">Action</p>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Primary</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-action-primary)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Primary-hover</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-action-primary-hover)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">On-primary</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-action-on-primary)' }} />
              </div>
            </div>
          </div>

          <div className="palette__category">
            <p className="palette__category-label">Surface</p>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Page</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-surface-page)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Muted</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-surface-muted)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Subtle</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-surface-subtle)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Secondary</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-surface-secondary)' }} />
              </div>
            </div>
          </div>

          <div className="palette__category">
            <p className="palette__category-label">Text</p>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Primary</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-text-primary)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Secondary</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-text-secondary)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Disabled</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-text-disabled)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">On-action</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-text-on-action)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Link</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-text-link)' }} />
              </div>
            </div>
          </div>

          <div className="palette__category">
            <p className="palette__category-label">Border</p>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Default</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-border-default)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Subtle</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-border-subtle)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Hover</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-border-hover)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Focus</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-border-focus)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Error</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-border-error)' }} />
              </div>
            </div>
          </div>

          <div className="palette__category">
            <p className="palette__category-label">Feedback</p>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Info</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-info)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Success</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-feedback-success)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Attention</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-attention)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Error</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-error)' }} />
              </div>
            </div>
            <div className="palette__row">
              <div className="palette__swatch">
                <p className="palette__swatch-name">Info-surface</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-info-surface)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Success-surface</p>
                <div className="palette__swatch-color" style={{ background: 'var(--color-feedback-success-surface)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Attention-surface</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-attention-surface)' }} />
              </div>
              <div className="palette__swatch">
                <p className="palette__swatch-name">Error-surface</p>
                <div className="palette__swatch-color palette__swatch-color--bordered" style={{ background: 'var(--color-feedback-error-surface)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="demo__section">
        <h2 className="demo__section-title">Button</h2>

        <div className="demo__group">
          <h3 className="demo__group-title">Variants</h3>
          <div className="demo__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>

        <div className="demo__group">
          <h3 className="demo__group-title">Sizes</h3>
          <div className="demo__row">
            <Button size="sm">Small</Button>
            <Button size="md">Regular</Button>
          </div>
        </div>

        <div className="demo__group">
          <h3 className="demo__group-title">Disabled</h3>
          <div className="demo__row">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="demo__section">
        <h2 className="demo__section-title">Card</h2>
        <div className="demo__card-grid">
          <Card
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop"
            title="Lorem ipsum dolor"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing ipsum elitr."
            linkLabel="Link"
          />
          <Card
            image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop"
            linkLabel="Link"
          />
          <Card
            title="Lorem ipsum dolor"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing ipsum elitr."
            linkLabel="Link"
          />
        </div>
      </section>

      {/* Badge */}
      <section className="demo__section">
        <h2 className="demo__section-title">Badge</h2>

        <div className="demo__group">
          <h3 className="demo__group-title">New — Sizes</h3>
          <div className="demo__row">
            <Badge size="lg" count={1} />
            <Badge size="lg" count={1245} />
            <Badge size="lg" />
            <Badge size="md" count={1} />
            <Badge size="md" count={1245} />
            <Badge size="md" />
            <Badge size="sm" count={1} />
            <Badge size="sm" count={1245} />
            <Badge size="sm" />
          </div>
        </div>

        <div className="demo__group">
          <h3 className="demo__group-title">Informational</h3>
          <div className="demo__row">
            <Badge state="informational" size="lg" count={1} />
            <Badge state="informational" size="lg" count={1245} />
            <Badge state="informational" size="lg" />
            <Badge state="informational" size="md" count={1} />
            <Badge state="informational" size="md" count={1245} />
            <Badge state="informational" size="md" />
            <Badge state="informational" size="sm" count={1} />
            <Badge state="informational" size="sm" count={1245} />
            <Badge state="informational" size="sm" />
          </div>
        </div>
      </section>

      {/* Tag */}
      <section className="demo__section">
        <h2 className="demo__section-title">Tag</h2>

        <div className="demo__group">
          <h3 className="demo__group-title">Variants</h3>
          <div className="demo__row">
            <Tag>Neutral</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="error">Error</Tag>
          </div>
        </div>
      </section>

      {/* Alert */}
      <section className="demo__section">
        <h2 className="demo__section-title">Alert</h2>

        <div className="demo__group">
          <h3 className="demo__group-title">Variants</h3>
          <div className="demo__alert-stack">
            <Alert
              variant="info"
              title="Title"
              description="Description"
              onDismiss={() => {}}
            />
            <Alert
              variant="success"
              title="Title"
              description="Description"
              onDismiss={() => {}}
            />
            <Alert
              variant="error"
              title="Title"
              description="Description"
              onDismiss={() => {}}
            />
            <Alert
              variant="info"
              title="Title only, no description"
              onDismiss={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Input Fields */}
      <section className="demo__section">
        <h2 className="demo__section-title">InputField</h2>
        <div className="demo__input-grid">
          <InputField
            label="Default"
            placeholder="Enter text..."
            helperText="This is helper text"
          />
          <InputField
            label="With Value"
            value="Hello world"
            helperText="Field with a value"
          />
          <InputField
            label="Error State"
            value="invalid@"
            error="Please enter a valid email address"
          />
          <InputField
            label="Disabled"
            value="Cannot edit"
            disabled
            helperText="This field is disabled"
          />
        </div>
      </section>
    </div>
  )
}
