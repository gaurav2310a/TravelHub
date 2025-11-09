'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MapPin, MessageCircle, ThumbsUp, Search, Plus } from 'lucide-react';

export default function AskLocalPage() {
  const questions = [
    {
      id: 1,
      question: 'Best local restaurants in Paris not mentioned in guidebooks?',
      location: 'Paris, France',
      askedBy: 'Tourist123',
      avatar: 'https://i.pravatar.cc/150?img=50',
      answers: 12,
      likes: 45,
      timeAgo: '2 hours ago',
      tags: ['Food', 'Paris']
    },
    {
      id: 2,
      question: 'Safe areas to stay in Bangkok for first-time visitors?',
      location: 'Bangkok, Thailand',
      askedBy: 'Traveler99',
      avatar: 'https://i.pravatar.cc/150?img=51',
      answers: 8,
      likes: 23,
      timeAgo: '5 hours ago',
      tags: ['Safety', 'Accommodation']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">🗺️ Ask a Local</h1>
              <p className="text-xl text-white/90">Get insider tips from people who live there</p>
            </div>
            <Link 
            href="/community/ask-local/create"
            className="flex items-center gap-2 px-6 py-3 bg-white text-teal-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
              <Plus className="w-5 h-5" />
              Ask Question
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location or question..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex gap-4">
                <img src={q.avatar} alt={q.askedBy} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{q.question}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{q.location}</span>
                    <span>•</span>
                    <span>Asked by {q.askedBy}</span>
                    <span>•</span>
                    <span>{q.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-teal-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">{q.answers} answers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{q.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
