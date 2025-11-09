'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Save, X, Plus, Trash2, MapPin, Calendar, 
  Users, DollarSign, Image as ImageIcon, Tag 
} from 'lucide-react';

export default function EditTripPage() {
  const params = useParams();
  const router = useRouter();

  const [trip, setTrip] = useState({
    title: 'Backpacking Through Southeast Asia',
    destination: 'Thailand, Vietnam, Cambodia',
    coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
    startDate: '2024-12-15',
    endDate: '2025-01-05',
    budget: '1200',
    travelers: 4,
    description: 'An incredible journey through three amazing Southeast Asian countries.',
    highlights: [
      'Visit Angkor Wat at sunrise',
      'Explore Bangkok\'s floating markets',
      'Cruise through Ha Long Bay'
    ],
    tags: ['Backpacking', 'Budget Travel', 'Culture']
  });

  const [itinerary, setItinerary] = useState([
    { day: 1, location: 'Bangkok', activities: ['Arrive in Bangkok', 'Check into hostel'] },
    { day: 2, location: 'Bangkok', activities: ['Grand Palace visit', 'Wat Pho temple'] }
  ]);

  const handleChange = (field, value) => {
    setTrip(prev => ({ ...prev, [field]: value }));
  };

  const addHighlight = () => {
    setTrip(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const updateHighlight = (index, value) => {
    const newHighlights = [...trip.highlights];
    newHighlights[index] = value;
    setTrip(prev => ({ ...prev, highlights: newHighlights }));
  };

  const removeHighlight = (index) => {
    setTrip(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    setTrip(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const updateTag = (index, value) => {
    const newTags = [...trip.tags];
    newTags[index] = value;
    setTrip(prev => ({ ...prev, tags: newTags }));
  };

  const removeTag = (index) => {
    setTrip(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setItinerary(prev => [
      ...prev,
      { day: prev.length + 1, location: '', activities: [''] }
    ]);
  };

  const updateItineraryDay = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addActivity = (dayIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.push('');
    setItinerary(newItinerary);
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities[activityIndex] = value;
    setItinerary(newItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter(
      (_, i) => i !== activityIndex
    );
    setItinerary(newItinerary);
  };

  const removeItineraryDay = (index) => {
    setItinerary(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving trip:', { trip, itinerary });
    alert('Trip updated successfully!');
    router.push(`/trips/${params.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Trip</h1>
              <p className="text-gray-600 dark:text-gray-400">Update your trip details</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Trip Title *
                </label>
                <input
                  type="text"
                  value={trip.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter trip title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Destination *
                </label>
                <input
                  type="text"
                  value={trip.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Paris, France"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={trip.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={trip.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Budget (USD) *
                  </label>
                  <input
                    type="number"
                    value={trip.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Travelers *
                  </label>
                  <input
                    type="number"
                    value={trip.travelers}
                    onChange={(e) => handleChange('travelers', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={trip.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your trip..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={trip.coverImage}
                  onChange={(e) => handleChange('coverImage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {trip.coverImage && (
                  <img
                    src={trip.coverImage}
                    alt="Cover preview"
                    className="mt-3 w-full h-48 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trip Highlights</h2>
              <button
                onClick={addHighlight}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Highlight
              </button>
            </div>
            <div className="space-y-3">
              {trip.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a highlight"
                  />
                  <button
                    onClick={() => removeHighlight(index)}
                    className="p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                <Tag className="w-5 h-5 inline mr-2" />
                Tags
              </h2>
              <button
                onClick={addTag}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {trip.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    className="bg-transparent border-none outline-none text-blue-700 dark:text-blue-300 font-medium w-32"
                    placeholder="Tag name"
                  />
                  <button
                    onClick={() => removeTag(index)}
                    className="text-blue-700 dark:text-blue-300 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Itinerary</h2>
              <button
                onClick={addItineraryDay}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Day
              </button>
            </div>
            <div className="space-y-6">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Day {dayIndex + 1}
                        </label>
                        <input
                          type="text"
                          value={day.location}
                          onChange={(e) => updateItineraryDay(dayIndex, 'location', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Location"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeItineraryDay(dayIndex)}
                      className="ml-3 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Activities
                      </label>
                      <button
                        onClick={() => addActivity(dayIndex)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        + Add Activity
                      </button>
                    </div>
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Activity description"
                        />
                        <button
                          onClick={() => removeActivity(dayIndex, activityIndex)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => router.back()}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
