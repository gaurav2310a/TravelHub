import { USER_ROLES } from './community';

// Mock Community Posts/Trips Database
export const COMMUNITY_TRIPS = [
  {
    id: 'trip1',
    title: 'Goa Beach Paradise - Join Us!',
    destination: 'Goa, India',
    description: 'Planning an amazing beach getaway in Goa! Looking for 3 more travel buddies to join.',
    category: 'domestic',
    type: 'beach',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200'
    ],
    startDate: '2025-12-15',
    endDate: '2025-12-20',
    duration: 5,
    budget: 29999,
    maxParticipants: 4,
    currentParticipants: 1,
    itinerary: [
      { day: 1, title: 'Arrival', activities: ['Airport Pickup', 'Hotel Check-in', 'Beach Dinner'] },
      { day: 2, title: 'South Goa', activities: ['Beach Hopping', 'Water Sports', 'Sunset Cruise'] },
      { day: 3, title: 'Culture', activities: ['Old Goa Tour', 'Spice Plantation', 'Night Market'] },
      { day: 4, title: 'North Goa', activities: ['Beaches', 'Water Sports', 'Nightlife'] },
      { day: 5, title: 'Departure', activities: ['Free Morning', 'Shopping', 'Airport Drop'] }
    ],
    activities: ['Beach', 'Water Sports', 'Nightlife', 'Heritage'],
    meetupPoint: 'Goa International Airport',
    authorId: 'user1',
    authorName: 'Priya Sharma',
    authorPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
    authorRole: USER_ROLES.FEATURED_TRAVELER,
    likes: 245,
    comments: 34,
    shares: 12,
    createdAt: '2024-10-15T10:30:00Z',
    tags: ['#BeachLife', '#Goa', '#TravelBuddies'],
    mapLocation: { lat: 15.2993, lng: 74.1240 },
    joinRequests: []
  },
  {
    id: 'trip2',
    title: 'Himalayan Adventure in Ladakh',
    destination: 'Ladakh, India',
    description: 'Epic 7-day journey through the majestic Himalayas! Experience high-altitude lakes and ancient monasteries.',
    category: 'domestic',
    type: 'mountain',
    images: [
      'https://images.unsplash.com/photo-1590391780607-847bef15a351?w=1200',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200'
    ],
    startDate: '2025-07-10',
    endDate: '2025-07-17',
    duration: 7,
    budget: 45999,
    maxParticipants: 6,
    currentParticipants: 2,
    itinerary: [
      { day: 1, title: 'Arrival', activities: ['Airport Pickup', 'Acclimatization'] },
      { day: 2, title: 'Leh', activities: ['Leh Palace', 'Shanti Stupa'] },
      { day: 3, title: 'Pangong', activities: ['Pangong Lake', 'Camping'] },
      { day: 4, title: 'Nubra Valley', activities: ['Camel Safari', 'Camping'] },
      { day: 5, title: 'Monasteries', activities: ['Diskit Monastery', 'Sand Dunes'] },
      { day: 6, title: 'Khardung La', activities: ['Mountain Pass', 'Biking'] },
      { day: 7, title: 'Departure', activities: ['Cultural Show', 'Departure'] }
    ],
    activities: ['Monastery Tours', 'Mountain Biking', 'Camping', 'Photography'],
    meetupPoint: 'Leh Airport',
    authorId: 'user2',
    authorName: 'Rahul Kapoor',
    authorPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    authorRole: USER_ROLES.TRAVELER,
    likes: 456,
    comments: 67,
    shares: 28,
    createdAt: '2024-09-20T14:15:00Z',
    tags: ['#Ladakh', '#Himalayas', '#Adventure'],
    mapLocation: { lat: 34.1526, lng: 77.5771 },
    joinRequests: []
  },
  {
    id: 'trip3',
    title: 'Bali Island Hopping & Wellness Retreat',
    destination: 'Bali, Indonesia',
    description: 'Join me for a transformative 8-day journey combining island exploration, yoga sessions, and cultural experiences!',
    category: 'international',
    type: 'beach',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
      'https://images.unsplash.com/photo-1555400082-5f01bcb6d7e8?w=1200'
    ],
    startDate: '2025-09-01',
    endDate: '2025-09-08',
    duration: 8,
    budget: 89999,
    maxParticipants: 5,
    currentParticipants: 2,
    itinerary: [
      { day: 1, title: 'Arrival', activities: ['Airport Pickup', 'Uluwatu Temple'] },
      { day: 2, title: 'Ubud', activities: ['Art Market', 'Monkey Forest', 'Dance'] },
      { day: 3, title: 'Mt Batur', activities: ['Sunrise Trek', 'Hot Springs', 'Spa'] },
      { day: 4, title: 'Nusa Penida', activities: ['Island Trip', 'Snorkeling'] },
      { day: 5, title: 'Gili Islands', activities: ['Beach Activities'] },
      { day: 6, title: 'Surf Day', activities: ['Surfing Lessons', 'Beach Club', 'Yoga'] },
      { day: 7, title: 'Temples', activities: ['Temple Tour', 'Rice Terraces', 'Cooking'] },
      { day: 8, title: 'Departure', activities: ['Morning Yoga', 'Shopping', 'Departure'] }
    ],
    activities: ['Surfing', 'Temple Visits', 'Snorkeling', 'Yoga'],
    meetupPoint: 'Ngurah Rai Airport, Bali',
    authorId: 'user3',
    authorName: 'Zara Khan',
    authorPhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
    authorRole: USER_ROLES.FEATURED_TRAVELER,
    likes: 892,
    comments: 123,
    shares: 45,
    createdAt: '2024-08-05T09:00:00Z',
    tags: ['#Bali', '#Wellness', '#YogaRetreat'],
    mapLocation: { lat: -8.4095, lng: 115.1889 },
    joinRequests: []
  },
  {
    id: 'trip4',
    title: 'Rajasthan Heritage & Desert Safari Package',
    destination: 'Rajasthan, India',
    description: 'Explore the royal state with our 10-day premium package covering Jaipur, Udaipur, Jaisalmer, and Jodhpur.',
    category: 'domestic',
    type: 'cultural',
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200'
    ],
    startDate: '2025-11-01',
    endDate: '2025-11-10',
    duration: 10,
    budget: 65000,
    maxParticipants: 15,
    currentParticipants: 8,
    itinerary: [
      { day: 1, title: 'Jaipur', activities: ['City Palace', 'Hawa Mahal'] },
      { day: 2, title: 'Forts', activities: ['Amber Fort', 'Cultural Show'] },
      { day: 3, title: 'Pushkar', activities: ['Temple', 'Lake', 'Fair'] },
      { day: 4, title: 'Udaipur', activities: ['City Palace', 'Lake Pichola'] },
      { day: 5, title: 'Lake City', activities: ['Gardens', 'Temples'] },
      { day: 6, title: 'Jodhpur', activities: ['Mehrangarh Fort', 'Market'] },
      { day: 7, title: 'Jaisalmer', activities: ['Fort', 'Haveli'] },
      { day: 8, title: 'Desert', activities: ['Sam Dunes', 'Camel Safari'] },
      { day: 9, title: 'Return', activities: ['Shopping', 'Cuisine'] },
      { day: 10, title: 'Departure', activities: ['Last Minute Shopping'] }
    ],
    activities: ['Heritage Tours', 'Desert Safari', 'Cultural Shows'],
    meetupPoint: 'Jaipur Airport',
    authorId: 'agency1',
    authorName: 'Wanderlust Adventures',
    authorPhoto: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
    authorRole: USER_ROLES.TRAVEL_AGENCY,
    likes: 678,
    comments: 89,
    shares: 34,
    createdAt: '2024-07-10T11:30:00Z',
    tags: ['#Rajasthan', '#Heritage', '#DesertSafari'],
    mapLocation: { lat: 26.9124, lng: 75.7873 },
    joinRequests: [],
    bookingLink: 'https://wanderlustadventures.com/book/rajasthan'
  }
];

