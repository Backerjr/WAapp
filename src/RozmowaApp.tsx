import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './pages/rozmowa/MainLayout';
import Dashboard from './pages/rozmowa/Dashboard';
import LearnPage from './pages/rozmowa/LearnPage';
import { LessonPlayer } from './pages/rozmowa/LessonPlayer';
import ReviewPage from './pages/rozmowa/ReviewPage';
import ResourceLibrary from './pages/rozmowa/ResourceLibrary';
import ProfilePage from './pages/rozmowa/ProfilePage';
import LeaderboardPage from './pages/rozmowa/LeaderboardPage';
import LandingPage from './components/LandingPage';
import { auth, googleProvider } from './firebase';
import { onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * Root route component that handles landing page vs dashboard redirect
 * Shows LandingPage only on first visit, then redirects returning users to Dashboard
 */
function RootRoute() {
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false);
  const navigate = useNavigate();

  // If user has visited before, redirect to dashboard
  if (hasVisited) {
    return <Navigate to="/dashboard" replace />;
  }

  // First time visitor - show landing page and mark as visited when they start
  const handleStart = () => {
    setHasVisited(true);
    navigate('/dashboard');
  };

  return <LandingPage onStart={handleStart} />;
}

/**
 * rozmoWA Application
 * * Modern language learning application with:
 * - Complete Tailwind CSS design system with light/dark mode
 * - Atomic component library (Button, Card, Input, Badge, ProgressBar, etc.)
 * - Fully responsive layout with desktop sidebar and mobile bottom navigation
 * - Interactive lesson system with multiple exercise types
 * - Progress tracking and achievements
 * - Spaced repetition review system
 */
export function RozmowaApp() {
  // Set basename for GitHub Pages deployment (/WAapp/) or root for other environments
  const basename = window.location.pathname.startsWith('/WAapp') ? '/WAapp' : '/';

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <BrowserRouter basename={basename}>
      {user ? (
        <Routes>
          {/* Root route - shows landing page on first visit, redirects returning users */}
          <Route path="/" element={<RootRoute />} />
          
          {/* Main app routes */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="learn" element={<LearnPage />} />
            <Route path="lesson/:lessonId" element={<LessonPlayer />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="resources" element={<ResourceLibrary />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-background dark:bg-primary-background-dark">
          <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-4">Welcome to rozmoWA</h1>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
    </BrowserRouter>
  );
}

export default RozmowaApp;