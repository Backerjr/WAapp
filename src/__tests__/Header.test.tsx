import '@testing-library/jest-dom';
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
  it('should render all navigation buttons', () => {
describe('Header', () => {
  it('should render all navigation buttons', () => {
    render(<Header progress={mockProgress} onViewChange={() => {}} />);

    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
    expect(screen.getByText('🌙 Learn')).toBeInTheDocument();
    expect(screen.getByText('📊 Progress')).toBeInTheDocument();
    expect(screen.getByText('👥 Social')).toBeInTheDocument();
    expect(screen.getByText('✨ Planner')).toBeInTheDocument();
    expect(screen.getByText('💬 Wall')).toBeInTheDocument();
  });
});
