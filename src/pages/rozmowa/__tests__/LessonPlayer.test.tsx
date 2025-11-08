import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LessonPlayer } from '../LessonPlayer';
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockedUseParams = useParams as vi.Mock;
const mockedUseNavigate = useNavigate as vi.Mock;
const mockedUseSearchParams = useSearchParams as vi.Mock;

vi.mock('../../../data/lessons', () => ({
  skillTree: [
    {
      id: 'unit1',
      title: 'Unit 1',
      lessons: [
        {
          id: 'lesson1',
          title: 'Lesson 1',
          exercises: [
            { id: 'ex1', type: 'multiple_choice', prompt: 'Question 1', options: ['A', 'B'], answer: 'A' },
            { id: 'ex2', type: 'type_answer', prompt: 'Question 2', answer: 'B' },
          ],
        },
      ],
    },
  ],
}));

// Mock exercise components
vi.mock('../../../components/exercises/MultipleChoice', () => ({
  default: ({ onSubmit, showResult }: { onSubmit: (correct: boolean) => void, showResult: boolean }) => (
    <div>
      <h1>Multiple Choice</h1>
      <button onClick={() => onSubmit(true)}>Correct</button>
      <button onClick={() => onSubmit(false)}>Incorrect</button>
      {showResult && <span>Result is shown</span>}
    </div>
  ),
}));
vi.mock('../../../components/exercises/TypeAnswer', () => ({
  default: ({ onSubmit }: { onSubmit: (correct: boolean) => void }) => (
    <div>
      <h1>Type Answer</h1>
      <button onClick={() => onSubmit(true)}>Submit</button>
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
        delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LessonPlayer', () => {
  const navigate = vi.fn();
  let searchParams: URLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    searchParams = new URLSearchParams();
    mockedUseNavigate.mockReturnValue(navigate);
    mockedUseSearchParams.mockReturnValue([searchParams, vi.fn()]);
  });

  it('renders "Lesson not found" if lesson does not exist', () => {
    mockedUseParams.mockReturnValue({ lessonId: 'nonexistent' });
    render(<LessonPlayer />);
    expect(screen.getByText('Lesson not found')).toBeInTheDocument();
  });

  it('renders the first exercise of a lesson', () => {
    mockedUseParams.mockReturnValue({ lessonId: 'lesson1' });
    render(<LessonPlayer />);
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
  });

  it('handles correct answer in normal mode', async () => {
    mockedUseParams.mockReturnValue({ lessonId: 'lesson1' });
    render(<LessonPlayer />);
    
    fireEvent.click(screen.getByText('Correct'));

    expect(screen.getByText('Result is shown')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Type Answer')).toBeInTheDocument();
    }, { timeout: 1100 });
  });

  it('handles lesson completion', async () => {
    mockedUseParams.mockReturnValue({ lessonId: 'lesson1' });
    render(<LessonPlayer />);

    // First exercise
    fireEvent.click(screen.getByText('Correct'));
    await waitFor(() => expect(screen.getByText('Type Answer')).toBeInTheDocument(), { timeout: 1100 });

    // Second (last) exercise
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      const progress = JSON.parse(localStorage.getItem('progress') || '{}');
      expect(progress.completedLessons).toContain('lesson1');
      expect(progress.xp).toBe(20);
      expect(navigate).toHaveBeenCalledWith('/learn');
    }, { timeout: 1100 });
  });

  it('shows quality buttons on correct answer in review mode', async () => {
    searchParams.set('exercise', 'ex1');
    mockedUseParams.mockReturnValue({ lessonId: 'lesson1' });
    render(<LessonPlayer />);

    fireEvent.click(screen.getByText('Correct'));

    await waitFor(() => {
        expect(screen.getByText('How did you do?')).toBeInTheDocument();
    });
    expect(screen.getByText('Hard')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('handles review completion when a quality button is clicked', async () => {
    searchParams.set('exercise', 'ex1');
    mockedUseParams.mockReturnValue({ lessonId: 'lesson1' });
    render(<LessonPlayer />);

    fireEvent.click(screen.getByText('Correct'));
    
    await waitFor(() => expect(screen.getByText('Easy')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Easy'));

    await waitFor(() => {
        const progress = JSON.parse(localStorage.getItem('progress') || '{}');
        expect(progress.reviewSchedule.ex1).toBeDefined();
        expect(navigate).toHaveBeenCalledWith('/review');
    })
  });
});
