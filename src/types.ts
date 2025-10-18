export type ExerciseType = 
  | 'multiple_choice' 
  | 'type_answer' 
  | 'listen_and_select'
  | 'listen_and_type';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt_en: string;
  prompt_pl: string;
  options?: string[];
  correctAnswer: string;
  hint_pl?: string;
  audioText?: string;
}

export interface Lesson {
  id: string;
  title_pl: string;
  title_en: string;
  exercises: Exercise[];
  xp: number;
}

export interface Unit {
  id: string;
  title_pl: string;
  title_en: string;
  cefr: string;
  lessons: Lesson[];
}

export interface Progress {
  completedLessons: string[];
  xp: number;
  streak: number;
  hearts: number;
  lastActiveDate: string;
}

export interface UserStats {
  currentLesson: string | null;
  exerciseIndex: number;
}
