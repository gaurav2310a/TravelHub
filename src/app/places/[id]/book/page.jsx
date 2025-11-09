"use client";

import { useState, use } from 'react';
import { getPlaceById, formatINR, INTERESTS, isUserCompatible } from '@/lib/trips';
import { useRouter } from 'next/navigation';
import { Users, Calendar, Clock, Star, Heart, X, MessageCircle } from 'lucide-react';

// Mock current user - In a real app, this would come from authentication
const currentUser = {
  id: 'user4',
  name: 'Alex Kumar',
  age: 29,
  image: 'https://randomuser.me/api/portraits/men/4.jpg',
  interests: ['Photography', 'Cultural Exploration', 'Food & Cuisine'],
  languagesSpoken: ['English', 'Hindi', 'Spanish'],
  bio: 'Adventure seeker looking for travel buddies! Love exploring new cultures and capturing moments through my lens.',
  tripStyle: 'Mix of planned activities and spontaneous exploration',
  travelExperience: 'Intermediate'
};

// Mock potential travel buddies based on trip preferences
const potentialBuddies = [
  {
    id: 'user5',
    name: 'Sarah Chen',
    age: 27,
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    interests: ['Photography', 'Hiking', 'Local Experiences'],
    languagesSpoken: ['English', 'Mandarin', 'Hindi'],
    bio: 'Nature lover and foodie. Always up for a hiking adventure or trying local delicacies!',
    tripStyle: 'Active and outdoorsy',
    travelExperience: 'Experienced'
  },
  {
    id: 'user6',
    name: 'Marco Silva',
    age: 31,
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    interests: ['Cultural Exploration', 'History & Heritage', 'Food & Cuisine'],
    languagesSpoken: ['English', 'Portuguese', 'Spanish'],
    bio: 'History buff and culture enthusiast. Love learning about local traditions and stories.',
    tripStyle: 'Cultural immersion',
    travelExperience: 'Expert'
  }
];

export default function BookPage({ params }) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    selectedInterests: [],
    tripStyle: '',
    groupSize: 2,
    languagePreference: [],
    additionalNotes: ''
  });
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState(null);

  const router = useRouter();
  const place = getPlaceById(use(params).id);

  if (!place) return <div className="p-8">Place not found</div>;

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBuddy) {
      setShowMatchModal(true);
      // In a real app, this would create the booking and establish the connection
      setTimeout(() => {
        router.push('/places');
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Join Trip: {place.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Price per person:</span>
                <span className="text-xl font-bold text-blue-600">{formatINR(place.price)}</span>
              </div>
            </div>

            {step === 1 ? (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">About You</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    rows={4}
                    placeholder="Tell your potential travel buddies about yourself..."
                    defaultValue={currentUser.bio}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Travel Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          preferences.selectedInterests.includes(interest)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Travel Style</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    value={preferences.tripStyle}
                    onChange={(e) => setPreferences(prev => ({ ...prev, tripStyle: e.target.value }))}
                  >
                    <option value="">Select your travel style</option>
                    <option value="adventurous">Adventurous & Spontaneous</option>
                    <option value="relaxed">Relaxed & Easy-going</option>
                    <option value="cultural">Cultural & Educational</option>
                    <option value="luxury">Luxury & Comfort</option>
                    <option value="budget">Budget & Backpacking</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Next: Find Travel Buddies
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {potentialBuddies.map(buddy => {
                    const compatibility = isUserCompatible(currentUser, buddy);
                    return (
                      <div key={buddy.id} className="border rounded-lg p-4 relative dark:border-gray-700">
                        <div className="absolute top-2 right-2">
                          <div className="text-sm font-semibold text-blue-600">
                            {Math.round(compatibility.score * 100)}% Match
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <img src={buddy.image} alt={buddy.name} className="w-16 h-16 rounded-full" />
                          <div>
                            <h3 className="font-semibold">{buddy.name}, {buddy.age}</h3>
                            <p className="text-sm text-gray-500">{buddy.travelExperience} Traveler</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{buddy.bio}</p>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Common Interests:</p>
                            <div className="flex flex-wrap gap-1">
                              {compatibility.commonInterests.map((interest, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500 mb-1">Languages:</p>
                            <div className="flex flex-wrap gap-1">
                              {compatibility.commonLanguages.map((lang, index) => (
                                <span key={index} className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded">
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => setSelectedBuddy(buddy)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                              selectedBuddy?.id === buddy.id
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {selectedBuddy?.id === buddy.id ? (
                              <>Selected</>
                            ) : (
                              <>
                                <MessageCircle size={18} />
                                Connect
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={!selectedBuddy}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking with Selected Buddy
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-500" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Dates</div>
                  <div className="font-medium">{new Date(place.tripDates.start).toLocaleDateString()} - {new Date(place.tripDates.end).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-gray-500" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{place.duration} days</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-gray-500" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Group Size</div>
                  <div className="font-medium">{place.currentParticipants}/{place.maxGroupSize} travelers</div>
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-200 dark:border-gray-700" />

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Price per person</span>
              <span className="text-xl font-bold text-blue-600">{formatINR(place.price)}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Trip Creator</h2>
            <div className="flex items-center gap-4">
              <img src={place.createdBy.image} alt={place.createdBy.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="font-semibold">{place.createdBy.name}</h3>
                <p className="text-sm text-gray-500">{place.createdBy.age} years</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-blue-600 hover:text-blue-700 transition">
                    <MessageCircle size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-700 transition">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Success Modal */}
      {showMatchModal && selectedBuddy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold mb-2">It's a Match! 🎉</div>
              <p className="text-gray-600 dark:text-gray-400">
                You and {selectedBuddy.name} are going to {place.name} together!
              </p>
            </div>

            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <img src={currentUser.image} alt={currentUser.name} className="w-20 h-20 rounded-full mb-2" />
                <div className="font-medium">{currentUser.name}</div>
              </div>
              <div className="text-center">
                <img src={selectedBuddy.image} alt={selectedBuddy.name} className="w-20 h-20 rounded-full mb-2" />
                <div className="font-medium">{selectedBuddy.name}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowMatchModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Close
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <MessageCircle size={18} />
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
