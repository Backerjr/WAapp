
import React from 'react';
import { Card } from '../../components/rozmowa';
import { Trophy } from 'lucide-react';

// Mock data for now
const mockLeaderboard = [
  { id: 1, name: 'Lila', xp: 4500 },
  { id: 2, name: 'Kael', xp: 3800 },
  { id: 3, name: 'Seraphina', xp: 3750 },
  { id: 4, name: 'User123', xp: 3200 },
  { id: 5, name: 'LinguaLover', xp: 2800 },
  { id: 6, name: 'PolyglotDreamer', xp: 2500 },
  { id: 7, name: 'Your Score', xp: 1200, isCurrentUser: true },
  { id: 8, name: 'Newbie', xp: 900 },
  { id: 9, name: 'WordSmith', xp: 750 },
  { id: 10, name: 'Traveler', xp: 500 },
];

export const LeaderboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Trophy className="w-16 h-16 text-accent dark:text-accent-dark mx-auto mb-4" />
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Leaderboard
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          See how you stack up against other learners.
        </p>
      </div>

      <Card variant="elevated" className="max-w-2xl mx-auto">
        <ul className="divide-y divide-border dark:divide-border-dark">
          {mockLeaderboard.map((user, index) => (
            <li
              key={user.id}
              className={`flex items-center justify-between p-4 ${user.isCurrentUser ? 'bg-accent-background dark:bg-accent-background-dark' : ''}`}>
              <div className="flex items-center">
                <span className="font-bold text-lg text-secondary-text dark:text-secondary-text-dark w-8 text-center">
                  {index + 1}
                </span>
                <span className={`ml-4 font-semibold ${user.isCurrentUser ? 'text-accent-text dark:text-accent-text-dark' : 'text-primary-text dark:text-primary-text-dark'}`}>
                  {user.name}
                </span>
              </div>
              <span className="font-bold text-lg text-accent dark:text-accent-dark">
                {user.xp} XP
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
