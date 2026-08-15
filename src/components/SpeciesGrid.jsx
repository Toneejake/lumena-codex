import { memo } from 'react'
import { CreatureAvatar } from './CreatureAvatar'
import { TypeBadge } from './TypeBadge'
import { getTypeBadgeColor } from '../utils/typeColors'

const SpeciesCard = memo(function SpeciesCard({ species, onSelect }) {
  const codex = String(species.codex_number).padStart(3, '0')
  const accentColor = getTypeBadgeColor(species.types[0])

  return (
    <div
      className="species-card"
      style={{ '--card-accent': accentColor }}
      onClick={() => onSelect(species.species_id)}
      id={`card-${species.species_id}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onSelect(species.species_id) }}
    >
      <div className="card-codex">#{codex}</div>
      <CreatureAvatar name={species.name} types={species.types} size="md" />
      <div className="card-name">{species.name}</div>
      <div className="card-types">
        {species.types.map(t => <TypeBadge key={t} type={t} />)}
      </div>
    </div>
  )
})

export function SpeciesGrid({ species, onSelect }) {
  if (species.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔎</div>
        <div className="empty-state-text">No creatures match your search</div>
      </div>
    )
  }

  return (
    <div className="species-grid">
      {species.map(s => (
        <SpeciesCard key={s.species_id} species={s} onSelect={onSelect} />
      ))}
    </div>
  )
}
