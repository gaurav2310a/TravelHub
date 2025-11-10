"use client";

import { useState } from 'react';
import { Sparkles, MapPin, DollarSign, Calendar, TrendingUp, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIDestinationSuggestions({ onSelectDestination }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [preferences, setPreferences] = useState({
    budget: '',
    duration: '',
    interests: [],
    travelStyle: '',
    season: ''
  });

  const interestOptions = [
    'Beach', 'Mountains', 'Culture', 'Food', 'Adventure', 
    'History', 'Nature', 'Shopping', 'Nightlife', 'Relaxation'
  ];

  const travelStyles = ['Budget', 'Moderate', 'Luxury', 'Backpacking', 'Comfort'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Any'];

  const toggleInterest = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'destinations',
          ...preferences
        })
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        alert('Failed to get AI suggestions. Please check your API key.');
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Error getting suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        <Sparkles className="w-5 h-5" />
        Get AI Suggestions
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    <div>
                      <h2 className="text-2xl font-bold">AI Destination Finder</h2>
                      <p className="text-sm text-white/80">Let AI help you find your perfect destination</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {!suggestions ? (
                  <div className="space-y-6">
                    {/* Preferences Form */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                        Budget Range
                      </label>
                      <select
                        value={preferences.budget}
                        onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select budget</option>
                        <option value="Under $1000">Under $1000</option>
                        <option value="$1000-$2500">$1000-$2500</option>
                        <option value="$2500-$5000">$2500-$5000</option>
                        <option value="$5000+">$5000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                        Trip Duration
                      </label>
                      <select
                        value={preferences.duration}
                        onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select duration</option>
                        <option value="Weekend (2-3 days)">Weekend (2-3 days)</option>
                        <option value="Short trip (4-7 days)">Short trip (4-7 days)</option>
                        <option value="Week+ (8-14 days)">Week+ (8-14 days)</option>
                        <option value="Extended (15+ days)">Extended (15+ days)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                        Interests (Select multiple)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {interestOptions.map(interest => (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                              preferences.interests.includes(interest)
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                        Travel Style
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {travelStyles.map(style => (
                          <button
                            key={style}
                            onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style }))}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                              preferences.travelStyle === style
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                        Preferred Season
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {seasons.map(season => (
                          <button
                            key={season}
                            onClick={() => setPreferences(prev => ({ ...prev, season }))}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                              preferences.season === season
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {season}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleGetSuggestions}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating Suggestions...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Get AI Recommendations
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Your Personalized Recommendations
                      </h3>
                      <button
                        onClick={() => setSuggestions(null)}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        ← Back to preferences
                      </button>
                    </div>

                    {Array.isArray(suggestions) && suggestions.map((destination, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {destination.name || `Destination ${index + 1}`}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {destination.country || 'Unknown'}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                            Match: {destination.matchScore || '95'}%
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                          {destination.reason || destination.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{destination.bestTime || 'Year-round'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <DollarSign className="w-4 h-4" />
                            <span>{destination.budget || 'Varies'}</span>
                          </div>
                        </div>

                        {destination.activities && destination.activities.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                              TOP ACTIVITIES
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {destination.activities.slice(0, 3).map((activity, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (onSelectDestination) {
                              onSelectDestination(destination);
                            }
                            setIsOpen(false);
                          }}
                          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                          Explore {destination.name}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
