import { Achievement } from '../types';

interface Progress {
  xp: number;
  streak: number;
  completedLessons: string[];
}

export const ALL_ACHIEVEMENTS: Omit<Achievement, "unlocked" | "name">[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🌟',
    requirement: 1,
    type: 'lessons',
  },
  {
    id: 'lesson-streak-3',
    title: 'Getting Started',
    description: 'Complete lessons for 3 days in a row',
    icon: '⚡',
    requirement: 3,
    type: 'streak',
  },
  {
    id: 'lesson-streak-7',
    title: 'Week Warrior',
    description: 'Complete lessons for 7 days in a row',
    icon: '🔥',
    requirement: 7,
    type: 'streak',
  },
  {
    id: 'lesson-streak-30',
    title: 'Month Master',
    description: 'Complete lessons for 30 days in a row',
    icon: '👑',
    requirement: 30,
    type: 'streak',
  },
  {
    id: 'xp-100',
    title: 'XP Explorer',
    description: 'Earn your first 100 XP',
    icon: '🎯',
    requirement: 100,
    type: 'xp',
  },
  {
    id: 'xp-500',
    title: 'XP Champion',
    description: 'Earn 500 XP total',
    icon: '🏆',
    requirement: 500,
    type: 'xp',
  },
  {
    id: 'xp-1000',
    title: 'XP Legend',
    description: 'Earn 1000 XP total',
    icon: '💎',
    requirement: 1000,
    type: 'xp',
  },
  {
    id: 'lessons-5',
    title: 'Learning Machine',
    description: 'Complete 5 lessons',
    icon: '📚',
    requirement: 5,
    type: 'lessons',
  },
  {
    id: 'lessons-10',
    title: 'Dedicated Student',
    description: 'Complete 10 lessons',
    icon: '🎓',
    requirement: 10,
    type: 'lessons',
  },
  {
    id: 'lessons-25',
    title: 'Language Enthusiast',
    description: 'Complete 25 lessons',
    icon: '🌍',
    requirement: 25,
    type: 'lessons',
  },
  {
    id: 'perfect-lesson',
    title: 'Perfectionist',
    description: 'Complete a lesson without losing hearts',
    icon: '💯',
    requirement: 1,
    type: 'perfect',
  }
];

export const checkAchievements = (
  progress: Progress,
  currentAchievements: string[]
): { newAchievements: Achievement[], updatedAchievements: Achievement[] } => {
  const newlyUnlocked: Achievement[] = [];
  const updatedAchievements = ALL_ACHIEVEMENTS.map(achievement => {
    const isAlreadyUnlocked = currentAchievements.includes(achievement.id);
    const baseAchievement = { ...achievement, unlocked: isAlreadyUnlocked };

    if (isAlreadyUnlocked) {
      return baseAchievement;
    }

    let shouldUnlock = false;

    switch (achievement.type) {
      case 'xp':
        shouldUnlock = progress.xp >= achievement.requirement;
        break;
      case 'streak':
        shouldUnlock = progress.streak >= achievement.requirement;
        break;
      case 'lessons':
        shouldUnlock = progress.completedLessons.length >= achievement.requirement;
        break;
      case 'perfect':
        // This would be tracked separately in lesson completion
        shouldUnlock = false; // Implement perfect lesson tracking
        break;
    }

    if (shouldUnlock) {
      const unlockedAchievement = { ...baseAchievement, unlocked: true };
      newlyUnlocked.push(unlockedAchievement);
      return unlockedAchievement;
    }

    return baseAchievement;
  });

  return { newAchievements: newlyUnlocked, updatedAchievements };
};