import { useState } from 'react';
import LandingPage from './LandingPage.tsx';
import AboutPage from './AboutPage';
import OfferPage from './OfferPage';
import ContactPage from './ContactPage';
import AppPage from './AppPage';
import PosterSection from './PosterSection';

interface WebsiteRouterProps {
  onStartApp: () => void;
}

type PageType = 'home' | 'about' | 'offer' | 'contact' | 'app' | 'poster';

/**
 * WebsiteRouter component that manages navigation between different pages of the website.
 * 
 * This component implements client-side routing by maintaining the current page state
 * and rendering the appropriate page component based on the current route. It handles
 * navigation between home, about, offer, contact, app, and poster pages. Navigation
 * automatically scrolls to the top of the page with smooth behavior.
 * 
 * @param props - The component props
 * @param props.onStartApp - Callback function to start the application, passed down to AppPage
 * 
 * @returns A div container with the currently active page component
 * 
 * @example
 * ```tsx
 * <WebsiteRouter onStartApp={() => setViewMode('elegant')} />
 * ```
 */
function WebsiteRouter({ onStartApp }: WebsiteRouterProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const navigateTo = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'offer':
        return <OfferPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'app':
        return <AppPage onStartApp={onStartApp} onNavigate={navigateTo} />;
      case 'poster':
        return <PosterSection onNavigate={navigateTo} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div>
      {renderCurrentPage()}
    </div>
  );
}

export default WebsiteRouter;
