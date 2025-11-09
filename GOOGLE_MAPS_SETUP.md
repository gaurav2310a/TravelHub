# Google Maps API Setup Guide

## Overview
The Nearby Search feature uses Google Maps JavaScript API and Places API to help users discover places around them in real-time.

## Getting Your API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project name

### Step 2: Enable Required APIs
Enable these APIs in your project:
- **Maps JavaScript API** - For displaying the map
- **Places API** - For searching nearby places

To enable:
1. Go to "APIs & Services" > "Library"
2. Search for each API
3. Click "Enable"

### Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your API key
4. (Recommended) Click "Restrict Key" and:
   - Set Application restrictions to "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*` for development)
   - Restrict API key to only the APIs you enabled

### Step 4: Add to Your Project
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:** 
- Use `NEXT_PUBLIC_` prefix for client-side environment variables in Next.js
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`

## Features Implemented

### 1. Interactive Map
- Real-time map display using Google Maps
- User location marker (blue circle)
- Place markers with custom icons
- Info windows on marker click

### 2. Nearby Search
- Search by keyword
- Filter by category (restaurants, hotels, cafes, etc.)
- Adjustable search radius (1-20 km)
- Real-time results

### 3. Place Information
- Name and address
- Star ratings
- Opening hours status
- Place types/categories
- Direct navigation link

### 4. Categories Available
- 🌍 All Places
- 🍽️ Restaurants
- 🏨 Hotels
- 🎭 Attractions
- ☕ Cafes
- 🛍️ Shopping Malls
- 🏥 Hospitals
- 💊 Pharmacies
- 💰 ATMs
- ⛽ Gas Stations

## Usage

### Access the Feature
Navigate to: **Nearby > Search Nearby** from the header menu

Or directly: `/nearby/search`

### How to Use
1. **Allow Location Access**: Browser will request your location
2. **Select Category**: Choose from 10+ categories
3. **Adjust Radius**: Use slider to set search distance (1-20 km)
4. **Search**: Enter keywords or click "Search Nearby"
5. **View Results**: See places on map and in list
6. **Get Directions**: Click "Directions" to open Google Maps navigation

## API Pricing

Google Maps offers a free tier:
- **$200 free credit per month**
- Maps JavaScript API: $7 per 1,000 loads
- Places API: $17 per 1,000 requests

For typical usage, the free tier should be sufficient.

## Troubleshooting

### Map Not Loading
- Check if API key is correctly set in `.env.local`
- Verify Maps JavaScript API is enabled
- Check browser console for errors
- Ensure API key restrictions allow your domain

### No Search Results
- Check if Places API is enabled
- Verify location permissions are granted
- Try increasing search radius
- Check if you're in a populated area

### Location Not Working
- Ensure HTTPS (required for geolocation)
- Grant location permissions in browser
- Falls back to New Delhi if denied

## Security Best Practices

1. **Restrict Your API Key**
   - Add HTTP referrer restrictions
   - Limit to specific APIs
   - Monitor usage in Google Cloud Console

2. **Set Usage Quotas**
   - Set daily quotas to prevent unexpected charges
   - Enable billing alerts

3. **Never Expose in Client Code**
   - Use environment variables
   - Don't hardcode API keys
   - Keep `.env.local` in `.gitignore`

## Development vs Production

### Development (.env.local)
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_dev_api_key
```

### Production (Deployment Platform)
Add the environment variable in your hosting platform:
- **Vercel**: Project Settings > Environment Variables
- **Netlify**: Site Settings > Build & Deploy > Environment
- **AWS/Azure**: Use their secret management services

## Additional Resources

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

## Support

If you encounter issues:
1. Check Google Cloud Console for API errors
2. Review browser console for JavaScript errors
3. Verify API key has correct permissions
4. Check API usage quotas

---

**Note**: The feature will work without an API key in development but will show a watermark and limited functionality. For production, a valid API key is required.
