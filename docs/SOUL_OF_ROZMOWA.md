# rozmoWA — Understanding the Soul 🌙

*A Deep Exploration of "Worlds Between Words"*

---

## I. The Heart of rozmoWA

### What This Application Is

rozmoWA (pronounced "rozmowa" - Polish for "conversation") is a language learning web application that teaches English to Polish speakers. But it's more than software — it's a **bridge between worlds**, a **space of transformation**, where learners don't just memorize vocabulary, but feel the rhythm of a new language settling into their bones.

The name itself is poetry: "Worlds **A**" — the space between languages, where understanding blooms.

### The Philosophy: "Structured Fun"

This isn't Duolingo. This isn't Rosetta Stone. rozmoWA walks a rare middle path:

- **Structure** from traditional pedagogical frameworks (CEFR levels, progressive curriculum)
- **Gamification** that feels meaningful, not manipulative (XP, streaks, hearts, achievements)
- **Emotional Design** that makes learning feel like a journey, not a task
- **Respect** for the learner's intelligence and time

The dedication in the footer says it all:
> "Dedicated to the one who teaches the world how to listen."

---

## II. Architecture — The Technical Soul

### Technology Stack

**Core Framework:**
- React 19.2.0 with TypeScript 5.9.3
- Vite 7.1.10 (lightning-fast dev server and build)
- Framer Motion 12.23.24 (smooth, elegant animations)

**Key Libraries:**
- i18next + react-i18next (internationalization, though currently Polish/English only)
- React Icons 5.5.0 (icon system)
- Vitest 1.6.1 (unit testing)
- Playwright 1.56.1 (E2E testing)

**Infrastructure:**
- GitHub Actions CI/CD (automated builds, tests, Docker publishing)
- GitHub Container Registry (GHCR) for Docker images
- GitHub Pages deployment
- Vercel-ready configuration

**Design System:**
- Custom CSS with CSS Variables (not Tailwind)
- Glass morphism effects
- Purple/Teal/Gold/Ivory color palette
- Motion system with Framer Motion variants
- Token-based spacing, shadows, typography

### Project Structure

```
src/
├── components/           # UI components
│   ├── exercises/       # 7 different exercise types
│   ├── _archived/       # Legacy/experimental components
│   ├── Header.tsx       # Navigation with progress stats
│   ├── SkillTree.tsx    # Main learning path view
│   ├── LessonView.tsx   # Lesson container & orchestrator
│   ├── ExerciseCard.tsx # Exercise router & result display
│   ├── ProgressionDashboard.tsx  # Stats & achievements
│   ├── LandingPage.tsx  # Hero/welcome page
│   ├── AboutPage.tsx    # Project info
│   └── ...various UI components
├── data/
│   ├── lessons.ts       # **THE HEART** - all lesson content
│   └── achievements.ts  # Achievement definitions
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useSpeechSynthesis.ts
│   ├── useSpeechRecognition.ts
│   └── useOnlineStatus.ts
├── i18n/                # Internationalization
│   ├── config.ts
│   └── locales/         # en.json, pl.json
├── styles/              # Design system
│   ├── tokens.css       # CSS variables
│   ├── theme.ts         # TypeScript theme helper
│   ├── motion.ts        # Animation variants
│   ├── prose.css        # Typography for content
│   └── globals.css      # Global styles
├── types.ts             # **CRITICAL** - TypeScript interfaces
├── App.tsx              # Main application orchestrator
├── App.css              # Main application styles (1627 lines!)
├── index.css            # Root styles with color palette (315 lines)
└── main.tsx             # React entry point
```

### Data Flow Architecture

```
localStorage (persistence)
     ↕
App.tsx (state container)
     ├── progress: Progress (XP, streak, hearts, completedLessons, achievements)
     ├── userStats: UserStats (currentLesson, exerciseIndex)
     └── viewMode: 'home' | 'learn' | 'progress' | 'about'
     ↓
Components receive state & callbacks
     ├── Header (displays stats, navigation)
     ├── SkillTree (shows units/lessons, handles lesson start)
     ├── LessonView (lesson orchestrator)
     │    └── ExerciseCard (exercise router)
     │         └── Individual Exercise Components
     └── ProgressionDashboard (analytics & achievements)
```

**Key State Management Pattern:**
- **No Redux/Context** — Pure React useState + localStorage
- **Single source of truth** — `App.tsx` holds all application state
- **Props drilling** — Intentional simplicity (max 2-3 levels deep)
- **Callbacks flow up** — `onCorrect`, `onIncorrect`, `onComplete`, etc.

