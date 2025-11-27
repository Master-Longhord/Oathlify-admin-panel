# Oathlify Admin Panel - VPS Deployment Guide

This guide walks you through deploying the Oathlify Admin Panel to your VPS and configuring the subdomain `admin.oathlify.com`.

## Prerequisites

- A VPS with Ubuntu/Debian (or similar Linux distribution)
- SSH access to your VPS
- Domain name (oathlify.com) with DNS access
- Nginx installed on VPS
- Node.js and npm installed locally (for building)

## Step 1: DNS Configuration

Configure your DNS to point the subdomain to your VPS:

1. Log in to your domain registrar or DNS provider
2. Add an A record:
   - **Name/Host**: `admin`
   - **Type**: `A`
   - **Value**: Your VPS IP address
   - **TTL**: 3600 (or default)

Wait for DNS propagation (can take up to 24-48 hours, but usually 15-30 minutes).

Verify DNS propagation:
```bash
nslookup admin.oathlify.com
# or
dig admin.oathlify.com
```

## Step 2: VPS Preparation

SSH into your VPS and prepare the environment:

```bash
# Connect to your VPS
ssh your-user@your-vps-ip

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Nginx (if not already installed)
sudo apt install nginx -y

# Install Certbot for SSL certificates
sudo apt install certbot python3-certbot-nginx -y

# Create directory for the admin panel
sudo mkdir -p /var/www/oathlify-admin
sudo chown -R $USER:$USER /var/www/oathlify-admin
```

## Step 3: Configure Firewall

```bash
# Allow HTTP and HTTPS traffic
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## Step 4: Deploy Using the Script (Recommended)

1. Edit the `deploy.sh` file in your local project:
   ```bash
   # Open deploy.sh and update these variables:
   VPS_USER="your-vps-username"
   VPS_HOST="your-vps-ip-address"
   ```

2. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```

3. Run the deployment:
   ```bash
   ./deploy.sh
   ```

## Step 5: Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the project locally:
   ```bash
   npm install
   npm run build
   ```

2. Create a tar archive:
   ```bash
   tar -czf admin-panel.tar.gz -C dist .
   ```

3. Upload to VPS:
   ```bash
   scp admin-panel.tar.gz your-user@your-vps-ip:~/
   ```

4. Extract on VPS:
   ```bash
   ssh your-user@your-vps-ip
   sudo tar -xzf admin-panel.tar.gz -C /var/www/oathlify-admin
   sudo chown -R www-data:www-data /var/www/oathlify-admin
   rm admin-panel.tar.gz
   ```

## Step 6: Configure Nginx on VPS

1. Copy the nginx configuration to your VPS:
   ```bash
   # From your local machine
   scp vps-nginx.conf your-user@your-vps-ip:~/admin.oathlify.com.conf
   ```

2. On the VPS, move it to the correct location:
   ```bash
   ssh your-user@your-vps-ip
   sudo mv ~/admin.oathlify.com.conf /etc/nginx/sites-available/admin.oathlify.com
   ```

3. Create a symbolic link to enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/admin.oathlify.com /etc/nginx/sites-enabled/
   ```

4. Test nginx configuration:
   ```bash
   sudo nginx -t
   ```

5. If the test passes, reload nginx:
   ```bash
   sudo systemctl reload nginx
   ```

## Step 7: Set Up SSL Certificate

Use Certbot to obtain a free SSL certificate from Let's Encrypt:

```bash
# On your VPS
sudo certbot --nginx -d admin.oathlify.com
```

Follow the prompts:
- Enter your email address
- Agree to the terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will automatically:
- Obtain the SSL certificate
- Update your nginx configuration
- Set up automatic renewal

Test automatic renewal:
```bash
sudo certbot renew --dry-run
```

## Step 8: Verify Deployment

1. Visit `https://admin.oathlify.com` in your browser
2. Check that the site loads correctly
3. Verify SSL certificate is active (look for the padlock icon)

## Troubleshooting

### Site not loading

1. Check nginx status:
   ```bash
   sudo systemctl status nginx
   ```

2. Check nginx error logs:
   ```bash
   sudo tail -f /var/log/nginx/admin.oathlify.com.error.log
   ```

3. Verify files are in the correct location:
   ```bash
   ls -la /var/www/oathlify-admin
   ```

### DNS not resolving

1. Check DNS propagation:
   ```bash
   nslookup admin.oathlify.com
   ```

2. Try clearing your local DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### SSL Certificate issues

1. Check certificate status:
   ```bash
   sudo certbot certificates
   ```

2. Renew certificate manually:
   ```bash
   sudo certbot renew
   ```

### Permission issues

Fix ownership and permissions:
```bash
sudo chown -R www-data:www-data /var/www/oathlify-admin
sudo chmod -R 755 /var/www/oathlify-admin
```

## Updating the Application

To deploy updates:

1. **Using the script**:
   ```bash
   ./deploy.sh
   ```

2. **Manual update**:
   ```bash
   # Build locally
   npm run build
   
   # Create archive
   tar -czf admin-panel.tar.gz -C dist .
   
   # Upload and extract
   scp admin-panel.tar.gz your-user@your-vps-ip:~/
   ssh your-user@your-vps-ip "sudo tar -xzf admin-panel.tar.gz -C /var/www/oathlify-admin && sudo chown -R www-data:www-data /var/www/oathlify-admin && rm admin-panel.tar.gz"
   ```

3. Clear browser cache or force refresh (Ctrl+Shift+R / Cmd+Shift+R)

## Monitoring

### Check Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/admin.oathlify.com.access.log

# Error logs
sudo tail -f /var/log/nginx/admin.oathlify.com.error.log
```

### Monitor Disk Space

```bash
df -h
```

### Check Nginx Status

```bash
sudo systemctl status nginx
```

## Security Best Practices

1. **Keep your VPS updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Enable automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades -y
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

3. **Set up fail2ban** (optional but recommended):
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

4. **Use SSH keys** instead of passwords for SSH access

5. **Change default SSH port** (optional):
   - Edit `/etc/ssh/sshd_config`
   - Change `Port 22` to another port
   - Remember to update firewall rules

## Additional Configuration

### API Proxy (if needed)

If your admin panel needs to communicate with a backend API, uncomment the API proxy section in the nginx configuration:

```nginx
location /api {
    proxy_pass http://localhost:3000;  # Change to your API server
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Then reload nginx:
```bash
sudo systemctl reload nginx
```

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review nginx error logs
3. Verify DNS configuration
4. Ensure all files are properly uploaded

## Summary

After completing these steps, your Oathlify Admin Panel will be:
- ✅ Deployed to `/var/www/oathlify-admin` on your VPS
- ✅ Accessible at `https://admin.oathlify.com`
- ✅ Secured with SSL certificate
- ✅ Automatically redirecting HTTP to HTTPS
- ✅ Optimized with caching and compression
