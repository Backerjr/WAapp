import { motion } from 'framer-motion';

interface FloatingNavProps {
  onNavigate: (page: string) => void;
}

export default function FloatingNav({ onNavigate }: FloatingNavProps) {
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'App', page: 'app' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <motion.nav
      className="floating-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {navItems.map((item, index) => (
        <motion.a
          key={item.page}
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.page);
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
