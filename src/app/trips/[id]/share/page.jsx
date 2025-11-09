'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Copy, Check, Facebook, Twitter, Mail, 
  MessageCircle, Linkedin, Link as LinkIcon, QrCode 
} from 'lucide-react';

export default function ShareTripPage() {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const tripUrl = typeof window !== 'undefined' ? `${window.location.origin}/trips/${params.id}` : '';
  const tripTitle = 'Backpacking Through Southeast Asia';
  const tripDescription = 'Join me on an incredible journey through Thailand, Vietnam, and Cambodia!';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tripUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tripUrl)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(tripUrl)}&text=${encodeURIComponent(tripTitle)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tripUrl)}`, '_blank')
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(tripTitle + ' ' + tripUrl)}`, '_blank')
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => window.location.href = `mailto:?subject=${encodeURIComponent(tripTitle)}&body=${encodeURIComponent(tripDescription + '\n\n' + tripUrl)}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/50 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Share Trip</h1>
            <p className="text-gray-600 dark:text-gray-400">Share your adventure with friends</p>
          </div>
        </div>

        {/* Trip Preview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400"
              alt={tripTitle}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {tripTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tripDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Copy Link */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Share Link
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={tripUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleCopyLink}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Options */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Share on Social Media
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white p-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2`}
              >
                <option.icon className="w-6 h-6" />
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            QR Code
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Scan this QR code to view the trip
            </p>
            <button className="mt-4 px-6 py-2.5 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors">
              Download QR Code
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Privacy:</strong> Anyone with this link can view your trip details. 
            You can change privacy settings in trip settings.
          </p>
        </div>
      </div>
    </div>
  );
}
