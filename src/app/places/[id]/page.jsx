"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPlaceById, formatINR } from '@/lib/trips';

export default function PlaceDetail({ params }) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract id from params (works with both sync and async params)
    const loadPlace = async () => {
      const resolvedParams = await Promise.resolve(params);
      const { id } = resolvedParams;
      const placeData = getPlaceById(id);
      setPlace(placeData);
      setLoading(false);
    };
    
    loadPlace();
  }, [params]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!place) return <div className="p-8">Place not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={place.image} alt={place.name} className="w-full h-96 object-cover rounded-2xl" />
          <h1 className="text-3xl font-extrabold mt-4">{place.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              place.category === 'domestic' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            }`}>
              {place.category === 'domestic' ? '🇮🇳 Domestic' : '✈️ International'}
            </span>
            <p className="text-sm text-gray-500">{place.country} · {place.type} · {place.bestTime}</p>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{place.description}</p>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Activities</h3>
            <div className="flex gap-2 flex-wrap">
              {place.activities.map(a => (
                <span key={a} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">{a}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">From</div>
              <div className="text-2xl font-bold text-blue-600">{formatINR(place.price)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Rating</div>
              <div className="font-semibold">{place.rating} ({place.reviews})</div>
            </div>
          </div>

          <Link href={`/places/${place.id}/book`} className="block text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">Book Now</Link>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Nearby Essentials</h4>
            <ul className="text-sm text-gray-600 dark:te  xt-gray-300 space-y-1">
              {place.nearby.map(n => <li key={n}>• {n}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
