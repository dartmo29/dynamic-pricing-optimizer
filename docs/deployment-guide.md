# Deployment Guide for Dynamic Pricing Optimizer

This guide provides step-by-step instructions for deploying the Dynamic Pricing Optimizer to various environments, from local testing to production.

## Prerequisites

Before deploying, ensure you have the following:

- Node.js (>= 18.x)
- npm (>= 9.x)
- Git
- Access to your hosting platform of choice (Netlify, Vercel, GitHub Pages, etc.)

## Local Deployment for Testing

### 1. Clone the Repository

```bash
git clone https://github.com/dartmo29/dynamic-pricing-optimizer.git
cd dynamic-pricing-optimizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your terminal).

### 4. Build for Production

```bash
npm run build
```

This creates a production build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Deployment to Netlify

### 1. Create a Netlify Account

If you don't have one already, sign up at [netlify.com](https://www.netlify.com/).

### 2. Deploy using the Netlify CLI

Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

Login to your Netlify account:

```bash
netlify login
```

Deploy the site:

```bash
npm run build
netlify deploy --prod
```

Follow the prompts to complete the deployment.

### 3. Alternatively, Connect to GitHub Repository

1. Log in to Netlify
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Deployment to Vercel

### 1. Create a Vercel Account

If you don't have one already, sign up at [vercel.com](https://vercel.com/).

### 2. Deploy using the Vercel CLI

Install the Vercel CLI:

```bash
npm install -g vercel
```

Login to your Vercel account:

```bash
vercel login
```

Deploy the site:

```bash
vercel
```

Follow the prompts to complete the deployment.

### 3. Alternatively, Connect to GitHub Repository

1. Log in to Vercel
2. Click "Import Project"
3. Choose "Import Git Repository" and select your repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

## Deployment to GitHub Pages

### 1. Add GitHub Pages Configuration

1. Update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/dynamic-pricing-optimizer/', // Use your repository name
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

2. Create a deployment workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: dist
```

### 2. Push Changes and Deploy

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push
```

GitHub Actions will automatically build and deploy your site.

## Post-Deployment Tasks

After deploying to your chosen platform, perform these checks:

### 1. Verify Application Functionality

- Test the complete workflow from cost analysis to recommendations
- Verify that local storage works correctly
- Check that all visualizations render properly

### 2. Cross-browser Testing

Test the application in multiple browsers:
- Chrome
- Firefox
- Safari
- Edge

### 3. Mobile Responsiveness

Test the application on different screen sizes:
- Desktop
- Tablet
- Mobile

### 4. Performance Optimization

If necessary, analyze and improve performance:
- Check loading times
- Optimize large components
- Lazy load components when appropriate

## Troubleshooting

### Issue: Application Not Rendering Correctly

1. Check browser console for errors
2. Verify that all dependencies are installed correctly
3. Test with the GradualApp to identify which components are causing issues

### Issue: Local Storage Not Working

1. Check browser settings to ensure cookies and local storage are enabled
2. Verify that the storage code is working by using browser dev tools
3. Test in incognito/private browsing mode

### Issue: Visualization Components Not Rendering

1. Check that data is being passed correctly to the components
2. Verify that the charting library is initialized properly
3. Test with sample data to ensure the components work in isolation

## Security Considerations

- The application uses client-side storage only, so no server-side security is required
- No sensitive customer data is stored persistently
- For production use with real customer data, consider adding authentication

## Continuous Integration/Continuous Deployment

For automated deployments, consider setting up CI/CD:

1. Add unit tests to your repository
2. Configure GitHub Actions for automated testing
3. Set up automatic deployment when tests pass

## Conclusion

The Dynamic Pricing Optimizer is now deployed and ready for use! If you encounter any issues during deployment, please check the troubleshooting section or create an issue in the GitHub repository.
