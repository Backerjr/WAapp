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
    
    // Check for logo (text is split between span and text node)
    expect(screen.getByText('Rozmowa')).toBeInTheDocument();
    
    // Check for stats (just the numbers, since text is in title attributes)
    expect(screen.getByText('7')).toBeInTheDocument(); // streak
    expect(screen.getByText('3')).toBeInTheDocument(); // hearts
    expect(screen.getByText('1250')).toBeInTheDocument(); // xp
  });
});
