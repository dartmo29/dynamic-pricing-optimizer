# Deployment Guide for Dynamic Pricing Optimizer

This document provides instructions for properly deploying the Dynamic Pricing Optimizer application to Replit.

## Prerequisites

- Node.js (>= 18.x)
- NPM (>= 9.x)
- Replit account for deployment

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/dartmo29/dynamic-pricing-optimizer.git
cd dynamic-pricing-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser to view the app.

## Building for Production

Before deploying, it's important to build the application for production:

```bash
npm run build
```

This will create a `dist` directory with optimized files for production. You can preview the production build locally:

```bash
npm run preview
```

## Deploying to Replit

### Method 1: Using Replit Git Import

1. In Replit, create a new Repl and select "Import from GitHub"
2. Enter the repository URL: `https://github.com/dartmo29/dynamic-pricing-optimizer.git`
3. Choose "Node.js" as the language
4. Wait for the import to complete
5. Once imported, run the following commands in the Replit shell:

```bash
npm install
npm run build
```

6. The application should now be deployed and visible in the Replit webview. Click "Run" to start the server.

### Method 2: Using Replit Deployments

1. Follow steps 1-5 from Method 1
2. In Replit, click on the "Deployments" tab
3. Click "Deploy"
4. Wait for the deployment process to complete
5. Your application will now be available at the provided deployment URL

## Troubleshooting Deployment Issues

If you experience issues with deployment, check the following:

### 1. Build Issues

If the application isn't displaying correctly or is showing a blank page:

- Check that the build completed successfully
- Verify the `.replit` file has the correct configuration
- Ensure the `vite.config.js` has the proper base path

Run the following command in the Replit shell to see if there are build errors:

```bash
NODE_ENV=production npm run build
```

### 2. Path Issues

If the application builds but assets aren't loading:

- Check the browser console for 404 errors
- Verify that the base path in `vite.config.js` matches the deployment path
- Ensure that all file references use relative paths or are processed by Vite

### 3. Component Loading Issues

If some components don't appear:

- Check for React errors in the browser console
- Verify that all component imports use the correct paths
- Consider adding an error boundary to catch component errors

### 4. CSS Issues

If the styling isn't applied correctly:

- Verify that CSS imports are working in the bundled application
- Check if the CSS-in-JS is properly configured
- Ensure Tailwind is properly set up with the correct purge configuration

## Manual Fixes for Replit

If the application still isn't working properly after deployment, you can manually ensure the correct build output is being served by running these commands in the Replit shell:

```bash
# Make sure we're in production mode
export NODE_ENV=production

# Clean install dependencies
rm -rf node_modules
npm install

# Clean build
rm -rf dist
npm run build

# Verify the build output
ls -la dist

# Run the production server
npm run preview -- --host 0.0.0.0 --port 5173
```

## Configuring Continuous Deployment

To set up continuous deployment from GitHub to Replit:

1. Connect your Replit account to GitHub
2. Enable GitHub integration for your Repl
3. Configure automatic deployments on push to the main branch
4. Set up the proper build command in the `.replit` file
5. Test the workflow by pushing a small change to GitHub

## Important Files for Deployment

These files are critical for proper deployment:

- **package.json**: Contains build and preview scripts
- **vite.config.js**: Configures the base path and build options
- **.replit**: Configures how Replit builds and runs the app
- **index.html**: The entry point HTML file
- **src/index.jsx**: The entry point JavaScript file

## Potential Issues and Solutions

### Issue: Blank Screen After Deployment

**Solution**: Make sure the correct JavaScript file is being loaded. Check the browser console for errors. Ensure the build process completed successfully.

### Issue: CSS Styles Not Applied

**Solution**: Verify that the CSS is being imported and processed correctly. Make sure the path to the CSS file is correct.

### Issue: 404 Errors for Assets

**Solution**: Check that the base path in `vite.config.js` is set correctly. Make sure all assets use relative paths.

### Issue: Replit Shows Old Version

**Solution**: Try clearing the Replit cache by running `refresh` in the shell. Make sure the build command in `.replit` is correct.
