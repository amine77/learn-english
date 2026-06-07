import { Link } from 'react-router-dom'
import { LEVELS } from '../types/content'
import flashcards from '../data/flashcards.json'
import sheets from '../data/sheets.json'
import quizzes from '../data/quizzes.json'

const features = [
  {
    to: '/cartes',
    emoji: '🃏',
    title: 'Cartes mémo',
    description: 'Du vocabulaire à réviser façon flashcards : retourne la carte pour découvrir la traduction et un exemple.',
    count: `${flashcards.length} cartes`,
  },
  {
    to: '/fiches',
    emoji: '📘',
    title: 'Fiches de révision',
    description: 'Des fiches claires sur la grammaire et la méthodologie, organisées par niveau et par thème.',
    count: `${sheets.length} fiches`,
  },
  {
    to: '/qcm',
    emoji: '✅',
    title: 'QCM',
    description: 'Teste tes connaissances avec des quiz corrigés et expliqués pour progresser à ton rythme.',
    count: `${quizzes.length} quiz`,
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="hero-banner">
        <h1>Apprends l'anglais, du collège au bac 🎓</h1>
        <p>
          English Boost rassemble des cartes de vocabulaire, des fiches de révision et des
          quiz pour t'aider à progresser pas à pas, du niveau débutant jusqu'à la préparation
          du baccalauréat.
        </p>
      </section>

      <section className="feature-grid">
        {features.map((feature) => (
          <Link key={feature.to} to={feature.to} className="feature-card">
            <span className="feature-emoji" aria-hidden="true">{feature.emoji}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <span className="feature-count">{feature.count}</span>
          </Link>
        ))}
      </section>

      <section className="levels-section">
        <h2>Trois niveaux pour progresser</h2>
        <div className="levels-grid">
          {LEVELS.map((level) => (
            <div key={level.id} className={`level-card level-${level.id}`}>
              <h3>{level.label}</h3>
              <p>{level.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
