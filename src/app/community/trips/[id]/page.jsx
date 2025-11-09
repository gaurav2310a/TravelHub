"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getTripById, getCommentsByTripId, likeTrip } from '@/lib/communityTrips';
import { getRoleBadge, formatDate, formatRelativeTime } from '@/lib/community';
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Send,
  CheckCircle
} from 'lucide-react';

export default function TripDetailPage({ params }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [id, setId] = useState(null);
  const [trip, setTrip] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
      const tripData = getTripById(id);
      if (tripData) {
        setTrip(tripData);
        setComments(getCommentsByTripId(id));
      }
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Trip not found</h2>
          <Link href="/community" className="text-blue-600 hover:underline">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  const badge = getRoleBadge(trip.authorRole);
  const availableSpots = trip.maxParticipants - trip.currentParticipants;

  const handleLike = () => {
    if (!isAuthenticated) {
      alert('Please login to like this trip');
      return;
    }
    setTrip({ ...trip, likes: trip.likes + 1 });
    setHasLiked(true);
  };

  const handleJoinTrip = async () => {
    if (!isAuthenticated) {
      alert('Please login to join this trip');
      return;
    }

    if (availableSpots <= 0) {
      alert('This trip is fully booked');
      return;
    }

    try {
      const response = await fetch(`/api/trips/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', userId: currentUser.id })
      });

      if (response.ok) {
        const updatedTrip = await response.json();
        setTrip(updatedTrip);
        alert('Join request sent successfully!');
      }
    } catch (error) {
      console.error('Error joining trip:', error);
      alert('Failed to send join request');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }

    if (!commentText.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: id,
          userId: currentUser.id,
          content: commentText
        })
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setCommentText('');
        setTrip({ ...trip, comments: trip.comments + 1 });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Images */}
      <section className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img
                src={trip.images[activeImage] || trip.images[0]}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {trip.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-44 rounded-xl overflow-hidden cursor-pointer ${
                    activeImage === index ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <img src={image} alt={`Trip ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${badge.color}`}>
                      {badge.icon} {badge.label}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                      {trip.category === 'domestic' ? '🇮🇳 Domestic' : '✈️ International'}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">{trip.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Link href={`/community/users/${trip.authorId}`} className="flex items-center gap-2 hover:opacity-80">
                      <img
                        src={trip.authorPhoto}
                        alt={trip.authorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{trip.authorName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{formatRelativeTime(trip.createdAt)}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{trip.currentParticipants}/{trip.maxParticipants} participants</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{trip.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {trip.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-6 border-t dark:border-gray-700">
                <button
                  onClick={handleLike}
                  disabled={hasLiked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    hasLiked
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{trip.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>{trip.comments}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Activities</h2>
              <div className="flex flex-wrap gap-2">
                {trip.activities.map((activity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-bold text-lg mb-2">Day {day.day}: {day.title}</h3>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              id="comments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Discussion ({comments.length})</h2>

              {/* Comment Form */}
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
                    <img
                      src={currentUser.profilePhoto}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={3}
                        className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700 resize-none"
                      />
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                  <p className="mb-2">Please login to comment</p>
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <img
                      src={comment.userPhoto}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.userName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getRoleBadge(comment.userRole).color}`}>
                          {getRoleBadge(comment.userRole).icon}
                        </span>
                        <span className="text-sm text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <button className="hover:text-red-500 flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {comment.likes}
                        </button>
                        <button className="hover:text-blue-500">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4"
            >
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Price per person</div>
                <div className="text-4xl font-bold text-blue-600 mb-1">₹{trip.budget.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{trip.duration} days trip</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Available Spots</span>
                  <span className={`font-semibold ${availableSpots > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {availableSpots} / {trip.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Meetup Point</span>
                  <span className="font-semibold text-right">{trip.meetupPoint}</span>
                </div>
              </div>

              {trip.bookingLink ? (
                <a
                  href={trip.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition mb-3"
                >
                  Book Now
                </a>
              ) : (
                <button
                  onClick={handleJoinTrip}
                  disabled={availableSpots <= 0}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition mb-3"
                >
                  {availableSpots > 0 ? 'Request to Join' : 'Fully Booked'}
                </button>
              )}

              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                Message Organizer
              </button>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h3 className="font-semibold mb-3">Trip Type</h3>
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
