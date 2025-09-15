'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Button from '../ui/Button';

interface FooterProps {
  variant?: 'default' | 'minimal';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' }
  ];

  const services = [
    'Creative Design',
    'Event Production',
    'Digital Marketing',
    'Brand Consultation'
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      text: 'Jakarta, Indonesia'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      text: '+62 xxx xxxx xxxx'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: 'narvex.ind@gmail.com'
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      text: '@narvex.id'
    }
  ];

  if (variant === 'minimal') {
    return (
      <footer className="bg-navy-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-navy-700 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Narvex</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Narvex. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-700 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold">Narvex</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Solusi kreatif terpadu untuk branding, event production, dan digital marketing yang memorable.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/narvex.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:narvex.ind@gmail.com"
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="text-orange-400 flex-shrink-0">
                    {info.icon}
                  </div>
                  <span className="text-gray-300 text-sm">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Dapatkan update terbaru tentang project dan insights dari tim Narvex.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <Button variant="primary" className="sm:px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Narvex. All rights reserved. Made with ❤️ in Indonesia.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
export type { FooterProps };