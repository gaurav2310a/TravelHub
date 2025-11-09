'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handle initial authentication state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('authToken');
        
        if (storedUser && token) {
          const userData = JSON.parse(storedUser);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call - In production, replace with actual API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        return { success: false, error: 'Invalid credentials' };
      }

      const data = await response.json();
      
      // Store user data and token
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      setCurrentUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Social login function
  const socialLogin = async (provider) => {
    try {
      // Simulate social login - In production, integrate with OAuth providers
      const mockUser = {
        id: Date.now(),
        name: `${provider} User`,
        email: `user@${provider}.com`,
        profilePhoto: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
        role: 'traveler',
        location: 'Global',
        bio: `Signed up with ${provider}`,
        interests: ['Travel', 'Adventure'],
        languagesSpoken: ['English'],
        joinedDate: new Date().toISOString(),
        verified: true
      };

      const token = `mock_token_${Date.now()}`;
      
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('authToken', token);
      setCurrentUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Social login error:', error);
      return { success: false, error: `${provider} login failed` };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      // Simulate API call - In production, replace with actual API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        return { success: false, error: 'Signup failed' };
      }

      const data = await response.json();
      
      // Store user data and token
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      setCurrentUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    router.push('/');
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...currentUser, ...updates };
      
      // Simulate API call
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  // Context value
  const value = {
    currentUser,
    user: currentUser, // Alias for compatibility
    loading,
    login,
    socialLogin,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}