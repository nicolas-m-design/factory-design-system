import './Badge.css'

type BadgeSize = 'md' | 'lg'
type BadgeTone = 'brand' | 'neutral' | 'info' | 'success' | 'attention' | 'error'

interface BadgeProps {
  count?: number
  size?: BadgeSize
  tone?: BadgeTone
  max?: number
}

const toneLabels: Record<BadgeTone, string> = {
  brand: 'brand',
  neutral: 'neutral',
  info: 'informational',
  success: 'success',
  attention: 'attention',
  error: 'error',
}

export function Badge({
  count,
  size = 'md',
  tone = 'brand',
  max = 99,
}: BadgeProps) {
  const hasCount = count !== undefined
  const overflow = hasCount && count > max
  const label = overflow ? `${max}+` : count
  const digitClass = !hasCount
    ? 'badge--overflow'
    : String(label).length > 1
      ? 'badge--multiple'
      : 'badge--single'

  const className = ['badge', `badge--${size}`, `badge--${tone}`, digitClass].join(' ')

  return (
    <span className={className} aria-label={hasCount ? `${toneLabels[tone]} notifications: ${label}` : `${toneLabels[tone]} indicator`}>
      {hasCount && <span className="badge__count">{label}</span>}
      {!hasCount && <span className="badge__dot" />}
    </span>
  )
}
