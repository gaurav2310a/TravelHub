"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getUserById, getRoleBadge, formatDate } from '@/lib/community';
import { getTripsByUserId } from '@/lib/communityTrips';
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Mail,
  Globe,
  Instagram,
  Facebook,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function UserProfilePage({ params }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('trips');

  useEffect(() => {
    // Extract id from params
    const loadParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      setId(resolvedParams.id);
    };
    
    loadParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const userData = getUserById(id);
      if (userData) {
        setUser(userData);
        setUserTrips(getTripsByUserId(id));
      }
    }
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <Link href="/community" className="text-blue-600 hover:underline">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  const badge = getRoleBadge(user.role);
  const isOwnProfile = currentUser && currentUser.id === user.id;

  const handleFollow = () => {
    if (!isAuthenticated) {
      alert('Please login to follow users');
      return;
    }
    setIsFollowing(!isFollowing);
    setUser({ ...user, followers: isFollowing ? user.followers - 1 : user.followers + 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative">
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              {user.verified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <span className={`px-4 py-1 rounded-full text-sm ${badge.color} bg-white dark:bg-gray-800`}>
                  {badge.icon} {badge.label}
                </span>
              </div>
              <p className="text-xl opacity-90 mb-4">{user.bio}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(user.stats.joinedDate)}
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.totalTrips}</div>
                  <div className="text-sm opacity-80">Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.followers}</div>
                  <div className="text-sm opacity-80">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.following}</div>
                  <div className="text-sm opacity-80">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.destinationsVisited}</div>
                  <div className="text-sm opacity-80">Destinations</div>
                </div>
              </div>

              {!isOwnProfile && isAuthenticated && (
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <button
                    onClick={handleFollow}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      isFollowing
                        ? 'bg-white/20 hover:bg-white/30'
                        : 'bg-white text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Message
                  </button>
                </div>
              )}

              {isOwnProfile && (
                <Link
                  href="/profile/edit"
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6">
              <div className="flex border-b dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('trips')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'trips'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Trips ({userTrips.length})
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'about'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  About
                </button>
              </div>
            </div>

            {/* Trips Tab */}
            {activeTab === 'trips' && (
              <div className="space-y-6">
                {userTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/community/trips/${trip.id}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          <div className="relative h-48 md:h-full overflow-hidden">
                            <img
                              src={trip.images[0]}
                              alt={trip.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                          </div>
                          <div className="md:col-span-2 p-6">
                            <h3 className="text-2xl font-bold mb-2">{trip.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                              {trip.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {trip.destination}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {trip.duration} days
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {trip.currentParticipants}/{trip.maxParticipants} spots
                              </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <Heart className="w-4 h-4" />
                                {trip.likes}
                              </span>
                              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                {trip.comments}
                              </span>
                              <span className="text-blue-600 font-semibold">₹{trip.budget.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {userTrips.length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {isOwnProfile ? "You haven't created any trips yet" : "This user hasn't created any trips yet"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">About {user.name}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Bio</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.languagesSpoken.map((language, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {user.socialLinks && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Social Links</h3>
                      <div className="flex flex-wrap gap-4">
                        {user.socialLinks.instagram && (
                          <a
                            href={`https://instagram.com/${user.socialLinks.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
                          >
                            <Instagram className="w-5 h-5" />
                            {user.socialLinks.instagram}
                          </a>
                        )}
                        {user.socialLinks.facebook && (
                          <a
                            href={`https://facebook.com/${user.socialLinks.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Facebook className="w-5 h-5" />
                            {user.socialLinks.facebook}
                          </a>
                        )}
                        {user.socialLinks.website && (
                          <a
                            href={user.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                          >
                            <Globe className="w-5 h-5" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {user.agencyInfo && (
                    <div className="border-t dark:border-gray-700 pt-6">
                      <h3 className="font-semibold text-lg mb-3">Agency Information</h3>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p><strong>Registration:</strong> {user.agencyInfo.registrationNumber}</p>
                        <p><strong>Years in Business:</strong> {user.agencyInfo.yearsInBusiness} years</p>
                        <p><strong>Specializations:</strong> {user.agencyInfo.specializations.join(', ')}</p>
                        {user.agencyInfo.bookingLink && (
                          <a
                            href={user.agencyInfo.bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Book with Us
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Trips</span>
                  <span className="font-bold text-blue-600">{user.stats.totalTrips}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Destinations Visited</span>
                  <span className="font-bold text-blue-600">{user.stats.destinationsVisited}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Likes</span>
                  <span className="font-bold text-blue-600">{user.stats.totalLikes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-bold">{new Date(user.stats.joinedDate).getFullYear()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
