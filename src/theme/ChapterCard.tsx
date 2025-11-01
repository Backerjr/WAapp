import { motion, Variants } from 'framer-motion';

interface ChapterCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  page: string;
  onNavigate: (page: string) => void;
}

export default function ChapterCard({
  title,
  description,
  icon,
  color,
  page,
  onNavigate
}: ChapterCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <motion.div
      className={`chapter-card chapter-card-${color}`}
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3 }
      }}
      onClick={() => onNavigate(page)}
    >
      <motion.div 
        className="card-icon"
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>

      <motion.div 
        className="card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
