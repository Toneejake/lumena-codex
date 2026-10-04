import { useState } from 'react'
import { getTypeGradient } from '../utils/typeColors'

export function CreatureAvatar({ name, types, imageUrl, spriteUrl, size = 'md', className = '' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const src = imageUrl || spriteUrl
  const gradient = getTypeGradient(types)
  const initial = name ? name.charAt(0).toUpperCase() : '?'

  const sizeClass = {
    sm: 'evo-art',
    md: 'card-art',
    lg: 'detail-art',
  }[size] || 'card-art'

  const showImage = Boolean(src) && failedSrc !== src

  return (
    <div
      className={`${sizeClass} ${className}`}
      style={{ background: gradient }}
      aria-label={`${name} art`}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="creature-sprite"
          loading="lazy"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span className="avatar-initial">{initial}</span>
      )}
    </div>
  )
}

