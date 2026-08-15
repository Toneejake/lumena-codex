import { formatMoveName } from '../utils/typeColors'

export function MovesTable({ learnset, species }) {
  // Use the species-embedded learnset as primary (it has level_up data)
  const levelUpMoves = species.learnset?.level_up || learnset?.level_up || []

  // Sort by level
  const sorted = [...levelUpMoves].sort((a, b) => a.level - b.level)

  if (sorted.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', padding: '20px 0', fontSize: '0.9rem' }}>
        No level-up moves found.
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="moves-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>Level</th>
            <th>Move</th>
            {sorted[0]?.source && <th style={{ width: 120 }}>Source</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((move, i) => (
            <tr key={`${move.move_id}-${move.level}-${i}`}>
              <td className="move-level">{move.level}</td>
              <td className="move-name">{formatMoveName(move.move_id)}</td>
              {move.source !== undefined && (
                <td className="move-source">{move.source.replace(/_/g, ' ')}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
