'use client';

import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-white/90">
            Please read these terms carefully before using TravelHub
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
            Agreement to Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            By accessing or using TravelHub, you agree to be bound by these Terms of Service and all applicable 
            laws and regulations. If you do not agree with any of these terms, you are prohibited from using 
            this service.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued use of the platform after 
            changes constitutes acceptance of the modified terms.
          </p>
        </div>

        {/* User Accounts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                User Accounts
              </h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p><strong>Account Creation:</strong> You must provide accurate and complete information when creating an account.</p>
                <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p><strong>Age Requirement:</strong> You must be at least 13 years old to use TravelHub.</p>
                <p><strong>One Account:</strong> You may only create one account per person.</p>
                <p><strong>Account Termination:</strong> We reserve the right to terminate accounts that violate these terms.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptable Use */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Acceptable Use
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">You agree to use TravelHub only for lawful purposes. You may:</p>
              <ul className="space-y-2">
                {[
                  'Create and share travel itineraries',
                  'Participate in community discussions',
                  'Share travel stories and photos',
                  'Connect with other travelers',
                  'Provide helpful travel advice',
                  'Use our tools for trip planning'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Prohibited Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Prohibited Activities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">You must NOT:</p>
              <ul className="space-y-2">
                {[
                  'Post false, misleading, or fraudulent content',
                  'Harass, bully, or threaten other users',
                  'Share spam or unsolicited advertisements',
                  'Violate intellectual property rights',
                  'Attempt to hack or compromise platform security',
                  'Create fake accounts or impersonate others',
                  'Share illegal or harmful content',
                  'Scrape or collect user data without permission'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Content Ownership */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Content and Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Your Content</h3>
                  <p>You retain ownership of content you post on TravelHub. By posting, you grant us a non-exclusive, 
                  worldwide license to use, display, and distribute your content on our platform.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Our Content</h3>
                  <p>All TravelHub branding, design, features, and functionality are owned by us and protected by 
                  copyright, trademark, and other intellectual property laws.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">User Submissions</h3>
                  <p>You represent that you have the right to post any content you submit and that it does not 
                  violate any third-party rights or applicable laws.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Disclaimers and Limitations
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Service "As Is":</strong> TravelHub is provided "as is" without warranties of any kind, 
                  either express or implied.
                </p>
                <p>
                  <strong>Travel Information:</strong> We do not guarantee the accuracy of travel information, 
                  prices, or availability. Always verify details with official sources.
                </p>
                <p>
                  <strong>User Content:</strong> We are not responsible for user-generated content. Users are 
                  solely responsible for their posts and interactions.
                </p>
                <p>
                  <strong>Third-Party Links:</strong> We are not responsible for content on external websites 
                  linked from our platform.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, TravelHub 
                  shall not be liable for any indirect, incidental, or consequential damages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Termination
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We may terminate or suspend your account immediately, without prior notice, for any reason, 
            including breach of these terms. Upon termination, your right to use the service will cease immediately.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You may also delete your account at any time from your account settings. All provisions of these 
            terms that should survive termination shall survive, including ownership provisions and liability limitations.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Governing Law
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These terms shall be governed by and construed in accordance with the laws of India, without regard 
            to its conflict of law provisions. Any disputes arising from these terms or your use of TravelHub 
            shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>Email: <a href="mailto:legal@travelhub.com" className="text-blue-600 hover:underline">legal@travelhub.com</a></p>
            <p>Address: 123 Travel Street, New Delhi, India 110001</p>
            <p>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a></p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/90 mb-6">
            By signing up, you agree to our Terms of Service
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
