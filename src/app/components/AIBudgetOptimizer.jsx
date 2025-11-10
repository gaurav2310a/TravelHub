"use client";

import { useState } from 'react';
import { Sparkles, DollarSign, TrendingDown, Lightbulb, Loader2, PieChart } from 'lucide-react';

export default function AIBudgetOptimizer({ tripDetails, onUpdateBudget }) {
  const [optimization, setOptimization] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptimize = async () => {
    if (!tripDetails.destination || !tripDetails.duration) {
      alert('Please provide destination and duration');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripDetails)
      });

      const data = await response.json();
      if (data.optimization) {
        setOptimization(data.optimization);
        setIsOpen(true);
      } else {
        alert('Failed to optimize budget. Please check your API key.');
      }
    } catch (error) {
      console.error('Error optimizing budget:', error);
      alert('Error optimizing budget. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">
            AI Budget Optimizer
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get smart budget recommendations
          </p>
        </div>
      </div>

      {!optimization ? (
        <button
          onClick={handleOptimize}
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Budget...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Optimize My Budget
            </>
          )}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Budget Breakdown */}
          {optimization.breakdown && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Recommended Budget Breakdown
                </h4>
              </div>
              <div className="space-y-2">
                {Object.entries(optimization.breakdown).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {category}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {typeof amount === 'string' ? amount : `$${amount}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Range */}
          {optimization.estimatedRange && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Realistic Budget Range
              </h4>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Minimum</p>
                  <p className="text-lg font-bold text-green-600">
                    ${optimization.estimatedRange.min}
                  </p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Maximum</p>
                  <p className="text-lg font-bold text-green-600">
                    ${optimization.estimatedRange.max}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Saving Tips */}
          {optimization.savingTips && optimization.savingTips.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Money-Saving Tips
                </h4>
              </div>
              <ul className="space-y-2">
                {optimization.savingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternatives */}
          {optimization.alternatives && optimization.alternatives.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Budget-Friendly Alternatives
              </h4>
              <div className="space-y-2">
                {optimization.alternatives.map((alt, index) => (
                  <div key={index} className="text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{alt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Tips */}
          {optimization.bookingTips && optimization.bookingTips.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                Best Booking Strategies
              </h4>
              <ul className="space-y-2">
                {optimization.bookingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            {onUpdateBudget && optimization.estimatedRange && (
              <button
                onClick={() => onUpdateBudget(optimization.estimatedRange)}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Apply Budget
              </button>
            )}
            <button
              onClick={() => setOptimization(null)}
              className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition font-medium"
            >
              Reanalyze
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
