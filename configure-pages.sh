#!/bin/bash

# GitHub Pages Configuration Script
# This script helps configure GitHub Pages using the GitHub CLI or API

echo "🔧 GitHub Pages Configuration Helper"
echo "======================================"

REPO_OWNER="Backerjr"
REPO_NAME="WAapp"
BRANCH="gh-pages"
PATH_="/"

echo "Repository: $REPO_OWNER/$REPO_NAME"
echo "Target Branch: $BRANCH"
echo "Path: $PATH_"
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    
    # Try to configure Pages using GitHub CLI
    echo "🚀 Configuring GitHub Pages..."
    
    if gh api repos/$REPO_OWNER/$REPO_NAME/pages --method POST --field source[branch]=$BRANCH --field source[path]=$PATH_ 2>/dev/null; then
        echo "✅ Pages configured successfully!"
    else
        echo "⚠️  Pages might already be configured. Trying to update..."
        if gh api repos/$REPO_OWNER/$REPO_NAME/pages --method PUT --field source[branch]=$BRANCH --field source[path]=$PATH_ 2>/dev/null; then
            echo "✅ Pages updated successfully!"
        else
            echo "ℹ️  Pages configuration might already be correct."
        fi
    fi
    
    # Get current Pages info
    echo ""
    echo "📊 Current Pages Configuration:"
    gh api repos/$REPO_OWNER/$REPO_NAME/pages --jq '.source, .html_url' 2>/dev/null || echo "Could not retrieve Pages info"
    
else
    echo "❌ GitHub CLI not found"
    echo ""
    echo "To fix this manually:"
    echo "1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/pages"
    echo "2. Set Source to 'Deploy from a branch'"
    echo "3. Set Branch to '$BRANCH'"
    echo "4. Set Folder to '$PATH_'"
    echo "5. Click Save"
fi

echo ""
echo "🌐 Your app should be available at: https://$REPO_OWNER.github.io/$REPO_NAME/"