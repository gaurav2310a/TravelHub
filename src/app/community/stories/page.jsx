'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTravelData } from '@/context/TravelDataContext';
import { Search, Heart, MessageCircle, Bookmark, Share2, Plus, Filter, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TravelStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allStories, setAllStories] = useState([]);
  const { stories: contextStories } = useTravelData();

  useEffect(() => {
    // Combine context stories with demo stories
    const demoStories = [
      {
        id: 'demo-1',
        title: 'Solo Backpacking Across Europe: Lessons Learned',
        excerpt: 'My 3-month journey through 15 European countries taught me more about myself than any book ever could...',
        author: 'Sarah Mitchell',
        avatar: 'https://i.pravatar.cc/150?img=20',
        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        category: 'Adventure',
        readTime: '8 min read',
        likes: 234,
        comments: 45,
        views: 1234,
        date: '2 days ago',
        tags: ['Europe', 'Solo Travel', 'Backpacking']
      },
      {
        id: 'demo-2',
        title: 'Finding Peace in the Himalayas',
        excerpt: 'A spiritual journey that changed my perspective on life and travel...',
        author: 'Raj Patel',
        avatar: 'https://i.pravatar.cc/150?img=21',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        category: 'Culture',
        readTime: '12 min read',
        likes: 567,
        comments: 89,
        views: 3421,
        date: '5 days ago',
        tags: ['Himalayas', 'Spiritual', 'Trekking']
      }
    ];

    setAllStories([...contextStories, ...demoStories]);
  }, [contextStories]);

  const stories = allStories;

  const categories = ['all', 'Adventure', 'Culture', 'Food', 'Nature', 'Tips', 'Guides'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">📖 Travel Stories</h1>
              <p className="text-xl text-white/90">Real stories from real travelers around the world</p>
            </div>
            <Link
              href="/community/stories/create"
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Share Your Story
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src={stories[0].coverImage}
                alt={stories[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full">
                  Featured
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                  {stories[0].category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {stories[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {stories[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={stories[0].avatar} alt={stories[0].author} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{stories[0].author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stories[0].readTime}</div>
                  </div>
                </div>
                <Link
                  href={`/community/stories/${stories[0].id}`}
                  className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.slice(1).map((story) => (
            <Link key={story.id} href={`/community/stories/${story.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full">
                    {story.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{story.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{story.comments}</span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <img src={story.avatar} alt={story.author} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{story.author}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{story.date}</div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
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
