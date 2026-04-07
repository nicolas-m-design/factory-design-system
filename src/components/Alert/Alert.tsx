import './Alert.css'
import { Icon } from '../Icon/Icon'

type AlertTone = 'neutral' | 'info' | 'success' | 'attention' | 'error'

interface AlertAction {
  label: string
  href?: string
  onClick?: () => void
}

interface AlertProps {
  title: string
  description?: string
  tone?: AlertTone
  action?: AlertAction
  dismissible?: boolean
  showIcon?: boolean
  onDismiss?: () => void
}

const toneIcon = {
  neutral: 'information-fill',
  info: 'information-fill',
  success: 'checkbox-circle-fill',
  attention: 'error-warning-fill',
  error: 'error-warning-fill',
} as const

export function Alert({
  title,
  description,
  tone = 'neutral',
  action,
  dismissible = false,
  showIcon = true,
  onDismiss,
}: AlertProps) {
  const role = tone === 'attention' || tone === 'error' ? 'alert' : 'status'

  return (
    <div
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      className={`alert alert--${tone}`}
      role={role}
    >
      <div className="alert__header">
        <div className="alert__header-content">
          {showIcon && <Icon className="alert__icon" name={toneIcon[tone]} size={16} />}
          <strong className="alert__title">{title}</strong>
        </div>
        {dismissible && (
          <button aria-label="Dismiss" className="alert__dismiss" onClick={onDismiss} type="button">
            <Icon name="close-line" size={16} />
          </button>
        )}
      </div>
      {description && (
        <div className="alert__body">
          <p className="alert__description">{description}</p>
        </div>
      )}
      {action && (
        action.href ? (
          <a className="alert__action" href={action.href}>
            {action.label}
          </a>
        ) : (
          <button className="alert__action" onClick={action.onClick} type="button">
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
