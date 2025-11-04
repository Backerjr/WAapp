export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  duration?: string;
  lessonsCount?: number;
  longDescription?: string;
  topics?: string[];
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Grammar Essentials',
    description: 'Master English grammar fundamentals with comprehensive lessons and exercises.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    level: 'Beginner',
    progress: 45,
    duration: '8 weeks',
    lessonsCount: 24,
    longDescription: 'This comprehensive course covers all the essential grammar rules you need to build a strong foundation in English. From basic sentence structure to complex tenses, you\'ll learn through interactive exercises, real-world examples, and practical applications.',
    topics: [
      'Present and Past Tenses',
      'Future Forms',
      'Present Perfect',
      'Modal Verbs',
      'Conditionals',
      'Passive Voice',
      'Reported Speech',
      'Articles and Determiners'
    ]
  },
  {
    id: '2',
    title: 'Business English',
    description: 'Develop professional communication skills for the workplace.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    level: 'Intermediate',
    progress: 20,
    duration: '6 weeks',
    lessonsCount: 18,
    longDescription: 'Enhance your professional English skills with this practical course designed for workplace communication. Learn to write professional emails, participate in meetings, give presentations, and negotiate effectively.',
    topics: [
      'Business Vocabulary',
      'Email Writing',
      'Meeting Language',
      'Presentations',
      'Negotiations',
      'Telephone Skills'
    ]
  },
  {
    id: '3',
    title: 'Advanced Conversation',
    description: 'Enhance fluency with complex discussions and idiomatic expressions.',
    imageUrl: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=400&h=300&fit=crop',
    level: 'Advanced',
    progress: 0,
    duration: '10 weeks',
    lessonsCount: 30,
    longDescription: 'Take your English to the next level with advanced conversation practice, idiomatic expressions, and nuanced language use. Perfect for learners who want to sound more natural and fluent.',
    topics: [
      'Idioms and Phrasal Verbs',
      'Debate and Discussion',
      'Expressing Opinions',
      'Cultural Context',
      'Advanced Vocabulary'
    ]
  },
  {
    id: '4',
    title: 'Everyday Vocabulary',
    description: 'Build a strong vocabulary foundation for daily conversations.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    level: 'Beginner',
    progress: 75,
    duration: '4 weeks',
    lessonsCount: 16,
    longDescription: 'Build essential vocabulary for everyday situations. Learn words and phrases for shopping, dining, travel, and social interactions.',
    topics: [
      'Daily Routines',
      'Shopping',
      'Food and Dining',
      'Travel',
      'Family and Friends'
    ]
  },
  {
    id: '5',
    title: 'Pronunciation Practice',
    description: 'Perfect your English pronunciation with guided audio exercises.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
    level: 'Intermediate',
    progress: 10,
    duration: '5 weeks',
    lessonsCount: 20,
    longDescription: 'Improve your pronunciation with guided exercises focusing on challenging sounds, intonation patterns, and connected speech.',
    topics: [
      'Vowel Sounds',
      'Consonant Sounds',
      'Word Stress',
      'Intonation',
      'Connected Speech'
    ]
  },
  {
    id: '6',
    title: 'IELTS Preparation',
    description: 'Comprehensive preparation for all sections of the IELTS exam.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    level: 'Advanced',
    progress: 0,
    duration: '12 weeks',
    lessonsCount: 36,
    longDescription: 'Complete IELTS preparation covering all four sections: Listening, Reading, Writing, and Speaking. Includes practice tests and strategies for achieving your target score.',
    topics: [
      'Listening Strategies',
      'Reading Techniques',
      'Writing Task 1 & 2',
      'Speaking Practice',
      'Practice Tests'
    ]
  },
];
