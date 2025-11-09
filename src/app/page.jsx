'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTravel } from '@/context/TravelContext';
import { Search, MapPin, Calendar, Star, Clock, Filter, ChevronRight, ArrowUpDown, Users, Activity, Heart, Map } from 'lucide-react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { getFeaturedTrips } from '@/lib/communityTrips';
import { formatINR } from '@/lib/trips';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    type: 'beach',
    rating: 4.8,
    reviews: 2450,
    price: 15999,
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage',
    activities: ['Beach Activities', 'Water Sports', 'Heritage Tours'],
    bestTime: 'Oct-Mar',
    duration: '5 days',
    category: 'domestic'
  },
  {
    id: 2,
    name: 'Ladakh',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1590391780607-847bef15a351?w=800',
    type: 'mountain',
    rating: 4.9,
    reviews: 1800,
    price: 24999,
    description: 'High-altitude desert with stunning monasteries and landscapes',
    activities: ['Monastery Tours', 'Mountain Biking', 'Camping'],
    bestTime: 'Jun-Sep',
    duration: '7 days',
    category: 'domestic'
  },
  {
    id: 3,
    name: 'Kerala',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    type: 'nature',
    rating: 4.9,
    reviews: 2100,
    price: 18999,
    description: 'Serene backwaters, lush greenery, and Ayurvedic experiences',
    activities: ['Houseboat Cruise', 'Ayurveda', 'Beach Visits'],
    bestTime: 'Sep-Mar',
    duration: '6 days',
    category: 'domestic'
  },
  {
    id: 4,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    type: 'beach',
    rating: 4.8,
    reviews: 1950,
    price: 45999,
    description: 'Tropical paradise with stunning beaches and rich culture',
    activities: ['Surfing', 'Temple Tours', 'Yoga Retreats'],
    bestTime: 'Apr-Oct',
    duration: '7 days',
    category: 'international'
  },
  {
    id: 5,
    name: 'Rajasthan',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800',
    type: 'cultural',
    rating: 4.7,
    reviews: 1750,
    price: 22999,
    description: 'Royal palaces, desert safaris, and rich cultural heritage',
    activities: ['Palace Tours', 'Desert Safari', 'Folk Music'],
    bestTime: 'Oct-Mar',
    duration: '8 days',
    category: 'domestic'
  },
  {
    id: 6,
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    type: 'city',
    rating: 4.8,
    reviews: 1680,
    price: 52999,
    description: 'Modern city-state with amazing attractions and cuisine',
    activities: ['City Tours', 'Theme Parks', 'Shopping'],
    bestTime: 'Dec-Jun',
    duration: '5 days',
    category: 'international'
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Destinations', icon: '🌎' },
  { id: 'domestic', name: 'Domestic', icon: '🇮🇳' },
  { id: 'international', name: 'International', icon: '✈️' },
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'mountain', name: 'Mountain', icon: '⛰️' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
];

const activities = [
  { id: 'all', name: 'All Activities' },
  { id: 'Surfing', name: 'Surfing' },
  { id: 'Hiking', name: 'Hiking' },
  { id: 'Sightseeing', name: 'Sightseeing' },
  { id: 'Cultural', name: 'Cultural' },
];

const durations = [
  { id: 'all', name: 'Any Duration' },
  { id: '1-3', name: '1-3 days' },
  { id: '4-7', name: '4-7 days' },
  { id: '8+', name: '8+ days' },
];

const groupSizes = [
  { id: 'all', name: 'Any Group Size' },
  { id: 'solo', name: 'Solo' },
  { id: 'couple', name: 'Couple' },
  { id: 'family', name: 'Family' },
  { id: 'group', name: 'Group' },
];

const sortOptions = [
  { id: 'popular', name: 'Most Popular' },
  { id: 'rating_desc', name: 'Highest Rated' },
  { id: 'price_asc', name: 'Price: Low to High' },
  { id: 'price_desc', name: 'Price: High to Low' },
];

