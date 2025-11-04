import { render, screen } from '@testing-library/react';
import Header from '../components/legacy/Header';
import { Progress } from '../types';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  const mockProgress: Progress = {
    xp: 1250,
    streak: 7,
    hearts: 3,
    completedLessons: ['lesson1', 'lesson2'],
    level: 0,
    dailyGoal: 0,
    dailyXP: 0,
    achievements: [],
    weeklyStreak: 0,
    lastActiveDate: new Date().toISOString(),
    joinDate: new Date().toISOString()
  };

  it('renders user stats correctly', () => {
    render(<Header progress={mockProgress} />);

    // Check for logo by accessible heading name (ignore emoji encoding issues)
    expect(screen.getByRole('heading', { name: /Rozmowa/i })).toBeInTheDocument();

    // Check for stats (just the numbers, since text is in title attributes)
    expect(screen.getByTitle('Day Streak').textContent).toContain('7'); // streak
    expect(screen.getByTitle('Hearts Remaining').textContent).toContain('3'); // hearts
    expect(screen.getByTitle('Total XP').textContent).toContain('1250'); // xp
  });
});
