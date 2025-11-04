import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge, ProgressBar } from '../../components/rozmowa';
import { ArrowLeft, BookOpen, Clock, Award } from 'lucide-react';
import { mockCourses } from '../../data/mockCourses';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="secondary"
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
        variant="secondary"
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
            {course.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
                <span className="text-body text-secondary-text dark:text-secondary-text-dark">
                  {course.duration}
                </span>
              </div>
            )}
            {course.lessonsCount && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
                <span className="text-body text-secondary-text dark:text-secondary-text-dark">
                  {course.lessonsCount} lessons
                </span>
              </div>
            )}
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
      {course.longDescription && (
        <Card className="mb-8">
          <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
            About This Course
          </h2>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark">
            {course.longDescription}
          </p>
        </Card>
      )}

      {/* Topics Covered */}
      {course.topics && course.topics.length > 0 && (
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
      )}
    </div>
  );
};

export default CourseDetailPage;
