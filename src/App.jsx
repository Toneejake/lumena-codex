import { useState, useMemo, useCallback } from 'react'
import speciesData from './data/species.json'
import learnsetsData from './data/learnsets.json'
import { CreatureAvatar } from './components/CreatureAvatar'
import { SpeciesGrid } from './components/SpeciesGrid'
import { DetailView } from './components/DetailView'

const species = speciesData.species
const learnsets = learnsetsData.learnsets

// Collect all unique types & rarities
const allTypes = [...new Set(species.flatMap(s => s.types))].sort()
const allRarities = [...new Set(species.map(s => s.metadata.rarity))].sort()

// Build lookup map by species_id
const speciesMap = {}
species.forEach(s => { speciesMap[s.species_id] = s })

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [rarityFilter, setRarityFilter] = useState('')

  const filtered = useMemo(() => {
    let result = [...species].sort((a, b) => a.codex_number - b.codex_number)
    const q = search.toLowerCase().trim()
    if (q) result = result.filter(s => s.name.toLowerCase().includes(q))
    if (typeFilter) result = result.filter(s => s.types.includes(typeFilter))
    if (rarityFilter) result = result.filter(s => s.metadata.rarity === rarityFilter)
    return result
  }, [search, typeFilter, rarityFilter])

  const selected = selectedId ? speciesMap[selectedId] : null
  const selectedLearnset = selectedId ? learnsets[selectedId] : null

  const handleSelect = useCallback((id) => {
    setSelectedId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBack = useCallback(() => {
    setSelectedId(null)
  }, [])

  return (
    <>
      <header className="app-header">
        <div className="app-logo">L</div>
        <div>
          <h1 className="app-title">Lumena Codex</h1>
          <p className="app-subtitle">{species.length} creatures catalogued</p>
        </div>
        {selected && (
          <button className="header-back-btn" onClick={handleBack}>
            ← Back to Codex
          </button>
        )}
      </header>

      {!selected ? (
        <>
          <div className="controls-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                id="search-input"
                type="text"
                placeholder="Search by name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              id="type-filter"
              className="filter-dropdown"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {allTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              id="rarity-filter"
              className="filter-dropdown"
              value={rarityFilter}
              onChange={e => setRarityFilter(e.target.value)}
            >
              <option value="">All Rarities</option>
              {allRarities.map(r => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1).replace('_', ' ')}</option>
              ))}
            </select>
            <span className="results-count">{filtered.length} found</span>
          </div>
          <SpeciesGrid species={filtered} onSelect={handleSelect} />
        </>
      ) : (
        <DetailView
          species={selected}
          learnset={selectedLearnset}
          speciesMap={speciesMap}
          onNavigate={handleSelect}
        />
      )}
    </>
  )
}
