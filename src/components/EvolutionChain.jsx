import { CreatureAvatar } from './CreatureAvatar'

/**
 * Build the full evolution chain from any species.
 * Walk backward to find the root, then forward through all branches.
 */
function buildChain(species, speciesMap) {
  // Walk to root
  let root = species
  while (root.evolution.evolves_from) {
    const prev = speciesMap[root.evolution.evolves_from.species_id]
    if (!prev) break
    root = prev
  }

  // Walk forward, collecting flat chain
  const chain = []
  const queue = [root]
  const seen = new Set()

  while (queue.length > 0) {
    const current = queue.shift()
    if (seen.has(current.species_id)) continue
    seen.add(current.species_id)
    chain.push(current)

    if (current.evolution.evolves_to) {
      for (const evo of current.evolution.evolves_to) {
        const next = speciesMap[evo.species_id]
        if (next && !seen.has(next.species_id)) {
          queue.push(next)
        }
      }
    }
  }

  return chain
}

function getMethodLabel(species, nextId) {
  if (!species.evolution.evolves_to) return ''
  const evo = species.evolution.evolves_to.find(e => e.species_id === nextId)
  if (!evo) return ''
  if (evo.method === 'level') return `Lv. ${evo.level}`
  if (evo.method === 'item') return evo.item || 'Item'
  return evo.method
}

export function EvolutionChain({ species, speciesMap, onNavigate }) {
  const chain = buildChain(species, speciesMap)

  if (chain.length <= 1) {
    return (
      <div className="evo-chain" style={{ marginBottom: 24, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        This creature does not evolve.
      </div>
    )
  }

  return (
    <div className="evo-chain">
      {chain.map((s, i) => {
        const isCurrent = s.species_id === species.species_id
        const prevSpecies = i > 0 ? chain[i - 1] : null
        const methodLabel = prevSpecies ? getMethodLabel(prevSpecies, s.species_id) : ''

        return (
          <div key={s.species_id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span className="evo-arrow">→</span>
                {methodLabel && <span className="evo-method">{methodLabel}</span>}
              </div>
            )}
            <div
              className={`evo-node ${isCurrent ? 'current' : ''}`}
              onClick={() => onNavigate(s.species_id)}
            >
              <CreatureAvatar name={s.name} types={s.types} size="sm" />
              <div className="evo-name">{s.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
