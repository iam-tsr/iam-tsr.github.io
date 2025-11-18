# Deployment Guide

This guide explains how to deploy your Vite-powered personal website to GitHub Pages with clean URLs.

## Setup GitHub Pages

### Option 1: Automated Deployment with GitHub Actions (Recommended)

1. **Enable GitHub Actions for Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Add Vite setup with clean URLs"
   git push
   ```

3. **GitHub Actions will automatically:**
   - Install dependencies
   - Build your site
   - Deploy to GitHub Pages

4. **Access your site:**
   - Your site will be available at `https://iam-tsr.github.io/`
   - Clean URLs will work: `/about`, `/code`, `/fedora-guide`

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder:**
   You can use tools like `gh-pages` or manually push the `dist` folder to a `gh-pages` branch.

   Using gh-pages:
   ```bash
   npm install -D gh-pages
   ```

   Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

   Then run:
   ```bash
   npm run deploy
   ```

## How Clean URLs Work

### Development (npm run dev)
- Vite's dev server handles all routes and serves `index.html`
- The client-side router (`js/router.js`) handles navigation
- URLs like `/about`, `/code` work directly

### Production (GitHub Pages)
1. **404.html Redirect:**
   - When a user visits `/code` directly, GitHub Pages serves `404.html`
   - The `404.html` saves the path and redirects to `index.html`
   - `index.html` reads the saved path and restores the URL
   - The router loads the correct page

2. **Navigation:**
   - All navigation uses the `data-link` attribute
   - Links are intercepted by the router
   - Pages load without full page reloads (SPA behavior)

## URL Structure

Your site supports these clean URLs:

- `/` or `/about` → Home/About page
- `/code` → Projects page
- `/fedora-guide` → Fedora setup guide page
- Any other URL → 404 page

## Verifying Deployment

After deployment, test these scenarios:

1. ✅ Navigate to `https://iam-tsr.github.io/` - should show about page
2. ✅ Click navigation links - should work without page reload
3. ✅ Directly visit `https://iam-tsr.github.io/code` - should load code page
4. ✅ Refresh on `/code` - should stay on code page
5. ✅ Visit non-existent page like `/random` - should show 404

## Troubleshooting

### Links not working
- Make sure all internal links have the `data-link` attribute
- Check that `href` uses clean paths like `/about` not `/about.html`

### 404 on direct URL access
- Verify `404.html` is in the `dist` folder
- Check GitHub Pages settings are correct
- Ensure the 404 redirect script is in `index.html`

### Assets not loading
- Check that asset paths in code use absolute paths starting with `/`
- Verify the `public` directory structure if you add one

### Build fails
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in your JavaScript files
- Review the build output for specific error messages

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to your project root with your domain:
   ```
   yourdomain.com
   ```

2. Update `vite.config.js` to set the correct base:
   ```javascript
   export default defineConfig({
     base: '/', // Keep this for custom domain
     // ... rest of config
   });
   ```

3. Configure DNS settings with your domain provider
4. Enable HTTPS in GitHub Pages settings

## Development vs Production

| Feature | Development | Production |
|---------|------------|------------|
| Server | Vite dev server | GitHub Pages static |
| Hot Reload | ✅ Yes | ❌ No |
| Build Time | Instant | ~1-2 min |
| Route Handling | Direct | Via 404 redirect |
| Asset Optimization | ❌ No | ✅ Yes (minified) |

## Next Steps

- Customize your content in the `content/` folder
- Update styles in `css/styles.css`
- Add new routes in `js/main.js`
- Create new page components in `js/pages/`
