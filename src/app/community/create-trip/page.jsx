"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Calendar, Users, DollarSign, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function CreateTripPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    description: '',
    category: 'domestic',
    type: 'beach',
    startDate: '',
    endDate: '',
    budget: '',
    maxParticipants: 4,
    meetupPoint: '',
    activities: [],
    tags: [],
    images: [],
    itinerary: [{ day: 1, title: '', activities: [''] }]
  });

  const [activityInput, setActivityInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to create a trip</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      setFormData(prev => ({ ...prev, activities: [...prev.activities, activityInput.trim()] }));
      setActivityInput('');
    }
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const tag = tagInput.startsWith('#') ? tagInput : `#${tagInput}`;
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', activities: [''] }]
    }));
  };

  const updateItineraryDay = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItineraryActivity = (dayIndex) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex ? { ...item, activities: [...item.activities, ''] } : item
      )
    }));
  };

  const updateItineraryActivity = (dayIndex, activityIndex, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              activities: item.activities.map((act, j) => (j === activityIndex ? value : act))
            }
          : item
      )
    }));
  };

  const removeItineraryActivity = (dayIndex, activityIndex) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === dayIndex
          ? {
              ...item,
              activities: item.activities.filter((_, j) => j !== activityIndex)
            }
          : item
      )
    }));
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const duration = calculateDuration();
    
    const tripData = {
      ...formData,
      duration,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorPhoto: currentUser.profilePhoto,
      authorRole: currentUser.role,
      mapLocation: { lat: 0, lng: 0 }
    };

    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData)
      });

      if (response.ok) {
        const newTrip = await response.json();
        router.push(`/community/trips/${newTrip.id}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Create New Trip</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Share your travel plans with the community</p>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-semibold mb-2">Trip Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Goa Beach Paradise - Join Us!"
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Destination *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Goa, India"
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Trip Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
              >
                <option value="beach">Beach</option>
                <option value="mountain">Mountain</option>
                <option value="cultural">Cultural</option>
                <option value="nature">Nature</option>
                <option value="city">City</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your trip..."
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
              />
            </div>

            {/* Dates & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <div className="px-4 py-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                  {calculateDuration()} days
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Budget per Person (₹) *</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 29999"
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Max Participants *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Meetup Point *</label>
              <input
                type="text"
                name="meetupPoint"
                value={formData.meetupPoint}
                onChange={handleChange}
                required
                placeholder="e.g., Goa International Airport"
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
              />
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-semibold mb-2">Activities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                  placeholder="Add an activity..."
                  className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={addActivity}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.activities.map((activity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {activity}
                    <button type="button" onClick={() => removeActivity(index)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag (e.g., #BeachLife)..."
                  className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold mb-2">Images (URLs)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt={`Trip ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <label className="block text-sm font-semibold mb-2">Itinerary</label>
              <div className="space-y-4">
                {formData.itinerary.map((day, dayIndex) => (
                  <div key={dayIndex} className="border dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Day {day.day}</h4>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                      placeholder="Day title..."
                      className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 mb-2"
                    />
                    <div className="space-y-2">
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => updateItineraryActivity(dayIndex, activityIndex, e.target.value)}
                            placeholder="Activity..."
                            className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                          />
                          {day.activities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItineraryActivity(dayIndex, activityIndex)}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addItineraryActivity(dayIndex)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add Activity
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="w-full py-2 border-2 border-dashed dark:border-gray-700 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  + Add Day
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                Create Trip
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
