'use client';

import React, { useEffect } from 'react';
import { initializeAnimations } from '@/lib/animations';

interface SimpleHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
}

export default function SimpleHero({
  title,
  subtitle,
  description,
  breadcrumb,
  className = ''
}: SimpleHeroProps) {
  useEffect(() => {
    // Initialize scroll animations for this component
    const animationController = initializeAnimations();
    
    return () => {
      if (animationController) {
        animationController.destroy();
      }
    };
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Simplified Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Minimal floating elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-500 blur-3xl animate-pulse" data-float="true" data-float-amplitude="8" data-float-duration="6"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-blue-400 blur-2xl animate-pulse animation-delay-2000" data-float="true" data-float-amplitude="6" data-float-duration="8"></div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-6 scroll-animate" data-element="breadcrumb" data-text-animation="fade-in" data-delay="0.1" data-duration="0.4">
              <ol className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-2 text-gray-500">/</span>
                    )}
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="hover:text-gold-400 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-gold-400">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight scroll-animate"
            data-element="title" 
            data-text-animation="wave" 
            data-delay="0.2" 
            data-duration="0.6" 
            data-stagger="0.04"
          >
            {title.split(' ').map((word, index) => (
              <span key={index} className={`inline-block ${word.toLowerCase().includes('narvex') || word.toLowerCase().includes('indonesia') ? 'text-gold-400' : ''}`}>
                {word}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p 
              className="text-xl md:text-2xl text-gold-300 mb-4 font-medium scroll-animate"
              data-element="subtitle" 
              data-text-animation="fade-in" 
              data-delay="0.4" 
              data-duration="0.4"
            >
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p 
              className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed scroll-animate"
              data-element="description" 
              data-text-animation="fade-in" 
              data-delay="0.6" 
              data-duration="0.4"
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>
    </section>
  );
}

// Export type for use in other components
export type { SimpleHeroProps };