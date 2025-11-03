import React, { useState } from 'react';
import { CourseCard, Input, Badge } from '../../components/rozmowa';
import { Search, Filter } from 'lucide-react';

const mockCourses = [
  {
    id: '1',
    title: 'Grammar Essentials',
    description: 'Master English grammar fundamentals with comprehensive lessons and exercises.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    level: 'Beginner' as const,
    progress: 45,
  },
  {
    id: '2',
    title: 'Business English',
    description: 'Develop professional communication skills for the workplace.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    level: 'Intermediate' as const,
    progress: 20,
  },
  {
    id: '3',
    title: 'Advanced Conversation',
    description: 'Enhance fluency with complex discussions and idiomatic expressions.',
    imageUrl: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=400&h=300&fit=crop',
    level: 'Advanced' as const,
    progress: 0,
  },
  {
    id: '4',
    title: 'Everyday Vocabulary',
    description: 'Build a strong vocabulary foundation for daily conversations.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    level: 'Beginner' as const,
    progress: 75,
  },
  {
    id: '5',
    title: 'Pronunciation Practice',
    description: 'Perfect your English pronunciation with guided audio exercises.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
    level: 'Intermediate' as const,
    progress: 10,
  },
  {
    id: '6',
    title: 'IELTS Preparation',
    description: 'Comprehensive preparation for all sections of the IELTS exam.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    level: 'Advanced' as const,
    progress: 0,
  },
];

export const LearnPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Explore Courses
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Discover lessons tailored to your learning goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-secondary-text dark:text-secondary-text-dark" />
          <button
            onClick={() => setSelectedLevel('all')}
            className="transition-opacity"
          >
            <Badge 
              colorScheme="info" 
              className={selectedLevel === 'all' ? 'opacity-100' : 'opacity-50 hover:opacity-75'}
            >
              All Levels
            </Badge>
          </button>
          <button
            onClick={() => setSelectedLevel('Beginner')}
            className="transition-opacity"
          >
            <Badge 
              colorScheme="success"
              className={selectedLevel === 'Beginner' ? 'opacity-100' : 'opacity-50 hover:opacity-75'}
            >
              Beginner
            </Badge>
          </button>
          <button
            onClick={() => setSelectedLevel('Intermediate')}
            className="transition-opacity"
          >
            <Badge 
              colorScheme="info"
              className={selectedLevel === 'Intermediate' ? 'opacity-100' : 'opacity-50 hover:opacity-75'}
            >
              Intermediate
            </Badge>
          </button>
          <button
            onClick={() => setSelectedLevel('Advanced')}
            className="transition-opacity"
          >
            <Badge 
              colorScheme="accent"
              className={selectedLevel === 'Advanced' ? 'opacity-100' : 'opacity-50 hover:opacity-75'}
            >
              Advanced
            </Badge>
          </button>
        </div>
      </div>

      {/* Learning Path View */}
      <div className="mb-6">
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
          Your Learning Path
        </h2>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body text-secondary-text dark:text-secondary-text-dark">
            No courses found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
