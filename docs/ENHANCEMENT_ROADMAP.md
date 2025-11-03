# rozmoWA Enhancement Roadmap

*Implementing the "Structured Fun" Philosophy with Love and Precision*

---

## Overview

This document provides a **phased implementation plan** to evolve rozmoWA from its current strong foundation into the comprehensive, emotionally engaging learning platform described in the master vision (TASKS.md).

**Guiding Principle:** Build thoughtfully, preserve the soul, enhance without overwhelming.

---

## Phase 1: Foundation Refinement (Week 1)

*Clean up, clarify, and strengthen the existing architecture.*

### 1.1 Code Organization

**Task: Relocate `_archived` folder**
- Move `src/components/_archived/` → `/archive/components/`
- Update `tsconfig.json` to remove exclude rule
- Document what each archived component was for
- Estimated time: 1 hour

**Task: Modularize CSS**
- Break `App.css` (1,627 lines) into:
  ```
  src/styles/
    components/
      header.css
      skill-tree.css
      lesson-view.css
      exercise-card.css
      exercises.css
    layouts/
      dashboard.css
      landing.css
      about.css
    utilities/
      animations.css
      helpers.css
  ```
- Maintain token-based system
- Estimated time: 4 hours

**Task: Extract Custom Hooks**
Create these new hooks to simplify App.tsx:
- `src/hooks/useProgress.ts` — Progress state + localStorage
- `src/hooks/useLesson.ts` — Lesson navigation state
- `src/hooks/useAchievements.ts` — Achievement unlocking logic

Example `useProgress.ts`:
```typescript
export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>('progress', INITIAL_PROGRESS);
  
  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setProgress(prev => ({
        ...prev,
        streak: prev.lastActiveDate === yesterday ? prev.streak + 1 : 1,
        lastActiveDate: today,
        dailyXP: 0 // Reset daily XP
      }));
    }
  }, [progress.lastActiveDate]);
  
  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
      dailyXP: prev.dailyXP + amount,
      level: Math.floor((prev.xp + amount) / 100) + 1
    }));
  }, []);
  
  const loseHeart = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  }, []);
  
  const completeLesson = useCallback((lessonId: string, earnedXP: number) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      xp: prev.xp + earnedXP,
      dailyXP: prev.dailyXP + earnedXP
    }));
  }, []);
  
  return {
    progress,
    updateStreak,
    addXP,
    loseHeart,
    completeLesson
  };
}
```

Estimated time: 3 hours

### 1.2 Achievement System Implementation

**Task: Dynamic Achievement Unlocking**

Add to `src/hooks/useAchievements.ts`:
```typescript
import { useEffect, useState } from 'react';
import { Achievement, Progress } from '../types';
import { ALL_ACHIEVEMENTS } from '../data/achievements';

export function useAchievements(progress: Progress) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement | null>(null);
  
  useEffect(() => {
    const updated = ALL_ACHIEVEMENTS.map(achievement => {
      const wasUnlocked = progress.achievements.includes(achievement.id);
      let shouldUnlock = false;
      
      switch (achievement.type) {
        case 'xp':
          shouldUnlock = progress.xp >= achievement.requirement;
          break;
        case 'streak':
          shouldUnlock = progress.streak >= achievement.requirement;
          break;
        case 'lessons':
          shouldUnlock = progress.completedLessons.length >= achievement.requirement;
          break;
        case 'perfect':
          // TODO: Track perfect lessons (no incorrect answers)
          shouldUnlock = false;
          break;
      }
      
      // Show notification for newly unlocked
      if (shouldUnlock && !wasUnlocked) {
        setRecentlyUnlocked(achievement);
        setTimeout(() => setRecentlyUnlocked(null), 5000);
      }
      
      return {
        ...achievement,
        unlocked: shouldUnlock
      };
    });
    
    setAchievements(updated);
  }, [progress.xp, progress.streak, progress.completedLessons.length]);
  
  return { achievements, recentlyUnlocked };
}
```

**Task: Achievement Notification Component**
Create `src/components/AchievementNotification.tsx`:
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '../types';

interface Props {
  achievement: Achievement | null;
}

