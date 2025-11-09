// Community Data Models and Mock Database

// User Role Types
export const USER_ROLES = {
  TRAVELER: 'traveler',
  FEATURED_TRAVELER: 'featured_traveler',
  TRAVEL_AGENCY: 'travel_agency'
};

// Mock Users Database
export const USERS = [
  {
    id: 'user1',
    email: 'priya.sharma@example.com',
    password: 'hashed_password',
    name: 'Priya Sharma',
    role: USER_ROLES.FEATURED_TRAVELER,
    profilePhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Adventure seeker and beach lover. I love exploring hidden gems and meeting fellow travelers!',
    location: 'Mumbai, India',
    interests: ['Beach Life', 'Photography', 'Meeting New People', 'Food & Cuisine'],
    languagesSpoken: ['English', 'Hindi', 'Marathi'],
    followers: 1250,
    following: 340,
    stats: { totalTrips: 24, destinationsVisited: 18, totalLikes: 3420, joinedDate: '2023-01-15' },
    verified: true,
    socialLinks: { instagram: '@priya_travels', facebook: 'priya.sharma' }
  },
  {
    id: 'user2',
    email: 'rahul.kapoor@example.com',
    password: 'hashed_password',
    name: 'Rahul Kapoor',
    role: USER_ROLES.TRAVELER,
    profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Mountain enthusiast and cultural explorer. Always ready for the next adventure!',
    location: 'Delhi, India',
    interests: ['Trekking', 'Cultural Exploration', 'Photography', 'Adventure Sports'],
    languagesSpoken: ['English', 'Hindi', 'Ladakhi'],
    followers: 580,
    following: 420,
    stats: { totalTrips: 15, destinationsVisited: 12, totalLikes: 890, joinedDate: '2023-05-20' },
    verified: false
  },
  {
    id: 'user3',
    email: 'zara.khan@example.com',
    password: 'hashed_password',
    name: 'Zara Khan',
    role: USER_ROLES.FEATURED_TRAVELER,
    profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Yoga instructor & wellness traveler. Finding peace in every corner of the world.',
    location: 'Bangalore, India',
    interests: ['Yoga', 'Beach Life', 'Cultural Exchange', 'Wellness'],
    languagesSpoken: ['English', 'Hindi', 'Indonesian Basic'],
    followers: 2100,
    following: 180,
    stats: { totalTrips: 32, destinationsVisited: 25, totalLikes: 5670, joinedDate: '2022-08-10' },
    verified: true,
    socialLinks: { instagram: '@zara_wellness', website: 'www.zarawellness.com' }
  },
  {
    id: 'agency1',
    email: 'info@wanderlust.com',
    password: 'hashed_password',
    name: 'Wanderlust Adventures',
    role: USER_ROLES.TRAVEL_AGENCY,
    profilePhoto: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
    bio: 'Premium travel agency specializing in customized group tours and adventure packages.',
    location: 'Pune, India',
    interests: ['Group Tours', 'Adventure Packages', 'Customized Itineraries'],
    languagesSpoken: ['English', 'Hindi', 'Tamil', 'Bengali'],
    followers: 4500,
    following: 120,
    stats: { totalTrips: 156, destinationsVisited: 45, totalLikes: 12000, joinedDate: '2021-03-01' },
    verified: true,
    agencyInfo: {
      registrationNumber: 'TA-2021-MH-12345',
      yearsInBusiness: 8,
      specializations: ['Adventure Tours', 'Cultural Tours', 'Beach Vacations'],
      bookingLink: 'https://wanderlustadventures.com/book'
    },
    socialLinks: { instagram: '@wanderlust_adventures', website: 'www.wanderlustadventures.com' }
  }
];

// Utility Functions
export function getUserById(userId) {
  return USERS.find(user => user.id === userId);
}

export function getRoleBadge(role) {
  const badges = {
    [USER_ROLES.TRAVELER]: { label: 'Traveler', color: 'bg-blue-100 text-blue-800', icon: '🎒' },
    [USER_ROLES.FEATURED_TRAVELER]: { label: 'Featured Traveler', color: 'bg-purple-100 text-purple-800', icon: '⭐' },
    [USER_ROLES.TRAVEL_AGENCY]: { label: 'Travel Agency', color: 'bg-green-100 text-green-800', icon: '🏢' }
  };
  return badges[role] || badges[USER_ROLES.TRAVELER];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  return formatDate(dateString);
}
