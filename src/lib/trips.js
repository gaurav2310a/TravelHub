// Currency formatting utility
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Categories for filtering and navigation
export const CATEGORIES = [
  { id: 'all', name: 'All Destinations', icon: '🌎' },
  { id: 'domestic', name: 'Domestic', icon: '🇮🇳' },
  { id: 'international', name: 'International', icon: '✈️' },
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'mountain', name: 'Mountain', icon: '⛰️' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️' },
  { id: 'nature', name: 'Nature', icon: '🌿' }
];

// Places data with social features
export const PLACES = [
  {
    id: '1',
    name: 'Goa Beaches',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200',
    type: 'beach',
    rating: 4.7,
    reviews: 2250,
    price: 29999,
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage',
    activities: ['Beach Activities', 'Water Sports', 'Nightlife', 'Heritage Tours'],
    bestTime: 'Nov-Feb',
    duration: 5,
    nearby: ['Beach Shacks', 'Bike Rental', 'Medical Store'],
    category: 'domestic',
    createdBy: {
      id: 'user1',
      name: 'Priya Sharma',
      age: 28,
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      interests: ['Beach Life', 'Photography', 'Meeting New People'],
      languagesSpoken: ['English', 'Hindi']
    },
    tripDates: {
      start: '2025-12-15',
      end: '2025-12-20'
    },
    maxGroupSize: 4,
    currentParticipants: 1,
    meetupPoint: 'Goa International Airport',
    itinerary: [
      { day: 1, activities: ['Airport Pickup', 'Hotel Check-in', 'Beach Welcome Dinner'] },
      { day: 2, activities: ['South Goa Beach Hopping', 'Water Sports', 'Sunset Cruise'] },
      { day: 3, activities: ['Old Goa Heritage Tour', 'Spice Plantation Visit', 'Night Market'] },
      { day: 4, activities: ['North Goa Beaches', 'Water Sports', 'Club Hopping'] },
      { day: 5, activities: ['Free Morning', 'Souvenir Shopping', 'Airport Drop'] }
    ]
  },
  {
    id: '2',
    name: 'Ladakh Adventure',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1590391780607-847bef15a351?w=1200',
    type: 'mountain',
    rating: 4.8,
    reviews: 1850,
    price: 45999,
    description: 'High-altitude adventure in the Himalayas with stunning monasteries',
    activities: ['Monastery Tours', 'Mountain Biking', 'Camping'],
    bestTime: 'Jun-Sep',
    duration: 7,
    nearby: ['Local Markets', 'Medical Facilities', 'Cafes'],
    category: 'domestic',
    createdBy: {
      id: 'user2',
      name: 'Rahul Kapoor',
      age: 31,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      interests: ['Trekking', 'Cultural Exploration', 'Photography'],
      languagesSpoken: ['English', 'Hindi', 'Ladakhi']
    },
    tripDates: {
      start: '2025-07-10',
      end: '2025-07-17'
    },
    maxGroupSize: 6,
    currentParticipants: 2,
    meetupPoint: 'Leh Airport',
    itinerary: [
      { day: 1, activities: ['Airport Pickup', 'Rest & Acclimatization', 'Local Market Visit'] },
      { day: 2, activities: ['Leh Palace', 'Shanti Stupa', 'Leh Market'] },
      { day: 3, activities: ['Pangong Lake Trip', 'Camping'] },
      { day: 4, activities: ['Nubra Valley', 'Camel Safari', 'Camping'] },
      { day: 5, activities: ['Diskit Monastery', 'Sand Dunes'] },
      { day: 6, activities: ['Khardung La Pass', 'Mountain Biking'] },
      { day: 7, activities: ['Local Monastery', 'Cultural Show', 'Departure'] }
    ]
  },
  {
    id: '3',
    name: 'Bali Island Hopping',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
    type: 'beach',
    rating: 4.9,
    reviews: 3200,
    price: 89999,
    description: 'Island hopping adventure with cultural experiences and beach activities',
    activities: ['Surfing', 'Temple Visits', 'Snorkeling', 'Yoga'],
    bestTime: 'Apr-Oct',
    duration: 8,
    nearby: ['Beach Clubs', 'Restaurants', 'Spa Centers'],
    category: 'international',
    createdBy: {
      id: 'user3',
      name: 'Zara Khan',
      age: 26,
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      interests: ['Yoga', 'Beach Life', 'Cultural Exchange'],
      languagesSpoken: ['English', 'Hindi', 'Indonesian Basic']
    },
    tripDates: {
      start: '2025-09-01',
      end: '2025-09-08'
    },
    maxGroupSize: 5,
    currentParticipants: 2,
    meetupPoint: 'Ngurah Rai International Airport, Bali',
    itinerary: [
      { day: 1, activities: ['Airport Pickup', 'Hotel Check-in', 'Uluwatu Temple Sunset'] },
      { day: 2, activities: ['Ubud Art Market', 'Monkey Forest', 'Traditional Dance'] },
      { day: 3, activities: ['Mount Batur Sunrise Trek', 'Hot Springs', 'Spa'] },
      { day: 4, activities: ['Nusa Penida Island Trip', 'Snorkeling'] },
      { day: 5, activities: ['Gili Islands', 'Beach Activities'] },
      { day: 6, activities: ['Surfing Lessons', 'Beach Club'] },
      { day: 7, activities: ['Temple Tour', 'Rice Terraces'] },
      { day: 8, activities: ['Free Morning', 'Shopping', 'Departure'] }
    ]
  }
];

