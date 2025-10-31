import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { Progress } from '../types';
import { describe, it, expect } from 'vitest';

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
};

describe('Header', () => {
  it('should render logo and stats correctly', () => {
    render(<Header progress={mockProgress} onViewChange={() => {}} />);

    // Check logo
    expect(screen.getByText('WA')).toBeTruthy();
    
    // Check stats display
    expect(screen.getByText('5')).toBeTruthy(); // streak
    expect(screen.getByText(/100.*XP/)).toBeTruthy(); // xp
    expect(screen.getByText('3')).toBeTruthy(); // hearts
    
    // Check navigation buttons when onViewChange is provided
    expect(screen.getByText('✨ Elegant')).toBeTruthy();
    expect(screen.getByText('📚 Learning')).toBeTruthy();
  });

  it('should not render navigation when onViewChange is not provided', () => {
    render(<Header progress={mockProgress} />);

    // Should still render logo and stats
    expect(screen.getByText('WA')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText(/100.*XP/)).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    
    // Should not render navigation buttons
    expect(screen.queryByText('✨ Elegant')).toBeNull();
    expect(screen.queryByText('📚 Learning')).toBeNull();
  });
});
