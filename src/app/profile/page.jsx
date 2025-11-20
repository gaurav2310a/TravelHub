'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTravelData } from '@/context/TravelDataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Heart,
  MessageCircle,
  Edit,
  LogOut,
  ArrowRight,
  MapPinIcon,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const { getMyTrips, getMyStories, getMyQuestions } = useTravelData();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setEditData(currentUser);
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const myTrips = getMyTrips(currentUser.id);
  const myStories = getMyStories(currentUser.id);
  const myQuestions = getMyQuestions(currentUser.id);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveProfile = () => {
    // In a real app, this would update via API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={currentUser.profilePhoto || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {currentUser.verified && (
                <div className="absolute bottom-0 right-0 bg-green-400 rounded-full p-2">
                  <Award className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{currentUser.name}</h1>
              <p className="text-blue-100 text-lg mb-4">{currentUser.role}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                {currentUser.location && (
                  <div className="flex items-center gap-2 bg-blue-500/30 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span>{currentUser.location}</span>
                  </div>
                )}
                {currentUser.joinedDate && (
                  <div className="flex items-center gap-2 bg-blue-500/30 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(currentUser.joinedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bio and Details */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Edit Mode */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={editData?.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={editData?.location || ''}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bio</label>
                <textarea
                  value={editData?.bio || ''}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Bio Section */}
        {!isEditing && currentUser.bio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="text-gray-700">{currentUser.bio}</p>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">{myTrips.length}</div>
            <div className="text-gray-600 font-semibold">My Trips</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-3xl font-bold text-indigo-600 mb-2">{myStories.length}</div>
            <div className="text-gray-600 font-semibold">Stories</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">{myQuestions.length}</div>
            <div className="text-gray-600 font-semibold">Questions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-3xl font-bold text-green-600 mb-2">{currentUser.role}</div>
            <div className="text-gray-600 font-semibold">Role</div>
          </motion.div>
        </div>

        {/* My Trips */}
        {myTrips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Trips</h2>
              <Link href="/trips/create" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                Create New <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTrips.slice(0, 4).map(trip => (
                <div key={trip.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="font-bold text-lg mb-2">{trip.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{trip.destination}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(trip.createdAt).toLocaleDateString()}</span>
                    <Link href={`/community/trips/${trip.id}`} className="text-blue-600 hover:underline">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* My Stories */}
        {myStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Stories</h2>
              <Link href="/community/stories/create" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                Create New <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {myStories.slice(0, 3).map(story => (
                <div key={story.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="font-bold mb-1">{story.title}</h3>
                  <p className="text-gray-600 text-sm">{story.destination}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {myTrips.length === 0 && myStories.length === 0 && myQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No content yet</h2>
            <p className="text-gray-600 mb-8">Start sharing your travel experiences!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/trips/create" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Create Trip
              </Link>
              <Link href="/community/stories/create" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                Write Story
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
