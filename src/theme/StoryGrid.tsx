import { motion } from 'framer-motion';
import ChapterCard from './ChapterCard';

interface StoryGridProps {
  onNavigate: (page: string) => void;
}

export default function StoryGrid({ onNavigate }: StoryGridProps) {
  const chapters = [
    {
      id: 'components',
      title: 'Interactive Components',
      description: 'Explore the building blocks of our immersive learning experience',
      icon: '🧩',
      color: 'lavender',
      page: 'components'
    },
    {
      id: 'exercises',
      title: 'Learning Exercises',
      description: 'Practice with engaging exercises designed to spark mastery',
      icon: '📝',
      color: 'amber',
      page: 'exercises'
    },
    {
      id: 'app',
      title: 'Your Learning Space',
      description: 'Dive into your personalized language journey',
      icon: '🌟',
      color: 'indigo',
      page: 'app'
    },
    {
      id: 'about',
      title: 'Our Story',
      description: 'Discover the heart behind WaApp and our mission',
      icon: '💫',
      color: 'gold',
      page: 'about'
    },
    {
      id: 'offers',
      title: 'Course Offerings',
      description: 'Find the perfect path to fluency tailored for you',
      icon: '🎓',
      color: 'rose',
      page: 'offer'
    },
    {
      id: 'contact',
      title: 'Connect With Us',
      description: 'Reach out and begin a conversation',
      icon: '✉️',
      color: 'teal',
      page: 'contact'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="story-grid-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-header"
      >
        <h2 className="section-title">Your Journey Awaits</h2>
        <p className="section-subtitle">
          Choose your path and step into a world where learning feels effortless
        </p>
      </motion.div>

      <motion.div
        className="story-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            {...chapter}
            onNavigate={onNavigate}
          />
        ))}
      </motion.div>
    </section>
  );
}
