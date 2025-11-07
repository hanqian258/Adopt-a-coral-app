#!/bin/bash

# Script to push Adopt-a-Coral app to GitHub
# Replace YOUR_USERNAME with your GitHub username
# Replace REPO_NAME with your desired repository name (e.g., adopt-a-coral-app)

GITHUB_USERNAME="YOUR_USERNAME"
REPO_NAME="adopt-a-coral-app"

echo "🚀 Setting up GitHub repository..."
echo ""
echo "First, create a new repository on GitHub:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Make it PUBLIC"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

# Add remote
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to GitHub
echo ""
echo "📤 Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your repository is now live at:"
echo "https://github.com/$GITHUB_USERNAME/$REPO_NAME"

