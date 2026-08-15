import { STAT_ABBR, getStatColor } from '../utils/typeColors'

const MAX_STAT = 200 // visual max for bar width

export function StatsChart({ stats }) {
  const total = Object.values(stats).reduce((sum, v) => sum + v, 0)

  return (
    <div className="stats-section">
      {Object.entries(stats).map(([key, value]) => (
        <div className="stat-row" key={key}>
          <span className="stat-label">{STAT_ABBR[key] || key}</span>
          <span className="stat-value">{value}</span>
          <div className="stat-bar-track">
            <div
              className="stat-bar-fill"
              style={{
                width: `${Math.min((value / MAX_STAT) * 100, 100)}%`,
                background: `linear-gradient(90deg, ${getStatColor(value)}, ${getStatColor(value)}88)`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="stat-row">
        <span className="stat-label">BST</span>
        <span className="stat-value stat-total">{total}</span>
        <div className="stat-bar-track">
          <div
            className="stat-bar-fill"
            style={{
              width: `${Math.min((total / 720) * 100, 100)}%`,
              background: 'linear-gradient(90deg, var(--navy-glow), var(--navy-light))',
            }}
          />
        </div>
      </div>
    </div>
  )
}
