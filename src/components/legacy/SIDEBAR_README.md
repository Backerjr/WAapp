# Sidebar Component Documentation

## Overview

A self-contained, animated, collapsible sidebar component built with React, TypeScript, and Framer Motion. Features smooth animations, dark theme styling, and accessible navigation.

## Features

- ✨ **Smooth Animations**: Framer Motion-powered expand/collapse with text fade effects
- 🎨 **Dark Theme**: Purple-blue color scheme with CSS custom properties
- 📱 **Responsive Design**: Optimized for mobile and desktop
- ♿ **Accessible**: Keyboard navigation and focus states
- 🎛️ **Self-Contained**: Manages its own collapse state internally
- 🔌 **Props Interface**: Parent-controlled active page state

## Installation

Make sure you have the required dependencies:

```bash
npm install framer-motion react-icons
```

## Usage

### Basic Implementation

```tsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [activePage, setActivePage] = useState('Home');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Your page content here */}
      </main>
    </div>
  );
}
```

### Advanced Integration

```tsx
function AppWithNavigation() {
  const [activePage, setActivePage] = useState('Home');

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage />;
      case 'Lessons':
        return <LessonsPage />;
      case 'AI Zone':
        return <AIZonePage />;
      case 'Profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
```

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `activePage` | `string` | ✅ | Currently active page identifier |
| `setActivePage` | `(page: string) => void` | ✅ | Function to update the active page |

## Navigation Items

The sidebar includes four predefined navigation items:

| Page | Icon | Label |
|------|------|-------|
| `Home` | FiHome | Home |
| `Lessons` | FiBookOpen | Lessons |
| `AI Zone` | FiCpu | AI Zone |
| `Profile` | FiMoon | Profile |

## Component States

### Collapsed State
- **Width**: 80px
- **Content**: Icons only
- **Toggle**: Right chevron (→)

### Expanded State  
- **Width**: 250px
- **Content**: Icons + labels + branding
- **Toggle**: Left chevron (←)

## Animations

### Width Transition
```tsx
animate={{
  width: isCollapsed ? 80 : 250
}}
transition={{
  duration: 0.3,
  ease: "easeInOut"
}}
```

### Text Label Animation
```tsx
initial={{ opacity: 0, x: -10 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -10 }}
transition={{ duration: 0.2 }}
```

## Styling Customization

### CSS Custom Properties

The component uses CSS custom properties for easy theming:

```css
.sidebar {
  --sidebar-bg: #1a1a2e;
  --active-bg: #4a4a8e;
  --text-color: #e0e0e0;
  --hover-bg: rgba(74, 74, 142, 0.3);
  --border-color: rgba(224, 224, 224, 0.1);
  --toggle-bg: rgba(255, 255, 255, 0.1);
}
```

### Theme Customization

Override CSS variables in your main stylesheet:

```css
.sidebar {
  --sidebar-bg: #your-bg-color;
  --active-bg: #your-active-color;
  --text-color: #your-text-color;
}
```

### Font Family

The component uses Google Fonts (Nunito). Include in your HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Responsive Behavior

- **Desktop**: Full functionality with hover effects
- **Tablet**: Adjusted padding and sizing
- **Mobile**: Fixed positioning with optimized touch targets

## Accessibility Features

- **Keyboard Navigation**: Tab through nav items
- **Focus Indicators**: Visible focus states
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Dark theme with sufficient color contrast

## File Structure

```
src/components/
├── Sidebar.tsx        # Main component
├── Sidebar.css        # Styling
└── SidebarExample.tsx # Usage example
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~15KB (with dependencies)
- **Animations**: Hardware-accelerated via Framer Motion
- **Rendering**: Optimized with React.memo considerations

## Troubleshooting

### Animation Issues
- Ensure `framer-motion` is properly installed
- Check for CSS conflicts with other animation libraries

### Styling Problems
- Verify CSS custom properties are supported
- Check for conflicting global styles

### TypeScript Errors
- Ensure `react-icons` types are available
- Verify TypeScript version compatibility

## Contributing

When modifying the component:

1. Update interface definitions in `Sidebar.tsx`
2. Maintain CSS custom property naming
3. Test animations across different screen sizes
4. Verify accessibility with screen readers

## License

Part of the WAapp project - see main project license.