---

## III. The Learning Experience

### Exercise Types (7 total)

1. **multiple_choice** — Select from 4 options
2. **type_answer** — Free text input (flexible matching)
3. **listen_and_select** — Audio playback + multiple choice
4. **listen_and_type** — Audio playback + free text
5. **drag_words** — Drag & drop to arrange sentence
6. **image_match** — Match words to images
7. **fill_blanks** — Fill in missing words in sentence

Each exercise type has its own React component in `src/components/exercises/`.

### The Learning Loop

```
1. User sees SkillTree (units → lessons)
2. Clicks "Rozpocznij" (Start) on unlocked lesson
   → App sets userStats.currentLesson
3. LessonView renders
   → Shows progress bar
   → Renders ExerciseCard for current exercise
4. User interacts with exercise
   → Submit answer
   → ExerciseCard shows result (correct/incorrect)
5. If correct: auto-advance after 1.5s
   If incorrect: lose 1 heart, show correct answer
6. After last exercise:
   → Add lesson to completedLessons
   → Award XP
   → Return to SkillTree
```

### Progression System

**XP (Experience Points):**
- Earned by completing lessons
- Each lesson awards 10 XP
- Displayed in header and dashboard

**Streak:**
- Days in a row with activity
- Calculated on app load by comparing lastActiveDate
- Emoji changes based on streak length (💪 → ✨ → ⚡ → 🔥)

**Hearts:**
- Start with 5 hearts
- Lose 1 per incorrect answer
- Visual feedback in header
- Currently no heart regeneration (could be added)

**Levels:**
- Calculated from XP
- Formula: `level = floor(xp / 100) + 1`
- Level 1: 0-99 XP, Level 2: 100-199 XP, etc.

**Achievements:**
- Defined in `src/data/achievements.ts`
- Types: `xp`, `streak`, `lessons`, `perfect`
- Currently displayed but not dynamically unlocked (TODO)

---

## IV. Design System — The Visual Soul

### Color Philosophy: "Ivory Moonlight with Cosmic Accents"

**Primary Palette:**
```css
--color-ivory: #FFFEF7        /* Warm, gentle background */
--color-midnight: #0F172A     /* Deep, serene dark */
--color-lavender: #E9D5FF     /* Soft, calming accent */
--color-purple: #9333EA       /* Primary brand color */
--color-teal: #14B8A6         /* Complementary energy */
--color-gold: #D4AF37         /* Accent for rewards/XP */
```

**Glass Morphism:**
- Extensive use of `backdrop-filter: blur()` + transparency
- Creates depth and layering
- Modern, elegant aesthetic
- Variables like `--glass-white`, `--glass-lavender`

**Shadows:**
- Multiple levels: `xs`, `sm`, `md`, `lg`, `xl`
- Purple-tinted shadows for brand consistency
- Special `--shadow-glow` and `--shadow-glow-gold` for emphasis

### Typography

**Font Stack:**
- Primary: `Inter` (body text, UI)
- Display: `Poppins` (headings)
- Both are clean, modern, highly legible

**Font Sizes:**
- Token-based system
- Range from `--text-xs` to `--text-4xl`

### Spacing & Layout

**Spacing Scale:**
- Base unit: 4px
- Tokens: `--space-1` (4px) through `--space-8` (32px)
- Consistent rhythm throughout

**Border Radius:**
- Range: `--radius-xs` (8px) to `--radius-xl` (32px)
- Creates softness and approachability

### Animation Philosophy

Defined in `src/styles/motion.ts`:

**Easing Curves:**
```typescript
standard: [0.2, 0.8, 0.2, 1]     // Balanced
emphasized: [0.2, 0.7, 0, 1]     // Punchy entrance
decelerate: [0, 0, 0.2, 1]       // Gentle landing
accelerate: [0.4, 0, 1, 1]       // Quick departure
```

**Duration Constants:**
```typescript
quick: 0.12s   // Instant feedback
fast: 0.18s    // Hover effects
medium: 0.26s  // Enter/exit animations
slow: 0.38s    // Deliberate transitions
```

**Common Variants:**
- `fadeUp` — Fade in + slide up (most common)
- `fadeIn` — Simple opacity fade
- `scaleIn` — Grow from center
- `slideIn` — Slide from direction

