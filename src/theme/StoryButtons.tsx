import { motion } from 'framer-motion';

interface StoryButtonsProps {
  onNavigate: (page: string) => void;
}

export default function StoryButtons({ onNavigate }: StoryButtonsProps) {
  const buttons = [
    {
      label: 'Begin Your Journey',
      page: 'app',
      variant: 'primary',
      icon: '✨'
    },
    {
      label: 'Explore Courses',
      page: 'offer',
      variant: 'secondary',
      icon: '📚'
    },
    {
      label: 'About Us',
      page: 'about',
      variant: 'tertiary',
      icon: '💌'
    }
  ];

  return (
    <div className="story-buttons">
      {buttons.map((button, index) => (
        <motion.button
          key={button.page}
          className={`story-btn story-btn-${button.variant}`}
          onClick={() => onNavigate(button.page)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2 + index * 0.1,
            type: "spring",
            stiffness: 300
          }}
        >
          <span className="btn-icon">{button.icon}</span>
          <span className="btn-label">{button.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
