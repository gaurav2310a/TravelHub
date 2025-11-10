"use client";

import { useState } from 'react';
import { Sparkles, Lightbulb, AlertCircle, Info, Loader2 } from 'lucide-react';

export default function AITravelTips({ destination, travelDates, travelers }) {
  const [tips, setTips] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchTips = async () => {
    if (!destination) {
      alert('Please provide a destination');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          travelDates,
          travelers
        })
      });

      const data = await response.json();
      if (data.tips) {
        setTips(data.tips);
        setIsExpanded(true);
      } else {
        alert('Failed to generate tips. Please check your API key.');
      }
    } catch (error) {
      console.error('Error fetching travel tips:', error);
      alert('Error fetching tips. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  if (!isExpanded && !tips) {
    return (
      <button
        onClick={fetchTips}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Getting AI Tips...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Get AI Travel Tips
          </>
        )}
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
              AI Travel Tips
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personalized advice for {destination}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isExpanded && tips && (
        <div className="space-y-3">
          {Array.isArray(tips) && tips.map((tip, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${getImportanceColor(tip.importance)}`}
            >
              <div className="flex items-start gap-3">
                {getImportanceIcon(tip.importance)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {tip.category}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {tip.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={fetchTips}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Refreshing Tips...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Refresh Tips
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
