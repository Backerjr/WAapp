# rozmoWA - Modern Language Learning Platform

> **Interactive English language learning with React, TypeScript, and Tailwind CSS**

[![CI/CD](https://github.com/backerjr/WAapp/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/backerjr/WAapp/actions/workflows/ci-cd.yml)
[![Demo](https://img.shields.io/badge/demo-live-success)](https://backerjr.github.io/WAapp/)

## 🚀 Quick Start

```bash
# Enable pnpm (first time only)
corepack enable

# Install dependencies and start development server
pnpm install && pnpm run dev
```

**Dev:** http://localhost:5000/WAapp/ | **Live:** https://backerjr.github.io/WAapp/

## 📦 Installation

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Enabled via corepack (comes with Node.js 16.13+)

### Setup Steps

1. **Enable pnpm** (first time only):
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

2. **Clone the repository**:
   ```bash
   git clone https://github.com/backerjr/WAapp.git
   cd WAapp
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Start development server**:
   ```bash
   pnpm run dev
   ```

5. **Open in browser**: http://localhost:5000/WAapp/

### Why pnpm?

This project uses **pnpm** for superior performance:
- **50% faster** installs vs npm
- **40% faster** CI/CD builds
- **70% less** disk space usage
- Stricter dependency resolution

## 🛠️ Tech Stack

**Frontend:** React 19 · TypeScript · Vite 7  
**Routing:** React Router 7  
**Styling:** Tailwind CSS 3 · Framer Motion  
**Testing:** Vitest · Playwright  
**CI/CD:** GitHub Actions · Docker

## ✨ Features

- 🎯 **7 Exercise Types** - Multiple choice, listening, typing, drag-and-drop, and more
- 📊 **Progress Tracking** - XP, streaks, achievements, and completion stats
- 🔄 **Review System** - Spaced repetition for completed lessons
- 👤 **User Profiles** - Editable profiles with persistent localStorage
- 🌓 **Dark Mode** - Full dark mode support throughout
- 📱 **Fully Responsive** - Desktop sidebar, mobile bottom navigation
- ⚡ **Fast & Lightweight** - 102 KB gzipped bundle

## 📖 Documentation

- **[REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)** - Complete refactoring details
- **[QUICKSTART.md](./QUICKSTART.md)** - Setup and development guide
- **[DEPLOYMENT_SUCCESS.md](./DEPLOYMENT_SUCCESS.md)** - Deployment instructions

## 🎯 Usage

1. **Learn** - Browse and start lessons from the skill tree
2. **Practice** - Complete interactive exercises
3. **Review** - Reinforce learning with spaced repetition
4. **Track** - Monitor progress, XP, and achievements

## 🧪 Development

```bash
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run test         # Run tests
pnpm run lint         # Lint code
pnpm run type-check   # TypeScript checking
```

## 📂 Structure

```
src/
├── pages/rozmowa/      # Application pages
├── components/         # UI components
├── data/              # Lesson content
└── RozmowaApp.tsx     # Main app with routing
```

## 🚢 Deployment

Works on GitHub Pages, Vercel, and Docker. See [DEPLOYMENT_SUCCESS.md](./DEPLOYMENT_SUCCESS.md).

---

> *"Dedicated to the one who teaches the world how to listen."* ✨
