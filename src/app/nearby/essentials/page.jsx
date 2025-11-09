'use client';

import { MapPin, DollarSign, Fuel, Building2 } from 'lucide-react';

export default function EssentialsPage() {
  const essentials = [
    {
      id: 1,
      name: 'Downtown ATM',
      type: 'ATM',
      address: '456 Bank Street',
      distance: '0.3 km',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 2,
      name: 'Shell Gas Station',
      type: 'Petrol',
      address: '789 Highway Road',
      distance: '1.5 km',
      icon: Fuel,
      color: 'yellow'
    },
    {
      id: 3,
      name: 'City Pharmacy',
      type: 'Pharmacy',
      address: '123 Health Ave',
      distance: '0.7 km',
      icon: Building2,
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">🏪 Essential Services</h1>
          <p className="text-xl text-white/90">Find ATMs, petrol stations, pharmacies & more</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essentials.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900 mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="font-medium">{item.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{item.distance} away</span>
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
