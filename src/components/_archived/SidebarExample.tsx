// Example integration of the Sidebar component
// This demonstrates how to use the Sidebar with the existing WAapp structure

import { useState } from 'react';
import Sidebar from './Sidebar';

/**
 * Example App component showing Sidebar integration
 * 
 * The Sidebar component manages its own collapsed/expanded state internally,
 * while the parent component controls which page is active via props.
 */
function AppWithSidebar() {
  const [activePage, setActivePage] = useState('Home');

  const renderActivePage = () => {
    switch (activePage) {
      case 'Home':
        return (
          <div style={{ padding: '2rem', color: '#e0e0e0' }}>
            <h1>Welcome Home</h1>
            <p>This is the home page content.</p>
          </div>
        );
      case 'Lessons':
        return (
          <div style={{ padding: '2rem', color: '#e0e0e0' }}>
            <h1>Lessons</h1>
            <p>Browse and start your language lessons here.</p>
          </div>
        );
      case 'AI Zone':
        return (
          <div style={{ padding: '2rem', color: '#e0e0e0' }}>
            <h1>AI Zone</h1>
            <p>AI-powered language learning tools and features.</p>
          </div>
        );
      case 'Profile':
        return (
          <div style={{ padding: '2rem', color: '#e0e0e0' }}>
            <h1>Profile</h1>
            <p>View your progress and manage your account.</p>
          </div>
        );
      default:
        return (
          <div style={{ padding: '2rem', color: '#e0e0e0' }}>
            <h1>Welcome Home</h1>
            <p>This is the home page content.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar with controlled active state */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />
      
      {/* Main content area */}
      <main style={{ 
        flex: 1, 
        overflow: 'auto',
        background: 'var(--bg-primary, #0a0a0a)'
      }}>
        {renderActivePage()}
      </main>
    </div>
  );
}

export default AppWithSidebar;