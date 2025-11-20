'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTravelData } from '@/context/TravelDataContext';
import { Image, MapPin, Calendar, Tag, Edit3, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateStory() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { addStory } = useTravelData();
  const [loading, setLoading] = useState(false);
  const [storyData, setStoryData] = useState({
    title: '',
    destination: '',
    date: '',
    content: '',
    images: [],
    tags: '',
  });

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('storyDraft');
    if (savedDraft) {
      try {
        setStoryData(JSON.parse(savedDraft));
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('storyDraft', JSON.stringify(storyData));
    }, 1000);

    return () => clearTimeout(timer);
  }, [storyData]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a storage service
    setStoryData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(f => f.name)]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newStory = addStory({
        ...storyData,
        authorId: currentUser?.id,
        authorName: currentUser?.name,
        authorPhoto: currentUser?.profilePhoto,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Clear draft after successful submission
      localStorage.removeItem('storyDraft');
      
      router.push('/community/stories');
    } catch (error) {
      console.error('Failed to create story:', error);
      alert('Failed to create story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create Travel Story</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Story Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="input-field"
                placeholder="Give your story a catchy title"
                value={storyData.title}
                onChange={(e) => setStoryData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline-block mr-2" />
                Destination
              </label>
              <input
                type="text"
                id="destination"
                required
                className="input-field"
                placeholder="Where did you go?"
                value={storyData.destination}
                onChange={(e) => setStoryData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline-block mr-2" />
                Travel Date
              </label>
              <input
                type="date"
                id="date"
                required
                className="input-field"
                value={storyData.date}
                onChange={(e) => setStoryData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            {/* Story Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Edit3 className="w-4 h-4 inline-block mr-2" />
                Your Story
              </label>
              <textarea
                id="content"
                required
                rows={8}
                className="input-field"
                placeholder="Share your travel experience..."
                value={storyData.content}
                onChange={(e) => setStoryData(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>

            {/* Images */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Image className="w-4 h-4 inline-block mr-2" />
                Add Photos
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
              {storyData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {storyData.images.map((file, index) => (
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
                placeholder="Add tags separated by commas (e.g., Adventure, Beach, Culture)"
                value={storyData.tags}
                onChange={(e) => setStoryData(prev => ({ ...prev, tags: e.target.value }))}
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
                {loading ? 'Publishing...' : 'Publish Story'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}