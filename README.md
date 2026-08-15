# Lumena Codex 📖✨

A Pokédex-style web dashboard for the creature-collecting game **Lumena**, cataloging 150 species with detailed stats, evolutions, abilities, learnsets, and lore.

![Lumena Codex Preview](https://raw.githubusercontent.com/Toneejake/lumena-codex/main/public/preview.png)

## 🌟 Features

- **Responsive Codex Grid**: All 150 species sorted by Codex number with type badges and dynamic placeholder avatars.
- **Search & Filters**: Instant name search and multi-filtering by Type (Fire, Water, Grass, Electric, Psychic, etc.) and Rarity (Common, Uncommon, Rare, Starter, Legendary, Mythic).
- **Deep Creature Details**:
  - **Base Stats**: Visual bar charts with BST (Base Stat Total) and color coding.
  - **Evolution Chain**: Interactive prev/next stage visual progression with evolution requirements (e.g., Level triggers).
  - **Abilities**: Standard and hidden abilities (highlighted).
  - **Learnset & Moves**: Comprehensive level-up moves table sorted by level.
  - **Metadata & Lore**: Height, weight, gender ratios, growth rate, capture rate, and species lore descriptions.
- **Dark Theme Aesthetics**: Sleek dark interface styled around `#0b3c70` navy accent with Inter & JetBrains Mono typography.
- **Modular Visuals**: Isolated avatar component (`CreatureAvatar.jsx`) allowing easy one-line replacement with real sprite URLs.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Modern Vanilla CSS with CSS custom properties
- **Typography**: Google Fonts (Inter + JetBrains Mono)
- **Data Source**: Converted JSON dataset from Lumena species data

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Toneejake/lumena-codex.git
cd lumena-codex
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### 4. Build for production
```bash
npm run build
```

## 🎨 Adding Real Sprites

In [`src/components/CreatureAvatar.jsx`](src/components/CreatureAvatar.jsx), replace the inner content with your sprite image URL:

```jsx
<img
  src={spriteUrl}
  alt={name}
  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
/>
```
