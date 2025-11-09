'use client';

import { useState } from 'react';
import { Bell, Calendar, MessageSquare, Heart, UserPlus, Check, Settings } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      message: 'Priya Sharma liked your travel story about Goa',
      timestamp: '2 hours ago',
      isRead: false,
      icon: Heart,
      iconColor: 'text-pink-500',
      link: '/community/stories/1'
    },
    {
      id: 2,
      type: 'event',
      message: 'Upcoming event: Trekking in Ladakh starts tomorrow',
      timestamp: '5 hours ago',
      isRead: false,
      icon: Calendar,
      iconColor: 'text-blue-500',
      link: '/community/events/2'
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from Rahul about the Delhi trip',
      timestamp: '1 day ago',
      isRead: true,
      icon: MessageSquare,
      iconColor: 'text-green-500',
      link: '/messages/3'
    },
    {
      id: 4,
      type: 'follow',
      message: 'Zara Khan started following you',
      timestamp: '2 days ago',
      isRead: true,
      icon: UserPlus,
      iconColor: 'text-purple-500',
      link: '/profile/zara'
    }
  ]);

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-gray-900 dark:text-white" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
            <button className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all ${
                  !notification.isRead ? 'border-l-4 border-blue-500' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={`p-3 rounded-xl ${notification.isRead ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-50 dark:bg-blue-900'}`}>
                  <IconComponent className={`w-6 h-6 ${notification.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm text-gray-900 dark:text-white mb-1 ${!notification.isRead ? 'font-medium' : ''}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.timestamp}
                  </span>
                </div>
                <button className="shrink-0 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Check className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}