// Popular Destinations Component
const PopularDestinations = ({ darkMode }) => {
  const [popularTrips, setPopularTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch popular trips from community trips
    const fetchPopularTrips = () => {
      try {
        const trips = getFeaturedTrips();
        setPopularTrips(trips);
      } catch (error) {
        console.error('Error fetching popular trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTrips();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (popularTrips.length === 0) {
    return null; // Don't show the section if no popular trips
  }

  return (
    <div className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Popular Community Trips
          </h2>
          <Link 
            href="/community" 
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all trips
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularTrips.slice(0, 4).map((trip) => (
            <Link 
              key={trip.id} 
              href={`/community/trips/${trip.id}`}
              className="group block"
            >
              <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.images[0] || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800'}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center gap-1 text-white">
                      <MapPin size={16} />
                      <span className="text-sm">{trip.destination}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className={`font-bold mb-1 line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {trip.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {trip.author?.name || 'Anonymous'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-rose-500" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{trip.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {trip.budget ? `₹${trip.budget.toLocaleString()}` : 'Free'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { 
    darkMode, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters,
    setCurrentView,
    setSelectedDestination
  } = useTravel();
  
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setIsTyping(false);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    setIsTyping(true);
    debouncedSearch(query);
  };

  // Memoize filtered destinations for better performance
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];
    
    // Filter by search query
    if (searchQuery && !isTyping) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.activities.some(activity => activity.toLowerCase().includes(query))
      );
    }
    
    // Apply all filters
    result = result.filter(dest => {
      // Filter by type or category
      if (filters.type !== 'all') {
        if (filters.type === 'domestic' || filters.type === 'international') {
          if (dest.category !== filters.type) return false;
        } else if (dest.type !== filters.type) return false;
      }
      
      // Filter by price range
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (dest.price < min || (max && dest.price > max)) return false;
      }
      
      // Filter by rating
      if (filters.rating > 0 && dest.rating < filters.rating) return false;
      
      // Filter by activity
      if (filters.activity !== 'all' && !dest.activities.includes(filters.activity)) return false;
      
      // Filter by duration
      if (filters.duration !== 'all') {
        const duration = parseInt(dest.duration);
        if (filters.duration === '1-3' && (duration < 1 || duration > 3)) return false;
        if (filters.duration === '4-7' && (duration < 4 || duration > 7)) return false;
        if (filters.duration === '8+' && duration < 8) return false;
      }
      
      // Filter by best time to visit
      if (filters.bestTime && !dest.bestTime.includes(filters.bestTime)) return false;
      
      return true;
    });

    // Apply sorting
    if (filters.sort === 'rating_desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default: sort by popularity (reviews)
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [searchQuery, filters, isTyping]);

  const handleCategorySelect = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      type: categoryId === 'all' ? 'all' : categoryId
    }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      priceRange: 'all',
      rating: 0,
      activity: 'all',
      duration: 'all',
      bestTime: '',
      groupSize: 'all',
      sort: 'popular'
    });
    setLocalSearchQuery('');
    setSearchQuery('');
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/80 to-pink-600/90 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" 
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 section-container pt-32 pb-24">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                Discover Your Next
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                  Adventure
                </span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed">
                Explore breathtaking destinations, connect with fellow travelers, and create unforgettable memories with our curated travel experiences.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
              <div className="glass-effect rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      value={localSearchQuery}
                      onChange={handleSearchChange}
                      className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-800/50 border-0 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-4 rounded-xl flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-lg"
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>
              
              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-4 p-6 rounded-2xl glass-effect shadow-2xl animate-fade-in-up">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Filter & Sort</h3>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Sort By
                        </label>
                        <select
                          value={filters.sort || 'popular'}
                          onChange={(e) => handleFilterChange('sort', e.target.value)}
                          className="text-sm px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                        >
                          {sortOptions.map(option => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={resetFilters}
                        className="text-sm font-medium text-yellow-300 hover:text-yellow-200 transition-colors"
                      >
                        Reset All
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Price Range
                      </label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        <option value="all">Any Price</option>
                        <option value="0-15000">Under ₹15,000</option>
                        <option value="15000-25000">₹15,000 - ₹25,000</option>
                        <option value="25000-40000">₹25,000 - ₹40,000</option>
                        <option value="40000-100000">₹40,000+</option>
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Minimum Rating
                      </label>
                      <select
                        value={filters.rating}
                        onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        <option value="0">Any Rating</option>
                        <option value="4">4+ Stars</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.8">4.8+ Stars</option>
                      </select>
                    </div>

                    {/* Activity Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Activity Type
                      </label>
                      <select
                        value={filters.activity || 'all'}
                        onChange={(e) => handleFilterChange('activity', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        {activities.map(activity => (
                          <option key={activity.id} value={activity.id}>
                            {activity.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Duration
                      </label>
                      <select
                        value={filters.duration || 'all'}
                        onChange={(e) => handleFilterChange('duration', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        {durations.map(duration => (
                          <option key={duration.id} value={duration.id}>
                            {duration.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Best Time to Visit */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Best Time to Visit
                      </label>
                      <select
                        value={filters.bestTime || ''}
                        onChange={(e) => handleFilterChange('bestTime', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        <option value="">Any Time</option>
                        <option value="Jan">January</option>
                        <option value="Feb">February</option>
                        <option value="Mar">March</option>
                        <option value="Apr">April</option>
                        <option value="May">May</option>
                        <option value="Jun">June</option>
                        <option value="Jul">July</option>
                        <option value="Aug">August</option>
                        <option value="Sep">September</option>
                        <option value="Oct">October</option>
                        <option value="Nov">November</option>
                        <option value="Dec">December</option>
                      </select>
                    </div>

                    {/* Group Size */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Group Size
                      </label>
                      <select
                        value={filters.groupSize || 'all'}
                        onChange={(e) => handleFilterChange('groupSize', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none"
                      >
                        {groupSizes.map(size => (
                          <option key={size.id} value={size.id}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="section-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Explore by Category
              </h2>
              <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Find your perfect destination type
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`group flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 animate-fade-in-up card-hover ${
                  filters.type === category.id || (filters.type === 'all' && category.id === 'all')
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-105'
                    : `${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-md`
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                <span className={`text-xs font-semibold text-center ${
                  filters.type === category.id || (filters.type === 'all' && category.id === 'all')
                    ? 'text-white'
                    : `${darkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <PopularDestinations darkMode={darkMode} />
    

      {/* Why Choose Us Section */}
      <div className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Why Choose TravelHub
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're committed to making your travel experience unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '✈️',
                title: 'Best Price Guarantee',
                description: 'We offer the best prices for all our destinations. Found a better deal elsewhere? We\'ll match it!',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🌍',
                title: 'Worldwide Coverage',
                description: 'With over 1,000 destinations worldwide, we have the perfect trip for every type of traveler.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '⭐',
                title: '5-Star Rated',
                description: 'Join thousands of satisfied travelers who have rated us 5 stars for our exceptional service.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: '🔒',
                title: 'Secure Booking',
                description: 'Your security is our priority. All transactions are encrypted and secure.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '⏰',
                title: '24/7 Support',
                description: 'Our dedicated support team is available around the clock to assist you with any queries.',
                color: 'from-red-500 to-rose-500'
              },
              {
                icon: '🔄',
                title: 'Flexible Cancellation',
                description: 'Plans changed? No worries! Enjoy flexible cancellation options on most bookings.',
                color: 'from-indigo-500 to-blue-500'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-8 rounded-2xl transition-all duration-300 card-hover ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white text-3xl mb-5 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative z-10 section-container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Get Travel Deals & Updates</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10">
              Subscribe to our newsletter and receive exclusive offers, travel inspiration, and insider tips!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/50 transition-all"
              />
              <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-white/70">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}