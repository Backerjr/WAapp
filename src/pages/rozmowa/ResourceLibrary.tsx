import React from 'react';
import { Card, Badge } from '../../components/rozmowa';
import { FileText, Video, Headphones, ExternalLink } from 'lucide-react';

const mockResources = [
  {
    id: '1',
    title: 'Grammar Reference Guide',
    type: 'PDF',
    course: 'Grammar Essentials',
    icon: FileText,
  },
  {
    id: '2',
    title: 'Business Meeting Scenarios',
    type: 'Video',
    course: 'Business English',
    icon: Video,
  },
  {
    id: '3',
    title: 'Pronunciation Audio Examples',
    type: 'Audio',
    course: 'Pronunciation Practice',
    icon: Headphones,
  },
  {
    id: '4',
    title: 'IELTS Writing Samples',
    type: 'PDF',
    course: 'IELTS Preparation',
    icon: FileText,
  },
];

export const ResourceLibrary: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Resource Library
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Access supplementary materials and study aids
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card
              key={resource.id}
              variant="default"
              className="cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-info/10 dark:bg-info-dark/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-info dark:text-info-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg text-primary-text dark:text-primary-text-dark line-clamp-2">
                      {resource.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-secondary-text dark:text-secondary-text-dark flex-shrink-0" />
                  </div>
                  <Badge colorScheme="info" size="sm" className="mb-2">
                    {resource.type}
                  </Badge>
                  <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                    {resource.course}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceLibrary;
