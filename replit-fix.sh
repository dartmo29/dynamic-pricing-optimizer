#!/bin/bash

echo "Running Replit environment fix script..."

# Clean up any existing builds
echo "Cleaning previous builds..."
rm -rf dist
rm -rf node_modules

# Install dependencies fresh
echo "Installing dependencies..."
npm install

# Make sure Vite is installed
echo "Ensuring Vite is installed..."
npm install vite --save-dev

# Execute a fresh build
echo "Building the project..."
npm run build

echo "Fix complete! Try running the app now with 'npm run dev'"
echo "Note: The application should be running on port 5173"
