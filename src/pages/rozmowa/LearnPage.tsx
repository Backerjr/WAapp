import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button } from '../../components/rozmowa';
import { Search, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { skillTree } from '../../data/lessons';

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get all lessons from skill tree
  const allLessons = skillTree.flatMap(unit => 
    unit.lessons.map(lesson => ({
      ...lesson,
      unitTitle: unit.title_en,
      unitId: unit.id
    }))
  );

  // Get progress from localStorage
  const savedProgress = localStorage.getItem('progress');
  const progress = savedProgress ? JSON.parse(savedProgress) : { completedLessons: [], xp: 0 };

  const filteredLessons = allLessons.filter(lesson => {
    const matchesSearch = lesson.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (lesson.description_en?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesSearch;
  });

  // Group lessons by unit
  const lessonsByUnit = filteredLessons.reduce((acc, lesson) => {
    if (!acc[lesson.unitId]) {
      acc[lesson.unitId] = {
        title: lesson.unitTitle,
        lessons: []
      };
    }
    acc[lesson.unitId].lessons.push(lesson);
    return acc;
  }, {} as Record<string, { title: string; lessons: typeof allLessons }>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Your Learning Path
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Start your English language journey
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
          <Input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-success/10 dark:bg-success-dark/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success dark:text-success-dark" />
            </div>
            <div>
              <p className="font-heading text-h3 text-primary-text dark:text-primary-text-dark">
                {progress.completedLessons.length}
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
              <BookOpen className="w-6 h-6 text-accent dark:text-accent-dark" />
            </div>
            <div>
              <p className="font-heading text-h3 text-primary-text dark:text-primary-text-dark">
                {progress.xp || 0}
              </p>
              <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                Total XP
              </p>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-info/10 dark:bg-info-dark/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-info dark:text-info-dark" />
            </div>
            <div>
              <p className="font-heading text-h3 text-primary-text dark:text-primary-text-dark">
                {allLessons.length - progress.completedLessons.length}
              </p>
              <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                Lessons Remaining
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lessons by Unit */}
      {Object.entries(lessonsByUnit).map(([unitId, unit]) => (
        <div key={unitId} className="mb-8">
          <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
            {unit.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unit.lessons.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              
              return (
                <Card
                  key={lesson.id}
                  variant="default"
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-heading text-h3 text-primary-text dark:text-primary-text-dark mb-1">
                        {lesson.title_en}
                      </h3>
                      <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                        {lesson.description_en || ''}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-success dark:text-success-dark flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-small text-secondary-text dark:text-secondary-text-dark mb-3">
                    <BookOpen className="w-4 h-4" />
                    <span>{lesson.exercises.length} exercises</span>
                  </div>
                  <Button
                    variant={isCompleted ? "secondary" : "primary"}
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson/${lesson.id}`);
                    }}
                  >
                    {isCompleted ? 'Review' : 'Start Lesson'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body text-secondary-text dark:text-secondary-text-dark">
            No lessons found matching your search
          </p>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
