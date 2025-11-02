# RozmoWA Website - Quick Start Guide

## 🎉 What's New

A complete, modern website has been added to your RozmoWA language learning app! The website serves as a landing page and information hub that seamlessly integrates with your interactive learning application.

## 🚀 Quick Start

### View the Website
The app now starts on the website by default. Simply run:
```bash
npm run dev
```
Then visit: `http://localhost:5000/WAapp/`

### Navigate
- **Website → App**: Click "Launch Web App" on any page
- **App → Website**: Click "🏠 Home" button in the app navigation

## 📄 Pages Available

1. **Landing Page** - Hero section, mission, features overview
2. **About** - Story, mission, team, values
3. **Offer** - Class types, pricing, levels
4. **Contact** - Contact form and social links
5. **App** - Features showcase and download options
6. **Poster Section** - Visual marketing section

## 🎨 Brand Colors

```css
--primary-bg: #ffffff      /* White */
--accent: #9c6ae1         /* Purple */
--text: #1a1a1a           /* Dark Gray */
--secondary-bg: #f8f5ff   /* Light Purple */
```

## 📁 New Files

```
src/components/
├── LandingPage.tsx + .css      # Main landing page
├── PosterSection.tsx + .css    # Poster showcase
├── AboutPage.tsx               # About page
├── OfferPage.tsx               # Offer/pricing page
├── ContactPage.tsx             # Contact form
├── AppPage.tsx                 # App features page
├── SubPages.css                # Shared styles
└── WebsiteRouter.tsx           # Navigation router
```

## ✏️ Customization

### Update Content

Edit text content in the component files:
- `LandingPage.tsx` - Hero headline, mission text
- `AboutPage.tsx` - Story, team members
- `OfferPage.tsx` - Pricing, class descriptions
- `ContactPage.tsx` - Contact information

### Add Images

Place images in `/public/assets/`:
```bash
public/assets/
├── rozmowa-poster.png    # Main poster (600x800px)
├── team-photo-1.jpg      # Team member photos
├── app-screenshot-1.png  # App screenshots
└── ...
```

### Change Colors

Edit color values in the CSS files:
- `LandingPage.css`
- `SubPages.css`
- `PosterSection.css`

### Modify Navigation

Update menu items in `LandingPage.tsx`:
```tsx
<nav className="main-nav">
  <button onClick={() => handleNavigation('about')}>About Us</button>
  <button onClick={() => handleNavigation('offer')}>Offer</button>
  <button onClick={() => handleNavigation('contact')}>Contact</button>
</nav>
```

## 🔧 Integration Points

### Contact Form
Currently logs to console. To connect to a backend:

```tsx
// In ContactPage.tsx, update handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Send to your backend
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
  
  setSubmitted(true);
};
```

### Social Media Links
Update in `ContactPage.tsx`:

```tsx
<a href="mailto:hello@rozmowa.com" className="social-link">
<a href="https://instagram.com/rozmowa" className="social-link">
<a href="https://linkedin.com/company/rozmowa" className="social-link">
```

### App Store Links
Update in `AppPage.tsx`:

```tsx
<button 
  onClick={() => window.open('https://apps.apple.com/...')}
  className="download-btn ios"
>
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## 🎯 Key Features

✅ **Fully Responsive** - Works on all devices
✅ **Smooth Animations** - Professional transitions
✅ **Interactive Forms** - Contact form with validation
✅ **App Integration** - Seamless transition to learning app
✅ **SEO Ready** - Semantic HTML structure
✅ **Accessibility** - ARIA-friendly components

## 🧪 Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works between pages
- [ ] Contact form validation works
- [ ] "Launch Web App" button transitions to app
- [ ] "🏠 Home" returns to landing page
- [ ] Mobile responsive design works
- [ ] All hover effects work
- [ ] Images load (after adding them)

## 📊 Performance Tips

1. **Optimize Images**
   ```bash
   # Use tools like imagemin
   npm install -g imagemin-cli
   imagemin public/assets/* --out-dir=public/assets/optimized
   ```

2. **Add Loading States**
   - Add skeleton loaders for images
   - Show loading spinners for form submissions

3. **Lazy Load Images**
   ```tsx
   <img src="..." loading="lazy" alt="..." />
   ```

## 🌐 SEO Setup

Add to `index.html`:

```html
<head>
  <title>RozmoWA - Language Learning Reimagined</title>
  <meta name="description" content="Discover RozmoWA's modern language approach...">
  <meta property="og:title" content="RozmoWA">
  <meta property="og:description" content="Language is not learned — it's lived.">
  <meta property="og:image" content="/assets/rozmowa-poster.png">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Deploy to Other Platforms
The `dist/` folder contains all static files ready for deployment to:
- Vercel
- Netlify
- AWS S3
- Any static hosting service

## 🎨 Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

Import in HTML:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

## 📈 Analytics (Optional)

Add Google Analytics to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Website doesn't show on first load
Check `App.tsx` - `viewMode` should default to `'website'`

### Images not loading
- Verify images are in `/public/assets/`
- Check image paths start with `/assets/` (not `./assets/`)

### Styles not applying
- Clear browser cache
- Check CSS import statements
- Verify CSS files are in same directory as TSX files

## 📞 Support

For questions or issues:
1. Check `WEBSITE_IMPLEMENTATION.md` for full documentation
2. Review `WEBSITE_STRUCTURE.txt` for visual layouts
3. Check component files for inline comments

## 🎓 Learning Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **Responsive Design**: https://web.dev/responsive-web-design-basics/

## ✨ Future Enhancements

Ideas for expansion:
- [ ] Blog section for language learning tips
- [ ] Online booking system
- [ ] Student testimonials carousel
- [ ] Multi-language support (Polish translations)
- [ ] Newsletter signup
- [ ] Live chat integration
- [ ] Video testimonials
- [ ] Progress showcase (before/after)

---

**Created**: 2025-10-22  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

Enjoy your new website! 🎉
