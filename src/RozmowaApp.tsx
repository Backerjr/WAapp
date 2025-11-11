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
 * Handles first-visit logic for logged-in users.
 * Shows LandingPage on first visit, otherwise redirects to Dashboard.
 */
function RootRoute() {
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false);
  const navigate = useNavigate();

  if (hasVisited) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleStart = () => {
    setHasVisited(true);
    navigate('/dashboard');
  };

  return <LandingPage onStart={handleStart} />;
}

/**
 * Main App for rozmoWA — deployed on Vercel.
 * Base path is always root '/'.
 */
export function RozmowaApp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  // Always show a lightweight loader while auth is resolving
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-primary-text">Loading...</p>
      </div>
    );
  }

  // Not logged in → show Google login
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary-background dark:bg-primary-background-dark">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-4">
          Welcome to rozmoWA
        </h1>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-primary-button text-white rounded-xl hover:bg-primary-button-hover transition"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // Logged in → main app routes
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Default: show Landing once, then Dashboard */}
        <Route path="/" element={<RootRoute />} />

        {/* Main layout and subpages */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="resources" element={<ResourceLibrary />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RozmowaApp;