// Mock Comments Database
export const COMMENTS = [
  {
    id: 'comment1',
    tripId: 'trip1',
    userId: 'user2',
    userName: 'Rahul Kapoor',
    userPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    userRole: USER_ROLES.TRAVELER,
    content: 'This looks amazing! Have you finalized the accommodation?',
    likes: 12,
    createdAt: '2024-10-16T08:30:00Z',
    replies: []
  },
  {
    id: 'comment2',
    tripId: 'trip1',
    userId: 'user3',
    userName: 'Zara Khan',
    userPhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
    userRole: USER_ROLES.FEATURED_TRAVELER,
    content: 'Love the itinerary! The night market in Old Goa is a must-visit.',
    likes: 18,
    createdAt: '2024-10-17T14:20:00Z',
    replies: []
  }
];

// Trip Functions
export function getTripById(tripId) {
  return COMMUNITY_TRIPS.find(trip => trip.id === tripId);
}

export function getTripsByUserId(userId) {
  return COMMUNITY_TRIPS.filter(trip => trip.authorId === userId);
}

export function getCommunityFeed(filters = {}) {
  let trips = [...COMMUNITY_TRIPS];

  if (filters.role && filters.role !== 'all') {
    trips = trips.filter(trip => trip.authorRole === filters.role);
  }

  if (filters.category && filters.category !== 'all') {
    trips = trips.filter(trip => trip.category === filters.category);
  }

  if (filters.type && filters.type !== 'all') {
    trips = trips.filter(trip => trip.type === filters.type);
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    trips = trips.filter(trip => 
      trip.title.toLowerCase().includes(q) ||
      trip.destination.toLowerCase().includes(q) ||
      trip.description.toLowerCase().includes(q)
    );
  }

  if (filters.sortBy === 'popular') {
    trips.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
  } else {
    trips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return trips;
}

export function getFeaturedTrips() {
  return COMMUNITY_TRIPS
    .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
    .slice(0, 6);
}

export function getCommentsByTripId(tripId) {
  return COMMENTS.filter(comment => comment.tripId === tripId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addComment(tripId, userId, content) {
  const newComment = {
    id: `comment${Date.now()}`,
    tripId,
    userId,
    content,
    likes: 0,
    createdAt: new Date().toISOString(),
    replies: []
  };
  
  COMMENTS.push(newComment);
  const trip = getTripById(tripId);
  if (trip) trip.comments += 1;
  
  return newComment;
}

export function likeTrip(tripId) {
  const trip = getTripById(tripId);
  if (trip) trip.likes += 1;
  return trip;
}

export function joinTrip(tripId, userId) {
  const trip = getTripById(tripId);
  if (!trip) throw new Error('Trip not found');
  
  if (trip.currentParticipants >= trip.maxParticipants) {
    throw new Error('Trip is full');
  }

  if (!trip.joinRequests.includes(userId)) {
    trip.joinRequests.push(userId);
  }

  return trip;
}