export function AchievementNotification({ achievement }: Props) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="achievement-notification"
        >
          <div className="achievement-icon">{achievement.icon}</div>
          <div className="achievement-content">
            <h4>Achievement Unlocked!</h4>
            <p className="achievement-title">{achievement.title}</p>
            <p className="achievement-description">{achievement.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

Estimated time: 2 hours

### 1.3 Testing Infrastructure

**Task: Add Core Tests**
Create test files:
- `src/__tests__/useProgress.test.ts`
- `src/__tests__/ExerciseValidation.test.ts`
- `src/__tests__/ProgressCalculation.test.ts`

Example test:
```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../hooks/useProgress';

describe('useProgress', () => {
  it('should calculate level correctly from XP', () => {
    const { result } = renderHook(() => useProgress());
    
    act(() => {
      result.current.addXP(150);
    });
    
    expect(result.current.progress.level).toBe(2);
    expect(result.current.progress.xp).toBe(150);
  });
  
  it('should handle streak calculation', () => {
    const { result } = renderHook(() => useProgress());
    
    act(() => {
      result.current.updateStreak();
    });
    
    expect(result.current.progress.streak).toBeGreaterThanOrEqual(1);
  });
});
```

Estimated time: 4 hours

**Phase 1 Total: ~14 hours (2 working days)**

---

## Phase 2: UI/UX Enhancements (Week 2)

*Implement the design system improvements and polish the experience.*

### 2.1 Design System Implementation

**Task: Create Design Tokens File**

Update `src/styles/tokens.css` to match the TASKS.md specification:

```css
:root {
  /* Color Palette - Light Mode */
  --primary-background: hsl(30, 25%, 95%);
  --container-background: hsl(0, 0%, 100%);
  --primary-text: hsl(240, 10%, 15%);
  --secondary-text: hsl(240, 5%, 45%);
  --accent: hsl(350, 85%, 55%);
  --success: hsl(140, 70%, 40%);
  --info: hsl(210, 80%, 50%);
  --border: hsl(240, 10%, 85%);
  
  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  --text-h1: 36px;
  --text-h2: 28px;
  --text-h3: 22px;
  --text-body: 16px;
  --text-small: 14px;
  
  /* Spacing (4px base unit) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}

.dark {
  --primary-background: hsl(240, 10%, 12%);
  --container-background: hsl(240, 6%, 16%);
  --primary-text: hsl(30, 25%, 95%);
  --secondary-text: hsl(240, 5%, 65%);
  --accent: hsl(350, 90%, 65%);
  --success: hsl(140, 60%, 55%);
  --info: hsl(210, 85%, 65%);
  --border: hsl(240, 5%, 25%);
}
```

Estimated time: 2 hours

**Task: Dark Mode Toggle**

Create `src/components/ThemeToggle.tsx`:
```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);
  
  const toggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };
  
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </motion.button>
  );
}
```

Add to Header component.

Estimated time: 2 hours

### 2.2 Component Library Creation

**Task: Build Reusable Components**

Create atomic components following the TASKS.md specification:

`src/components/ui/Button.tsx`:
```tsx
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  leftIcon, 
  rightIcon, 
  children,
  ...props 
}: ButtonProps) {
  return (
    <motion.button
      className={`btn btn-${variant} btn-${size}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </motion.button>
  );
}
```

Similar components:
- `Card.tsx`
- `Badge.tsx`
- `ProgressBar.tsx`
- `Input.tsx`

Estimated time: 4 hours

### 2.3 Enhanced Landing Page

**Task: Redesign with Modern Layout**

Update `src/components/LandingPage.tsx` with:
- Hero section with dynamic gradient background
- Feature cards (Interactive exercises, Progress tracking, Gamification)
- Testimonials section
- Call-to-action with button animations

Estimated time: 3 hours

**Phase 2 Total: ~11 hours (1.5 working days)**

---

## Phase 3: Learning Experience Enhancement (Week 3)

*Build the review system and improve content delivery.*

### 3.1 Spaced Repetition Review System

**Task: Build Review Queue**

Create `src/components/ReviewView.tsx`:
```tsx
interface ReviewItem {
  exerciseId: string;
  word: string;
  translation: string;
  lastReviewed: Date;
  nextReview: Date;
  difficulty: number; // 0-5
}

export function ReviewView() {
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  
  // Load items due for review
  useEffect(() => {
    const items = getReviewQueue();
    setQueue(items.filter(item => item.nextReview <= new Date()));
  }, []);
  
  const handleReviewComplete = (itemId: string, wasCorrect: boolean) => {
    // Update difficulty based on performance
    // Reschedule using SM-2 algorithm
    updateReviewSchedule(itemId, wasCorrect);
  };
  
  // ... render review interface
}
```

**Task: Implement Spaced Repetition Algorithm**

Create `src/utils/spacedRepetition.ts`:
```typescript
// SM-2 Algorithm implementation
export function calculateNextReview(
  difficulty: number,
  wasCorrect: boolean,
  repetitions: number
): { nextReview: Date; newDifficulty: number } {
  let newDifficulty = difficulty;
  
  if (wasCorrect) {
    newDifficulty = Math.min(5, difficulty + 0.5);
  } else {
    newDifficulty = Math.max(0, difficulty - 1);
  }
  
  // Calculate interval based on difficulty
  const intervals = [1, 3, 7, 14, 30, 60]; // days
  const daysUntilNext = intervals[Math.floor(newDifficulty)];
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + daysUntilNext);
  
  return { nextReview, newDifficulty };
}
```

Estimated time: 6 hours

### 3.2 Enhanced Exercise Components

**Task: Standardize Exercise API**

Update all exercise components to use consistent pattern:
```tsx
interface ExerciseProps {
  exercise: Exercise;
  onCorrect: () => void;
  onIncorrect: () => void;
}
```

Update ExerciseCard to remove `onSubmit` pattern.

Estimated time: 2 hours

**Task: Add Hint System**

Improve hint display with progressive revelation:
- First hint: General guidance
- Second hint: Partial answer
- Third hint: Full explanation

Estimated time: 2 hours

### 3.3 Audio System Enhancement

**Task: Integrate Better Audio**

Options:
1. Use Azure Cognitive Services / Google Cloud TTS
2. Host prerecorded audio files
3. Improve speech synthesis voice selection

Create `src/services/audio.ts`:
```typescript
export class AudioService {
  private static instance: AudioService;
  
