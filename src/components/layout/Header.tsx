'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled: propIsScrolled }) => {
  const [isScrolled, setIsScrolled] = useState(propIsScrolled || false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (propIsScrolled !== undefined) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/companies', label: 'Companies' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
              <Image
                src="/narvex-logo.png"
                alt="Narvex Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center lg:space-x-8 md:space-x-4">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    'font-medium transition-colors hover:text-gold-500',
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    'font-medium transition-colors hover:text-gold-500',
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block ml-4">
            <Link href="/contact" prefetch={false}>
            <Button
              variant="secondary"
              size="normal"
              className="text-sm lg:text-base px-4 py-2 lg:px-6 lg:py-3"
            >
              Get Started
            </Button>
          </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 -mr-3 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className={cn(
                'w-6 h-6 transition-transform duration-200',
                isScrolled ? 'text-gray-700' : 'text-white'
              )} />
            ) : (
              <Menu className={cn(
                'w-6 h-6 transition-transform duration-200',
                isScrolled ? 'text-gray-700' : 'text-white'
              )} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 py-4 shadow-lg">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="text-left font-medium text-gray-700 hover:text-gold-500 hover:bg-gold-50 transition-all duration-200 px-6 py-3 min-h-[44px] touch-manipulation"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left font-medium text-gray-700 hover:text-gold-500 hover:bg-gold-50 transition-all duration-200 px-6 py-3 min-h-[44px] block touch-manipulation"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="px-6 pt-4 pb-2">
                <Link href="/contact" prefetch={false}>
                  <Button
                    variant="primary"
                    size="normal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full min-h-[44px] touch-manipulation"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
export type { HeaderProps };