// src/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { Progress } from '../types';

describe('Header', () => {
  const mockProgress: Progress = {
    xp: 1250,
    streak: 7,
    hearts: 3,
    completedLessons: ['lesson1', 'lesson2'],
    level: 0,
    dailyGoal: 100,
    dailyXP: 50,
    achievements: [],
    weeklyStreak: 0,
    lastActiveDate: new Date().toISOString(),
    joinDate: new Date().toISOString()
  };

  it('renders the header with navigation links', () => {
    render(<Header progress={mockProgress} />);

    // Check for navigation links
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders the progress bar with the correct width when progress is provided', () => {
    render(<Header progress={mockProgress} />);

    const progressBar = screen.getByRole('progressbar');
    const expectedProgress = (mockProgress.dailyXP / mockProgress.dailyGoal) * 100;
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle(`width: ${expectedProgress}%`);
  });

  it('does not render user stats when progress is undefined', () => {
    render(<Header progress={undefined} />);
    expect(screen.getByText(/rozmoWA/i)).toBeInTheDocument();
    expect(screen.queryByTitle('Day Streak')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Total XP')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Hearts Remaining')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders user stats correctly', () => {
    render(<Header progress={mockProgress} />);
    // Check for logo text (intentionally not a heading to avoid multiple H1s)
    expect(screen.getByText(/Rozmowa/i)).toBeInTheDocument();

    // Check for stats (just the numbers, since text is in title attributes)
    expect(screen.getByTitle('Day Streak').textContent).toContain('7'); // streak
    expect(screen.getByTitle('Hearts Remaining').textContent).toContain('3'); // hearts
    expect(screen.getByTitle('Total XP').textContent).toContain('1250'); // xp
  });
});
