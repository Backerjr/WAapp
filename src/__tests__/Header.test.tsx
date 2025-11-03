import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/legacy/Header';
import { Progress } from '../types';
import { describe, it, expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

const mockProgress: Progress = {
  completedLessons: [],
  xp: 100,
  streak: 5,
  hearts: 3,
  lastActiveDate: new Date().toDateString(),
  level: 1,
  dailyGoal: 20,
  dailyXP: 10,
  achievements: [],
  weeklyStreak: 1,
  joinDate: new Date().toDateString(),
};

describe('Header', (): void => {
    it('should render all navigation buttons', () => {
      render(<Header progress={mockProgress} onViewChange={() => { } } />);

      expect(screen.getByText('🏠 Home')).toBeInTheDocument();
      expect(screen.getByText('🎓 Learn')).toBeInTheDocument();
      expect(screen.getByText('📊 Progress')).toBeInTheDocument();
      expect(screen.getByText('ℹ️ About')).toBeInTheDocument();
    });
  });