**Usage Pattern:**
```tsx
<motion.div variants={fadeUp} initial="initial" animate="animate">
```

---

## V. Content Architecture — The Curriculum

### Data Structure (from `types.ts`)

```typescript
Unit (CEFR level)
  └── Lesson[]
       └── Exercise[]
```

**Example:**
```
Unit: "Podstawy" (Basics) — A0
  └── Lesson: "Powitania" (Greetings) — 10 XP
       ├── Exercise 1: multiple_choice — "How do you say 'Cześć'?"
       ├── Exercise 2: listen_and_select — "Good morning"
       ├── Exercise 3: type_answer — "Jak się masz?"
       ├── Exercise 4: drag_words — Arrange greeting
       └── ... (7 exercises total)
```

### Current Content Volume

**From `lessons.ts` (546 lines):**
- 3 Units (A0, A1, A2 levels)
- ~6-7 lessons per unit
- ~7 exercises per lesson
- **~140-150 total exercises**

**Themes covered:**
1. **Unit 1 (A0):** Greetings, Numbers, Colors, Family, Days/Months, Food
2. **Unit 2 (A1):** Animals, Weather, Clothing, Body Parts, Hobbies, House
3. **Unit 3 (A2):** Travel, Shopping, Health, Work, Technology, Daily Routines

### Content Philosophy

Each lesson has:
- **Polish title** (`title_pl`) — What learners see first
- **English title** (`title_en`) — Translation
- **Icon** — Emoji for visual identity
- **Poetic descriptions** — e.g., "Każde słowo to kamień w moście porozumienia" (Every word is a stone in the bridge of understanding)

This **emotional layer** transforms dry vocabulary into a journey.

---

## VI. Technical Strengths 💪

### What's Working Beautifully

1. **Clean Architecture**
   - Clear separation of concerns
   - Intuitive file structure
   - Well-defined data flow

2. **Type Safety**
   - Comprehensive TypeScript interfaces
   - No `any` types in core code
   - Strong contracts between components

3. **Modern Tooling**
   - Vite for blazing fast builds
   - Vitest for unit tests
   - Playwright for E2E
   - GitHub Actions for CI/CD

4. **Performance**
   - 6,711 total lines of code
   - Small bundle size (dist builds to ~240KB JS)
   - No unnecessary dependencies

5. **Accessibility Considerations**
   - Semantic HTML
   - Keyboard navigation support
   - ARIA attributes in interactive elements
   - High contrast color choices

6. **Design System**
   - Consistent token usage
   - Reusable patterns
   - Cohesive visual language

7. **User Experience**
   - Smooth animations
   - Clear feedback
   - Progress visibility
   - Encouraging copy

---

## VII. Areas for Refinement 🔧

### Architectural Opportunities

1. **State Management Complexity**
   - App.tsx is doing a lot (state + routing + persistence)
   - Consider extracting to custom hooks:
     - `useProgress()` — Manage progress state & localStorage
     - `useLesson()` — Handle lesson navigation
   - This would make App.tsx more readable

2. **The `_archived` Folder**
   - 13 components with 2,000+ lines of code
   - Many have broken imports (hence the tsconfig exclude)
   - **Decision needed:** Delete completely or refactor for future use?
   - My recommendation: **Move to separate `/archive` folder outside `src`**

3. **Exercise Component API Inconsistency**
   - Old exercises: `onSubmit(isCorrect: boolean)`
   - New exercises: `onCorrect()` / `onIncorrect()`
   - **Standardize** to one pattern for clarity

4. **Achievement System**
   - Achievements are defined but not dynamically unlocked
   - Need logic in App.tsx to:
     - Check progress against achievement requirements
     - Update `progress.achievements` array
     - Show unlock notifications

5. **i18n Underutilized**
   - i18next is installed but barely used
   - Most text is hardcoded in components
   - **Opportunity:** Extract all UI strings to locale files
   - Would enable easy language switching for interface

### Design System Refinements

1. **CSS Organization**
   - `App.css` is 1,627 lines (very large!)
   - `index.css` is 315 lines
   - **Opportunity:** Break into modular stylesheets:
     ```
     styles/
       components/
         header.css
         skill-tree.css
         lesson-view.css
         exercise-card.css
       layouts/
         dashboard.css
         landing.css
       utilities/
         animations.css
         helpers.css
     ```

