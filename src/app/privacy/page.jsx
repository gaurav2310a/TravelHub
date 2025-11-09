'use client';

import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, profile photo)',
        'Trip details and itineraries you create',
        'Community interactions (posts, comments, likes)',
        'Usage data and analytics',
        'Location data (only when you use location features)',
        'Device and browser information'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our services',
        'Personalize your experience',
        'Send important updates and notifications',
        'Analyze usage patterns to enhance features',
        'Prevent fraud and ensure security',
        'Comply with legal obligations'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data transmission',
        'Secure servers with regular security audits',
        'Limited employee access to personal data',
        'Regular backups and disaster recovery plans',
        'Two-factor authentication available',
        'Continuous monitoring for security threats'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time',
        'Request data correction or deletion',
        'Export your data in portable format',
        'Opt-out of marketing communications',
        'Control privacy settings for your content',
        'Lodge complaints with data protection authorities'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90">
            Your privacy is important to us. Learn how we protect your data.
          </p>
          <p className="text-sm text-white/80 mt-4">
            Last updated: November 9, 2024
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Welcome to TravelHub. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, store, and share your information when you use 
            our platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            By using TravelHub, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Key Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our service and store 
              certain information. Cookies are files with small amount of data which may include an anonymous 
              unique identifier.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We may employ third-party companies and individuals to facilitate our service, provide the 
              service on our behalf, perform service-related services, or assist us in analyzing how our 
              service is used.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These third parties have access to your personal data only to perform these tasks on our behalf 
              and are obligated not to disclose or use it for any other purpose.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We will retain your personal data only for as long as is necessary for the purposes set out in 
              this privacy policy. We will retain and use your data to the extent necessary to comply with our 
              legal obligations, resolve disputes, and enforce our policies.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you delete your account, we will delete or anonymize your personal data within 30 days, 
              except where we are required to retain it for legal purposes.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our service is not intended for use by children under the age of 13. We do not knowingly collect 
              personally identifiable information from children under 13. If you are a parent or guardian and 
              you are aware that your child has provided us with personal data, please contact us so we can 
              take necessary action.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We may update our privacy policy from time to time. We will notify you of any changes by posting 
              the new privacy policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You are advised to review this privacy policy periodically for any changes. Changes to this 
              privacy policy are effective when they are posted on this page.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Email: <a href="mailto:privacy@travelhub.com" className="text-blue-600 hover:underline">privacy@travelhub.com</a></p>
              <p>Address: 123 Travel Street, New Delhi, India 110001</p>
              <p>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-white/90 mb-6">
            Our team is here to help you understand how we protect your data
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
