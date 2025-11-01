import { motion } from 'framer-motion';

interface ChapterCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}

export default function ChapterCard({ 
  icon, 
  title, 
  description, 
  onClick,
  delay = 0 
}: ChapterCardProps) {
  return (
    <motion.div
      className="chapter-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="chapter-card-content">
        <span className="chapter-icon">{icon}</span>
        <h3 className="chapter-title">{title}</h3>
        <p className="chapter-description">{description}</p>
      </div>
    </motion.div>
  );
}
