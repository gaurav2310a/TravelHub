"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getCommunityFeed, getFeaturedTrips } from '@/lib/communityTrips';
import { getRoleBadge, formatRelativeTime, USERS, USER_ROLES } from '@/lib/community';
import { Heart, MessageCircle, Share2, Users, MapPin, Calendar, Filter, Plus } from 'lucide-react';

export default function CommunityPage() {
  const { currentUser, isAuthenticated } = useAuth();
  const [trips, setTrips] = useState([]);
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [filters, setFilters] = useState({
    role: 'all',
    category: 'all',
    type: 'all',
    query: '',
    sortBy: 'recent'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadTrips();
    setFeaturedTrips(getFeaturedTrips());
  }, [filters]);

  const loadTrips = () => {
    const data = getCommunityFeed(filters);
    setTrips(data);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLike = async (tripId) => {
    if (!isAuthenticated) {
      alert('Please login to like trips');
      return;
    }
    
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, likes: trip.likes + 1 } : trip
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Travel Community</h1>
            <p className="text-xl mb-8">Connect, Share, and Explore Together</p>
            {isAuthenticated && (
              <Link
                href="/community/create-trip"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                <Plus className="w-5 h-5" />
                Create Trip
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredTrips.slice(0, 3).map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/community/trips/${trip.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trip.images[0]}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadge(trip.authorRole).color}`}>
                        {getRoleBadge(trip.authorRole).icon} {getRoleBadge(trip.authorRole).label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {trip.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {trip.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-blue-600 text-sm md:hidden"
            >
              {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value="all">All Profiles</option>
              <option value={USER_ROLES.TRAVELER}>Travelers</option>
              <option value={USER_ROLES.FEATURED_TRAVELER}>Featured Travelers</option>
              <option value={USER_ROLES.TRAVEL_AGENCY}>Travel Agencies</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value="all">All Categories</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value="all">All Types</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountain</option>
              <option value="cultural">Cultural</option>
              <option value="nature">Nature</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
            </select>

            <input
              type="text"
              placeholder="Search trips..."
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Trip Feed */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Community Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Trip Header */}
              <div className="p-4 border-b dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <Link href={`/community/users/${trip.authorId}`} className="flex items-center gap-3 hover:opacity-80">
                    <img
                      src={trip.authorPhoto}
                      alt={trip.authorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{trip.authorName}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getRoleBadge(trip.authorRole).color}`}>
                          {getRoleBadge(trip.authorRole).icon}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{formatRelativeTime(trip.createdAt)}</p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                      {trip.category === 'domestic' ? '🇮🇳 Domestic' : '✈️ International'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Content */}
              <Link href={`/community/trips/${trip.id}`}>
                <div className="cursor-pointer">
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={trip.images[0]}
                      alt={trip.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-2xl font-bold mb-2">{trip.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{trip.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {trip.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {trip.duration} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {trip.currentParticipants}/{trip.maxParticipants} spots
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trip.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-blue-600 dark:text-blue-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Trip Actions */}
              <div className="px-4 py-3 border-t dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleLike(trip.id)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{trip.likes}</span>
                  </button>
                  <Link
                    href={`/community/trips/${trip.id}#comments`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{trip.comments}</span>
                  </Link>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition">
                    <Share2 className="w-5 h-5" />
                    <span>{trip.shares}</span>
                  </button>
                </div>
                <Link
                  href={`/community/trips/${trip.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No trips found matching your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
