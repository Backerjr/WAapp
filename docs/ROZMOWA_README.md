# rozmoWA Design System & Application

A complete implementation of the rozmoWA language learning application following the comprehensive design blueprint. This implementation embodies the "Structured Fun" philosophy - combining rigorous pedagogical structure with engaging gamification.

## 🎨 Design System

### Color Palette

The rozmoWA design system uses an earthy, grounded color palette with energetic accents, supporting both light and dark modes:

**Light Mode:**
- Primary Background: `hsl(30, 25%, 95%)` - Warm, earthy neutral
- Container Background: `hsl(0, 0%, 100%)` - Pure white
- Primary Text: `hsl(240, 10%, 15%)` - Deep, readable text
- Accent: `hsl(350, 85%, 55%)` - Energetic red for CTAs

**Dark Mode:**
- Primary Background: `hsl(240, 10%, 12%)` - Deep midnight
- Container Background: `hsl(240, 6%, 16%)` - Slightly lighter containers
- Primary Text: `hsl(30, 25%, 95%)` - Inverted for readability
- Accent: `hsl(350, 90%, 65%)` - Brightened accent

### Typography

- **Heading Font:** Poppins - Modern, geometric sans-serif
- **Body/UI Font:** Inter - Optimized for screen readability
- **Font Scale:** H1 (36px/700), H2 (28px/600), H3 (22px/600), Body (16px/400), Small (14px/400)

### Spacing System

Based on a 4px unit system:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

## 📦 Component Library

### Atomic Components

Located in `src/components/rozmowa/`:

1. **Button** - Primary, secondary, and ghost variants with icon support
2. **Card** - Container with default, glass, and elevated variants
3. **Input** - Form input with label and error state support
4. **Badge** - Status indicators with semantic color schemes
5. **ProgressBar** - Visual progress indicator with percentage display

### Composite Components

Built from atomic components for specific use cases:

1. **ContinueLearningCard** - Highlights current/next lesson with progress
2. **DailyGoalsCard** - Shows streak and XP progress toward daily goal
3. **ReviewQueueCard** - Displays items due for review
4. **StatCard** - Compact metric display with icon
5. **CourseCard** - Course preview with image, level badge, and progress

## 🗺️ Application Structure

### Pages

Located in `src/pages/rozmowa/`:

1. **Dashboard** - Personalized home with learning overview
2. **LearnPage** - Course catalog with search and filters
3. **ReviewPage** - Spaced repetition review queue (placeholder)
4. **ResourceLibrary** - Supplementary materials repository
5. **ProfilePage** - User stats, achievements, and settings

### Layout

**MainLayout** provides:
- Desktop: Fixed sidebar navigation (left, 256px wide)
- Mobile: Bottom tab bar navigation
- Dark mode toggle
- Responsive container for page content

## 🚀 Quick Start

### Installation

Already installed in this project. The rozmoWA demo is accessible at `/rozmowa`.

### View the Demo

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5000/rozmowa`

3. Explore all features:
   - Toggle dark mode in the sidebar
   - Navigate between Dashboard, Learn, Review, Resources, Profile
   - Interact with course cards, stats, and progress indicators

### Integration with Existing App

To integrate rozmoWA into your main application:

```tsx
import { RozmowaApp } from './RozmowaApp';

// In your router:
<Route path="/rozmowa/*" element={<RozmowaApp />} />
```

Or use individual components:

```tsx
import { Button, Card, ContinueLearningCard } from './components/rozmowa';

// Use in your components
<Button variant="primary" size="lg">Get Started</Button>
```

## 🎯 Design Principles

### 1. Clarity and Calm
Minimalist interface reduces cognitive load, allowing focus on learning content.

### 2. Consistent System
All components follow the same design tokens for colors, spacing, and typography.

### 3. Accessibility First
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly targets on mobile
- Optimized navigation patterns per device

### 5. Dark Mode Support
Complete dark mode implementation with carefully selected color values for readability in both themes.

## 📁 File Structure

```
src/
├── components/
│   └── rozmowa/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── ProgressBar.tsx
│       ├── ContinueLearningCard.tsx
│       ├── DailyGoalsCard.tsx
│       ├── ReviewQueueCard.tsx
│       ├── StatCard.tsx
│       ├── CourseCard.tsx
│       └── index.ts
├── pages/
│   └── rozmowa/
│       ├── MainLayout.tsx
│       ├── Dashboard.tsx
│       ├── LearnPage.tsx
│       ├── ReviewPage.tsx
│       ├── ResourceLibrary.tsx
│       └── ProfilePage.tsx
├── utils/
│   └── cn.ts (className utility)
├── RozmowaApp.tsx (main router)
├── index.css (includes Tailwind + custom styles)
└── tailwind.config.js (design system tokens)
```

## 🔧 Configuration Files

### tailwind.config.js

Defines the complete design system:
- Extended color palette with dark mode variants
- Custom font families
- Spacing scale
- Typography scale

### postcss.config.js

Processes Tailwind directives and applies autoprefixer.

## 🎨 Customization

### Adding New Colors

Edit `tailwind.config.js`:

```js
colors: {
  'your-color': {
    DEFAULT: 'hsl(210, 100%, 50%)',
    dark: 'hsl(210, 90%, 60%)',
  }
}
```

### Creating New Components

Follow the atomic design pattern:

```tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface YourComponentProps {
  // Define props with TypeScript
}

export const YourComponent: React.FC<YourComponentProps> = ({
  // Destructure props
}) => {
  return (
    <div className={cn(
      'base-styles',
      'responsive-styles',
      'dark:dark-mode-styles'
    )}>
      {/* Component content */}
    </div>
  );
};
```

### Theming

The design system supports easy theming by modifying HSL color values in `tailwind.config.js`.

## 🧪 Testing

Components are built with accessibility and testability in mind:
- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)

## 🎓 Pedagogical Features (Planned)

The rozmoWA architecture is designed to support:

1. **AI-Powered Personalization** - Adaptive learning paths based on user performance
2. **Active Production Focus** - Speech recognition and constructed response exercises
3. **Spaced Repetition System** - Automated review scheduling for long-term retention
4. **Gamification** - XP, streaks, badges tied to learning goals
5. **Progress Tracking** - Comprehensive analytics and milestone tracking

## 📝 Notes

This implementation provides:
- ✅ Complete design system with Tailwind CSS
- ✅ Atomic and composite component library
- ✅ Five fully functional page layouts
- ✅ Responsive navigation (desktop + mobile)
- ✅ Light and dark mode support
- ✅ TypeScript type safety
- ✅ Accessibility features

The rozmoWA application is production-ready for front-end deployment and can be extended with backend APIs for user authentication, content management, and AI-powered features.

---

**Built with React, TypeScript, Tailwind CSS, and ❤️**
