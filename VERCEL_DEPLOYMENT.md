# 🚀 Deploying RozmoWA to Vercel

## Quick Deploy (Recommended)

### Option 1: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   For production:
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard (Easiest)

1. **Go to [Vercel Dashboard](https://vercel.com/new)**

2. **Import Git Repository**:
   - Click "Add New" → "Project"
   - Import from GitHub: `backerjr/WAapp`

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
   - **Node Version**: 20.x

4. **Environment Variables** (optional):
   - No environment variables required for basic deployment

5. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes for build and deployment

---

## Configuration Files

The following files have been added to support Vercel deployment:

### `vercel.json`
- Configures build settings
- Sets up SPA routing (all routes → index.html)
- Optimizes static asset serving

### `.vercelignore`
- Excludes unnecessary files from deployment
- Reduces deployment size
- Speeds up build time

### `vite.config.ts` (updated)
- Detects Vercel environment
- Sets correct base path (`/` for Vercel, `/WAapp/` for GitHub Pages)
- Ensures proper asset loading

### `package.json` (updated)
- Added `vercel-build` script
- Compatible with Vercel's build system

---

## Project Settings for Vercel

### Recommended Settings:

| Setting | Value |
|---------|-------|
| **Framework** | Vite |
| **Node Version** | 20.x |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm ci` |
| **Root Directory** | `./` |

### Advanced Settings:

- **Enable Automatic Deployments**: ✅ (deploys on every push to main)
- **Production Branch**: `main`
- **Deploy Previews**: ✅ (create preview for PRs)
- **Comments on PRs**: ✅ (adds deployment URL to PR comments)

---

## Expected Deployment URL

After deployment, your app will be available at:

```
https://rozmowa-[your-username].vercel.app
```

Or with a custom domain:
```
https://rozmowa.yourdomain.com
```

---

## Features Available on Vercel

✅ **Automatic HTTPS** - Free SSL certificates  
✅ **Global CDN** - Fast loading worldwide  
✅ **Edge Network** - Deployed to 70+ regions  
✅ **Instant Rollbacks** - Revert to previous versions  
✅ **Preview Deployments** - Test PRs before merging  
✅ **Analytics** - Built-in performance monitoring  
✅ **Zero Config** - Works out of the box  

---

## Differences from GitHub Pages

| Feature | GitHub Pages | Vercel |
|---------|--------------|--------|
| **Base URL** | `/WAapp/` | `/` |
| **Deploy Speed** | ~2-5 min | ~1-2 min |
| **Global CDN** | Limited | Extensive (70+ regions) |
| **HTTPS** | Yes | Yes (automatic) |
| **Custom Domain** | Yes (manual) | Yes (automatic SSL) |
| **Analytics** | No | Yes (built-in) |
| **Preview URLs** | No | Yes (per PR) |

---

## Troubleshooting

### Build Fails on Vercel

1. **Check Node Version**:
   - Ensure Node 20.x is selected in Vercel settings

2. **Check Build Logs**:
   - View detailed logs in Vercel dashboard
   - Look for TypeScript or dependency errors

3. **Local Build Test**:
   ```bash
   npm run build
   ```
   - If this works locally, deployment should work

### 404 Errors on Routes

- ✅ Already configured in `vercel.json`
- All routes fallback to `index.html` (SPA routing)

### Assets Not Loading

- ✅ Base path automatically set for Vercel
- Assets served from `/assets/` directory

### Performance Issues

- Enable Vercel Analytics in project settings
- Use Lighthouse to identify bottlenecks
- Consider lazy loading components

---

## Post-Deployment Checklist

- [ ] Visit deployment URL
- [ ] Test all lessons and exercises
- [ ] Verify audio playback works
- [ ] Check mobile responsiveness
- [ ] Test all navigation routes
- [ ] Verify glassmorphism effects
- [ ] Test localStorage persistence
- [ ] Confirm animations are smooth

---

## Custom Domain Setup (Optional)

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Update DNS Records**:
   - Add A record or CNAME as instructed by Vercel
   - Wait for DNS propagation (~24 hours)

3. **SSL Certificate**:
   - Automatically issued by Vercel
   - Renews automatically

---

## Continuous Deployment

Once connected to GitHub:

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **Automatic deployment triggered**:
   - Build starts immediately
   - Completes in ~1-2 minutes
   - Live update with zero downtime

3. **Preview deployments**:
   - Every PR gets a unique preview URL
   - Test changes before merging
   - Automatic cleanup after merge

---

## Environment Variables (if needed)

Currently, RozmoWA doesn't require environment variables, but if you need to add them:

1. Go to Project Settings → Environment Variables
2. Add variables for:
   - `VITE_API_URL` (if adding backend)
   - `VITE_ANALYTICS_ID` (if adding analytics)
   - Other `VITE_*` prefixed variables

Remember: Vite only exposes variables prefixed with `VITE_`

---

## Monitoring & Analytics

### Enable Vercel Analytics:

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. View metrics:
   - Page views
   - Performance scores
   - User geography
   - Device types

### Performance Monitoring:

- **Web Vitals**: LCP, FID, CLS automatically tracked
- **Real User Monitoring**: Actual user experiences
- **Error Tracking**: Built-in error logging

---

## Cost

**Hobby Plan (Free)**:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ HTTPS included
- ✅ Preview deployments
- ✅ 1 concurrent build

**Pro Plan ($20/month)**:
- Everything in Hobby
- More bandwidth
- Faster builds
- Priority support
- Advanced analytics

For RozmoWA: **Hobby plan is sufficient**

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Guide**: https://vitejs.dev/guide/
- **Support**: https://vercel.com/support
- **Status**: https://vercel-status.com/

---

## Summary

✅ **Configuration Complete**  
✅ **Ready to Deploy**  
✅ **Zero Breaking Changes**  

RozmoWA is now configured for seamless Vercel deployment while maintaining compatibility with GitHub Pages and Docker deployments.

---

**Choose your deployment method and enjoy lightning-fast global hosting! 🚀**
