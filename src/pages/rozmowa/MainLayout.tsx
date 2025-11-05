import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, RefreshCw, Library, User, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { path: '/rozmowa', icon: Home, label: 'Dashboard' },
    { path: '/rozmowa/learn', icon: BookOpen, label: 'Learn' },
    { path: '/rozmowa/review', icon: RefreshCw, label: 'Review' },
    { path: '/rozmowa/resources', icon: Library, label: 'Resources' },
    { path: '/rozmowa/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-primary-background dark:bg-primary-background-dark transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-container-background dark:bg-container-background-dark border-r border-border dark:border-border-dark">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-border dark:border-border-dark">
            <h1 className="font-heading text-h3 text-accent dark:text-accent-dark">
              rozmoWA
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-accent text-white dark:bg-accent-dark'
                      : 'text-secondary-text dark:text-secondary-text-dark hover:bg-primary-background dark:hover:bg-primary-background-dark'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-border dark:border-border-dark">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-secondary-text dark:text-secondary-text-dark hover:bg-primary-background dark:hover:bg-primary-background-dark"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-container-background dark:bg-container-background-dark border-t border-border dark:border-border-dark z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 transition-colors duration-200',
                  isActive
                    ? 'text-accent dark:text-accent-dark'
                    : 'text-secondary-text dark:text-secondary-text-dark'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:pl-64 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
