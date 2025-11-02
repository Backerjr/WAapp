import React, { useState, useEffect } from 'react';
import { Progress, Friend, LeaderboardEntry } from '../types';
import './SocialHub.css';

interface SocialHubProps {
  progress: Progress;
}

const SocialHub: React.FC<SocialHubProps> = ({ progress }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    // Generate mock leaderboard data
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, name: 'Anna Kowalska', xp: 2450, avatar: '👩‍🎓' },
      { rank: 2, name: 'Piotr Nowak', xp: 2180, avatar: '👨‍💼' },
      { rank: 3, name: 'Maria Wiśniewska', xp: 1920, avatar: '👩‍🏫' },
      { rank: 4, name: 'Jan Kowalczyk', xp: 1750, avatar: '👨‍🎨' },
      { rank: 5, name: 'You', xp: progress.xp, avatar: '🌙', isCurrentUser: true },
      { rank: 6, name: 'Ewa Lewandowska', xp: 1420, avatar: '👩‍💻' },
      { rank: 7, name: 'Tomasz Zieliński', xp: 1380, avatar: '👨‍🔬' },
      { rank: 8, name: 'Katarzyna Woźniak', xp: 1250, avatar: '👩‍🎤' },
      { rank: 9, name: 'Marcin Kamiński', xp: 1100, avatar: '👨‍🍳' },
      { rank: 10, name: 'Agnieszka Dąbrowska', xp: 980, avatar: '👩‍⚕️' }
    ].sort((a, b) => b.xp - a.xp).map((entry, index) => ({ ...entry, rank: index + 1 }));

    setLeaderboard(mockLeaderboard);

    // Generate mock friends data
    const mockFriends: Friend[] = [
      { id: 'friend-1', name: 'Sarah', avatar: '👩‍🦰', xp: 1650, streak: 12, level: 17 },
      { id: 'friend-2', name: 'Miguel', avatar: '👨‍🦱', xp: 1200, streak: 5, level: 13 },
      { id: 'friend-3', name: 'Chen', avatar: '👨‍🦳', xp: 890, streak: 23, level: 9 },
      { id: 'friend-4', name: 'Fatima', avatar: '👩‍🦳', xp: 2100, streak: 8, level: 21 },
      { id: 'friend-5', name: 'Alex', avatar: '🧑‍🦲', xp: 750, streak: 15, level: 8 }
    ];

    setFriends(mockFriends);
  }, [progress.xp]);

  const shareProgress = () => {
    const shareText = `🌙 I'm learning languages with WA! I just reached Level ${progress.level} with ${progress.xp} XP and a ${progress.streak}-day streak! 🔥 Join me at Words Between Worlds! ✨`;
    
    if (navigator.share) {
      navigator.share({
        title: 'WA Language Learning Progress',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText + ` ${window.location.href}`);
      alert('Progress shared to clipboard! 📋');
    }
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'rank-regular';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 20) return '🔥';
    if (streak >= 10) return '⚡';
    if (streak >= 5) return '✨';
    return '💪';
  };

  return (
    <div className="social-hub">
      <div className="social-header">
        <h2>Social Hub</h2>
        <button className="share-btn" onClick={shareProgress}>
          📤 Share Progress
        </button>
      </div>

      <div className="social-tabs">
        <button
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          🏆 Leaderboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          👥 Friends
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="leaderboard-section">
          <div className="section-header">
            <h3>Weekly Leaderboard</h3>
            <span className="update-info">Updates every Monday</span>
          </div>
          
          <div className="leaderboard-list">
            {leaderboard.map((entry) => (
              <div 
                key={entry.rank} 
                className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''}`}
              >
                <div className={`rank-badge ${getRankClass(entry.rank)}`}>
                  {entry.rank <= 3 ? (
                    entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'
                  ) : (
                    entry.rank
                  )}
                </div>
                <div className="player-avatar">{entry.avatar}</div>
                <div className="player-info">
                  <div className="player-name">
                    {entry.name}
                    {entry.isCurrentUser && <span className="you-badge">You</span>}
                  </div>
                  <div className="player-stats">
                    <span className="xp-stat">{entry.xp.toLocaleString()} XP</span>
                  </div>
                </div>
                {entry.isCurrentUser && (
                  <div className="current-user-glow" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="friends-section">
          <div className="section-header">
            <h3>Your Friends</h3>
            <button className="add-friend-btn">+ Add Friend</button>
          </div>
          
          <div className="friends-list">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-info">
                  <div className="friend-name">{friend.name}</div>
                  <div className="friend-stats">
                    <span className="level">Level {friend.level}</span>
                    <span className="xp">{friend.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="friend-streak">
                    {getStreakEmoji(friend.streak)} {friend.streak} day streak
                  </div>
                </div>
                <div className="friend-actions">
                  <button className="challenge-btn">💪 Challenge</button>
                </div>
              </div>
            ))}
          </div>

          <div className="friend-invite">
            <h4>Invite Friends</h4>
            <p>Learning is better together! Share WA with your friends.</p>
            <div className="invite-actions">
              <button className="invite-btn" onClick={shareProgress}>
                📱 Share Link
              </button>
              <button className="invite-btn">
                📧 Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="social-stats">
        <div className="stat-item">
          <span className="stat-icon">🌍</span>
          <div className="stat-info">
            <span className="stat-value">247</span>
            <span className="stat-label">Learners Today</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏆</span>
          <div className="stat-info">
            <span className="stat-value">1,429</span>
            <span className="stat-label">Total Lessons</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <div className="stat-info">
            <span className="stat-value">89</span>
            <span className="stat-label">Day Streak Record</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;