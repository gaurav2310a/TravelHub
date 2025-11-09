"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllPlaces, filterPlaces, formatINR, CATEGORIES } from '@/lib/trips';
import debounce from 'lodash.debounce';
import { Star } from 'lucide-react';

const allPlaces = getAllPlaces();

export default function PlacesPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('all');
  const [rating, setRating] = useState(0);
  const [priceRange, setPriceRange] = useState('all');
  const [activity, setActivity] = useState('all');
  const [duration, setDuration] = useState('all');

  const debouncedSetQuery = debounce((v) => setQuery(v), 250);

  const results = useMemo(() => filterPlaces({ 
    query, type, category, minRating: rating, priceRange, activity, duration 
  }), [query, type, category, rating, priceRange, activity, duration]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-6">Explore Places</h1>

      <div className="mb-8">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => cat.id === 'domestic' || cat.id === 'international' ? setCategory(cat.id) : setType(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                (cat.id === category || cat.id === type) 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <input
              type="search"
              placeholder="Search places, activities, countries..."
              onChange={(e) => debouncedSetQuery(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded flex-1" onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">Any Price</option>
              <option value="0-30000">Under ₹30,000</option>
              <option value="30000-50000">₹30,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000-999999">Above ₹1,00,000</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(place => (
          <div key={place.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img src={place.image} alt={place.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{place.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400"><Star size={16} />{place.rating}</div>
              </div>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{place.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">From</div>
                  <div className="text-lg font-bold text-blue-600">{formatINR(place.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/places/${place.id}`} className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Details</Link>
                  <Link href={`/places/${place.id}/book`} className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm">Book</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
