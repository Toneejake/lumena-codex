/** Type colour map — maps type names to [main, dark, light] hex values */
export const TYPE_COLORS = {
  Fire:     { main: '#f08030', dark: '#b45c1a', light: '#ffa860' },
  Water:    { main: '#6890f0', dark: '#4060c0', light: '#90b8ff' },
  Grass:    { main: '#78c850', dark: '#4a9030', light: '#a0e878' },
  Electric: { main: '#f8d030', dark: '#c0a018', light: '#ffe860' },
  Ice:      { main: '#98d8d8', dark: '#60b0b0', light: '#c0f0f0' },
  Fighting: { main: '#c03028', dark: '#901818', light: '#e05848' },
  Poison:   { main: '#a040a0', dark: '#702070', light: '#c868c8' },
  Ground:   { main: '#e0c068', dark: '#b09040', light: '#f0d888' },
  Flying:   { main: '#a890f0', dark: '#7860c0', light: '#c8b8ff' },
  Psychic:  { main: '#f85888', dark: '#c03060', light: '#ff80a8' },
  Bug:      { main: '#a8b820', dark: '#788810', light: '#c8d850' },
  Rock:     { main: '#b8a038', dark: '#887020', light: '#d8c060' },
  Ghost:    { main: '#705898', dark: '#483870', light: '#9878c0' },
  Dragon:   { main: '#7038f8', dark: '#4818c0', light: '#9868ff' },
  Dark:     { main: '#705848', dark: '#483828', light: '#987868' },
  Steel:    { main: '#b8b8d0', dark: '#8888a0', light: '#d8d8e8' },
  Fairy:    { main: '#ee99ac', dark: '#c06880', light: '#ffc0d0' },
  Normal:   { main: '#a8a878', dark: '#787850', light: '#c8c8a0' },
  Light:    { main: '#ffd966', dark: '#c0a030', light: '#ffe890' },
}

/** Get the CSS background for a creature based on its primary type */
export function getTypeGradient(types) {
  const primary = TYPE_COLORS[types[0]] || TYPE_COLORS.Normal
  const secondary = types[1] ? (TYPE_COLORS[types[1]] || TYPE_COLORS.Normal) : primary

  if (types.length >= 2) {
    return `linear-gradient(135deg, ${primary.dark}dd, ${secondary.dark}dd)`
  }
  return `linear-gradient(135deg, ${primary.dark}dd, ${primary.main}88)`
}

/** Get the badge background for a type */
export function getTypeBadgeColor(type) {
  return (TYPE_COLORS[type] || TYPE_COLORS.Normal).main
}

/** Format a move_id into display name */
export function formatMoveName(moveId) {
  return moveId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Format ability name */
export function formatAbility(ability) {
  return ability.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Stat colour based on value */
export function getStatColor(value) {
  if (value >= 130) return '#78c850'
  if (value >= 100) return '#a0d848'
  if (value >= 80)  return '#f8d030'
  if (value >= 60)  return '#f08030'
  return '#f85888'
}

/** Stat abbreviation */
export const STAT_ABBR = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  special_attack: 'SPA',
  special_defense: 'SPD',
  speed: 'SPE',
}
