"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Chrome, Facebook } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, socialLogin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(form.email, form.password);
    
    if (result.success) {
      router.push('/community');
    } else {
      setError(result.error || 'Invalid credentials');
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setError('');

    const result = await socialLogin(provider);
    
    if (result.success) {
      router.push('/community');
    } else {
      setError(result.error || `${provider} login failed`);
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
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Log in to your TravelHub account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 text-red-500" />
              {socialLoading === 'Google' ? 'Connecting...' : 'Continue with Google'}
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              {socialLoading === 'Facebook' ? 'Connecting...' : 'Continue with Facebook'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Demo accounts:</p>
            <div className="text-xs space-y-1 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              <p><strong>Traveler:</strong> rahul.kapoor@example.com / hashed_password</p>
              <p><strong>Featured:</strong> priya.sharma@example.com / hashed_password</p>
              <p><strong>Agency:</strong> info@wanderlust.com / hashed_password</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
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
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              'Logging in...'
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Log in
              </>
            )}
          </button>
        </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
