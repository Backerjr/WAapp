import React from 'react';
import { Progress, Achievement } from '../types';
import './ProgressionDashboard.css';

interface ProgressionDashboardProps {
  progress: Progress;
  achievements: Achievement[];
}

const ProgressionDashboard: React.FC<ProgressionDashboardProps> = ({ progress, achievements }) => {
  // Calculate XP needed for next level
  const xpForNextLevel = (level: number) => level * 100;
  const currentLevelXP = (progress.level - 1) * 100;
  const xpProgress = progress.xp - currentLevelXP;
  const xpNeeded = xpForNextLevel(progress.level) - currentLevelXP;
  const xpPercentage = (xpProgress / xpNeeded) * 100;

  // Calculate daily goal progress
  const dailyGoalPercentage = Math.min((progress.dailyXP / progress.dailyGoal) * 100, 100);

  // Get recent achievements (unlocked ones)
  const recentAchievements = achievements.filter(achievement => achievement.unlocked).slice(-3);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '✨';
    return '💪';
  };

  return (
    <div className="progression-dashboard">
      <div className="dashboard-header">
        <h2>Your Progress</h2>
        <div className="level-badge">
          <span className="level-number">{progress.level}</span>
          <span className="level-label">Level</span>
        </div>
      </div>

      <div className="stats-grid">
        {/* XP Progress */}
        <div className="stat-card xp-card">
          <div className="stat-header">
            <span className="stat-icon">⭐</span>
            <span className="stat-title">Experience</span>
          </div>
          <div className="stat-value">{progress.xp.toLocaleString()} XP</div>
          <div className="progress-bar">
            <div 
              className="progress-fill xp-fill"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className="stat-subtitle">
            {xpNeeded - xpProgress} XP to level {progress.level + 1}
          </div>
        </div>

        {/* Daily Goal */}
        <div className="stat-card daily-card">
          <div className="stat-header">
            <span className="stat-icon">🎯</span>
            <span className="stat-title">Daily Goal</span>
          </div>
          <div className="stat-value">{progress.dailyXP} / {progress.dailyGoal} XP</div>
          <div className="progress-bar">
            <div 
              className="progress-fill daily-fill"
              style={{ width: `${dailyGoalPercentage}%` }}
            />
          </div>
          <div className="stat-subtitle">
            {dailyGoalPercentage >= 100 ? '🎉 Goal completed!' : `${progress.dailyGoal - progress.dailyXP} XP to go`}
          </div>
        </div>

        {/* Streak */}
        <div className="stat-card streak-card">
          <div className="stat-header">
            <span className="stat-icon">{getStreakEmoji(progress.streak)}</span>
            <span className="stat-title">Day Streak</span>
          </div>
          <div className="stat-value">{progress.streak} days</div>
          <div className="stat-subtitle">
            {progress.streak === 1 ? 'Keep it up!' : 'Amazing consistency!'}
          </div>
        </div>

        {/* Hearts */}
        <div className="stat-card hearts-card">
          <div className="stat-header">
            <span className="stat-icon">💜</span>
            <span className="stat-title">Hearts</span>
          </div>
          <div className="stat-value">{progress.hearts} / 5</div>
          <div className="hearts-display">
            {Array.from({ length: 5 }, (_, i) => (
              <span 
                key={i} 
                className={`heart ${i < progress.hearts ? 'filled' : 'empty'}`}
              >
                💜
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="achievements-section">
          <h3>Recent Achievements</h3>
          <div className="achievements-grid">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <div className="achievement-title">{achievement.title}</div>
                  <div className="achievement-description">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Completed */}
      <div className="lessons-section">
        <h3>Lessons Completed</h3>
        <div className="lessons-stats">
          <div className="lessons-count">
            <span className="count-number">{progress.completedLessons.length}</span>
            <span className="count-label">Lessons</span>
          </div>
          <div className="lessons-chart">
            {/* Simple visual representation */}
            <div className="chart-bar">
              <div 
                className="chart-fill"
                style={{ width: `${Math.min(progress.completedLessons.length * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionDashboard;