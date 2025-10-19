import { describe, it, expect } from 'vitest';
import { skillTree } from '../data/lessons';
import App from '../App';

describe('smoke', () => {
  it('skillTree has units', () => {
    expect(Array.isArray(skillTree)).toBe(true);
    expect(skillTree.length).toBeGreaterThan(0);
  });

  it('App imports without throwing', () => {
    expect(typeof App).toBe('function');
  });
});
