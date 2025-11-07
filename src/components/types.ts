export type ID = string;

export interface Option {
  text: string;
  correct?: boolean;
  image?: string;
  pl?: string;
  en?: string;
}

export interface Exercise {
  id: ID;
  type: string;
  prompt_en: string;
  prompt_pl: string;
  words?: string[];
  correctAnswer: string;
  options?: Option[];
  pairs?: Option[];
  sentences?: string[];
  correctSentence?: string;
}

export interface Lesson {
  id: ID;
  title: string;
  exercises?: Exercise[];
}

export interface Achievement {
  id: ID;
  name: string;
}

export interface SocialStats {
  posts: number;
  likes: number;
}

export interface Friend {
  id: ID;
  name: string;
}

export interface LeaderboardEntry {
  userId: ID;
  score: number;
}

export interface UserStats {
  userId: ID;
  progress: number;
}
