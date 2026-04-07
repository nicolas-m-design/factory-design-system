import './Card.css'

interface CardProps {
  image?: string
  title?: string
  description?: string
  linkLabel?: string
  linkHref?: string
  interactive?: boolean
  imageRatio?: 'square' | 'landscape'
}

export function Card({
  image,
  title,
  description,
  linkLabel,
  linkHref = '#',
  interactive = false,
  imageRatio = 'square',
}: CardProps) {
  const hasText = title || description
  const className = ['card', interactive ? 'card--interactive' : ''].filter(Boolean).join(' ')

  const body = (
    <>
      {image && <img alt="" className={`card__image card__image--${imageRatio}`} src={image} />}
      <div className="card__body">
        {hasText && (
          <div className="card__text">
            {title && <h3 className="card__title">{title}</h3>}
            {description && <p className="card__description">{description}</p>}
          </div>
        )}
        {linkLabel && <span className="card__cta">{linkLabel}</span>}
      </div>
    </>
  )

  if (interactive) {
    return (
      <a className={className} href={linkHref}>
        {body}
      </a>
    )
  }

  return <article className={className}>{body}</article>
}
