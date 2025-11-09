"use client";

import Link from 'next/link';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Linkedin, Compass, Globe, Shield, Award } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TravelHub</h4>
                <p className="text-sm text-gray-400">Explore the World</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Your trusted companion for discovering amazing destinations, connecting with travelers, and creating unforgettable memories around the globe.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/travelhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/travelhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/travelhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/travelhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-white">Quick Links</h5>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link href="/places" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Destinations</Link></li>
              <li><Link href="/community" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Community</Link></li>
              <li><Link href="/nearby" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Nearby Places</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-white">Support</h5>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Help Center</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">FAQs</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-white">Get in Touch</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Travel Street<br />
                  New Delhi, India 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:hello@travelhub.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  hello@travelhub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-white">1000+</p>
              <p className="text-sm text-gray-400">Destinations</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-400">Happy Travelers</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-gray-400">Secure Booking</p>
            </div>
            <div className="flex flex-col items-center">
              <Compass className="w-8 h-8 text-yellow-400 mb-2" />
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="text-sm text-gray-400">Support</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} TravelHub. All rights reserved. Made with ❤️ for travelers.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
