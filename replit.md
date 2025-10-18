# rozmoWA - English Learning App for Polish Speakers

## Overview
rozmoWA is a Duolingo-like language learning application that teaches English to Polish speakers. The app features a gamified learning experience with bite-sized lessons, progress tracking, and interactive exercises.

**Status**: MVP/Prototype Web Version
**Created**: October 18, 2025
**Tech Stack**: React 19, TypeScript, Vite

## Current Features (MVP)
- ✅ Polish UI (Twoja Ścieżka Nauki)
- ✅ Skill tree with A0-A1 CEFR levels
- ✅ Sample lessons:
  - Podstawy (Basics): Powitania (Greetings), Liczby 1-10 (Numbers 1-10)
  - Rodzina i Znajomi (Family and Friends): Członkowie Rodziny (Family Members)
- ✅ 4 exercise types:
  - Multiple choice
  - Type answer
  - Listen and select
  - Listen and type
- ✅ Web Speech API for English pronunciation (TTS)
- ✅ Gamification:
  - Streak tracking (🔥)
  - XP system (⭐)
  - Hearts/lives (❤️)
- ✅ Progress tracking with localStorage
- ✅ Lesson progression locks (complete previous to unlock next)

## Project Structure
```
src/
├── components/
│   ├── Header.tsx              # Top nav with stats
│   ├── SkillTree.tsx           # Main learning path view
│   ├── LessonView.tsx          # Lesson container
│   ├── ExerciseCard.tsx        # Exercise wrapper
│   └── exercises/
│       ├── MultipleChoice.tsx
│       ├── TypeAnswer.tsx
│       ├── ListenAndSelect.tsx
│       └── ListenAndType.tsx
├── data/
│   └── lessons.ts              # Sample A0-A1 content
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main app component
├── App.css                     # Styling
└── index.css                   # Global styles
```

## How to Use
1. View the skill tree showing available units and lessons
2. Click on unlocked lessons (first lesson starts unlocked)
3. Complete exercises to earn XP and unlock next lesson
4. Progress is saved automatically in browser localStorage
5. Build daily streaks by returning each day
6. Use hints if stuck on exercises

## Lesson Content
Sample content covers:
- **A0 Level (Podstawy)**:
  - Greetings: Hello, Good morning, How are you, Nice to meet you
  - Numbers: 1-10 in English
- **A1 Level (Rodzina i Znajomi)**:
  - Family members: Mother, Father, Sister, Brother
  - Basic possessives: my family, I love my family

## Technical Notes
- React 19 with new JSX transform (no React import needed)
- Vite dev server on port 5000
- TypeScript for type safety
- Web Speech Synthesis API for audio playback
- LocalStorage for progress persistence
- Responsive design with CSS Grid and Flexbox

## Future Enhancements (from spec)
- Placement test for adaptive entry
- More CEFR levels (A2, B1, B2)
- Speech recognition for pronunciation practice
- AI tutor chat for guided practice
- Social features (leaderboards, friends)
- Offline mode with downloadable lesson packs
- Parent/teacher dashboards
- Mobile apps (iOS, Android)

## Known Issues
- LSP warnings about React UMD globals (harmless with React 19's automatic JSX transform)
- No backend - all data is client-side
- No authentication yet
- Audio uses browser TTS (quality varies by browser)

## Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run start    # Build and serve the production bundle with the Node static server
```

## Hosting / Deployment
- Run `npm run start` locally to build the app and launch the lightweight Node server that serves the static assets from the `dist/` folder on port `4173` (configurable via the `PORT` env var).
- For cloud hosting providers (Railway, Render, Fly.io, etc.), set the start command to `npm run start`; the server automatically respects the port assigned in `process.env.PORT`.
- Remember to set `NODE_VERSION` (or the provider equivalent) to a Node LTS release (e.g., `20.x`) for best compatibility.
