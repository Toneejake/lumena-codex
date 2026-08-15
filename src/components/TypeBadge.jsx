import { getTypeBadgeColor } from '../utils/typeColors'

export function TypeBadge({ type }) {
  return (
    <span
      className="type-badge"
      style={{ background: getTypeBadgeColor(type) }}
    >
      {type}
    </span>
  )
}
