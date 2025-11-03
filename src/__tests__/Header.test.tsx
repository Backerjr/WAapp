import { render, screen } from '@testing-library/react';
import Header from '../components/legacy/Header';
import { Progress } from '../types';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

describe('Header', () => {
  const mockProgress: Progress = {
    currentLevel: 5,
    xp: 1250,
    streak: 7,
    hearts: 3,
    completedLessons: ['lesson1', 'lesson2'],
  };

  it('renders user stats correctly', () => {
    render(<Header progress={mockProgress} onMenuClick={() => {}} />);
    
    // Check for logo
    expect(screen.getByText(/🌙 Rozmowa/i)).toBeInTheDocument();
    
    // Check for stats (just the numbers, since text is in title attributes)
    expect(screen.getByText('7')).toBeInTheDocument(); // streak
    expect(screen.getByText('1250')).toBeInTheDocument(); // XP
    expect(screen.getByText('3')).toBeInTheDocument(); // hearts
    
    // Check for title attributes
    expect(screen.getByTitle('Day Streak')).toBeInTheDocument();
    expect(screen.getByTitle('Total XP')).toBeInTheDocument();
    expect(screen.getByTitle('Hearts Remaining')).toBeInTheDocument();
  });
});