2. **Component-Specific CSS**
   - Some components have separate CSS files (DragWords.css, ProgressionDashboard.css)
   - Others rely on App.css
   - **Standardize:** Either co-locate all CSS or centralize all

3. **Dark Mode**
   - Color system has dark mode values defined
   - But no toggle or implementation
   - **Quick win:** Add theme switcher using CSS custom properties

### Content & Learning Experience

1. **Lesson Descriptions**
   - Beautiful poetic descriptions exist
   - Not all are displayed in UI
   - **Opportunity:** Feature these more prominently

2. **Review System**
   - No spaced repetition
   - No vocabulary review separate from lessons
   - **Future:** Build a Review Queue (Anki-style)

3. **Audio Features**
   - Speech synthesis works
   - But voice quality varies by browser
   - **Enhancement:** Prerecorded audio files for key phrases

4. **Progress Persistence**
   - Only localStorage (data lost if cleared)
   - **Future:** Optional cloud sync with authentication

5. **Social Features**
   - Types defined (`Friend`, `LeaderboardEntry`)
   - But no implementation
   - **Future Phase:** Community, leaderboards, sharing

### Code Quality & Maintenance

1. **Comments**
   - Generally good, but some are very technical
   - **Suggestion:** Make comments more human and narrative
   - Example:
     ```typescript
     // OLD: // Calculate XP needed for next level
     // NEW: // Each level requires 100 more XP than the last
     //      Level 2 needs 100 XP total, Level 3 needs 200, etc.
     ```

2. **Error Boundaries**
   - ErrorBoundary component exists
   - But not wrapped around key components
   - **Enhancement:** Wrap SkillTree, LessonView for graceful failures

3. **Loading States**
   - No loading spinners or skeletons
   - Content appears instantly (good!) but edge cases may flash
   - **Polish:** Add subtle loading states for slower connections

4. **Testing Coverage**
   - Tests exist (smoke tests, CI workflow tests, Header test)
   - But no tests for core learning logic
   - **Priority:** Test exercise validation, progress calculation, localStorage sync

---

## VIII. The Emotional Design ❤️

### What Makes rozmoWA Special

1. **Poetic Language**
   - Lesson descriptions are short poems
   - "Every word is a stone in the bridge of understanding"
   - "Numbers are life's rhythm"
   - This transforms learning from mechanical to meaningful

2. **Visual Softness**
   - Rounded corners everywhere
   - Gentle shadows
   - Soft color transitions
   - Creates a sense of **safety and welcome**

3. **Encouraging Feedback**
   - "Świetnie!" (Great!) on correct answers
   - "Spróbuj ponownie" (Try again) on errors
   - No punishment language
   - Streak emojis that evolve (💪 → ✨ → ⚡ → 🔥)

4. **Progressive Revelation**
   - Locked lessons create anticipation
   - Clear visual hierarchy shows "what's next"
   - Achievements provide long-term goals

5. **The Moon**
   - Logo: 🌙 Rozmowa
   - Moon symbolizes transformation, cycles, reflection
   - Perfectly aligned with language learning journey

### User Journey Emotional Arc

```
Landing → Wonder ("Speak beautifully. Learn fearlessly.")
          ↓
SkillTree → Possibility (seeing the path ahead)
          ↓
Lesson → Engagement (active participation)
          ↓
Correct Answer → Joy (✅ Świetnie!)
          ↓
Lesson Complete → Accomplishment (XP earned, progress visible)
          ↓
Dashboard → Pride (streak visible, level up, achievements)
          ↓
Return → Habit (the loop becomes natural)
```

---

## IX. Recommendations — The Path Forward

### Immediate Quick Wins (1-2 hours)

1. **Clean Up `_archived` folder**
   - Move to `/archive` outside `src/`
   - Remove from tsconfig.json exclude list
   - Reduces cognitive load

2. **Add Achievement Unlocking Logic**
   - ~50 lines of code in App.tsx
   - Check after every lesson completion
   - Show notification when unlocked

3. **Improve Comments**
   - Review App.tsx, types.ts, lessons.ts
   - Make them warmer and more narrative
   - Think: "teaching a friend"

4. **Add Loading State to LessonView**
   - Simple fade-in animation
   - Polish for user perception

### Short Term Enhancements (1-2 days)

1. **Extract Custom Hooks**
   ```typescript
   useProgress() // Manage progress state & localStorage
   useLesson()   // Handle lesson state
   useStreaks()  // Calculate streaks
   ```

