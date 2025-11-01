import { motion } from 'framer-motion';
import ChapterCard from './ChapterCard';

interface StoryGridProps {
  onNavigate: (page: string) => void;
}

export default function StoryGrid({ onNavigate }: StoryGridProps) {
  const chapters = [
    {
      icon: '🎯',
      title: 'Interactive Learning',
      description: 'Engage with exercises that feel like play, not work. From listening comprehension to creative writing.',
      page: 'app',
    },
    {
      icon: '🎨',
      title: 'Creative Expression',
      description: 'Express yourself through language. Build confidence with every word you speak and write.',
      page: 'offer',
    },
    {
      icon: '🌍',
      title: 'Cultural Connection',
      description: 'Discover the heart of Polish culture. Stories, traditions, and conversations that matter.',
      page: 'about',
    },
    {
      icon: '💬',
      title: 'Real Conversations',
      description: 'Practice with authentic dialogues. Learn how people actually speak, not just textbook phrases.',
      page: 'app',
    },
    {
      icon: '📚',
      title: 'Personalized Lessons',
      description: 'Your journey, your pace. Adaptive learning that grows with you.',
      page: 'offer',
    },
    {
      icon: '💫',
      title: 'Join Our Community',
      description: 'Connect with fellow learners. Share your story and be part of something beautiful.',
      page: 'contact',
    },
  ];

  return (
    <section className="story-grid">
      <motion.h2
        className="story-grid-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Your Learning Adventure Awaits
      </motion.h2>
      
      <div className="story-cards">
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={index}
            icon={chapter.icon}
            title={chapter.title}
            description={chapter.description}
            onClick={() => onNavigate(chapter.page)}
            delay={0.1 * index}
          />
        ))}
      </div>
    </section>
  );
}
