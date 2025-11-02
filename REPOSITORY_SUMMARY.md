# 🌙 RozmoWA - Repository Summary

> **A lightweight, elegant language-learning web application built with React + TypeScript + Vite**  
> Teaching Polish speakers English (and vice versa) through interactive exercises, progress tracking, and beautiful UI.

---

## 📋 Quick Overview

| **Aspect** | **Details** |
|------------|-------------|
| **Name** | RozmoWA (Rozmowa = "conversation" in Polish) |
| **Type** | Single-Page Application (SPA) |
| **Stack** | React 19, TypeScript 5.9, Vite 7.1 |
| **Purpose** | Interactive language learning with CEFR-aligned lessons |
| **Deployment** | Vercel (primary), Docker + GHCR (containers), GitHub Pages |
| **Testing** | Vitest (unit), Playwright (E2E) |
| **Status** | ✅ Production-ready, actively maintained |

---

## 🏗️ Architecture

### Tech Stack
```
Frontend:  React 19.2 + TypeScript 5.9 + Vite 7.1
Styling:   CSS3 (custom variables, animations, responsive)
Animation: Framer Motion 12.23
i18n:      react-i18next 16.1
Testing:   Vitest 1.6 + Playwright 1.56
Build:     Vite (optimized production bundles)
Server:    Node.js static server (server.js) + Nginx/Caddy containers
```

### Project Structure
```
WAapp/
├── src/
│   ├── components/          # React components
│   │   ├── exercises/       # 7 exercise type components
│   │   ├── elegant/         # Enhanced dashboard components
│   │   ├── SkillTree.tsx    # Main learning path UI
│   │   ├── LessonView.tsx   # Exercise orchestration
│   │   ├── ExerciseCard.tsx # Exercise wrapper
│   │   └── Header.tsx       # Navigation + stats
│   ├── data/
│   │   ├── lessons.ts       # CEFR-aligned lesson content
│   │   └── achievements.ts  # Gamification rewards
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main app + routing logic
│   └── main.tsx             # React entry point
├── .github/workflows/       # CI/CD automation
├── public/                  # Static assets
├── dist/                    # Production build output
├── showcase.html            # Static showcase page
├── index.html               # React app entry (serves at /)
├── Dockerfile.nginx         # Production container (Nginx)
├── Dockerfile.caddy         # Alternative container (Caddy)
├── server.js                # Node.js static file server
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Unit test configuration
└── playwright.config.ts     # E2E test configuration
```

---

## 🎯 Core Features

### 1. **Interactive Learning System**
- **Skill Tree Navigation**: CEFR-leveled units (A0-B2) with sequential lesson unlocking
- **7 Exercise Types**:
  1. `multiple_choice` - Select correct answer from options
  2. `type_answer` - Free-text input validation
  3. `listen_and_select` - Audio comprehension with options
  4. `listen_and_type` - Dictation exercises
  5. `drag_words` - Sentence construction by ordering words
  6. `image_match` - Visual vocabulary association
  7. `fill_blanks` - Cloze test completion

### 2. **Progress Tracking & Gamification**
- **XP System**: Earn experience points per completed lesson
- **Hearts System**: Limited mistakes per session
- **Streak Counter**: Daily engagement tracking
- **Achievements**: 20+ unlockable badges for milestones
- **Local Persistence**: All progress saved in `localStorage`

### 3. **Speech Integration**
- **Text-to-Speech**: Browser Web Speech API for pronunciation
- **Audio Prompts**: Native synthesis for listening exercises
- **Interactive Audio Player**: Custom audio controls in exercises

### 4. **Multi-Mode UI**
- **Landing Page**: Marketing site with course info
- **Skill Tree**: Main learning interface
- **Elegant Dashboard**: Enhanced stats and daily goals
- **Progress Dashboard**: Detailed achievement tracking
- **Teacher Tools** (hidden): Lesson creation and upload tools
- **Social Hub**: Leaderboard and community features

### 5. **Responsive Design**
- Mobile-first CSS with breakpoints: 480px, 768px, 992px, 1200px
- Touch-optimized interaction zones
- Smooth animations and transitions
- Dark mode support (via CSS variables)

