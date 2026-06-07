import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import rawFlashcards from '../data/flashcards.json'
import type { Flashcard, Level } from '../types/content'

const flashcards = rawFlashcards as Flashcard[]

export default function Flashcards() {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'tous'>('tous')
  const [selectedTheme, setSelectedTheme] = useState<string | 'tous'>('tous')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const themes = useMemo(() => {
    const filtered = selectedLevel === 'tous'
      ? flashcards
      : flashcards.filter((c) => c.level === selectedLevel)
    return Array.from(new Set(filtered.map((c) => c.theme))).sort()
  }, [selectedLevel])

  const filteredCards = useMemo(() => {
    return flashcards.filter((card) => {
      const levelMatch = selectedLevel === 'tous' || card.level === selectedLevel
      const themeMatch = selectedTheme === 'tous' || card.theme === selectedTheme
      return levelMatch && themeMatch
    })
  }, [selectedLevel, selectedTheme])

  const card = filteredCards[index]

  function handleLevelChange(level: Level | 'tous') {
    setSelectedLevel(level)
    setSelectedTheme('tous')
    setIndex(0)
    setFlipped(false)
  }

  function handleThemeChange(theme: string | 'tous') {
    setSelectedTheme(theme)
    setIndex(0)
    setFlipped(false)
  }

  function goTo(newIndex: number) {
    if (filteredCards.length === 0) return
    const safeIndex = (newIndex + filteredCards.length) % filteredCards.length
    setIndex(safeIndex)
    setFlipped(false)
  }

  return (
    <div className="page flashcards-page">
      <h1>Cartes mémo 🃏</h1>
      <p className="page-intro">
        Clique sur une carte pour révéler la traduction et un exemple, puis utilise les
        flèches pour passer à la carte suivante.
      </p>

      <FilterBar
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
      />

      {filteredCards.length === 0 || !card ? (
        <p className="empty-state">Aucune carte ne correspond à ces filtres pour le moment.</p>
      ) : (
        <div className="flashcard-area">
          <p className="flashcard-progress">
            Carte {index + 1} / {filteredCards.length} — <span className="theme-tag">{card.theme}</span>
          </p>
          <button
            type="button"
            className={'flashcard' + (flipped ? ' flipped' : '')}
            onClick={() => setFlipped((f) => !f)}
            aria-pressed={flipped}
          >
            <div className="flashcard-inner">
              <div className="flashcard-face flashcard-front">
                <span className="flashcard-hint">Anglais</span>
                <p>{card.front}</p>
                <span className="flip-hint">Clique pour retourner ↺</span>
              </div>
              <div className="flashcard-face flashcard-back">
                <span className="flashcard-hint">Français</span>
                <p className="translation">{card.back}</p>
                <p className="example">“{card.example}”</p>
              </div>
            </div>
          </button>

          <div className="flashcard-controls">
            <button type="button" className="btn-secondary" onClick={() => goTo(index - 1)}>
              ← Précédente
            </button>
            <button type="button" className="btn-primary" onClick={() => goTo(index + 1)}>
              Suivante →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
