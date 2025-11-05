import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard, Input, Badge } from '../../components/rozmowa';
import { Search, Filter } from 'lucide-react';
import { mockCourses } from '../../data/mockCourses';

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate(`/rozmowa/learn/${course.id}`);
            }}
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
