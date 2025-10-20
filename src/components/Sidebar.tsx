import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiBookOpen, FiCpu, FiMoon, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Sidebar.css';

/**
 * Self-contained animated sidebar component with collapsible functionality.
 * 
 * @example
 * ```tsx
 * function App() {
 *   const [activePage, setActivePage] = useState('Home');
 *   
 *   return (
 *     <div className="app-layout">
 *       <Sidebar activePage={activePage} setActivePage={setActivePage} />
 *       <main className="main-content">
 *         {activePage === 'Home' && <HomePage />}
 *         {activePage === 'Lessons' && <LessonsPage />}
 *         {activePage === 'AI Zone' && <AIZonePage />}
 *         {activePage === 'Profile' && <ProfilePage />}
 *       </main>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param activePage - Currently active page identifier
 * @param setActivePage - Function to update the active page
 */

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const navigationItems: NavigationItem[] = [
  { id: 'Home', label: 'Home', icon: FiHome },
  { id: 'Lessons', label: 'Lessons', icon: FiBookOpen },
  { id: 'AI Zone', label: 'AI Zone', icon: FiCpu },
  { id: 'Profile', label: 'Profile', icon: FiMoon },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <motion.aside
      className="sidebar"
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 250
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* Toggle Button */}
      <div className="sidebar-header">
        <motion.button
          className="toggle-button"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activePage === item.id;

          return (
            <motion.div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="nav-icon">
                <IconComponent size={20} />
              </div>
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    className="nav-label"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </nav>

      {/* Brand/Logo Section (when expanded) */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <div className="brand-text">WAapp</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;