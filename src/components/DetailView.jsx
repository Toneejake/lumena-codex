import { useState } from 'react'
import { CreatureAvatar } from './CreatureAvatar'
import { TypeBadge } from './TypeBadge'
import { StatsChart } from './StatsChart'
import { EvolutionChain } from './EvolutionChain'
import { MovesTable } from './MovesTable'
import { formatAbility } from '../utils/typeColors'

export function DetailView({ species, learnset, speciesMap, onNavigate }) {
  const [activeTab, setActiveTab] = useState('stats')
  const codex = String(species.codex_number).padStart(3, '0')

  const meta = species.metadata
  const heightDisplay = meta.height_m < 1
    ? `${(meta.height_m * 100).toFixed(0)} cm`
    : `${meta.height_m.toFixed(1)} m`

  const genderDisplay = meta.gender_ratio.genderless
    ? 'Genderless'
    : `♂ ${meta.gender_ratio.male}% / ♀ ${meta.gender_ratio.female}%`

  const rarityClass = `rarity-${meta.rarity.replace('_', '-')}`

  return (
    <div className="detail-view">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-art-wrapper">
          <CreatureAvatar name={species.name} types={species.types} size="lg" />
        </div>
        <div className="detail-info">
          <div className="detail-codex">#{codex}</div>
          <h2 className="detail-name">{species.name}</h2>
          <div className="detail-types">
            {species.types.map(t => <TypeBadge key={t} type={t} />)}
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <div className="meta-label">Rarity</div>
              <div className={`meta-value ${rarityClass}`}>
                {meta.rarity.charAt(0).toUpperCase() + meta.rarity.slice(1).replace('_', ' ')}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Height</div>
              <div className="meta-value">{heightDisplay}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Weight</div>
              <div className="meta-value">{meta.weight_kg} kg</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Gender</div>
              <div className="meta-value">{genderDisplay}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Growth Rate</div>
              <div className="meta-value">{meta.growth_rate.replace('_', ' ')}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Capture Rate</div>
              <div className="meta-value">{meta.capture_rate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lore */}
      <div className="lore-text">{species.lore.description}</div>

      {/* Evolution Chain */}
      <div className="section-title">⛓ Evolution Chain</div>
      <EvolutionChain
        species={species}
        speciesMap={speciesMap}
        onNavigate={onNavigate}
      />

      {/* Abilities */}
      <div className="section-title">⚡ Abilities</div>
      <div className="abilities-list">
        {species.abilities.possible.map(a => (
          <span key={a} className="ability-chip">{formatAbility(a)}</span>
        ))}
        {species.abilities.hidden.map(a => (
          <span key={a} className="ability-chip hidden-ability" title="Hidden Ability">
            {formatAbility(a)} ✦
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
          id="tab-stats"
        >
          Base Stats
        </button>
        <button
          className={`tab-btn ${activeTab === 'moves' ? 'active' : ''}`}
          onClick={() => setActiveTab('moves')}
          id="tab-moves"
        >
          Level-Up Moves
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'stats' && <StatsChart stats={species.base_stats} />}
      {activeTab === 'moves' && <MovesTable learnset={learnset} species={species} />}
    </div>
  )
}
