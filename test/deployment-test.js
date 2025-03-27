// Deployment Test Script
// This script simulates loading the application in a similar way to the deployment environment

// 1. Check if all required files exist
const fs = require('fs');
const path = require('path');

console.log('Starting deployment test...');

// Check key files
const keyFiles = [
  'index.html',
  'src/index.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/components/ui/layout.jsx',
  'src/components/ui/header.jsx',
  'src/components/ui/footer.jsx',
  'src/components/ui/theme-switcher.jsx',
  'src/components/ui/card.jsx',
  'src/components/ui/button.jsx',
  'src/components/ui/wizard-step.jsx',
  'src/components/setup/industry-selection.jsx'
];

console.log('Checking for required files:');
let missingFiles = false;

keyFiles.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✓' : '✗'} ${file}`);
  
  if (!exists) {
    missingFiles = true;
  }
});

if (missingFiles) {
  console.error('Some required files are missing. This may cause deployment issues.');
} else {
  console.log('All required files found.');
}

// 2. Check package.json scripts
const packageJson = require('../package.json');
console.log('\nChecking package.json scripts:');
console.log('build script:', packageJson.scripts.build || 'Not found');
console.log('preview script:', packageJson.scripts.preview || 'Not found');

// 3. Check vite.config.js
const viteConfigPath = path.resolve(__dirname, '..', 'vite.config.js');
if (fs.existsSync(viteConfigPath)) {
  console.log('\nvite.config.js found. Checking content...');
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  // Check for base path
  const basePathMatch = viteConfig.match(/base:\s*['"]([^'"]+)['"]/);
  if (basePathMatch) {
    console.log(`Base path is set to: ${basePathMatch[1]}`);
  } else {
    console.log('No base path found in vite.config.js');
  }
  
  // Check for resolve aliases
  const hasAliases = viteConfig.includes('resolve:') && viteConfig.includes('alias:');
  console.log(`Resolve aliases: ${hasAliases ? 'Found' : 'Not found'}`);
} else {
  console.log('vite.config.js not found');
}

// 4. Check if index.html references are correct
const indexHtmlPath = path.resolve(__dirname, '..', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  console.log('\nChecking index.html references...');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Check CSS reference
  const cssRefMatch = indexHtml.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/g);
  if (cssRefMatch) {
    console.log('CSS references:');
    cssRefMatch.forEach(ref => {
      console.log(`- ${ref}`);
    });
  }
  
  // Check script reference
  const scriptRefMatch = indexHtml.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g);
  if (scriptRefMatch) {
    console.log('Script references:');
    scriptRefMatch.forEach(ref => {
      console.log(`- ${ref}`);
    });
  }
}

// 5. Check .replit configuration
const replitConfigPath = path.resolve(__dirname, '..', '.replit');
if (fs.existsSync(replitConfigPath)) {
  console.log('\nChecking .replit configuration...');
  const replitConfig = fs.readFileSync(replitConfigPath, 'utf8');
  
  // Check deployment configuration
  if (replitConfig.includes('[deployment]')) {
    console.log('Deployment configuration found:');
    
    const buildCommand = replitConfig.match(/build\s*=\s*\[\s*"sh"\s*,\s*"-c"\s*,\s*"([^"]+)"\s*\]/);
    if (buildCommand) {
      console.log(`- Build command: ${buildCommand[1]}`);
    }
    
    const runCommand = replitConfig.match(/run\s*=\s*\[\s*"sh"\s*,\s*"-c"\s*,\s*"([^"]+)"\s*\]/);
    if (runCommand) {
      console.log(`- Run command: ${runCommand[1]}`);
    }
  } else {
    console.log('No deployment configuration found in .replit');
  }
}

console.log('\nTest complete. Check the output above for potential issues with deployment.');
