import { describe, it, expect, beforeEach } from 'vitest';
import { Progress, Achievement, SocialStats, Friend, LeaderboardEntry, UserStats } from './types';

describe('Progress Interface', () => {
  let mockProgress: Progress;

  beforeEach(() => {
    mockProgress = {
      completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
      xp: 1250,
      streak: 7,
      hearts: 5,
      lastActiveDate: '2024-01-15T10:30:00Z',
      joinDate: '2024-01-01T00:00:00Z',
      level: 3,
      dailyGoal: 50,
      dailyXP: 35,
      achievements: ['first-lesson', 'week-streak'],
      weeklyStreak: 2
    };
  });

  describe('Required Properties', () => {
    it('should have all required properties', () => {
      expect(mockProgress).toHaveProperty('completedLessons');
      expect(mockProgress).toHaveProperty('xp');
      expect(mockProgress).toHaveProperty('streak');
      expect(mockProgress).toHaveProperty('hearts');
      expect(mockProgress).toHaveProperty('lastActiveDate');
      expect(mockProgress).toHaveProperty('joinDate');
      expect(mockProgress).toHaveProperty('level');
      expect(mockProgress).toHaveProperty('dailyGoal');
      expect(mockProgress).toHaveProperty('dailyXP');
      expect(mockProgress).toHaveProperty('achievements');
      expect(mockProgress).toHaveProperty('weeklyStreak');
    });

    it('should have correct property types', () => {
      expect(Array.isArray(mockProgress.completedLessons)).toBe(true);
      expect(typeof mockProgress.xp).toBe('number');
      expect(typeof mockProgress.streak).toBe('number');
      expect(typeof mockProgress.hearts).toBe('number');
      expect(typeof mockProgress.lastActiveDate).toBe('string');
      expect(typeof mockProgress.joinDate).toBe('string');
      expect(typeof mockProgress.level).toBe('number');
      expect(typeof mockProgress.dailyGoal).toBe('number');
      expect(typeof mockProgress.dailyXP).toBe('number');
      expect(Array.isArray(mockProgress.achievements)).toBe(true);
      expect(typeof mockProgress.weeklyStreak).toBe('number');
    });
  });

  describe('Array Properties', () => {
    it('should handle empty completed lessons array', () => {
      const emptyProgress: Progress = {
        ...mockProgress,
        completedLessons: []
      };
      expect(emptyProgress.completedLessons).toHaveLength(0);
    });

    it('should contain string lesson IDs', () => {
      mockProgress.completedLessons.forEach(lessonId => {
        expect(typeof lessonId).toBe('string');
        expect(lessonId.length).toBeGreaterThan(0);
      });
    });

    it('should handle empty achievements array', () => {
      const noAchievements: Progress = {
        ...mockProgress,
        achievements: []
      };
      expect(noAchievements.achievements).toHaveLength(0);
    });

    it('should contain string achievement IDs', () => {
      mockProgress.achievements.forEach(achievementId => {
        expect(typeof achievementId).toBe('string');
        expect(achievementId.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Properties', () => {
    it('should have valid ISO date strings', () => {
      expect(() => new Date(mockProgress.lastActiveDate)).not.toThrow();
      expect(() => new Date(mockProgress.joinDate)).not.toThrow();
      
      const lastActive = new Date(mockProgress.lastActiveDate);
      const joinDate = new Date(mockProgress.joinDate);
      
      expect(lastActive.toISOString()).toBe(mockProgress.lastActiveDate);
      expect(joinDate.toISOString()).toBe(mockProgress.joinDate);
    });

    it('should have join date before or equal to last active date', () => {
      const joinDate = new Date(mockProgress.joinDate);
      const lastActive = new Date(mockProgress.lastActiveDate);
      
      expect(joinDate.getTime()).toBeLessThanOrEqual(lastActive.getTime());
    });
  });

  describe('Numeric Properties Validation', () => {
    it('should have non-negative XP values', () => {
      expect(mockProgress.xp).toBeGreaterThanOrEqual(0);
      expect(mockProgress.dailyXP).toBeGreaterThanOrEqual(0);
    });

    it('should have non-negative streak values', () => {
      expect(mockProgress.streak).toBeGreaterThanOrEqual(0);
      expect(mockProgress.weeklyStreak).toBeGreaterThanOrEqual(0);
    });

    it('should have positive hearts count', () => {
      expect(mockProgress.hearts).toBeGreaterThan(0);
    });

    it('should have positive level', () => {
      expect(mockProgress.level).toBeGreaterThan(0);
    });

    it('should have positive daily goal', () => {
      expect(mockProgress.dailyGoal).toBeGreaterThan(0);
    });

    it('should have daily XP not exceeding reasonable limits', () => {
      expect(mockProgress.dailyXP).toBeLessThanOrEqual(1000); // Reasonable daily limit
    });
  });

  describe('Progress State Scenarios', () => {
    it('should handle new user progress', () => {
      const newUserProgress: Progress = {
        completedLessons: [],
        xp: 0,
        streak: 0,
        hearts: 5,
        lastActiveDate: '2024-01-15T10:00:00Z',
        joinDate: '2024-01-15T10:00:00Z',
        level: 1,
        dailyGoal: 50,
        dailyXP: 0,
        achievements: [],
        weeklyStreak: 0
      };

      expect(newUserProgress.completedLessons).toHaveLength(0);
      expect(newUserProgress.xp).toBe(0);
      expect(newUserProgress.level).toBe(1);
      expect(newUserProgress.lastActiveDate).toBe(newUserProgress.joinDate);
    });

    it('should handle advanced user progress', () => {
      const advancedProgress: Progress = {
        completedLessons: Array.from({ length: 50 }, (_, i) => `lesson-${i + 1}`),
        xp: 10000,
        streak: 365,
        hearts: 5,
        lastActiveDate: '2024-12-31T23:59:59Z',
        joinDate: '2024-01-01T00:00:00Z',
        level: 20,
        dailyGoal: 100,
        dailyXP: 150,
        achievements: ['first-lesson', 'week-streak', 'month-streak', 'year-streak', 'perfectionist'],
        weeklyStreak: 52
      };

      expect(advancedProgress.completedLessons).toHaveLength(50);
      expect(advancedProgress.xp).toBe(10000);
      expect(advancedProgress.streak).toBe(365);
      expect(advancedProgress.level).toBe(20);
      expect(advancedProgress.achievements).toHaveLength(5);
    });
  });

  describe('Progress Consistency', () => {
    it('should have logical relationship between XP and level', () => {
      // Assuming level increases with XP
      expect(mockProgress.level).toBeGreaterThanOrEqual(1);
      
      // Basic XP to level relationship check
      const expectedMinXP = (mockProgress.level - 1) * 100; // Assuming 100 XP per level
      expect(mockProgress.xp).toBeGreaterThanOrEqual(expectedMinXP);
    });

    it('should have consistent streak relationships', () => {
      // Weekly streak should not exceed daily streak / 7
      const maxWeeklyStreak = Math.floor(mockProgress.streak / 7);
      expect(mockProgress.weeklyStreak).toBeLessThanOrEqual(maxWeeklyStreak + 1);
    });

    it('should have achievements related to progress', () => {
      if (mockProgress.achievements.includes('first-lesson')) {
        expect(mockProgress.completedLessons.length).toBeGreaterThan(0);
      }
      
      if (mockProgress.achievements.includes('week-streak')) {
        expect(mockProgress.streak).toBeGreaterThanOrEqual(7);
      }
    });
  });
});