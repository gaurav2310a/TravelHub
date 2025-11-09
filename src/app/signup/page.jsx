"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { USER_ROLES } from '@/lib/community';
import { motion } from 'framer-motion';
import { User, Mail, Lock, MapPin, UserPlus, Chrome, Facebook } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, socialLogin } = useAuth();
  const [socialLoading, setSocialLoading] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: USER_ROLES.TRAVELER,
    bio: '',
    location: '',
    profilePhoto: 'https://randomuser.me/api/portraits/lego/1.jpg'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password || !form.name || !form.location) {
      setError('Please fill all required fields');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const userData = {
      ...form,
      interests: [],
      languagesSpoken: ['English']
    };

    const result = await signup(userData);
    
    if (result.success) {
      router.push('/community');
    } else {
      setError(result.error || 'Failed to create account');
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    setSocialLoading(provider);
    setError('');

    const result = await socialLogin(provider);
    
    if (result.success) {
      router.push('/community');
    } else {
      setError(result.error || `${provider} signup failed`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
            TH
          </div>
          <h1 className="text-3xl font-bold mb-2">Join TravelHub</h1>
          <p className="text-gray-600 dark:text-gray-400">Create your account and start exploring</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialSignup('Google')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              {socialLoading === 'Google' ? 'Connecting...' : 'Sign up with Google'}
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup('Facebook')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              {socialLoading === 'Facebook' ? 'Connecting...' : 'Sign up with Facebook'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or sign up with email</span>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Location *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="Mumbai, India"
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Profile Type *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value={USER_ROLES.TRAVELER}>🎒 Traveler - Share trips and connect</option>
              <option value={USER_ROLES.TRAVEL_AGENCY}>🏢 Travel Agency - Offer tour packages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              'Creating account...'
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
