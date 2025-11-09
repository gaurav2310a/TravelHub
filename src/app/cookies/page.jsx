'use client';

import { Cookie, Settings, Shield, Eye } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Cookie className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-white/90">
            Learn about how we use cookies and similar technologies
          </p>
          <p className="text-sm text-white/80 mt-4">
            Last updated: November 9, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What Are Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us 
            provide you with a better experience by remembering your preferences, understanding how you use our 
            service, and improving our platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use both session cookies (which expire when you close your browser) and persistent cookies (which 
            stay on your device until deleted or expired).
          </p>
        </div>

        {/* Types of Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Types of Cookies We Use
          </h2>
          
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                1. Essential Cookies (Required)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                These cookies are necessary for the website to function properly. They enable core functionality 
                such as security, network management, and accessibility.
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Authentication and login status</li>
                <li>• Security and fraud prevention</li>
                <li>• Load balancing</li>
                <li>• Session management</li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                2. Functional Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                These cookies enable enhanced functionality and personalization, such as remembering your 
                preferences and settings.
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Language preferences</li>
                <li>• Dark mode settings</li>
                <li>• Recently viewed trips</li>
                <li>• Saved filters and searches</li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                3. Analytics Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                These cookies help us understand how visitors interact with our website by collecting and 
                reporting information anonymously.
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Page views and navigation patterns</li>
                <li>• Time spent on pages</li>
                <li>• Click tracking</li>
                <li>• Error reporting</li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                4. Marketing Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                These cookies track your online activity to help us deliver more relevant advertising and 
                limit the number of times you see an ad.
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Personalized advertisements</li>
                <li>• Social media integration</li>
                <li>• Retargeting campaigns</li>
                <li>• Conversion tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use services from trusted third-party providers that may set their own cookies. These include:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
                <li><strong>Payment Processors:</strong> For secure payment processing (if applicable)</li>
                <li><strong>Content Delivery Networks:</strong> For faster content delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Managing Your Cookie Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You have several options to manage or disable cookies:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Browser Settings</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Most web browsers allow you to control cookies through their settings. You can set your 
                    browser to refuse cookies or delete certain cookies. Note that disabling cookies may affect 
                    your experience on our website.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Cookie Consent Tool</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    When you first visit TravelHub, you'll see a cookie consent banner where you can choose 
                    which types of cookies to accept.
                  </p>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Opt-Out Links</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    You can opt out of certain third-party cookies:
                  </p>
                  <ul className="space-y-1 text-blue-600">
                    <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Analytics Opt-out</a></li>
                    <li>• <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook Cookies</a></li>
                    <li>• <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Your Online Choices</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact of Disabling Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Impact of Disabling Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you choose to disable cookies, some features of TravelHub may not function properly:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• You may need to log in every time you visit</li>
                <li>• Your preferences and settings won't be saved</li>
                <li>• Some features may not work as expected</li>
                <li>• You may see less relevant content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Updates to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
            or our business operations. We encourage you to review this page periodically. The "Last updated" 
            date at the top indicates when this policy was last revised.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>Email: <a href="mailto:privacy@travelhub.com" className="text-blue-600 hover:underline">privacy@travelhub.com</a></p>
            <p>Or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a></p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-white/90 mb-6">
            Start planning your next adventure with TravelHub
          </p>
          <a
            href="/explore"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            Explore Destinations
          </a>
        </div>
      </div>
    </div>
  );
}
