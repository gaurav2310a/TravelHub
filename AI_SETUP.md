# AI Features Setup Guide

This travel application includes powerful AI features powered by OpenAI's GPT models.

## 🤖 AI Features Included

1. **AI Travel Assistant** - Floating chatbot that answers travel questions
2. **AI Destination Suggestions** - Personalized destination recommendations based on preferences
3. **AI Itinerary Generator** - Automatic day-by-day trip planning
4. **AI Travel Tips** - Smart tips for destinations based on season and travel style
5. **AI Budget Optimizer** - Budget breakdown and money-saving suggestions
6. **AI Activity Suggestions** - Personalized activity recommendations
7. **AI Packing List Generator** - Smart packing lists based on destination and activities

## 🔑 Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you won't be able to see it again!)

### 2. Configure Your Environment

Create a `.env.local` file in the root directory of the project:

```bash
# In the project root (d:\CepiaLabs Internship\Next.js\travel\)
# Create .env.local file with the following content:

OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 3. Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## 📍 Where to Find AI Features

### Homepage
- **AI Destination Suggestions** button below the search bar
- **AI Travel Assistant** floating button in bottom-right corner

### Trip Creation Page (`/trips/create`)
- **AI Budget Optimizer** - Analyzes and optimizes your trip budget
- **AI Travel Tips** - Get personalized tips for your destination
- **AI Itinerary Generator** - Generate complete day-by-day itinerary

### Explore Page
- AI-powered search suggestions
- Smart destination recommendations

## 💡 Usage Tips

### AI Travel Assistant
- Click the sparkle icon in the bottom-right corner
- Ask questions like:
  - "What are the best budget destinations in Asia?"
  - "How do I plan a 7-day trip to Europe?"
  - "What should I pack for a beach vacation?"
  - "Give me tips for solo travel safety"

### AI Destination Suggestions
1. Click "Get AI Suggestions" button
2. Fill in your preferences:
   - Budget range
   - Trip duration
   - Interests (select multiple)
   - Travel style
   - Preferred season
3. Click "Get AI Recommendations"
4. Browse personalized destination suggestions
5. Click "Explore" on any destination to search for it

### AI Itinerary Generator
1. Enter your destination in the trip form
2. In the AI Itinerary Generator section:
   - Enter trip duration (days)
   - Add your interests (comma-separated)
   - Select budget level
3. Click "Generate AI Itinerary"
4. Review the generated day-by-day plan
5. Click "Apply to Trip" to use it in your trip

### AI Budget Optimizer
1. Fill in destination, duration, and current budget
2. Click "Optimize My Budget"
3. Review:
   - Budget breakdown by category
   - Realistic budget range
   - Money-saving tips
   - Budget-friendly alternatives
   - Best booking strategies
4. Click "Apply Budget" to use the optimized amount

### AI Travel Tips
1. Enter your destination
2. Optionally add travel dates and number of travelers
3. Click "Get AI Travel Tips"
4. Review categorized tips with importance levels:
   - 🔴 High importance (safety, essentials)
   - 🟡 Medium importance (recommendations)
   - 🔵 Low importance (nice-to-know)

## 🔧 API Configuration

### Model Used
- Default: `gpt-3.5-turbo` (cost-effective and fast)
- You can modify the model in `src/lib/ai.js` if you have access to GPT-4

### Rate Limits
- OpenAI has rate limits based on your account tier
- Free tier: Limited requests per minute
- Paid tier: Higher limits

### Cost Considerations
- Each AI request costs a small amount based on tokens used
- Typical costs per request:
  - Travel Assistant: $0.001 - $0.003
  - Destination Suggestions: $0.003 - $0.005
  - Itinerary Generation: $0.004 - $0.008
  - Budget Optimization: $0.003 - $0.006

## 🛠️ Troubleshooting

### "Failed to generate suggestions"
- Check if your API key is correctly set in `.env.local`
- Verify the API key is active on OpenAI platform
- Check if you have available credits

### "Error: 429 Too Many Requests"
- You've hit the rate limit
- Wait a few minutes before trying again
- Consider upgrading your OpenAI account tier

### AI responses are slow
- This is normal - AI generation takes 2-10 seconds
- GPT-3.5-turbo is faster than GPT-4
- Network speed also affects response time

### No AI features showing up
- Make sure you've restarted the dev server after adding the API key
- Check browser console for any errors
- Verify the `.env.local` file is in the correct location

## 🔐 Security Best Practices

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Don't share your API key** - Keep it private
3. **Rotate keys regularly** - Generate new keys periodically
4. **Monitor usage** - Check your OpenAI dashboard for usage
5. **Set spending limits** - Configure limits in OpenAI dashboard

## 📊 Monitoring Usage

1. Go to [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. Monitor your API usage and costs
3. Set up billing alerts
4. Review usage patterns

## 🚀 Advanced Configuration

### Customize AI Behavior

Edit `src/lib/ai.js` to customize:
- Temperature (creativity level): 0.0 - 1.0
- Max tokens (response length)
- Model selection
- System prompts

### Example: Make AI more creative
```javascript
temperature: 0.8  // Higher = more creative, Lower = more focused
```

### Example: Longer responses
```javascript
max_tokens: 2000  // Increase for longer responses
```

## 📚 API Endpoints

All AI features are accessible via these API routes:

- `/api/ai/suggestions` - Destination and search suggestions
- `/api/ai/itinerary` - Itinerary generation
- `/api/ai/tips` - Travel tips
- `/api/ai/budget` - Budget optimization
- `/api/ai/assistant` - Travel assistant chat
- `/api/ai/activities` - Activity suggestions
- `/api/ai/packing` - Packing list generation

## 🎯 Feature Availability

| Feature | Location | Status |
|---------|----------|--------|
| AI Travel Assistant | All pages (floating button) | ✅ Active |
| Destination Suggestions | Homepage | ✅ Active |
| Itinerary Generator | Trip Creation | ✅ Active |
| Budget Optimizer | Trip Creation | ✅ Active |
| Travel Tips | Trip Creation | ✅ Active |
| Smart Search | Explore Page | ✅ Active |

## 💬 Support

If you encounter any issues with AI features:
1. Check this guide first
2. Review the troubleshooting section
3. Check OpenAI status page
4. Verify your API key and credits

## 🔄 Updates

The AI features are continuously being improved. Check for updates regularly to get the latest enhancements and bug fixes.

---

**Note**: AI-generated content should be reviewed and verified. While our AI provides helpful suggestions, always use your judgment and verify important information from official sources.
