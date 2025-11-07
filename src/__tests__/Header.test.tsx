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
  });
});