---

## 🚀 Deployment & CI/CD

### **GitHub Actions Workflows**

| **Workflow** | **Trigger** | **Purpose** |
|-------------|-------------|-------------|
| `ci-cd.yml` | Push to `main`/`replit-agent`, PRs | Build, test, publish Docker images to GHCR |
| `release.yml` | GitHub Release published | Build release-tagged Docker images |
| `check-pages.yml` | Push/workflow dispatch | Verify GitHub Pages configuration |
| `configure-pages.yml` | Workflow dispatch | Setup/fix GitHub Pages deployment |
| `copilot.yml` | Push/PR/manual | Run tests and build verification |

### **Docker Images**
- **Registry**: GitHub Container Registry (GHCR)
- **Images**:
  - `ghcr.io/backerjr/rozmowa:nginx-latest` (production Nginx)
  - `ghcr.io/backerjr/rozmowa:caddy-latest` (production Caddy)
  - SHA-tagged variants for version pinning
- **Build Process**:
  1. `npm ci` → Install dependencies
  2. `npm run build` → Vite production build to `dist/`
  3. Docker build with optimized static server
  4. Push to GHCR with authentication via `GITHUB_TOKEN`

### **Deployment Targets**
1. **Vercel** (primary): Auto-deploys from `main` branch
2. **GitHub Pages**: Static site at `https://backerjr.github.io/WAapp/`
3. **Docker Containers**: Pull and run from GHCR

---

## 🧪 Testing Strategy

### **Unit Tests (Vitest)**
```bash
npm test  # Run all unit tests
```
- **Location**: `src/__tests__/`
- **Coverage**: GitHub Actions environment validation, component rendering, smoke tests
- **Config**: `vitest.config.ts` excludes E2E files, targets `src/` only

### **E2E Tests (Playwright)**
```bash
npm run test:e2e        # Headless mode
npm run test:e2e:ui     # Interactive UI mode
```
- **Location**: `jules-scratch/verification/`
- **Tests**:
  - `test-1.spec.ts`: Homepage title verification
  - `verify.spec.ts`: Landing page rendering and hero headline
- **Config**: `playwright.config.ts` starts dev server automatically

### **Test Separation**
- ✅ Vitest excludes `jules-scratch/**/*.spec.ts` (Playwright tests)
- ✅ Playwright only runs `.spec.ts` files in its test directory
- ✅ TypeScript config excludes both test directories from build

---

## 📦 Build & Development

### **Local Development**
```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server on port 5000
# Open http://localhost:5000
```

### **Production Build**
```bash
npm run build        # TypeScript check + Vite build → dist/
npm run start        # Build + serve via Node (port 4173)
node server.js       # Serve pre-built dist/ folder
```

### **Docker Deployment**
```bash
# Nginx variant
docker build -f Dockerfile.nginx -t rozmowa:nginx .
docker run -p 8080:80 rozmowa:nginx

# Caddy variant (smaller, auto-TLS ready)
docker build -f Dockerfile.caddy -t rozmowa:caddy .
docker run -p 8081:80 rozmowa:caddy
```

---

## 🗂️ Data Management

### **Content Structure**
- **Source**: `src/data/lessons.ts`
- **Format**: TypeScript objects following `src/types.ts` interfaces
- **Hierarchy**:
  ```
  Unit (CEFR level)
    └── Lesson (topic)
        └── Exercise (interaction)
  ```

### **Progress Storage**
- **Mechanism**: Browser `localStorage`
- **Keys**:
  - `progress`: Completed lessons, XP, hearts, streak
  - `userStats`: Current lesson, exercise index
- **Schema**: JSON-serialized TypeScript interfaces from `src/types.ts`

### **Achievements**
- **Source**: `src/data/achievements.ts`
- **Types**: Completion milestones, streak records, XP thresholds
- **Display**: `ProgressionDashboard` component

---

## 🎨 Design System

