import { motion } from 'framer-motion';

interface StoryButtonsProps {
  onNavigate: (page: string) => void;
}

export default function StoryButtons({ onNavigate }: StoryButtonsProps) {
  return (
    <div className="story-buttons">
      <motion.button
        className="story-button story-button-primary"
        onClick={() => onNavigate('app')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Begin Your Journey
      </motion.button>
      
      <motion.button
        className="story-button story-button-secondary"
        onClick={() => onNavigate('offer')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Explore Classes
      </motion.button>
      
      <motion.button
        className="story-button story-button-secondary"
        onClick={() => onNavigate('about')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Our Story
      </motion.button>
    </div>
  );
}
