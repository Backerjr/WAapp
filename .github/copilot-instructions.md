Project overview

- Single-page React + Vite app written in TypeScript. Entry: `src/main.tsx`. Production server is a minimal Node static server `server.js` that serves `dist/`.
- Purpose: lightweight language-learning app with a skill tree (`src/data/lessons.ts`), lesson player (`src/components/LessonView.tsx`), and small exercise components under `src/components/exercises/`.

Architecture & data flow (quick)

- Data model: `src/types.ts` defines Unit -> Lesson -> Exercise shapes. `skillTree` in `src/data/lessons.ts` is the single source of truth for lessons/exercises and is read directly by components.
- UI: `App.tsx` holds application state (progress, userStats) in React state and persists it to `localStorage`. `SkillTree` lists units/lessons and calls `onStartLesson` to set `userStats.currentLesson`. `LessonView` renders the lesson and delegates to `ExerciseCard` and specific exercise components.
- Interaction: exercise components call callbacks `onCorrect` / `onIncorrect` provided by `ExerciseCard` -> `LessonView` to update hearts/xp and advance exercises.

Build / dev / run

- Local dev: npm run dev (uses Vite, server host overridden in `vite.config.ts` to 0.0.0.0:5000).
- Production build: npm run build (runs `tsc && vite build`).
- Serve production build: npm run start (builds then runs `node server.js`). `server.js` expects compiled assets in `dist/`.

Project-specific conventions

- Types-first: public shapes are declared in `src/types.ts`. When adding exercises, follow the `ExerciseType` union and field names (e.g. `audioText`, `options`, `correctAnswer`).
- Single data source: add new content in `src/data/lessons.ts`. Components assume exercises are present and do light runtime checks (e.g. optional `options`).
- UX timing: `LessonView` uses setTimeout delays (~1500ms) before advancing or completing a lesson — keep this in mind when adding tests or automations.
- Local persistence: all progress/stats are stored in `localStorage` keys `progress` and `userStats`. Migration of these shapes should handle missing fields and date strings (see App.tsx logic for `lastActiveDate` and streak calculation).

Patterns & examples to reference

- Start a lesson: `SkillTree` -> on click calls `onStartLesson(lessonId)` (see `src/components/SkillTree.tsx`).
- Exercise component API: each exercise component receives an `exercise` prop (type `Exercise`) and callbacks like `onSubmit` or `onCorrect` / `onIncorrect`. Example: `ListenAndSelect.tsx` uses `exercise.audioText` and the Web Speech API to play prompts.
- Locking logic: `SkillTree` locks lessons until prior unit/lesson completion using `progress.completedLessons` membership checks.

Integration points & gotchas

- No backend API: app is fully client-side; add any server endpoints (if needed) to `server.js` or a new server file and update `package.json` scripts accordingly.
- Browser-only features: some exercises rely on `window.speechSynthesis`. Guard code paths for server-side rendering or Node-based test runners.
- Types: project relies on TypeScript but `package.json` lists `@types/react` as a dependency (not dev). Keep type imports consistent and run `tsc` as part of CI or prebuild.

How to modify content safely (recommended steps)

1. Add new exercise data to `src/data/lessons.ts` following `Exercise` interface. 2. Add or reuse an exercise component in `src/components/exercises/` exposing the same callback surface. 3. Update `ExerciseCard`/`LessonView` only if you introduce new exercise types. 4. Run `npm run dev` and manually test interaction flows (speech, timing, localStorage). 5. Run `npm run build` to ensure `tsc` and Vite pass.

Small examples (copyable)

- Add an exercise object shape (from `src/types.ts`):

  { id: 'ex-3-1-1', type: 'listen_and_select', prompt_en: 'Listen', prompt_pl: '... ', audioText: 'Hello', options: ['Hello','Hi'], correctAnswer: 'Hello' }

- Play audio inside an exercise component (see `ListenAndSelect.tsx`): use SpeechSynthesisUtterance and set `utterance.lang = 'en-US'`.

Where to look first when changing behavior

- `src/App.tsx` — app state, persistence, and lesson lifecycle.
- `src/components/LessonView.tsx` & `ExerciseCard.tsx` — exercise orchestration and result callbacks.
- `src/data/lessons.ts` & `src/types.ts` — canonical data and shapes.
- `vite.config.ts` & `server.js` — dev server vs production serving details.

If something is unclear

- Tell me which file or flow you want edited and include a short example change; I can implement and validate it locally (run dev/build) and update this doc with the exact code locations.