### **Color Palette**
```css
--lavender:        #e6e6fa  /* Primary brand color */
--soft-gold:       #fff8e7  /* Accent highlights */
--deep-charcoal:   #343a40  /* Text and borders */
--ivory-white:     #fffefc  /* Background */
--accent-lavender: #b19cd9  /* Interactive elements */
--accent-gold:     #ffe0b3  /* Success states */
```

### **Typography**
- **Headings**: Playfair Display (serif, elegant)
- **Body**: Poppins (sans-serif, readable)
- **Loaded**: Google Fonts CDN

### **Animations**
- Framer Motion for page transitions
- CSS transitions for hover states (400ms cubic-bezier)
- Keyframe animations for floating elements

---

## 🔐 Security & Permissions

### **GitHub Actions Permissions**
```yaml
permissions:
  contents: write    # Commit to branches
  packages: write    # Push to GHCR
  pages: write       # Deploy GitHub Pages
  id-token: write    # OIDC for deployments
  actions: read      # Read workflow status
```

### **Secrets Used**
- `GITHUB_TOKEN` (default): CI authentication
- `GHCR_PAT` (optional): Enhanced package write access
- `GH_PAGES_PAT` (optional): Pages deployment with custom permissions

---

## 📊 Metrics & Analytics

### **Current Content Stats**
- **Units**: 8 CEFR levels (A0-B2)
- **Lessons**: 57+ interactive lessons
- **Exercises**: 200+ unique exercise instances
- **Languages**: Polish ↔ English bidirectional

### **Technical Metrics**
- **Build Size**: ~220KB gzipped (production bundle)
- **Lighthouse Score**: 95+ performance
- **Test Coverage**: Unit tests for critical paths, E2E for user flows
- **Dependencies**: 27 production, 14 dev dependencies

---

## 🛠️ Maintenance & Contributing

### **Code Quality**
- **Linting**: ESLint via Vite default config
- **Type Checking**: `tsc --noEmit` in CI
- **Formatting**: Prettier-compatible code style
- **Pre-commit**: Manual `npm test` before pushing

### **Branch Strategy**
- `main`: Stable production code
- `replit-agent`: Active development branch
- Feature branches: Create from `replit-agent`, PR to `main`

### **Adding New Content**
1. Edit `src/data/lessons.ts`
2. Follow `Exercise` interface from `src/types.ts`
3. Use existing exercise types or create new component in `src/components/exercises/`
4. Test locally with `npm run dev`
5. Run `npm test && npm run test:e2e` before committing

---

## 🐛 Known Issues & Limitations

1. **Browser API Dependencies**: Speech synthesis requires modern browser (no Safari iOS < 14.5)
2. **LocalStorage Limit**: 5MB cap per domain (sufficient for most users)
3. **No Backend**: All data client-side; no server-side validation or sync
4. **Single Language Pair**: Currently Polish ↔ English only (extensible via i18n)

---

## 📚 Documentation Files

| **File** | **Purpose** |
|----------|-------------|
| `README.md` | Quick start guide and Docker instructions |
| `QUICKSTART.md` | Step-by-step setup for new developers |
| `COMPREHENSIVE_ENHANCEMENT_REPORT.md` | Full feature audit and roadmap |
| `ROZMOWA_ENHANCEMENT_REPORT.md` | UI/UX improvement proposals |
| `WEBSITE_IMPLEMENTATION_COMPLETE.md` | Marketing site build log |
| `.github/copilot-instructions.md` | AI-assisted development guidelines |

---

## 🔗 Links

- **Live App**: https://waapp.vercel.app/
- **GitHub Repo**: https://github.com/Backerjr/WAapp
- **GHCR Images**: https://github.com/Backerjr/WAapp/pkgs/container/rozmowa
- **GitHub Pages**: https://backerjr.github.io/WAapp/

---

## 📄 License & Credits

- **License**: Not specified (proprietary)
- **Author**: Ahmed Backer (@Backerjr)
- **Philosophy**: *"Dedicated to the one who teaches the world how to listen."*
- **Inspiration**: Bridging cultures through compassionate language education

---

**Last Updated**: November 2, 2025  
**Repository Version**: 1.0.0  
**Build Status**: ✅ All tests passing, Docker images published
