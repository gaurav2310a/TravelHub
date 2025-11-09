'use client';

import { useState } from 'react';
import { MapPin, Star, DollarSign, Wifi, Coffee, Users } from 'lucide-react';

export default function StaysPage() {
  const stays = [
    {
      id: 1,
      name: 'Cozy Downtown Hotel',
      type: 'Hotel',
      address: '123 Main Street, City Center',
      distance: '0.5 km',
      rating: 4.5,
      reviews: 234,
      price: 120,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      amenities: ['WiFi', 'Breakfast', 'Parking']
    },
    {
      id: 2,
      name: 'Beach Resort & Spa',
      type: 'Resort',
      address: '456 Beach Road, Coastal Area',
      distance: '2.3 km',
      rating: 4.8,
      reviews: 567,
      price: 280,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      amenities: ['Pool', 'Spa', 'Restaurant']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">🏨 Nearby Stays</h1>
          <p className="text-xl text-white/90">Find the perfect accommodation near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <div key={stay.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48">
                <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                  {stay.type}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{stay.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{stay.distance} away</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold text-gray-900 dark:text-white">{stay.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({stay.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {stay.amenities.map((amenity, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{stay.price}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">/night</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
