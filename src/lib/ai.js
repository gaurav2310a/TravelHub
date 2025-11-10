import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Generate AI-powered destination suggestions based on user preferences
 */
export async function generateDestinationSuggestions(preferences) {
  try {
    const { budget, duration, interests, travelStyle, season } = preferences;
    
    const prompt = `As a travel expert, suggest 5 unique travel destinations based on these preferences:
- Budget: ${budget || 'flexible'}
- Duration: ${duration || 'any length'}
- Interests: ${interests?.join(', ') || 'general travel'}
- Travel Style: ${travelStyle || 'balanced'}
- Season: ${season || 'any time'}

For each destination, provide:
1. Destination name and country
2. Why it matches their preferences (2-3 sentences)
3. Best time to visit
4. Estimated budget range
5. Top 3 activities

Format as JSON array.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI destination suggestions error:', error);
    return null;
  }
}

/**
 * Generate AI-powered itinerary for a destination
 */
export async function generateItinerary(destination, duration, interests, budget) {
  try {
    const prompt = `Create a detailed ${duration}-day itinerary for ${destination}.
Interests: ${interests?.join(', ') || 'general sightseeing'}
Budget: ${budget || 'moderate'}

For each day, provide:
- Day number and title
- Morning, afternoon, and evening activities
- Estimated costs
- Travel tips
- Restaurant recommendations

Format as JSON with structure: { days: [{ day: number, title: string, activities: [], tips: [], estimatedCost: string }] }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI itinerary generation error:', error);
    return null;
  }
}

/**
 * Generate personalized travel tips for a destination
 */
export async function generateTravelTips(destination, travelDates, travelers) {
  try {
    const prompt = `Provide 8-10 essential travel tips for visiting ${destination} in ${travelDates || 'any season'}.
Traveling with: ${travelers || 'solo/couple'}

Include tips about:
- Local customs and etiquette
- Safety considerations
- Money and budgeting
- Transportation
- Food and dining
- Weather and packing
- Must-see attractions
- Hidden gems

Format as JSON array: [{ category: string, tip: string, importance: 'high'|'medium'|'low' }]`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1200,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI travel tips error:', error);
    return null;
  }
}

/**
 * Optimize budget and provide cost-saving suggestions
 */
export async function optimizeBudget(tripDetails) {
  try {
    const { destination, duration, currentBudget, activities } = tripDetails;
    
    const prompt = `Analyze this trip and provide budget optimization suggestions:
Destination: ${destination}
Duration: ${duration} days
Current Budget: ${currentBudget}
Planned Activities: ${activities?.join(', ') || 'general tourism'}

Provide:
1. Budget breakdown (accommodation, food, transport, activities, misc)
2. Cost-saving tips (5-7 specific suggestions)
3. Alternative options for expensive items
4. Estimated realistic budget range
5. Best booking times and strategies

Format as JSON with structure: { breakdown: {}, savingTips: [], alternatives: [], estimatedRange: { min: number, max: number }, bookingTips: [] }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 1500,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI budget optimization error:', error);
    return null;
  }
}

/**
 * Generate smart search suggestions based on query
 */
export async function generateSearchSuggestions(query, context = {}) {
  try {
    const prompt = `Based on the search query "${query}", suggest 5-8 relevant travel destinations or experiences.
Context: ${JSON.stringify(context)}

Consider:
- Similar destinations
- Alternative experiences
- Seasonal variations
- Budget-friendly alternatives
- Hidden gems

Format as JSON array: [{ name: string, type: string, reason: string, matchScore: number }]`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI search suggestions error:', error);
    return null;
  }
}

/**
 * AI Travel Assistant - Answer travel-related questions
 */
export async function travelAssistant(question, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are a knowledgeable and friendly travel assistant. Help users with:
- Destination recommendations
- Travel planning and itineraries
- Budget advice
- Safety and health tips
- Cultural insights
- Visa and documentation
- Packing suggestions
- Local experiences

Be concise, practical, and enthusiastic. Provide specific, actionable advice.`
      },
      ...conversationHistory,
      { role: 'user', content: question }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI travel assistant error:', error);
    return 'I apologize, but I\'m having trouble processing your request right now. Please try again.';
  }
}

/**
 * Generate activity suggestions for a destination
 */
export async function generateActivitySuggestions(destination, preferences) {
  try {
    const { interests, budget, duration, groupSize } = preferences;
    
    const prompt = `Suggest 10-15 activities and experiences for ${destination}.
Preferences:
- Interests: ${interests?.join(', ') || 'varied'}
- Budget: ${budget || 'moderate'}
- Duration available: ${duration || 'flexible'}
- Group size: ${groupSize || '2-4 people'}

For each activity, provide:
- Name
- Description (1-2 sentences)
- Estimated cost
- Duration
- Best time
- Difficulty level
- Category (adventure, cultural, food, nature, etc.)

Format as JSON array.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI activity suggestions error:', error);
    return null;
  }
}

/**
 * Generate packing list based on destination and trip details
 */
export async function generatePackingList(tripDetails) {
  try {
    const { destination, duration, season, activities } = tripDetails;
    
    const prompt = `Create a comprehensive packing list for:
Destination: ${destination}
Duration: ${duration} days
Season: ${season || 'current season'}
Activities: ${activities?.join(', ') || 'general tourism'}

Categorize items into:
- Essentials (documents, money, etc.)
- Clothing
- Toiletries
- Electronics
- Activity-specific gear
- Optional items

Format as JSON: { categories: [{ name: string, items: [{ item: string, essential: boolean, notes: string }] }] }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 1200,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('AI packing list error:', error);
    return null;
  }
}