// Core functions
export function getAllPlaces() {
  return PLACES;
}

export function getPlaceById(id) {
  if (!id) return null;
  return PLACES.find(p => String(p.id) === String(id));
}

export function filterPlaces({ 
  query = '', 
  type = 'all', 
  minRating = 0, 
  priceRange = 'all', 
  activity = 'all', 
  duration = 'all',
  hasAvailableSpots = false,
  dateRange = null
}) {
  let result = [...PLACES];

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(p => (
      p.name.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.activities.some(a => a.toLowerCase().includes(q)) ||
      p.createdBy.name.toLowerCase().includes(q)
    ));
  }

  if (type !== 'all') {
    if (type === 'domestic' || type === 'international') {
      result = result.filter(p => p.category === type);
    } else {
      result = result.filter(p => p.type === type);
    }
  }

  if (minRating > 0) {
    result = result.filter(p => p.rating >= Number(minRating));
  }

  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    result = result.filter(p => p.price >= (min || 0) && (isNaN(max) ? true : p.price <= max));
  }

  if (activity !== 'all') {
    result = result.filter(p => p.activities.includes(activity));
  }

  if (duration !== 'all') {
    if (duration === '1-3') result = result.filter(p => p.duration >= 1 && p.duration <= 3);
    if (duration === '4-7') result = result.filter(p => p.duration >= 4 && p.duration <= 7);
    if (duration === '8+') result = result.filter(p => p.duration >= 8);
  }

  if (hasAvailableSpots) {
    result = result.filter(p => p.currentParticipants < p.maxGroupSize);
  }

  if (dateRange) {
    const { start, end } = dateRange;
    result = result.filter(p => {
      const tripStart = new Date(p.tripDates.start);
      const tripEnd = new Date(p.tripDates.end);
      const searchStart = new Date(start);
      const searchEnd = new Date(end);
      return tripStart >= searchStart && tripEnd <= searchEnd;
    });
  }

  return result;
}

// Social features
export function getTripsByUserId(userId) {
  return PLACES.filter(p => p.createdBy.id === userId);
}

export function getAvailableSpots(placeId) {
  const place = getPlaceById(placeId);
  if (!place) return 0;
  return Math.max(0, place.maxGroupSize - place.currentParticipants);
}

export function isUserCompatible(user1, user2) {
  // Check for common interests
  const commonInterests = user1.interests.filter(interest => 
    user2.interests.includes(interest)
  );
  
  // Check for common languages
  const commonLanguages = user1.languagesSpoken.filter(lang =>
    user2.languagesSpoken.includes(lang)
  );

  // Return compatibility score (0-1) and matching attributes
  return {
    score: (commonInterests.length / Math.max(user1.interests.length, user2.interests.length) * 0.6) +
           (commonLanguages.length / Math.max(user1.languagesSpoken.length, user2.languagesSpoken.length) * 0.4),
    commonInterests,
    commonLanguages
  };
}

// New functions for trip planning
export function createTrip(tripData) {
  // Implementation for creating new trips
  // This would typically interact with a database
  return {
    ...tripData,
    id: Math.random().toString(36).substr(2, 9),
    reviews: 0,
    currentParticipants: 1
  };
}

export function joinTrip(tripId, userId) {
  // Implementation for joining trips
  // This would typically interact with a database
  const trip = getPlaceById(tripId);
  if (!trip) throw new Error('Trip not found');
  if (trip.currentParticipants >= trip.maxGroupSize) throw new Error('Trip is full');
  // Add user to trip participants
  trip.currentParticipants += 1;
  return trip;
}

export const INTERESTS = [
  'Beach Life',
  'Mountain Adventure',
  'Cultural Exploration',
  'Photography',
  'Food & Cuisine',
  'Nightlife',
  'Nature & Wildlife',
  'History & Heritage',
  'Adventure Sports',
  'Relaxation',
  'Local Experiences',
  'Shopping',
  'Art & Museums',
  'Music & Festivals',
  'Yoga & Wellness'
];