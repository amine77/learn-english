import { LEVELS, type Level } from '../types/content'

interface FilterBarProps {
  selectedLevel: Level | 'tous'
  onLevelChange: (level: Level | 'tous') => void
  themes: string[]
  selectedTheme: string | 'tous'
  onThemeChange: (theme: string | 'tous') => void
}

export default function FilterBar({
  selectedLevel,
  onLevelChange,
  themes,
  selectedTheme,
  onThemeChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Niveau</span>
        <div className="filter-pills">
          <button
            type="button"
            className={'pill' + (selectedLevel === 'tous' ? ' active' : '')}
            onClick={() => onLevelChange('tous')}
          >
            Tous
          </button>
          {LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              className={'pill' + (selectedLevel === level.id ? ' active' : '')}
              onClick={() => onLevelChange(level.id)}
              title={level.description}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <span className="filter-label">Thème</span>
        <select
          className="theme-select"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option value="tous">Tous les thèmes</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
