import { useState } from 'react';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import OfferPage from './OfferPage';
import ContactPage from './ContactPage';
import AppPage from './AppPage';
import PosterSection from './PosterSection';

interface WebsiteRouterProps {
  onStartApp: () => void;
}

type PageType = 'home' | 'about' | 'offer' | 'contact' | 'app' | 'poster';

export default function WebsiteRouter({ onStartApp }: WebsiteRouterProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [viewMode, setViewMode] = useState<'elegant' | 'default'>('default');

  const handleNavigation = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <LandingPage onNavigate={handleNavigation} />
            <PosterSection onNavigate={handleNavigation} />
          </>
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigation} />;
      case 'offer':
        return <OfferPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      case 'app':
        return <AppPage onNavigate={handleNavigation} onStartApp={onStartApp} />;
      case 'poster':
        return <PosterSection onNavigate={handleNavigation} />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="website-router">
      {renderPage()}
      <button
        className={`nav-btn ${viewMode === 'elegant' ? 'active' : ''}`}
        onClick={() => setViewMode('elegant')}
      >
        ✨ Elegant
      </button>
    </div>
  );
}
