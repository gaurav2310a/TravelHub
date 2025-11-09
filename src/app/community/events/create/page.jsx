'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Calendar, Clock, Users, Tag, Image } from 'lucide-react';

export default function CreateEvent() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    images: [],
    tags: '',
    type: '',
    cost: '',
    requirements: '',
  });

  const eventTypes = [
    'Meetup',
    'Group Trip',
    'Workshop',
    'Cultural Experience',
    'Adventure Activity',
    'Food & Dining',
    'Photography Tour',
    'Other'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a storage service
    setEventData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this to your API
      console.log('Event Data:', {
        ...eventData,
        organizerId: currentUser?.id,
        createdAt: new Date().toISOString()
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/community/events');
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create Community Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="input-field"
                placeholder="Give your event a catchy title"
                value={eventData.title}
                onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Event Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Type
              </label>
              <select
                id="type"
                required
                className="input-field"
                value={eventData.type}
                onChange={(e) => setEventData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Description
              </label>
              <textarea
                id="description"
                required
                rows={6}
                className="input-field"
                placeholder="Describe your event in detail..."
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline-block mr-2" />
                Location
              </label>
              <input
                type="text"
                id="location"
                required
                className="input-field"
                placeholder="Where will the event take place?"
                value={eventData.location}
                onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline-block mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  className="input-field"
                  value={eventData.date}
                  onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  required
                  className="input-field"
                  value={eventData.time}
                  onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users className="w-4 h-4 inline-block mr-2" />
                Maximum Participants
              </label>
              <input
                type="number"
                id="maxParticipants"
                required
                min="1"
                className="input-field"
                placeholder="How many people can join?"
                value={eventData.maxParticipants}
                onChange={(e) => setEventData(prev => ({ ...prev, maxParticipants: e.target.value }))}
              />
            </div>

            {/* Cost */}
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cost per Person (₹)
              </label>
              <input
                type="number"
                id="cost"
                min="0"
                className="input-field"
                placeholder="Leave empty if free"
                value={eventData.cost}
                onChange={(e) => setEventData(prev => ({ ...prev, cost: e.target.value }))}
              />
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requirements
              </label>
              <textarea
                id="requirements"
                rows={4}
                className="input-field"
                placeholder="Any special requirements or things participants should bring?"
                value={eventData.requirements}
                onChange={(e) => setEventData(prev => ({ ...prev, requirements: e.target.value }))}
              />
            </div>

            {/* Images */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Image className="w-4 h-4 inline-block mr-2" />
                Event Images
              </label>
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  dark:file:bg-gray-700 dark:file:text-gray-300"
                onChange={handleImageUpload}
              />
              {eventData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {eventData.images.map((file, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4 inline-block mr-2" />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                className="input-field"
                placeholder="Add tags separated by commas (e.g., Hiking, Photography, Cultural)"
                value={eventData.tags}
                onChange={(e) => setEventData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}