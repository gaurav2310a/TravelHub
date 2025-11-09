'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'General',
      items: [
        { q: 'What is TravelHub?', a: 'TravelHub is a comprehensive travel planning platform that helps you discover destinations, plan trips, connect with travelers, and share your adventures with a global community.' },
        { q: 'Is TravelHub free?', a: 'Yes! TravelHub is completely free for all travelers. Create unlimited trips, join discussions, and access all community features at no cost.' },
        { q: 'Do I need an account to browse?', a: 'You can browse public trips and destinations without an account, but you\'ll need to sign up to create trips, save favorites, and interact with the community.' }
      ]
    },
    {
      category: 'Account & Profile',
      items: [
        { q: 'How do I create an account?', a: 'Click "Sign up" in the header, fill in your details (name, email, password, location), and verify your email address.' },
        { q: 'Can I use social login?', a: 'Yes! You can sign up or log in using your Google or Facebook account for quick access.' },
        { q: 'How do I edit my profile?', a: 'Go to your profile page and click "Edit Profile" to update your photo, bio, interests, and other details.' },
        { q: 'Can I change my username?', a: 'Yes, you can change your display name in profile settings. However, your email address cannot be changed.' }
      ]
    },
    {
      category: 'Trip Planning',
      items: [
        { q: 'How do I create a trip?', a: 'Navigate to Trips > Create New Trip, then fill in details like destination, dates, budget, activities, and itinerary.' },
        { q: 'Can I collaborate on trips?', a: 'Yes! Invite friends as co-planners by sharing your trip link or adding them directly from trip settings.' },
        { q: 'How do I make my trip private?', a: 'In trip settings, change visibility to "Private" or "Friends Only" to control who can view your trip.' },
        { q: 'Can I copy someone else\'s trip?', a: 'Yes! Click "Duplicate Trip" on any public trip to create your own copy that you can customize.' }
      ]
    },
    {
      category: 'Community',
      items: [
        { q: 'How do I share my travel story?', a: 'Go to Community > Travel Stories > Create Story, then write your experience, add photos, and publish.' },
        { q: 'Can I ask locals for advice?', a: 'Absolutely! Use the "Ask a Local" feature to post questions about specific destinations and get answers from locals and experienced travelers.' },
        { q: 'How do I join events?', a: 'Browse Community > Events, find an event you like, and click "RSVP" or "Join Event" to register.' },
        { q: 'Can I report inappropriate content?', a: 'Yes, use the report button on any post, comment, or profile. Our moderation team reviews all reports within 24 hours.' }
      ]
    },
    {
      category: 'Features',
      items: [
        { q: 'What is the Nearby feature?', a: 'Nearby helps you find essential services (hotels, restaurants, ATMs, hospitals) near your current location or any destination.' },
        { q: 'How accurate is the budget calculator?', a: 'Our budget estimates are based on community data and average costs. Actual expenses may vary based on your travel style and season.' },
        { q: 'Can I download my trip offline?', a: 'This feature is coming soon! You\'ll be able to download trip details and maps for offline access.' },
        { q: 'Do you have a mobile app?', a: 'We\'re currently working on native iOS and Android apps. For now, our website is fully mobile-responsive.' }
      ]
    },
    {
      category: 'Privacy & Safety',
      items: [
        { q: 'Is my personal information safe?', a: 'Yes! We use industry-standard encryption and never share your personal data with third parties without consent.' },
        { q: 'Can I control who sees my trips?', a: 'Absolutely! Set each trip to Public, Friends Only, or Private in trip settings.' },
        { q: 'How do I block a user?', a: 'Visit their profile and click "Block User". They won\'t be able to see your content or contact you.' },
        { q: 'What data do you collect?', a: 'We collect only essential data for functionality: account info, trip details, and usage analytics. See our Privacy Policy for details.' }
      ]
    },
    {
      category: 'Technical',
      items: [
        { q: 'Which browsers are supported?', a: 'TravelHub works best on Chrome, Firefox, Safari, and Edge (latest versions). Internet Explorer is not supported.' },
        { q: 'Why can\'t I upload images?', a: 'Ensure your images are under 5MB and in JPG, PNG, or WebP format. Clear your browser cache if issues persist.' },
        { q: 'The site is loading slowly. What should I do?', a: 'Try clearing your browser cache, disabling extensions, or using a different browser. Contact support if the issue continues.' },
        { q: 'How do I report a bug?', a: 'Email us at support@travelhub.com with details about the issue, including screenshots if possible.' }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 mb-8">
            Find answers to common questions about TravelHub
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-xl focus:ring-4 focus:ring-white/50 outline-none"
            />
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-8">
            {filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.items.map((faq, faqIdx) => {
                    const index = `${catIdx}-${faqIdx}`;
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
                          <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
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
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No FAQs found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Can't find what you're looking for? Contact our support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/help"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Visit Help Center
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
