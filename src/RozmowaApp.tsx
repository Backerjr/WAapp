import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './pages/rozmowa/MainLayout';
import Dashboard from './pages/rozmowa/Dashboard';
import LearnPage from './pages/rozmowa/LearnPage';
import CourseDetailPage from './pages/rozmowa/CourseDetailPage';
import ReviewPage from './pages/rozmowa/ReviewPage';
import ResourceLibrary from './pages/rozmowa/ResourceLibrary';
import ProfilePage from './pages/rozmowa/ProfilePage';

/**
 * rozmoWA Application Demo
 * 
 * This is a standalone demo of the rozmoWA design system and application architecture.
 * It showcases the "Structured Fun" philosophy with a complete design system implementation.
 * 
 * Features:
 * - Complete Tailwind CSS design system with light/dark mode
 * - Atomic component library (Button, Card, Input, Badge, ProgressBar, etc.)
 * - Composite components (ContinueLearningCard, DailyGoalsCard, etc.)
 * - Fully responsive layout with desktop sidebar and mobile bottom navigation
 * - Five main pages: Dashboard, Learn, Review, Resources, Profile
 * 
 * To view this demo:
 * - Navigate to /rozmowa in your browser
 * - Toggle dark mode using the button in the sidebar
 * - Explore all navigation items to see different page layouts
 */
export function RozmowaApp() {
  // Set basename for GitHub Pages deployment (/WAapp/) or root for other environments
  // GitHub Pages serves at /WAapp/, Vercel and local dev serve at root /
  const basename = window.location.pathname.startsWith('/WAapp') ? '/WAapp' : '/';
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/rozmowa" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:courseId" element={<CourseDetailPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="resources" element={<ResourceLibrary />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/" element={<Navigate to="/rozmowa" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RozmowaApp;
