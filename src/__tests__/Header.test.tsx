<<<<<<< HEAD
// src/__tests__/Header.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import React from 'react';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders the header with navigation links', () => {
    render(<Header progress={0} />);

    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders the progress bar with the correct width when progress is provided', () => {
    const progress = 50;
    render(<Header progress={progress} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle(`width: ${progress}%`);
  });

  it('does not render the progress bar when progress is undefined', () => {
    render(<Header progress={undefined} />);

    const progressBar = screen.queryByRole('progressbar');
    expect(progressBar).not.toBeInTheDocument();
=======
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
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
    // Check for logo text (intentionally not a heading to avoid multiple H1s)
    expect(screen.getByText(/Rozmowa/i)).toBeInTheDocument();

    // Check for stats (just the numbers, since text is in title attributes)
    expect(screen.getByTitle('Day Streak').textContent).toContain('7'); // streak
    expect(screen.getByTitle('Day Streak').textContent).toContain('7'); // streak
    expect(screen.getByTitle('Hearts Remaining').textContent).toContain('3'); // hearts
    expect(screen.getByTitle('Total XP').textContent).toContain('1250'); // xp
>>>>>>> cdc0897cd6c6b5e8814f59a11e3825f9cfe53d63
  });
});
