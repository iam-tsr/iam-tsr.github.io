#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Deploying to GitHub Pages...${NC}\n"

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
fi

# Add all files
echo -e "${YELLOW}Adding files...${NC}"
git add .

# Commit changes
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
fi

git commit -m "$commit_msg"

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo -e "${YELLOW}Please enter your GitHub repository URL:${NC}"
    echo -e "${YELLOW}(Format: https://github.com/username/username.github.io.git)${NC}"
    read -p "URL: " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git branch -M main
git push -u origin main

echo -e "\n${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}Your site will be available at:${NC}"
echo -e "${GREEN}https://iam-tsr.github.io${NC}"
echo -e "\n${YELLOW}Note: It may take a few minutes for changes to appear.${NC}"