  async playPhrase(text: string, lang: string = 'en-US'): Promise<void> {
    // Attempt prerecorded audio first
    const audioUrl = await this.getPrerecordedAudio(text, lang);
    
    if (audioUrl) {
      return this.playAudioFile(audioUrl);
    }
    
    // Fall back to speech synthesis
    return this.useSpeechSynthesis(text, lang);
  }
  
  private async getPrerecordedAudio(text: string, lang: string): Promise<string | null> {
    // Check if audio file exists
    try {
      const response = await fetch(`/audio/${lang}/${encodeURIComponent(text)}.mp3`);
      return response.ok ? response.url : null;
    } catch {
      return null;
    }
  }
  
  // ... implementation
}
```

Estimated time: 4 hours

**Phase 3 Total: ~14 hours (2 working days)**

---

## Phase 4: Internationalization & Content Management (Week 4)

*Make the platform truly bilingual and scalable for content creators.*

### 4.1 Complete i18n Implementation

**Task: Extract All UI Strings**

Move all hardcoded text to locale files:

`src/i18n/locales/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "learn": "Learn",
    "progress": "Progress",
    "about": "About"
  },
  "lesson": {
    "start": "Start",
    "repeat": "Practice Again",
    "locked": "Locked",
    "exit": "Exit"
  },
  "feedback": {
    "correct": "Great job!",
    "incorrect": "Try again",
    "hint": "Hint"
  }
  // ... etc
}
```

Update all components to use `useTranslation()` hook.

Estimated time: 4 hours

**Task: Add Language Switcher**
- Dropdown in Header
- Persist preference to localStorage
- Switch all UI text dynamically

Estimated time: 2 hours

### 4.2 Content Management Preparation

**Task: Content Schema Validation**

Create `src/utils/validateContent.ts`:
```typescript
import { Unit, Lesson, Exercise } from '../types';

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];
  
  if (!lesson.id || !lesson.title_en || !lesson.title_pl) {
    errors.push('Lesson missing required fields');
  }
  
  if (lesson.exercises.length === 0) {
    errors.push('Lesson has no exercises');
  }
  
  lesson.exercises.forEach((ex, i) => {
    if (!ex.correctAnswer) {
      errors.push(`Exercise ${i}: missing correctAnswer`);
    }
    
    if (ex.type === 'multiple_choice' && (!ex.options || ex.options.length < 2)) {
      errors.push(`Exercise ${i}: multiple_choice needs at least 2 options`);
    }
  });
  
  return errors;
}
```

Add to build process to validate lessons.ts.

Estimated time: 2 hours

**Task: Export/Import System**

Create JSON export of progress and achievements:
```typescript
export function exportUserData(progress: Progress): string {
  return JSON.stringify({
    version: '1.0',
    exported: new Date().toISOString(),
    progress
  }, null, 2);
}

export function importUserData(jsonString: string): Progress {
  const data = JSON.parse(jsonString);
  // Validate and return
  return data.progress;
}
```

Add UI in Profile/Settings to download/upload data.

Estimated time: 2 hours

**Phase 4 Total: ~10 hours (1.5 working days)**

---

## Phase 5: Advanced Features & Polish (Week 5+)

*Final touches, performance optimization, and future-ready features.*

### 5.1 Performance Optimization

- Implement code splitting with React.lazy()
- Add service worker for offline support
- Optimize images and assets
- Implement skeleton loading states

Estimated time: 6 hours

### 5.2 Analytics & Insights

- Track learning time per session
- Words learned counter
- Activity heatmap
- Weekly/monthly reports

Estimated time: 4 hours

### 5.3 Future Preparation

- API-ready architecture (prepare for backend)
- Authentication placeholder
- Database schema planning

Estimated time: 4 hours

**Phase 5 Total: ~14 hours (2 working days)**

---

## Implementation Priority Matrix

### Must Have (Phase 1-2)
- ✅ Code organization cleanup
- ✅ Achievement system
- ✅ Dark mode
- ✅ Core testing

### Should Have (Phase 3)
- ✅ Review system
- ✅ Better audio
- ✅ Standardized exercises

### Nice to Have (Phase 4-5)
- ✅ Full i18n
- ✅ Content management
- ✅ Performance optimization

---

## Success Metrics

### Code Quality
- Test coverage > 70%
- TypeScript strict mode: no errors
- Lighthouse score > 90

### User Experience
- Time to first interaction < 2s
- Smooth 60fps animations
- Clear feedback within 200ms

### Learning Outcomes
- Daily return rate > 40%
- Average streak length > 7 days
- Lesson completion rate > 80%

---

*This roadmap is a living document. Adjust timelines and priorities based on user feedback and emerging needs.*

*Build with love. Ship with confidence.* 🌙
