'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, Calendar, Users, DollarSign, Clock, Star, Heart, Share2, 
  Edit, Trash2, MessageCircle, Camera, Map, CheckCircle, ArrowLeft 
} from 'lucide-react';

export default function TripViewPage() {
  const params = useParams();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock trip data - in real app, fetch based on params.id
  const trip = {
    id: params.id,
    title: 'Backpacking Through Southeast Asia',
    destination: 'Thailand, Vietnam, Cambodia',
    coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
    startDate: '2024-12-15',
    endDate: '2025-01-05',
    duration: '21 days',
    budget: '$1,200',
    travelers: 4,
    status: 'confirmed',
    rating: 4.8,
    likes: 234,
    comments: 45,
    creator: {
      name: 'Rahul Kapoor',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    },
    description: 'An incredible journey through three amazing Southeast Asian countries. Experience vibrant cultures, delicious street food, ancient temples, and stunning beaches. This itinerary is perfect for budget travelers looking for adventure!',
    highlights: [
      'Visit Angkor Wat at sunrise',
      'Explore Bangkok\'s floating markets',
      'Cruise through Ha Long Bay',
      'Street food tour in Hanoi',
      'Island hopping in Krabi'
    ],
    itinerary: [
      { day: 1, location: 'Bangkok', activities: ['Arrive in Bangkok', 'Check into hostel', 'Evening street food tour'] },
      { day: 2, location: 'Bangkok', activities: ['Grand Palace visit', 'Wat Pho temple', 'Floating market'] },
      { day: 3, location: 'Chiang Mai', activities: ['Flight to Chiang Mai', 'Old City exploration', 'Night bazaar'] },
      { day: 4, location: 'Chiang Mai', activities: ['Elephant sanctuary', 'Doi Suthep temple', 'Thai cooking class'] },
      { day: 5, location: 'Hanoi', activities: ['Flight to Hanoi', 'Old Quarter walk', 'Water puppet show'] }
    ],
    accommodation: [
      { name: 'Bangkok Backpackers', type: 'Hostel', price: '$15/night', rating: 4.5 },
      { name: 'Chiang Mai Guesthouse', type: 'Guesthouse', price: '$20/night', rating: 4.7 },
      { name: 'Hanoi Central Hostel', type: 'Hostel', price: '$12/night', rating: 4.6 }
    ],
    transportation: [
      { from: 'Bangkok', to: 'Chiang Mai', mode: 'Flight', cost: '$45' },
      { from: 'Chiang Mai', to: 'Hanoi', mode: 'Flight', cost: '$80' }
    ],
    tags: ['Backpacking', 'Budget Travel', 'Culture', 'Adventure', 'Food']
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trip.title,
        text: trip.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 backdrop-blur-md rounded-xl transition-all ${
              liked ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <Share2 className="w-6 h-6" />
          </button>
          <Link
            href={`/trips/${trip.id}/edit`}
            className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <Edit className="w-6 h-6" />
          </Link>
        </div>

        {/* Trip Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-semibold">
                {trip.status}
              </span>
              {trip.creator.verified && (
                <span className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{trip.title}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{trip.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{trip.likes} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{trip.comments} comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creator Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={trip.creator.avatar}
                    alt={trip.creator.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {trip.creator.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trip Creator</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {['overview', 'itinerary', 'accommodation', 'budget'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        About This Trip
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {trip.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Trip Highlights
                      </h3>
                      <ul className="space-y-2">
                        {trip.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {trip.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {trip.itinerary.map((day, idx) => (
                      <div key={idx} className="border-l-4 border-blue-600 pl-6 pb-6 relative">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {day.day}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Day {day.day} - {day.location}
                        </h4>
                        <ul className="space-y-1">
                          {day.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Accommodation Tab */}
                {activeTab === 'accommodation' && (
                  <div className="space-y-4">
                    {trip.accommodation.map((place, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              {place.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{place.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{place.price}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {place.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Budget Tab */}
                {activeTab === 'budget' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                      <p className="text-sm opacity-90 mb-1">Total Budget</p>
                      <p className="text-4xl font-bold">{trip.budget}</p>
                      <p className="text-sm opacity-90 mt-2">Per person for {trip.duration}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Transportation Costs
                      </h4>
                      <div className="space-y-3">
                        {trip.transportation.map((transport, idx) => (
                          <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {transport.from} → {transport.to}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{transport.mode}</p>
                            </div>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {transport.cost}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Trip Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dates</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{trip.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Travelers</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{trip.travelers} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{trip.budget}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-3">
              <Link
                href={`/trips/${trip.id}/edit`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-5 h-5" />
                Edit Trip
              </Link>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Trip
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Trash2 className="w-5 h-5" />
                Delete Trip
              </button>
            </div>

            {/* Map Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Map className="w-5 h-5" />
                Route Map
              </h3>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Map Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
