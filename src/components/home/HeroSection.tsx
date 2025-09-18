'use client';

import React from 'react';
import Button from '../ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import ServiceCoverflow from './ServiceCoverflow';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  subtitle = "CV. Nara Exhibition Indonesia",
  ctaText = "Lihat Portfolio",
  secondaryCtaText = "Konsultasi Gratis"
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-section">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse bg-gold-500"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000 bg-blue-500"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000 bg-gold-500"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 scroll-animate animate-stagger-1">
              <span className="block">Creative Solutions</span>
              <span className="block">for</span>
              <span className="block text-gold-500">Your Brand</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 scroll-animate animate-stagger-2">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start scroll-animate animate-stagger-3">
              <Button
                variant="primary"
                size="large"
                onClick={() => scrollToSection('#portfolio')}
                className="group animate-glow"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="large"
                onClick={() => scrollToSection('#contact')}
                className="border-white text-white hover:bg-white hover:text-[#6382b4] group animate-pulse-hover"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {secondaryCtaText}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 scroll-animate animate-stagger-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">50+</div>
                <div className="text-gray-300 text-sm md:text-base">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">25+</div>
                <div className="text-gray-300 text-sm md:text-base">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">3+</div>
                <div className="text-gray-300 text-sm md:text-base">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <ServiceCoverflow />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export type { HeroSectionProps };