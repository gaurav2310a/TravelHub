'use client';

import { useState } from 'react';
import { Search, Book, MessageCircle, Mail, Phone, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { icon: Book, title: 'Getting Started', desc: 'Learn the basics', link: '#getting-started' },
    { icon: MessageCircle, title: 'Trip Planning', desc: 'Plan your journey', link: '#trip-planning' },
    { icon: HelpCircle, title: 'Account & Settings', desc: 'Manage your profile', link: '#account' },
    { icon: Mail, title: 'Contact Support', desc: 'Get personalized help', link: '#contact' }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign up" button in the top right corner, fill in your details, and verify your email address.'
        },
        {
          q: 'Is TravelHub free to use?',
          a: 'Yes! TravelHub is completely free for travelers. You can create trips, join the community, and access all features at no cost.'
        },
        {
          q: 'How do I start planning a trip?',
          a: 'Navigate to "Trips" > "Create New Trip" and follow the step-by-step wizard to add destinations, dates, budget, and activities.'
        }
      ]
    },
    {
      category: 'Trip Planning',
      questions: [
        {
          q: 'Can I collaborate with others on a trip?',
          a: 'Yes! You can invite friends to collaborate on your trip by sharing the trip link or adding them as co-planners.'
        },
        {
          q: 'How do I save trips from other users?',
          a: 'Click the heart icon on any trip card to save it to your favorites. Access saved trips from your profile.'
        },
        {
          q: 'Can I make my trip private?',
          a: 'Absolutely! In trip settings, you can set visibility to Private, Friends Only, or Public.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      questions: [
        {
          q: 'How do I change my profile picture?',
          a: 'Go to your profile, click "Edit Profile", and upload a new photo. Supported formats: JPG, PNG (max 5MB).'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, go to Settings > Account > Delete Account. Note: This action is permanent and cannot be undone.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-xl focus:ring-4 focus:ring-white/50 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cat.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.questions.map((faq, faqIdx) => {
                  const index = `${sectionIdx}-${faqIdx}`;
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faqIdx}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div id="contact" className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Our support team is here to assist you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Response within 24 hours
              </p>
              <a
                href="mailto:support@travelhub.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                support@travelhub.com
              </a>
            </div>
            <div className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Available 9 AM - 6 PM IST
              </p>
              <button className="text-green-600 hover:underline font-semibold">
                Start Chat
              </button>
            </div>
            <div className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
              <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Mon-Fri, 9 AM - 6 PM IST
              </p>
              <a
                href="tel:+911234567890"
                className="text-purple-600 hover:underline font-semibold"
              >
                +91 123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
