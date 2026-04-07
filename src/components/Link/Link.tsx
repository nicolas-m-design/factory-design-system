import './Link.css'

type LinkSize = 'regular' | 'small'
type LinkAppearance = 'default' | 'inverse'

interface LinkProps {
  children: React.ReactNode
  href?: string
  size?: LinkSize
  appearance?: LinkAppearance
  disabled?: boolean
  onClick?: () => void
}

export function Link({
  children,
  href = '#',
  size = 'regular',
  appearance = 'default',
  disabled = false,
  onClick,
}: LinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (disabled) {
      event.preventDefault()
      return
    }

    onClick?.()
  }

  return (
    <a
      aria-disabled={disabled}
      className={`link link--${size} link--${appearance} ${disabled ? 'link--disabled' : ''}`}
      href={disabled ? undefined : href}
      onClick={handleClick}
    >
      <span className="link__label">{children}</span>
      <div className="link__underline" />
    </a>
  )
}
