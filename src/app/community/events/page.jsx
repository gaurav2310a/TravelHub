'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Tokyo Travel Meetup',
      location: 'Tokyo, Japan',
      date: '2024-12-20',
      time: '18:00',
      attendees: 24,
      maxAttendees: 30,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      organizer: 'Yuki Tanaka',
      avatar: 'https://i.pravatar.cc/150?img=40',
      category: 'Meetup',
      price: 'Free'
    },
    {
      id: 2,
      title: 'Hiking & Photography Workshop',
      location: 'Swiss Alps',
      date: '2025-01-15',
      time: '09:00',
      attendees: 12,
      maxAttendees: 15,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      organizer: 'Hans Mueller',
      avatar: 'https://i.pravatar.cc/150?img=41',
      category: 'Workshop',
      price: '$120'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">🎉 Events & Meetups</h1>
              <p className="text-xl text-white/90">Connect with travelers in person</p>
            </div>
            <Link
              href="/community/events/create"
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/community/events/${event.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                    {event.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <img src={event.avatar} alt={event.organizer} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.organizer}</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{event.price}</span>
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
