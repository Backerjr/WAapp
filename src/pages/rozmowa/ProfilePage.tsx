import { type FC, useState } from 'react';
import { Card, Badge, Button, Input } from '../../components/rozmowa';
import { User, Mail, Calendar, Award, BookOpen, TrendingUp, Edit2 } from 'lucide-react';

// Define interfaces for type safety
interface UserProfile {
  name: string;
  email: string;
}

interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  joinDate: string;
}

const achievements = [
	{ id: '1', name: 'First Lesson', unlocked: true, requirement: 1 },
	{ id: '2', name: '7-Day Streak', unlocked: false, requirement: 7 },
	{ id: '3', name: '50 Words', unlocked: false, requirement: 50 },
	{ id: '4', name: '14-Day Streak', unlocked: false, requirement: 14 },
	{ id: '5', name: '100 Words', unlocked: false, requirement: 100 },
	{ id: '6', name: 'Course Complete', unlocked: false, requirement: 999 },
];

// Format join date consistently
const formatJoinDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfilePage: FC = () => {
  // Load initial state synchronously from localStorage to avoid effects
  const loadInitialState = () => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedProgress = localStorage.getItem('progress');

    const profile: UserProfile = savedProfile
      ? JSON.parse(savedProfile)
      : { name: 'English Learner', email: 'learner@rozmowa.app' };

    const progress: UserProgress = savedProgress
      ? JSON.parse(savedProgress)
      : {
          completedLessons: [],
          xp: 0,
          streak: 1,
          joinDate: new Date().toISOString(),
        };

    return { profile, progress };
  };

  const [initialState] = useState(loadInitialState);
  const [userName, setUserName] = useState(initialState.profile.name);
  const [userEmail, setUserEmail] = useState(initialState.profile.email);
  const [progress] = useState<UserProgress | null>(initialState.progress);
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempEmail, setTempEmail] = useState(userEmail);

	const handleEditClick = () => {
		setTempName(userName);
		setTempEmail(userEmail);
		setIsEditing(true);
	};

	const handleSave = () => {
		setUserName(tempName);
		setUserEmail(tempEmail);
		localStorage.setItem('userProfile', JSON.stringify({ name: tempName, email: tempEmail }));
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	if (!progress) {
		return <div>Loading...</div>;
	}

	const wordsLearned = progress.completedLessons.length * 20;
	const lessonsCompleted = progress.completedLessons.length;
	const dayStreak = progress.streak || 1;
	const joinDate = progress.joinDate ? new Date(progress.joinDate) : new Date();
	const userLevel = lessonsCompleted === 0 ? 'Beginner' : lessonsCompleted < 10 ? 'Intermediate Learner' : 'Advanced Learner';

	// Update achievement unlock status
	const unlockedAchievements = achievements.map(ach => ({
		...ach,
		unlocked: 
			(ach.name === 'First Lesson' && lessonsCompleted >= 1) ||
			(ach.name === '7-Day Streak' && dayStreak >= 7) ||
			(ach.name === '50 Words' && wordsLearned >= 50) ||
			(ach.name === '14-Day Streak' && dayStreak >= 14) ||
			(ach.name === '100 Words' && wordsLearned >= 100) ||
			(ach.name === 'Course Complete' && lessonsCompleted >= 20)
	}));

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-8">
				<h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
					Profile
				</h1>
				<p className="text-body text-secondary-text dark:text-secondary-text-dark">
					Track your progress and manage your account
				</p>
			</div>

			{/* Profile Header */}
			<Card variant="elevated" className="mb-6">
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
					<div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-success dark:from-accent-dark dark:to-success-dark flex items-center justify-center flex-shrink-0">
						<User className="w-12 h-12 text-white" />
					</div>
					<div className="flex-1">
						{isEditing ? (
							<div className="space-y-3 mb-3">
								<Input
									type="text"
									value={tempName}
									onChange={(e) => setTempName(e.target.value)}
									placeholder="Your name"
									className="text-h2"
								/>
								<Input
									type="email"
									value={tempEmail}
									onChange={(e) => setTempEmail(e.target.value)}
									placeholder="Your email"
								/>
							</div>
						) : (
							<>
								<h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-1">
									{userName}
								</h2>
								<div className="flex flex-wrap items-center gap-4 text-small text-secondary-text dark:text-secondary-text-dark mb-3">
									<div className="flex items-center gap-2">
										<Mail className="w-4 h-4" />
										<span>{userEmail}</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4" />
										<span>Joined {formatJoinDate(joinDate)}</span>
									</div>
								</div>
								<Badge colorScheme="accent">{userLevel}</Badge>
							</>
						)}
					</div>
					<div className="flex gap-2">
						{isEditing ? (
							<>
								<Button
									variant="primary"
									size="md"
									onClick={handleSave}
								>
									Save
								</Button>
								<Button
									variant="secondary"
									size="md"
									onClick={handleCancel}
								>
									Cancel
								</Button>
							</>
						) : (
							<Button
								variant="secondary"
								size="md"
								leftIcon={<Edit2 className="w-4 h-4" />}
								onClick={handleEditClick}
							>
								Edit Profile
							</Button>
						)}
					</div>
				</div>
			</Card>

			{/* Statistics */}
			<div className="mb-6">
				<h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
					Statistics
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<Card variant="default">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-success/10 dark:bg-success-dark/10 flex items-center justify-center">
								<BookOpen className="w-6 h-6 text-success dark:text-success-dark" />
							</div>
							<div>
								<p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
									{wordsLearned}
								</p>
								<p className="text-small text-secondary-text dark:text-secondary-text-dark">
									Words Learned
								</p>
							</div>
						</div>
					</Card>
					<Card variant="default">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-info/10 dark:bg-info-dark/10 flex items-center justify-center">
								<Award className="w-6 h-6 text-info dark:text-info-dark" />
							</div>
							<div>
								<p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
									{lessonsCompleted}
								</p>
								<p className="text-small text-secondary-text dark:text-secondary-text-dark">
									Lessons Completed
								</p>
							</div>
						</div>
					</Card>
					<Card variant="default">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent-dark/10 flex items-center justify-center">
								<TrendingUp className="w-6 h-6 text-accent dark:text-accent-dark" />
							</div>
							<div>
								<p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
									{dayStreak}
								</p>
								<p className="text-small text-secondary-text dark:text-secondary-text-dark">
									Day Streak
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>

			{/* Achievements */}
			<div>
				<h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
					Achievements
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{unlockedAchievements.map((achievement) => (
						<Card
							key={achievement.id}
							variant="default"
							className={
								!achievement.unlocked
									? 'text-center transition-all duration-300 opacity-40'
									: 'text-center transition-all duration-300'
							}
						>
							<div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
								achievement.unlocked 
									? 'bg-gradient-to-br from-accent to-success dark:from-accent-dark dark:to-success-dark'
									: 'bg-secondary-text/20 dark:bg-secondary-text-dark/20'
							}`}>
								<Award className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-secondary-text dark:text-secondary-text-dark'}`} />
							</div>
							<p className="text-small text-primary-text dark:text-primary-text-dark font-medium">
								{achievement.name}
							</p>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
