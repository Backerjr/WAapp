export type ID = string;
export interface Lesson { id: ID; title: string; exercises?: any[]; }
export interface Option { text: string; correct?: boolean; }
export interface Exercise { id: ID; type: string; data?: any }
export interface Achievement { id: ID; name: string; }
export interface SocialStats { posts: number; likes: number; }
export interface Friend { id: ID; name: string; }
export interface LeaderboardEntry { userId: ID; score: number; }
export interface UserStats { userId: ID; progress: number; }