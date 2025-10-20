import React from 'react';
import { Progress } from '../../types';
import './GlowingProgress.css';

interface GlowingProgressProps {
  progress: Progress;
}

const GlowingProgress: React.FC<GlowingProgressProps> = ({ progress }) => {
  const progressPercentage = Math.min((progress.dailyXP / progress.dailyGoal) * 100, 100);
  const levelProgress = Math.min((progress.xp % 100) / 100 * 100, 100);
  const streakHeight = Math.min(progress.streak * 5, 100);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return '#ff6b6b';
    if (streak >= 14) return '#feca57';
    if (streak >= 7) return '#48dbfb';
    return '#ff9ff3';
  };

  const getLevelTitle = (level: number) => {
    if (level >= 50) return 'Master Linguist';
    if (level >= 30) return 'Advanced Speaker';
    if (level >= 20) return 'Confident Learner';
    if (level >= 10) return 'Dedicated Student';
    if (level >= 5) return 'Rising Scholar';
    return 'Language Explorer';
  };

  return (
    <div className="glowing-progress">
      <div className="progress-header">
        <h3 className="progress-title">Your Journey</h3>
        <div className="level-badge">
          <span className="level-number">{progress.level}</span>
          <span className="level-title">{getLevelTitle(progress.level)}</span>
        </div>
      </div>

      <div className="progress-rings">
        {/* Daily Goal Ring */}
        <div className="progress-ring daily-ring">
          <svg className="ring-svg" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#dailyGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
              className="progress-circle"
            />
            <defs>
              <linearGradient id="dailyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ring-content">
            <div className="ring-value">{progress.dailyXP}</div>
            <div className="ring-label">Daily XP</div>
            <div className="ring-goal">/{progress.dailyGoal}</div>
          </div>
        </div>

        {/* Level Progress Ring */}
        <div className="progress-ring level-ring">
          <svg className="ring-svg" width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#levelGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - levelProgress / 100)}`}
              className="progress-circle"
            />
            <defs>
              <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ring-content">
            <div className="ring-value">{progress.xp % 100}</div>
            <div className="ring-label">Level</div>
          </div>
        </div>

        {/* Streak Indicator */}
        <div className="streak-indicator">
          <div className="streak-flame">
            <div 
              className="flame-height"
              style={{ 
                height: `${streakHeight}%`,
                background: `linear-gradient(to top, ${getStreakColor(progress.streak)}, #ff6b6b)`
              }}
            ></div>
          </div>
          <div className="streak-info">
            <div className="streak-number">{progress.streak}</div>
            <div className="streak-label">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat-item">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <div className="stat-value">{progress.xp.toLocaleString()}</div>
            <div className="stat-label">Total XP</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <div className="stat-value">{progress.hearts}</div>
            <div className="stat-label">Hearts</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{progress.completedLessons.length}</div>
            <div className="stat-label">Lessons</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{progress.achievements.length}</div>
            <div className="stat-label">Badges</div>
          </div>
        </div>
      </div>

      <div className="motivational-message">
        {progress.dailyXP >= progress.dailyGoal ? (
          <div className="success-message">
            <span className="success-icon">🎉</span>
            Daily goal achieved! You're on fire!
          </div>
        ) : (
          <div className="encouragement-message">
            <span className="encouragement-icon">⭐</span>
            {progress.dailyGoal - progress.dailyXP} XP to reach your daily goal
          </div>
        )}
      </div>
    </div>
  );
};

export default GlowingProgress;