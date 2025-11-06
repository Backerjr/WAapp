import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/rozmowa/MainLayout';
import Dashboard from './pages/rozmowa/Dashboard';
import LearnPage from './pages/rozmowa/LearnPage';
import LessonPlayer from './pages/rozmowa/LessonPlayer';
import ReviewPage from './pages/rozmowa/ReviewPage';
import ResourceLibrary from './pages/rozmowa/ResourceLibrary';
import ProfilePage from './pages/rozmowa/ProfilePage';

/**
 * rozmoWA Application
 * 
 * Modern language learning application with:
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
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="resources" element={<ResourceLibrary />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RozmowaApp;
