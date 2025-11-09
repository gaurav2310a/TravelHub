'use client';

import { Compass, Users, Globe, Heart, Award, Target } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Destinations', value: '1000+', icon: Globe },
    { label: 'Trips Shared', value: '25K+', icon: Compass },
    { label: 'Countries', value: '150+', icon: Award }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Passionate traveler with 15+ years exploring the world'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      bio: 'Building tools to make travel planning effortless'
    },
    {
      name: 'Emma Williams',
      role: 'Community Manager',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Connecting travelers and fostering global friendships'
    },
    {
      name: 'David Kumar',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Creating seamless travel experiences through technology'
    }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connecting travelers from every corner of the world to share experiences and insights.'
    },
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel enriches lives and creates unforgettable memories.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building a platform where travelers help each other plan better trips.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly improving our tools to make travel planning easier and more enjoyable.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
              About TravelHub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              We're on a mission to make travel planning easier, more collaborative, 
              and more inspiring for everyone who dreams of exploring the world.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="glass-effect bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-white/90 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                TravelHub was born from a simple idea: travel planning should be exciting, 
                not overwhelming. Founded in 2020 by a group of passionate travelers, 
                we set out to create a platform that brings together the best of travel 
                planning, community sharing, and local insights.
              </p>
              <p>
                What started as a small project has grown into a thriving community of 
                over 50,000 travelers from around the world. Every day, our users share 
                their experiences, plan new adventures, and help each other discover 
                hidden gems across the globe.
              </p>
              <p>
                We believe that the best travel tips come from fellow travelers who've 
                been there. That's why we've built tools that make it easy to share 
                itineraries, connect with locals, and discover authentic experiences 
                that you won't find in traditional guidebooks.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
              alt="Travel planning"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            The people behind TravelHub
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start planning your next adventure with thousands of fellow travelers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started Free
            </a>
            <a
              href="/explore"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Explore Trips
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
