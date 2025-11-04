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
    
    // Check for logo text (emoji is in a separate span with aria-hidden)
    expect(screen.getByText('Rozmowa')).toBeInTheDocument();
    
    // Check for stats (numbers are visible and accessible)
    expect(screen.getByText('7')).toBeInTheDocument(); // streak
    expect(screen.getByText('3')).toBeInTheDocument(); // hearts
    expect(screen.getByText('1250')).toBeInTheDocument(); // xp
    
    // Verify stats have proper aria-labels for accessibility
    expect(screen.getByLabelText('Day Streak: 7')).toBeInTheDocument();
    expect(screen.getByLabelText('Total XP: 1250')).toBeInTheDocument();
    expect(screen.getByLabelText('Hearts Remaining: 3')).toBeInTheDocument();
  });
});
