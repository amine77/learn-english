import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import rawQuizzes from '../data/quizzes.json'
import { LEVELS, type Level, type Quiz } from '../types/content'

const quizzes = rawQuizzes as Quiz[]

type Answers = Record<number, number>

export default function Quizzes() {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'tous'>('tous')
  const [selectedTheme, setSelectedTheme] = useState<string | 'tous'>('tous')
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)

  const themes = useMemo(() => {
    const filtered = selectedLevel === 'tous'
      ? quizzes
      : quizzes.filter((q) => q.level === selectedLevel)
    return Array.from(new Set(filtered.map((q) => q.theme))).sort()
  }, [selectedLevel])

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const levelMatch = selectedLevel === 'tous' || quiz.level === selectedLevel
      const themeMatch = selectedTheme === 'tous' || quiz.theme === selectedTheme
      return levelMatch && themeMatch
    })
  }, [selectedLevel, selectedTheme])

  function startQuiz(quiz: Quiz) {
    setActiveQuiz(quiz)
    setAnswers({})
    setSubmitted(false)
  }

  function backToList() {
    setActiveQuiz(null)
    setAnswers({})
    setSubmitted(false)
  }

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }))
  }

  if (activeQuiz) {
    const total = activeQuiz.questions.length
    const answeredCount = Object.keys(answers).length
    const score = activeQuiz.questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correctIndex ? 1 : 0)
    }, 0)
    const levelLabel = LEVELS.find((l) => l.id === activeQuiz.level)?.label ?? activeQuiz.level

    return (
      <div className="page quiz-page">
        <button type="button" className="btn-secondary back-btn" onClick={backToList}>
          ← Retour aux QCM
        </button>
        <h1>{activeQuiz.title}</h1>
        <div className="sheet-tags">
          <span className="theme-tag">{activeQuiz.theme}</span>
          <span className="level-tag">{levelLabel}</span>
        </div>

        <div className="quiz-questions">
          {activeQuiz.questions.map((q, qIndex) => {
            const userAnswer = answers[qIndex]
            return (
              <div key={qIndex} className="quiz-question-card">
                <p className="quiz-question-text">
                  <span className="quiz-question-number">Q{qIndex + 1}.</span> {q.question}
                </p>
                <div className="quiz-options">
                  {q.options.map((option, oIndex) => {
                    let optionClass = 'quiz-option'
                    if (submitted) {
                      if (oIndex === q.correctIndex) optionClass += ' correct'
                      else if (oIndex === userAnswer) optionClass += ' incorrect'
                    } else if (userAnswer === oIndex) {
                      optionClass += ' selected'
                    }
                    return (
                      <button
                        key={oIndex}
                        type="button"
                        className={optionClass}
                        onClick={() => selectAnswer(qIndex, oIndex)}
                        disabled={submitted}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                {submitted && (
                  <p className="quiz-explanation">
                    <strong>{userAnswer === q.correctIndex ? '✅ Bonne réponse — ' : '💡 Explication — '}</strong>
                    {q.explanation}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="quiz-footer">
          {submitted ? (
            <div className="quiz-result">
              <p className="quiz-score">
                Score : <strong>{score} / {total}</strong>
              </p>
              <button type="button" className="btn-primary" onClick={() => startQuiz(activeQuiz)}>
                Recommencer ce quiz
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setSubmitted(true)}
              disabled={answeredCount < total}
            >
              {answeredCount < total
                ? `Répondez à toutes les questions (${answeredCount}/${total})`
                : 'Valider mes réponses'}
            </button>
          )}
        </div>
      </div>
    )
  }

  function handleLevelChange(level: Level | 'tous') {
    setSelectedLevel(level)
    setSelectedTheme('tous')
  }

  return (
    <div className="page quizzes-page">
      <h1>QCM ✅</h1>
      <p className="page-intro">
        Choisis un quiz pour tester tes connaissances. À la fin, tu obtiens ton score et
        une explication pour chaque question.
      </p>

      <FilterBar
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
      />

      {filteredQuizzes.length === 0 ? (
        <p className="empty-state">Aucun quiz ne correspond à ces filtres pour le moment.</p>
      ) : (
        <div className="quiz-list">
          {filteredQuizzes.map((quiz) => {
            const levelLabel = LEVELS.find((l) => l.id === quiz.level)?.label ?? quiz.level
            return (
              <div key={quiz.id} className="quiz-card">
                <h2>{quiz.title}</h2>
                <div className="sheet-tags">
                  <span className="theme-tag">{quiz.theme}</span>
                  <span className="level-tag">{levelLabel}</span>
                </div>
                <p className="quiz-card-meta">{quiz.questions.length} questions</p>
                <button type="button" className="btn-primary" onClick={() => startQuiz(quiz)}>
                  Commencer le quiz
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