2. **Modularize CSS**
   - Break App.css into component stylesheets
   - Co-locate styles with components
   - Easier maintenance

3. **Standardize Exercise API**
   - Migrate all exercises to `onCorrect`/`onIncorrect` pattern
   - Update ExerciseCard to match
   - Remove `onSubmit` pattern

4. **Add Dark Mode Toggle**
   - Use CSS custom properties
   - Add toggle in Header
   - Persist preference to localStorage

5. **Write Core Tests**
   - Test exercise validation logic
   - Test progress calculation
   - Test localStorage persistence

### Medium Term Features (1-2 weeks)

1. **Review System**
   - Build vocabulary review queue
   - Spaced repetition algorithm
   - Separate "Review" view mode

2. **Internationalize UI**
   - Extract all UI strings to i18n files
   - Add language switcher
   - Support Polish/English UI toggle

3. **Enhanced Audio**
   - Integrate prerecorded audio API
   - Better pronunciation examples
   - Voice selection

4. **Profile System**
   - User settings page
   - Daily goal customization
   - Avatar selection

5. **Analytics Dashboard**
   - Time spent learning
   - Words learned counter
   - Heatmap of active days

### Long Term Vision (Months)

1. **Backend & Authentication**
   - User accounts
   - Cloud sync
   - Cross-device progress

2. **Social Features**
   - Friend system
   - Leaderboards
   - Shared achievements

3. **Content Creation Tools**
   - Teacher dashboard (some exists in `_archived`)
   - Lesson builder UI
   - Exercise generator

4. **AI Integration**
   - Personalized lesson recommendations
   - Adaptive difficulty
   - Conversation practice bot

5. **Mobile App**
   - React Native port
   - Offline mode
   - Push notifications for streaks

---

## X. Final Reflection — The Craft

### What I Admire

This codebase shows **restraint**. It doesn't over-engineer. It doesn't reach for complex state management when simple will do. It doesn't use Tailwind when custom CSS creates a more cohesive identity. It doesn't sacrifice beauty for functionality.

The attention to **micro-copy** (button text, achievement descriptions, lesson poetry) shows that the creator understands: **language learning is about feeling, not just facts**.

The **progressive disclosure** in the UI (locked lessons, streaks, achievements) creates a journey that feels earned, not given.

### What Could Evolve

The main opportunity is **scaling complexity gracefully**:
- As content grows, content management becomes harder
- As features add, App.tsx grows unwieldy
- As users increase, localStorage won't suffice

But these are **good problems**. They mean the foundation is solid enough to build on.

### The Soul of rozmoWA

This isn't just a language app. It's a **space of transformation**. The moon emoji, the poetic descriptions, the gentle colors — they all whisper:

> "You're not just memorizing words. You're learning to see the world differently. And we're here, gently guiding you, one word at a time."

That's the soul. That's what must be preserved as the project grows.

---

## XI. Development Guidelines — For Future Contributors

### Writing Code for rozmoWA

1. **Keep the Poetry**
   - When adding lessons, write poetic descriptions
   - When writing copy, be warm and encouraging
   - When choosing colors, think: "Does this feel calm and inviting?"

2. **Respect the Simplicity**
   - Don't add state management until absolutely necessary
   - Don't add dependencies without justification
   - Don't add features that distract from learning

3. **Test the Emotion**
   - Does this make learning feel good?
   - Does this reduce anxiety?
   - Does this create a sense of progress?

4. **Comment Like Teaching**
   - Explain the "why", not just the "what"
   - Write comments as if teaching a junior developer
   - Use analogies and metaphors

5. **Design with Light**
   - Use shadows to create depth
   - Use animations to create flow
   - Use whitespace to create calm

### Code Style

- **TypeScript**: Always typed, no `any` unless truly necessary
- **React**: Functional components + hooks only
- **CSS**: Custom properties for tokens, BEM-like naming
- **Naming**: Clear, descriptive, human-readable
- **Comments**: Narrative, warm, explaining intent

### Git Commit Style

Follow the conventional commits pattern with heart:

```
feat(lessons): add travel vocabulary unit ✈️
fix(exercises): correct drag-words validation logic
style(dashboard): improve card spacing for readability
docs(readme): add onboarding guide for new contributors
refactor(hooks): extract useProgress for clarity
```

---

*This document is a living guide. As the project evolves, so should this understanding.*

*With love and care,*  
*For rozmoWA — worlds between words* 🌙
