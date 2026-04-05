import './Card.css'

interface CardProps {
  image?: string
  title?: string
  description?: string
  linkLabel?: string
  linkHref?: string
}

export function Card({
  image,
  title,
  description,
  linkLabel,
  linkHref = '#',
}: CardProps) {
  return (
    <article className="card">
      {image && (
        <img className="card__image" src={image} alt="" />
      )}
      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {description && <p className="card__description">{description}</p>}
        {linkLabel && (
          <a className="card__link" href={linkHref}>
            {linkLabel}
          </a>
        )}
      </div>
    </article>
  )
}
