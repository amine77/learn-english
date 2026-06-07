import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import rawSheets from '../data/sheets.json'
import { LEVELS, type Level, type RevisionSheet } from '../types/content'

const sheets = rawSheets as RevisionSheet[]

export default function Sheets() {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'tous'>('tous')
  const [selectedTheme, setSelectedTheme] = useState<string | 'tous'>('tous')
  const [openId, setOpenId] = useState<string | null>(null)

  const themes = useMemo(() => {
    const filtered = selectedLevel === 'tous'
      ? sheets
      : sheets.filter((s) => s.level === selectedLevel)
    return Array.from(new Set(filtered.map((s) => s.theme))).sort()
  }, [selectedLevel])

  const filteredSheets = useMemo(() => {
    return sheets.filter((sheet) => {
      const levelMatch = selectedLevel === 'tous' || sheet.level === selectedLevel
      const themeMatch = selectedTheme === 'tous' || sheet.theme === selectedTheme
      return levelMatch && themeMatch
    })
  }, [selectedLevel, selectedTheme])

  function handleLevelChange(level: Level | 'tous') {
    setSelectedLevel(level)
    setSelectedTheme('tous')
    setOpenId(null)
  }

  function handleThemeChange(theme: string | 'tous') {
    setSelectedTheme(theme)
    setOpenId(null)
  }

  return (
    <div className="page sheets-page">
      <h1>Fiches de révision 📘</h1>
      <p className="page-intro">
        Des fiches synthétiques sur la grammaire et la méthodologie. Clique sur une fiche
        pour l'ouvrir et découvrir les règles, des exemples et des astuces.
      </p>

      <FilterBar
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
      />

      {filteredSheets.length === 0 ? (
        <p className="empty-state">Aucune fiche ne correspond à ces filtres pour le moment.</p>
      ) : (
        <div className="sheet-list">
          {filteredSheets.map((sheet) => {
            const isOpen = openId === sheet.id
            const levelLabel = LEVELS.find((l) => l.id === sheet.level)?.label ?? sheet.level
            return (
              <article key={sheet.id} className={'sheet-card' + (isOpen ? ' open' : '')}>
                <button
                  type="button"
                  className="sheet-header"
                  onClick={() => setOpenId(isOpen ? null : sheet.id)}
                  aria-expanded={isOpen}
                >
                  <div>
                    <h2>{sheet.title}</h2>
                    <p className="sheet-summary">{sheet.summary}</p>
                    <div className="sheet-tags">
                      <span className="theme-tag">{sheet.theme}</span>
                      <span className="level-tag">{levelLabel}</span>
                    </div>
                  </div>
                  <span className="sheet-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="sheet-body">
                    {sheet.sections.map((section) => (
                      <div key={section.heading} className="sheet-section">
                        <h3>{section.heading}</h3>
                        <p>{section.content}</p>
                        {section.examples && section.examples.length > 0 && (
                          <ul className="examples-list">
                            {section.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
