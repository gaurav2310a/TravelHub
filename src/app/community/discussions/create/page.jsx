'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Tag, MessageCircle, List } from 'lucide-react';

export default function CreateDiscussion() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [discussionData, setDiscussionData] = useState({
    title: '',
    topic: '',
    content: '',
    tags: '',
  });

  const topics = [
    'Travel Tips',
    'Destination Advice',
    'Solo Travel',
    'Group Travel',
    'Budget Travel',
    'Luxury Travel',
    'Adventure',
    'Cultural Exchange',
    'Safety',
    'Transportation',
    'Accommodation',
    'Food & Cuisine',
    'Photography',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this to your API
      console.log('Discussion Data:', {
        ...discussionData,
        authorId: currentUser?.id,
        createdAt: new Date().toISOString()
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/community/discussions');
    } catch (error) {
      console.error('Failed to create discussion:', error);
      alert('Failed to create discussion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Start a Discussion</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MessageCircle className="w-4 h-4 inline-block mr-2" />
                Discussion Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="input-field"
                placeholder="What would you like to discuss?"
                value={discussionData.title}
                onChange={(e) => setDiscussionData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Topic */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <List className="w-4 h-4 inline-block mr-2" />
                Topic
              </label>
              <select
                id="topic"
                required
                className="input-field"
                value={discussionData.topic}
                onChange={(e) => setDiscussionData(prev => ({ ...prev, topic: e.target.value }))}
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discussion Content
              </label>
              <textarea
                id="content"
                required
                rows={8}
                className="input-field"
                placeholder="Share your thoughts, questions, or experiences..."
                value={discussionData.content}
                onChange={(e) => setDiscussionData(prev => ({ ...prev, content: e.target.value }))}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tips: Be clear and specific, provide examples if possible, and be respectful of others' views.
              </p>
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
                placeholder="Add tags separated by commas (e.g., Advice, Tips, Safety)"
                value={discussionData.tags}
                onChange={(e) => setDiscussionData(prev => ({ ...prev, tags: e.target.value }))}
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
                {loading ? 'Creating...' : 'Create Discussion'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}