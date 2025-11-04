import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge, ProgressBar } from '../../components/rozmowa';
import { ArrowLeft, BookOpen, Clock, Award } from 'lucide-react';

const mockCourses = [
  {
    id: '1',
    title: 'Grammar Essentials',
    description: 'Master English grammar fundamentals with comprehensive lessons and exercises.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    level: 'Beginner' as const,
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
    level: 'Intermediate' as const,
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
    level: 'Advanced' as const,
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
    level: 'Beginner' as const,
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
    level: 'Intermediate' as const,
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
    level: 'Advanced' as const,
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

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/rozmowa/learn')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="text-center py-12">
          <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-4">
            Course Not Found
          </h1>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
            The course you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/rozmowa/learn')}>
            Browse All Courses
          </Button>
        </div>
      </div>
    );
  }

  const levelColorScheme = {
    'Beginner': 'success' as const,
    'Intermediate': 'info' as const,
    'Advanced': 'accent' as const,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/rozmowa/learn')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Courses
      </Button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Badge colorScheme={levelColorScheme[course.level]} className="mb-3">
              {course.level}
            </Badge>
            <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-3">
              {course.title}
            </h1>
            <p className="text-body-large text-secondary-text dark:text-secondary-text-dark mb-6">
              {course.description}
            </p>
          </div>

          {/* Course Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
              <span className="text-body text-secondary-text dark:text-secondary-text-dark">
                {course.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
              <span className="text-body text-secondary-text dark:text-secondary-text-dark">
                {course.lessonsCount} lessons
              </span>
            </div>
          </div>

          {/* Progress */}
          {course.progress > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-body font-semibold text-primary-text dark:text-primary-text-dark">
                  Your Progress
                </span>
                <span className="text-body text-secondary-text dark:text-secondary-text-dark">
                  {course.progress}%
                </span>
              </div>
              <ProgressBar value={course.progress} />
            </div>
          )}

          <div className="mb-6">
            <Button
              size="lg"
              onClick={() => console.log('Start/Continue course:', courseId)}
              className="w-full sm:w-auto"
            >
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </Button>
          </div>
        </div>

        {/* Course Image */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </Card>
        </div>
      </div>

      {/* Course Description */}
      <Card className="mb-8">
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
          About This Course
        </h2>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          {course.longDescription}
        </p>
      </Card>

      {/* Topics Covered */}
      <Card>
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
          What You'll Learn
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {course.topics.map((topic, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-body text-secondary-text dark:text-secondary-text-dark"
            >
              <Award className="w-5 h-5 text-success dark:text-success-dark flex-shrink-0 mt-0.5" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
