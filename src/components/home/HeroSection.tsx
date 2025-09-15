'use client';

import React from 'react';
import Button from '../ui/Button';
import { ArrowRight, Play } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              <span className="block">Creative Solutions</span>
              <span className="block">for</span>
              <span className="block text-orange-400">Your Brand</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in animation-delay-300">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600">
              <Button
                variant="primary"
                size="large"
                onClick={() => scrollToSection('#portfolio')}
                className="group"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="large"
                onClick={() => scrollToSection('#contact')}
                className="border-white text-white hover:bg-white hover:text-navy-900 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {secondaryCtaText}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in animation-delay-900">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">50+</div>
                <div className="text-gray-300 text-sm md:text-base">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">25+</div>
                <div className="text-gray-300 text-sm md:text-base">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">3+</div>
                <div className="text-gray-300 text-sm md:text-base">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative lg:block hidden">
            <div className="grid grid-cols-2 gap-4 animate-fade-in animation-delay-1200">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-orange-400 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🎨</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Creative Design</h3>
                  <p className="text-gray-300 text-sm">Branding & Visual Identity</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform translate-y-8">
                  <div className="w-12 h-12 bg-orange-400 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">📱</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Digital Marketing</h3>
                  <p className="text-gray-300 text-sm">Social Media & SEO</p>
                </div>
              </div>
              
              <div className="space-y-4 transform translate-y-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-orange-400 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🎪</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Event Production</h3>
                  <p className="text-gray-300 text-sm">Planning & Coordination</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-orange-400 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⭐</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Consultation</h3>
                  <p className="text-gray-300 text-sm">Strategy & Planning</p>
                </div>
              </div>
            </div>
          </div>
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