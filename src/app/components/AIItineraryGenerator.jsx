"use client";

import { useState } from 'react';
import { Sparkles, Calendar, MapPin, Loader2, Check, Copy } from 'lucide-react';

export default function AIItineraryGenerator({ destination, onApplyItinerary }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState({
    duration: '',
    interests: '',
    budget: ''
  });

  const handleGenerate = async () => {
    if (!destination || !formData.duration) {
      alert('Please provide destination and duration');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          duration: formData.duration,
          interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
          budget: formData.budget
        })
      });

      const data = await response.json();
      if (data.itinerary) {
        setItinerary(data.itinerary);
      } else {
        alert('Failed to generate itinerary. Please check your API key.');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Error generating itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (itinerary && onApplyItinerary) {
      onApplyItinerary(itinerary);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-dashed border-purple-300 dark:border-purple-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            AI Itinerary Generator
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Let AI create a personalized day-by-day plan
          </p>
        </div>
      </div>

      {!itinerary ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Trip Duration (days) *
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 7"
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="e.g., beaches, temples, food, nightlife"
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Budget Level
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select budget</option>
              <option value="budget">Budget</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.duration}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Itinerary...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate AI Itinerary
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-4 mb-4">
            {itinerary.days?.map((day, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {day.day}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {day.title}
                  </h4>
                </div>

                {day.activities && day.activities.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {day.activities.map((activity, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                )}

                {day.estimatedCost && (
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    Estimated cost: {day.estimatedCost}
                  </div>
                )}

                {day.tips && day.tips.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      💡 Tips:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {day.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleApply}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Apply to Trip
            </button>
            <button
              onClick={() => setItinerary(null)}
              className="px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
