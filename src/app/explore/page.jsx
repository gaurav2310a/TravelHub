'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Users, Star, TrendingUp, Clock, Heart, Compass, Globe } from 'lucide-react';
import Link from 'next/link';
import ExploreFilters from '@/app/explore/filters';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('trips');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({
    duration: [],
    budget: [],
    travelers: [],
    rating: null,
    amenities: [],
    season: [],
    destinations: []
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🌍', color: 'from-blue-500 to-purple-500' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️', color: 'from-orange-500 to-red-500' },
    { id: 'beach', name: 'Beach', icon: '🏖️', color: 'from-cyan-500 to-blue-500' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️', color: 'from-purple-500 to-pink-500' },
    { id: 'nature', name: 'Nature', icon: '🌲', color: 'from-green-500 to-emerald-500' },
    { id: 'city', name: 'City', icon: '🏙️', color: 'from-gray-500 to-slate-500' },
    { id: 'food', name: 'Food', icon: '🍜', color: 'from-yellow-500 to-orange-500' },
  ];

  const exploreTrips = [
    {
      id: 1,
      title: 'Backpacking Through Southeast Asia',
      destination: 'Thailand, Vietnam, Cambodia',
      creator: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
      duration: '21 days',
      budget: '$1,200',
      travelers: 4,
      rating: 4.9,
      category: 'adventure',
      tags: ['Backpacking', 'Culture', 'Food'],
      verified: true,
      trending: true
    },
    {
      id: 2,
      title: 'European Art & Culture Tour',
      destination: 'Paris, Rome, Barcelona',
      creator: 'Marco Rossi',
      avatar: 'https://i.pravatar.cc/150?img=2',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      duration: '14 days',
      budget: '$3,500',
      travelers: 2,
      rating: 5.0,
      category: 'cultural',
      tags: ['Art', 'Museums', 'History'],
      verified: true
    },
    {
      id: 3,
      title: 'Tropical Paradise Island Hopping',
      destination: 'Maldives & Sri Lanka',
      creator: 'Emma Watson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      duration: '10 days',
      budget: '$2,800',
      travelers: 2,
      rating: 4.8,
      category: 'beach',
      tags: ['Beach', 'Diving', 'Relaxation'],
      verified: true,
      trending: true
    },
    {
      id: 4,
      title: 'Amazon Rainforest Expedition',
      destination: 'Brazil & Peru',
      creator: 'Carlos Silva',
      avatar: 'https://i.pravatar.cc/150?img=4',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      duration: '12 days',
      budget: '$1,800',
      travelers: 6,
      rating: 4.7,
      category: 'nature',
      tags: ['Wildlife', 'Adventure', 'Eco-tourism'],
      verified: false
    },
    {
      id: 5,
      title: 'Tokyo Food & Culture Journey',
      destination: 'Tokyo, Osaka, Kyoto',
      creator: 'Yuki Tanaka',
      avatar: 'https://i.pravatar.cc/150?img=5',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      duration: '8 days',
      budget: '$2,200',
      travelers: 3,
      rating: 4.9,
      category: 'food',
      tags: ['Food', 'Culture', 'City'],
      verified: true,
      trending: true
    },
    {
      id: 6,
      title: 'NYC Urban Adventure',
      destination: 'New York City, USA',
      creator: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=6',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      duration: '5 days',
      budget: '$1,500',
      travelers: 4,
      rating: 4.6,
      category: 'city',
      tags: ['City', 'Shopping', 'Nightlife'],
      verified: true
    }
  ];

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const filteredTrips = exploreTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || trip.category === selectedCategory;
    
    // Apply active filters
    const matchesDuration = !activeFilters?.duration?.length || activeFilters.duration.some(duration => {
      if (!trip.duration) return true;
      const days = parseInt(trip.duration.split(' ')[0]); // Extract number from "X days"
      if (isNaN(days)) return true;
      switch(duration) {
        case 'short': return days >= 1 && days <= 3;
        case 'medium': return days >= 4 && days <= 7;
        case 'long': return days >= 8 && days <= 14;
        case 'extended': return days >= 15;
        default: return true;
      }
    });

    const matchesBudget = !activeFilters?.budget?.length || activeFilters.budget.some(budget => {
      if (!trip.budget) return true;
      const price = parseInt(trip.budget.replace(/[$,]/g, ''));
      if (isNaN(price)) return true;
      switch(budget) {
        case 'budget': return price <= 500;
        case 'moderate': return price > 500 && price <= 1500;
        case 'luxury': return price > 1500 && price <= 3000;
        case 'ultra': return price > 3000;
        default: return true;
      }
    });

    const matchesTravelers = !activeFilters?.travelers?.length || activeFilters.travelers.some(size => {
      if (!trip.travelers) return true;
      switch(size) {
        case 'solo': return trip.travelers === 1;
        case 'couple': return trip.travelers === 2;
        case 'small': return trip.travelers >= 3 && trip.travelers <= 4;
        case 'group': return trip.travelers >= 5;
        default: return true;
      }
    });

    const matchesRating = !activeFilters?.rating || trip.rating >= parseFloat(activeFilters.rating);
    
    const matchesSeason = !activeFilters?.season?.length || 
      (trip.season && activeFilters.season.includes(trip.season.toLowerCase()));
    
    const matchesAmenities = !activeFilters?.amenities?.length ||
      (trip.amenities && activeFilters.amenities.every(amenity => trip.amenities.includes(amenity)));

    const matchesDestinations = !activeFilters?.destinations?.length ||
      activeFilters.destinations.some(dest => 
        trip.destination && trip.destination.toLowerCase().includes(dest.toLowerCase()));

    return matchesSearch && 
           matchesCategory && 
           matchesDuration && 
           matchesBudget && 
           matchesTravelers && 
           matchesRating &&
           matchesSeason &&
           matchesAmenities &&
           matchesDestinations;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Explore Amazing Trips
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Discover curated travel experiences from adventurers around the world
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative glass-effect rounded-2xl p-2 bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search destinations, trips, travelers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                  </div>
                  <button className="px-6 py-3.5 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {[
                { icon: <Globe className="w-6 h-6" />, value: '1,234', label: 'Trips' },
                { icon: <Users className="w-6 h-6" />, value: '5,678', label: 'Travelers' },
                { icon: <MapPin className="w-6 h-6" />, value: '156', label: 'Countries' },
                { icon: <TrendingUp className="w-6 h-6" />, value: '89%', label: 'Match Rate' }
              ].map((stat, idx) => (
                <div key={idx} className="glass-effect bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-200">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:scale-105'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <aside className="w-80 flex-shrink-0 hidden md:block">
            <ExploreFilters onFilterChange={handleFilterChange} />
          </aside>

          <div className="flex-1">
            {/* Filters Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCategory === 'all' ? 'All Trips' : categories.find(c => c.id === selectedCategory)?.name + ' Trips'}
                </h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {filteredTrips.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="md:hidden px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all"
                  onClick={() => document.getElementById('mobile-filters').showModal()}
                >
                  Filters
                </button>
                <select className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium hover:shadow-md transition-all">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Dialog */}
            <dialog id="mobile-filters" className="relative w-[90vw] max-w-[400px] rounded-2xl p-0 bg-white dark:bg-gray-800">
              <div className="p-4">
                <ExploreFilters onFilterChange={handleFilterChange} />
              </div>
              <button
                onClick={() => document.getElementById('mobile-filters').close()}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            </dialog>

            {/* Trip Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredTrips.map((trip, idx) => (
                <div
                  key={trip.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Save Button */}
                    <button className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>

                    {/* Rating */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-900">{trip.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {trip.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{trip.destination}</span>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                      <div className="text-center px-1 py-0.5 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <Clock className="w-3 h-3 mx-auto mb-0.5 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{trip.duration}</span>
                      </div>
                      <div className="text-center px-1 py-0.5 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <DollarSign className="w-3 h-3 mx-auto mb-0.5 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{trip.budget}</span>
                      </div>
                      <div className="text-center px-1 py-0.5 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <Users className="w-3 h-3 mx-auto mb-0.5 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{trip.travelers}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {trip.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Creator */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1.5">
                        <img src={trip.avatar} alt={trip.creator} className="w-6 h-6 rounded-full" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{trip.creator}</span>
                      </div>
                      <Link
                        href={`/trips/${trip.id}`}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredTrips.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                  Load More Trips
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredTrips.length === 0 && (
              <div className="text-center py-12">
                <Compass className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No trips found</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
