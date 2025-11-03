import React from 'react';
import { Card, Button } from '../../components/rozmowa';
import { RefreshCw } from 'lucide-react';

export const ReviewPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Review
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Strengthen your knowledge with spaced repetition
        </p>
      </div>

      <Card variant="elevated" className="max-w-2xl mx-auto text-center py-12">
        <RefreshCw className="w-16 h-16 text-info dark:text-info-dark mx-auto mb-4" />
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-2">
          Review Feature
        </h2>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
          This page will contain your personalized review queue powered by spaced repetition.
        </p>
        <Button variant="primary" size="lg">
          Coming Soon
        </Button>
      </Card>
    </div>
  );
};

export default ReviewPage;
