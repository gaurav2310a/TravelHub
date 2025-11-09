'use client';

import { MapPin, Star, DollarSign, Clock } from 'lucide-react';

export default function RestaurantsPage() {
  const restaurants = [
    {
      id: 1,
      name: 'Italian Bistro',
      cuisine: 'Italian',
      address: '789 Food Street',
      distance: '0.8 km',
      rating: 4.7,
      reviews: 189,
      priceRange: '$$',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      openNow: true
    },
    {
      id: 2,
      name: 'Sushi Paradise',
      cuisine: 'Japanese',
      address: '321 Ocean Ave',
      distance: '1.2 km',
      rating: 4.9,
      reviews: 345,
      priceRange: '$$$',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      openNow: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">🍽️ Nearby Restaurants</h1>
          <p className="text-xl text-white/90">Discover amazing dining options around you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                {restaurant.openNow && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                    Open Now
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{restaurant.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.distance} away</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold text-gray-900 dark:text-white">{restaurant.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({restaurant.reviews} reviews)</span>
                </div>
                <button className="w-full px-4 py-2 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
