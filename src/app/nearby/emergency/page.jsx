'use client';

import { Phone, MapPin, AlertCircle } from 'lucide-react';

export default function EmergencyPage() {
  const emergencyServices = [
    {
      id: 1,
      name: 'City Hospital Emergency',
      type: 'Hospital',
      phone: '+91 555 911-0000',
      address: '100 Medical Center Drive',
      distance: '1.2 km',
      available24h: true
    },
    {
      id: 2,
      name: 'Police Station - Downtown',
      type: 'Police',
      phone: '+91 555 911-0911',
      address: '200 Justice Street',
      distance: '0.8 km',
      available24h: true
    },
    {
      id: 3,
      name: 'Fire Department Station 5',
      type: 'Fire',
      phone: '+91 555 911-0555',
      address: '300 Firehouse Lane',
      distance: '1.5 km',
      available24h: true
    }
  ];

  const emergencyNumbers = [
    { country: 'International', number: '112', description: 'Universal Emergency' },
    { country: 'India', number: '112', description: 'Emergency Services' },
    { country: 'USA/Canada', number: '911', description: 'Police, Fire, Medical' },
    { country: 'UK', number: '999', description: 'Emergency Services' },
    { country: 'EU', number: '112', description: 'Emergency Services' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">🚨 Emergency Services</h1>
          </div>
          <p className="text-xl text-white/90">Quick access to emergency contacts and nearby services</p>
        </div>
      </div>

      {/* SOS Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-600 text-white rounded-2xl p-8 text-center mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Emergency SOS</h2>
          <p className="text-white/90 mb-6">In case of immediate danger, press the button below</p>
          <button className="px-12 py-4 bg-white text-red-600 font-bold text-xl rounded-2xl hover:bg-red-50 transition-all hover:scale-105 shadow-lg">
            🆘 ACTIVATE SOS
          </button>
          <p className="text-sm text-white/70 mt-4">This will alert your emergency contacts and local authorities</p>
        </div>

        {/* Emergency Numbers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Emergency Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyNumbers.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{item.country}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{item.number}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Services */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nearby Emergency Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyServices.map((service) => (
            <div key={service.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-red-200 dark:border-red-900">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{service.name}</h3>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold rounded-full">
                    {service.type}
                  </span>
                </div>
                {service.available24h && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                    24/7
                  </span>
                )}
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${service.phone}`} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    {service.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{service.distance} away</span>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                Call Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
