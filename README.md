# <div align="center">Kaiketsu</div>

### Easy to use, Spotify playlist to YouTube playlist converter


[![240906-01h40m20s-screenshot.png](https://i.postimg.cc/3Nk9qCzp/240906-01h40m20s-screenshot.png)](https://kaiketsu.online)

<div align="center">From House of Aoukura</div>

## Tech Stack
- Next.js 14
- Auth.js
- Spotify and Youtube  Data API
- Posthog
- Shadcn UI

## CI/CD and Deployment
- Version control service: Github
- CI-CD: AWS CodePipeline and AWS CodeDeploy
- Networking: AWS VPC, SG
- Compute: EC2
- Scaling: Horizontal scaling with EC2 ASG and ALB
- DNS: Route 53
- TLS/SSL certificate: AWS ACM

## Testing instructions (For Linux)

**Step 1:** Install node.js
```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Reload bash
source ~/.bashrc

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

**Step 2** Install pnpm
```bash 
# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh - 

# Reload bashrc
source ~/.bashrc
```

**Step 3:** Copy the repository code in your device
```bash
git clone git@github.com:sarthakroy107/Kaiketsu.git
```

**Step 4:** Setup environment variables

```env

# To use Google provider of Auth.js
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Needed for production environments
AUTH_SECRET=
AUTH_TRUST_HOST= #true


NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=

NEXT_PUBLIC_ENV= #development
```
>[!Info]
> Google developer console: [console](console.cloud.google.com/apis/credentials)
> Spotify developer conseole: [console](https://developer.spotify.com/)

**Step 5:** Start the development server
```bash
# Install dependencies
pnpm i

# Start server
pnpm dev
```