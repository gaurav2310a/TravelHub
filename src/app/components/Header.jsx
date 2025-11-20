"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, Search, Users, LogOut, Compass, MapPin, X, Bell, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth() || { currentUser: null, isAuthenticated: false, logout: () => {} };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10 dark:border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TravelHub</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Explore the World</p>
                </div>
              </Link>
              <nav className="hidden lg:flex items-center space-x-1 ml-8">
                <Link href="/" className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Home
                </Link>
              
              {/* Desktop Navigation */}
              {/* <nav className="hidden lg:flex items-center space-x-1 ml-8"> */}
                <Link href="/explore" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 flex items-center gap-2">
                  Explore
                </Link>
                
                <div className="relative group">
                  <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Trips
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-56 py-2 glass-effect bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Your Trips
                    </div>
                    <Link href="/trips/my-trips" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">My Trips</div>
                      <div className="text-xs text-gray-500">View & manage your trips</div>
                    </Link>
                    <Link href="/trips/explore" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">Explore Trips</div>
                      <div className="text-xs text-gray-500">Discover new adventures</div>
                    </Link>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2"></div>
                    <Link href="/trips/create" className="block px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      ✨ Create New Trip
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <Link href="/community" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 mx-2 rounded-xl">Community</Link>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-56 py-2 glass-effect bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Connect & Share
                    </div>
                    <Link href="/community/stories" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">📖 Travel Stories</div>
                      <div className="text-xs text-gray-500">Share your adventures</div>
                    </Link>
                    <Link href="/community/discussions" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">💬 Discussions</div>
                      <div className="text-xs text-gray-500">Join conversations</div>
                    </Link>
                    <Link href="/community/events" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">🎉 Events</div>
                      <div className="text-xs text-gray-500">Meetups & gatherings</div>
                    </Link>
                    <Link href="/community/ask-local" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">🗺️ Ask a Local</div>
                      <div className="text-xs text-gray-500">Get local insights</div>
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <Link href="/nearby/search" >
                    Nearby
                    </Link>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-56 py-2 glass-effect bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Discover Nearby
                    </div>
                    <Link href="/nearby/search" className="block px-4 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-bold">🔍 Search Nearby</div>
                      <div className="text-xs text-gray-500">Google Maps powered</div>
                    </Link>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2"></div>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Quick Links
                    </div>
                    <Link href="/nearby/stays" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">🏨 Stays</div>
                      <div className="text-xs text-gray-500">Hotels & accommodations</div>
                    </Link>
                    <Link href="/nearby/restaurants" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">🍽️ Restaurants</div>
                      <div className="text-xs text-gray-500">Dining options</div>
                    </Link>
                    <Link href="/nearby/essentials" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      <div className="font-medium">🏪 Essential Services</div>
                      <div className="text-xs text-gray-500">ATMs, petrol, etc.</div>
                    </Link>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2"></div>
                    <Link href="/nearby/emergency" className="block px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 mx-2 rounded-xl">
                      🚨 Emergency Services
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              {isAuthenticated && (
                <>
                  {/* Notifications */}
                  <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500"></span>
                  </Link>
                  
                  {/* Messages */}
                  <Link href="/messages" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-blue-500"></span>
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <>
                  <div className="hidden md:flex items-center gap-2">
                    {/* <Link href="/profile" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                      My Profile
                    </Link> */}
                    <Link href='/profile' className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                      <img
                        src={currentUser.profilePhoto}
                        alt={currentUser.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-blue-600 shadow-md"
                      />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{currentUser.name}</span>
                    </Link>
                  </div>
                  <button
                    onClick={logout}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                    Log in
                  </Link>
                  <Link href="/signup" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Sign up
                  </Link>
                </>
              )}              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-0 top-20 bottom-0 w-80 max-w-full glass-effect border-l border-white/10 dark:border-gray-800/50 shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-3">
              {/* Explore Button */}
              <Link href="/explore" className="block px-5 py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-center">
                ✨ Explore
              </Link>
              
              {/* Trips Section */}
              <div className="pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Your Trips
                </div>
                <div className="space-y-1">
                  <Link href="/trips/my-trips" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">My Trips</div>
                    <div className="text-xs text-gray-500">View & manage</div>
                  </Link>
                  <Link href="/trips/explore" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">Explore Trips</div>
                    <div className="text-xs text-gray-500">Discover new adventures</div>
                  </Link>
                  <Link href="/trips/create" className="block px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 border-2 border-dashed border-blue-300 dark:border-blue-700">
                    ✨ Create New Trip
                  </Link>
                </div>
              </div>

              {/* Community Section */}
              <div className="pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Connect & Share
                </div>
                <div className="space-y-1">
                  <Link href="/community/stories" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">📖 Travel Stories</div>
                    <div className="text-xs text-gray-500">Share your adventures</div>
                  </Link>
                  <Link href="/community/discussions" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">💬 Discussions</div>
                    <div className="text-xs text-gray-500">Join conversations</div>
                  </Link>
                  <Link href="/community/events" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">🎉 Events</div>
                    <div className="text-xs text-gray-500">Meetups & gatherings</div>
                  </Link>
                  <Link href="/community/ask-local" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">🗺️ Ask a Local</div>
                    <div className="text-xs text-gray-500">Get local insights</div>
                  </Link>
                </div>
              </div>

              {/* Nearby Section */}
              <div className="pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Link href="/nearby/search" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    Discover Nearby
                  </Link>
                </div>
                <div className="space-y-1">
                  <Link href="/nearby/search" className="block px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 border-2 border-dashed border-blue-300 dark:border-blue-700">
                    🔍 Search Nearby
                    <div className="text-xs text-gray-500 font-normal">Google Maps powered</div>
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Quick Links
                </div>
                <div className="space-y-1">
                  <Link href="/nearby/stays" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">🏨 Stays</div>
                    <div className="text-xs text-gray-500">Hotels & accommodations</div>
                  </Link>
                  <Link href="/nearby/restaurants" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">🍽️ Restaurants</div>
                    <div className="text-xs text-gray-500">Dining options</div>
                  </Link>
                  <Link href="/nearby/essentials" className="block px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200">
                    <div className="font-semibold">🏪 Essential Services</div>
                    <div className="text-xs text-gray-500">ATMs, petrol, etc.</div>
                  </Link>
                  <Link href="/nearby/emergency" className="block px-4 py-3 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 border-2 border-red-200 dark:border-red-900">
                    🚨 Emergency Services
                  </Link>
                </div>
              </div>
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {isAuthenticated ? (
                <>
                  {/* <Link href="/profile" className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    👤 My Profile
                  </Link> */}
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <img
                      src={currentUser.profilePhoto}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                    />
                    <span className="text-base font-semibold text-gray-900 dark:text-white">{currentUser.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-3 rounded-xl text-base font-medium text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Log in
                  </Link>
                  <Link href="/signup" className="block px-4 py-3 rounded-xl text-base font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
