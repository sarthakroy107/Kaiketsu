#!/bin/bash -xe

# Define log file path
LOG_FILE="/home/ec2-user/output.log"

# Create or clear the log file
: > "$LOG_FILE"

# Fetch and clean environment variables
NEXT_PUBLIC_ENV=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/env --with-decryption --query Parameters[0].Value --output text)
echo "NEXT_PUBLIC_ENV: $NEXT_PUBLIC_ENV" >> $LOG_FILE 2>&1

NEXT_PUBLIC_SPOTIFY_CLIENT_ID=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/spotify-client-id --with-decryption --query Parameters[0].Value --output text)
echo "NEXT_PUBLIC_SPOTIFY_CLIENT_ID: $NEXT_PUBLIC_SPOTIFY_CLIENT_ID" >> $LOG_FILE 2>&1

NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/spotify-client-secret --with-decryption --query Parameters[0].Value --output text)
echo "NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET: $NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET" >> $LOG_FILE 2>&1

NEXT_PUBLIC_GOOGLE_API_KEY=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/google-api-key --with-decryption --query Parameters[0].Value --output text)
echo "NEXT_PUBLIC_GOOGLE_API_KEY: $NEXT_PUBLIC_GOOGLE_API_KEY" >> $LOG_FILE 2>&1

AUTH_GOOGLE_ID=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/google-client-id --with-decryption --query Parameters[0].Value --output text)
echo "AUTH_GOOGLE_ID: $AUTH_GOOGLE_ID" >> $LOG_FILE 2>&1

AUTH_GOOGLE_SECRET=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/google-client-secret --with-decryption --query Parameters[0].Value --output text)
echo "AUTH_GOOGLE_SECRET: $AUTH_GOOGLE_SECRET" >> $LOG_FILE 2>&1

AUTH_SECRET=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/AuthSecret --with-decryption --query Parameters[0].Value --output text)
echo "AUTH_SECRET: $AUTH_SECRET" >> $LOG_FILE 2>&1

AUTH_TRUST_HOST=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/AuthTrustHost --with-decryption --query Parameters[0].Value --output text)
echo "AUTH_TRUST_HOST: $AUTH_TRUST_HOST" >> $LOG_FILE 2>&1

AUTH_URL=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/AuthURL --with-decryption --query Parameters[0].Value --output text)
echo "AUTH_URL: $AUTH_URL" >> $LOG_FILE 2>&1

NEXTAUTH_URL=$(aws ssm get-parameters --region ap-south-1 --names /Kaiketsu/AuthURL --with-decryption --query Parameters[0].Value --output text)
echo "NEXTAUTH_URL: $NEXTAUTH_URL" >> $LOG_FILE 2>&1

# Export environment variables
export NEXT_PUBLIC_ENV
export NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
export NEXT_PUBLIC_GOOGLE_API_KEY
export AUTH_GOOGLE_ID
export AUTH_GOOGLE_SECRET
export AUTH_SECRET
export AUTH_TRUST_HOST
export AUTH_URL
export NEXTAUTH_URL

# Change to the user's home directory and log the working directory
cd /home/ec2-user

# Update system and install packages using yum
yum -y update
yum install git -y
yum install ruby -y
# Install AWS CodeDeploy agent
curl -O https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install

# Make the install script executable
chmod +x ./install

# Run the install script
sudo ./install auto

sudo service codedeploy-agent start

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Source NVM environment variables
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

source ~/.bashrc

# Install Node.js using NVM
nvm install 20

# Install PNPM
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Update PNPM_HOME and PATH
export PNPM_HOME="$HOME/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# Source the updated bash configuration
source ~/.bashrc

# Verify pnpm installation
which pnpm || echo "pnpm not found"

#Clone repository and build project
git clone https://github.com/sarthakroy107/Kaiketsu.git
cd Kaiketsu
pnpm i
pnpm build
pnpm start
