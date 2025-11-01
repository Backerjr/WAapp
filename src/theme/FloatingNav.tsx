import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingNavProps {
  onNavigate: (page: string) => void;
}

export default function FloatingNav({ onNavigate }: FloatingNavProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [-50, 0]);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Offers', page: 'offer' },
    { label: 'Contact', page: 'contact' },
    { label: 'App', page: 'app' }
  ];

  return (
    <motion.nav
      className="floating-nav"
      style={{ opacity, y }}
      initial={{ opacity: 0, y: -50 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
        >
          WaApp
        </motion.div>

        <ul className="nav-links">
          {navItems.map((item, index) => (
            <motion.li
              key={item.page}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <motion.button
                className="nav-link"
                onClick={() => onNavigate(item.page)}
                whileHover={{ scale: 1.1, color: '#c4a7e7' }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
