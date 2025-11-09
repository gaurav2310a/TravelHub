'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, Star, Heart, Filter, TrendingUp } from 'lucide-react';

export default function ExploreTripsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const trips = [
    {
      id: 1,
      title: 'Himalayan Trekking Adventure',
      destination: 'Nepal',
      creator: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=11',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      duration: '14 days',
      budget: '$1,500',
      travelers: 8,
      rating: 4.9,
      verified: true,
      trending: true,
      category: 'Adventure'
    },
    {
      id: 2,
      title: 'Mediterranean Sailing Experience',
      destination: 'Greece & Croatia',
      creator: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=12',
      image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800',
      duration: '10 days',
      budget: '$2,800',
      travelers: 6,
      rating: 5.0,
      verified: true,
      category: 'Beach'
    },
    {
      id: 3,
      title: 'African Safari Experience',
      destination: 'Kenya & Tanzania',
      creator: 'David Wilson',
      avatar: 'https://i.pravatar.cc/150?img=13',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      duration: '12 days',
      budget: '$3,200',
      travelers: 4,
      rating: 4.8,
      verified: true,
      trending: true,
      category: 'Nature'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Trips</h1>
          <p className="text-xl text-white/90 mb-8">Join fellow travelers on amazing adventures worldwide</p>
          
          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative glass-effect rounded-2xl p-2 bg-white/10 backdrop-blur-xl border border-white/20">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search trips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'Adventure', 'Beach', 'Cultural', 'Nature', 'Food'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-md'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {trip.verified && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        ✓ Verified
                      </span>
                    )}
                    {trip.trending && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
                        🔥 Trending
                      </span>
                    )}
                  </div>

                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{trip.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{trip.destination}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">{trip.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">{trip.budget}</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400 mx-auto mb-1" />
                      <div className="text-xs font-semibold text-gray-900 dark:text-white">{trip.travelers}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <img src={trip.avatar} alt={trip.creator} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{trip.creator}</span>
                    </div>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      View →
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
}
