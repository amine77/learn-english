# English Boost 🦉

Application web pour apprendre l'anglais du collège au bac : cartes de
vocabulaire (flashcards), fiches de révision et QCM, organisés par niveau
(débutant, intermédiaire, avancé) et par thème.

**Démo en ligne :** intégrée à mon [portfolio DevSecOps](https://charrad-devsecops.duckdns.org/projets) — section "Mes projets".

## Fonctionnalités

- 🃏 **Cartes mémo** — vocabulaire à réviser façon flashcards : on retourne la
  carte pour découvrir la traduction et un exemple, filtrable par niveau et thème.
- 📘 **Fiches de révision** — grammaire et méthodologie, organisées par niveau et thème.
- ✅ **QCM** — quiz corrigés et expliqués pour s'auto-évaluer.
- Trois niveaux de progression : débutant (collège, A1/A2), intermédiaire (lycée, B1)
  et avancé (préparation du bac, B2).

## Stack technique

- **React 19** + **TypeScript**
- **Vite** (build et dev server)
- **React Router** (navigation SPA)
- Contenu pédagogique au format JSON (`src/data/`), typé via `src/types/content.ts`
- ESLint (configuration TypeScript-aware)

## Structure du projet

```
src/
├── components/     # Layout, barre de filtres
├── pages/          # Accueil, Cartes mémo, Fiches, QCM
├── data/           # Contenu pédagogique (flashcards, fiches, quiz) en JSON
├── types/          # Types TypeScript partagés (Level, Flashcard, Quiz, ...)
└── App.tsx         # Déclaration des routes
```

## Lancer le projet en local

```bash
npm install
npm run dev       # serveur de développement (Vite)
npm run build     # build de production (tsc + vite build)
npm run lint      # vérification ESLint
```

## Auteur

Amine Charrad — [github.com/amine77](https://github.com/amine77)
