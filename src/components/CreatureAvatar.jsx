/**
 * CreatureAvatar — Placeholder art component.
 * Renders a colored card with the creature's initial letter.
 *
 * To swap in real sprites later, replace the inner content with:
 *   <img src={spriteUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
 */

import { getTypeGradient } from '../utils/typeColors'

export function CreatureAvatar({ name, types, size = 'md', className = '' }) {
  const gradient = getTypeGradient(types)
  const initial = name.charAt(0).toUpperCase()

  const sizeClass = {
    sm: 'evo-art',
    md: 'card-art',
    lg: 'detail-art',
  }[size] || 'card-art'

  return (
    <div
      className={`${sizeClass} ${className}`}
      style={{ background: gradient }}
      aria-label={`${name} placeholder art`}
    >
      {initial}
    </div>
  )
}
