#!/bin/bash

# Oathlify Admin Panel Deployment Script
# This script builds and deploys the admin panel to your VPS

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VPS_USER="root"
VPS_HOST="31.97.125.96"
VPS_PATH="/var/www/oathlify-admin"
BUILD_DIR="dist"

echo -e "${GREEN}Starting Oathlify Admin Panel deployment...${NC}"

# Check if VPS configuration is set
if [ "$VPS_USER" = "your-vps-user" ] || [ "$VPS_HOST" = "your-vps-ip-or-domain" ]; then
    echo -e "${RED}Error: Please configure VPS_USER and VPS_HOST in the script${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Step 2: Build the application
echo -e "${YELLOW}Building the application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Error: Build directory not found${NC}"
    exit 1
fi

# Step 3: Create deployment archive
echo -e "${YELLOW}Creating deployment archive...${NC}"
tar -czf admin-panel.tar.gz -C $BUILD_DIR .

# Step 4: Create VPS directory if it doesn't exist
echo -e "${YELLOW}Preparing VPS directory...${NC}"
ssh $VPS_USER@$VPS_HOST "sudo mkdir -p $VPS_PATH && sudo chown -R $VPS_USER:$VPS_USER $VPS_PATH"

# Step 5: Upload the build
echo -e "${YELLOW}Uploading build to VPS...${NC}"
scp admin-panel.tar.gz $VPS_USER@$VPS_HOST:~/

# Step 6: Extract on VPS
echo -e "${YELLOW}Extracting files on VPS...${NC}"
ssh $VPS_USER@$VPS_HOST << 'EOF'
    cd ~/
    sudo tar -xzf admin-panel.tar.gz -C /var/www/oathlify-admin
    rm admin-panel.tar.gz
    sudo chown -R www-data:www-data /var/www/oathlify-admin
    echo "Files extracted successfully"
EOF

# Step 7: Clean up local archive
rm admin-panel.tar.gz

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Don't forget to:${NC}"
echo "1. Configure nginx on your VPS"
echo "2. Set up SSL certificate with Let's Encrypt"
echo "3. Restart nginx: sudo systemctl restart nginx"
echo -e "${GREEN}Admin panel will be available at: https://admin.oathlify.com${NC}"
