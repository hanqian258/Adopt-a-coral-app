# Deployment Guide

## Vercel Deployment

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in with your GitHub account
3. Click "Import Git Repository"
4. Select `hanqian258/Adopt-a-coral-app`
5. Vercel will automatically:
   - Detect it's a Vite project
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Configure routing for React Router
6. Click "Deploy"
7. Your app will be live in ~2 minutes!

### Method 2: Via Vercel CLI

```bash
# Login to Vercel (opens browser)
vercel login

# Deploy
cd "/Users/kellychang/Adopt-a-coral app"
vercel --yes

# For production deployment
vercel --prod
```

## Deployment Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

## Environment Variables

Currently, no environment variables are needed. If you add features like:
- Payment processing (Stripe)
- Email services
- Database connections

You'll need to add those as environment variables in Vercel dashboard.

## Post-Deployment

After deployment, you'll get a URL like:
- `https://adopt-a-coral-app.vercel.app`

You can:
- Add a custom domain in Vercel settings
- Set up automatic deployments from GitHub
- Configure preview deployments for pull requests

## Troubleshooting

If you encounter issues:
1. Check build logs in Vercel dashboard
2. Ensure Node.js version is 18+ (set in Vercel project settings)
3. Verify all dependencies are in `package.json`

