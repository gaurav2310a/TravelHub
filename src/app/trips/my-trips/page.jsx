'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTravelData } from '@/context/TravelDataContext';
import { Calendar, MapPin, Users, DollarSign, Clock, Edit, Trash2, Share2, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyTripsPage() {
  const { currentUser } = useAuth();
  const { getMyTrips } = useTravelData();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const trips = getMyTrips(currentUser.id);
      setMyTrips(trips);
    }
  }, [currentUser]);

  const trips = {
    upcoming: myTrips.filter(t => new Date(t.startDate) > new Date()),
    ongoing: myTrips.filter(t => {
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      const now = new Date();
      return start <= now && end >= now;
    }),
    completed: myTrips.filter(t => new Date(t.endDate) < new Date())
  };

  const stats = [
    { label: 'Total Trips', value: '12', icon: MapPin, color: 'blue' },
    { label: 'Countries Visited', value: '23', icon: MapPin, color: 'purple' },
    { label: 'Travel Days', value: '156', icon: Calendar, color: 'pink' },
    { label: 'Companions', value: '47', icon: Users, color: 'green' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      planning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    };
    return colors[status] || colors.planning;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Trips</h1>
              <p className="text-white/90">Manage and track your travel adventures</p>
            </div>
            <Link
              href="/trips/create"
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create New Trip
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900 mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          {['upcoming', 'ongoing', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab} ({trips[tab].length})
            </button>
          ))}
        </div>
      </div>

      {/* Trip Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trips[activeTab].length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips[activeTab].map((trip) => (
              <div key={trip.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{trip.destination}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Dates
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Duration
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trip.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trip.budget}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Travelers
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trip.travelers}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {trip.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Planning Progress</span>
                        <span>{trip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${trip.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No {activeTab} trips
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeTab === 'upcoming' ? 'Start planning your next adventure!' : `You don't have any ${activeTab} trips yet.`}
            </p>
            {activeTab === 'upcoming' && (
              <Link
                href="/trips/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Your First Trip
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
