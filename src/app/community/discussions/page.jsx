'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, ThumbsUp, Eye, Plus, TrendingUp, Pin } from 'lucide-react';

export default function DiscussionsPage() {
  const discussions = [
    {
      id: 1,
      title: 'Best budget destinations for 2025?',
      author: 'Travel Enthusiast',
      avatar: 'https://i.pravatar.cc/150?img=30',
      category: 'Planning',
      replies: 45,
      views: 1234,
      likes: 89,
      lastActivity: '2 hours ago',
      isPinned: true,
      tags: ['Budget Travel', 'Planning', '2025']
    },
    {
      id: 2,
      title: 'Tips for first-time solo female travelers',
      author: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=31',
      category: 'Safety',
      replies: 67,
      views: 2345,
      likes: 156,
      lastActivity: '5 hours ago',
      isHot: true,
      tags: ['Solo Travel', 'Safety', 'Women']
    },
    {
      id: 3,
      title: 'Visa requirements for EU countries',
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=32',
      category: 'Documentation',
      replies: 23,
      views: 890,
      likes: 45,
      lastActivity: '1 day ago',
      tags: ['Visa', 'Europe', 'Documentation']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">💬 Discussions</h1>
              <p className="text-xl text-white/90">Ask questions, share tips, and connect with fellow travelers</p>
            </div>
            <Link
              href="/community/discussions/create"
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Start Discussion
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-2">
          {['All', 'Planning', 'Safety', 'Documentation', 'Tips', 'Gear', 'Destinations'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-medium whitespace-nowrap hover:shadow-md transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link key={discussion.id} href={`/community/discussions/${discussion.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-4">
                  <img src={discussion.avatar} alt={discussion.author} className="w-12 h-12 rounded-full" />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.isPinned && <Pin className="w-4 h-4 text-purple-600" />}
                          {discussion.isHot && <TrendingUp className="w-4 h-4 text-red-600" />}
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {discussion.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span>by <span className="font-medium">{discussion.author}</span></span>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                            {discussion.category}
                          </span>
                          <span>•</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{discussion.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
