'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Calendar, Tag, HelpCircle } from 'lucide-react';

export default function CreateAskLocal() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    destination: '',
    travelDate: '',
    question: '',
    tags: '',
    category: '',
  });

  const categories = [
    'Local Tips',
    'Safety',
    'Transportation',
    'Food & Dining',
    'Accommodation',
    'Culture & Customs',
    'Shopping',
    'Nightlife',
    'Family Activities',
    'Hidden Gems',
    'Budget Tips',
    'Weather & Climate',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this to your API
      console.log('Question Data:', {
        ...questionData,
        authorId: currentUser?.id,
        createdAt: new Date().toISOString()
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/community/ask-local');
    } catch (error) {
      console.error('Failed to create question:', error);
      alert('Failed to create question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ask a Local</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <HelpCircle className="w-4 h-4 inline-block mr-2" />
                Question Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="input-field"
                placeholder="What would you like to know?"
                value={questionData.title}
                onChange={(e) => setQuestionData(prev => ({ ...prev, title: e.target.value }))}
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
                placeholder="Which place are you asking about?"
                value={questionData.destination}
                onChange={(e) => setQuestionData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                required
                className="input-field"
                value={questionData.category}
                onChange={(e) => setQuestionData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline-block mr-2" />
                When are you planning to visit? (Optional)
              </label>
              <input
                type="date"
                id="travelDate"
                className="input-field"
                value={questionData.travelDate}
                onChange={(e) => setQuestionData(prev => ({ ...prev, travelDate: e.target.value }))}
              />
            </div>

            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Question
              </label>
              <textarea
                id="question"
                required
                rows={6}
                className="input-field"
                placeholder="Describe what you'd like to know in detail..."
                value={questionData.question}
                onChange={(e) => setQuestionData(prev => ({ ...prev, question: e.target.value }))}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tips: Be specific about what you want to know, mention your preferences or constraints, and ask one main question per post.
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
                placeholder="Add tags separated by commas (e.g., Food, Budget, Family)"
                value={questionData.tags}
                onChange={(e) => setQuestionData(prev => ({ ...prev, tags: e.target.value }))}
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
                {loading ? 'Posting...' : 'Post Question'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}