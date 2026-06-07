export type Level = 'debutant' | 'intermediaire' | 'avance'

export const LEVELS: { id: Level; label: string; description: string }[] = [
  { id: 'debutant', label: 'Débutant (Collège)', description: 'Bases du vocabulaire et de la grammaire — A1/A2' },
  { id: 'intermediaire', label: 'Intermédiaire (Lycée)', description: 'Consolidation et structures plus riches — B1' },
  { id: 'avance', label: 'Avancé (Bac)', description: "Préparation à l'épreuve du baccalauréat — B2" },
]

export interface Flashcard {
  id: string
  level: Level
  theme: string
  front: string
  back: string
  example: string
}

export interface RevisionSection {
  heading: string
  content: string
  examples?: string[]
}

export interface RevisionSheet {
  id: string
  level: Level
  theme: string
  title: string
  summary: string
  sections: RevisionSection[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  level: Level
  theme: string
  title: string
  questions: QuizQuestion[]
}
