'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function PrivacyPage() {
  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Create morphing background for sections
      const sectionsWithMorphing = document.querySelectorAll('.morphing-bg-section');
      sectionsWithMorphing.forEach(section => {
        createMorphingBackground(section);
      });
      
      // Add enhanced parallax to background elements
      document.querySelectorAll('[data-parallax]').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const depth = parseFloat(element.getAttribute('data-depth') || '1');
        addEnhancedParallax(element, {
          speed,
          depth,
          blur: Math.max(0, (depth - 1) * 1.5),
          opacity: Math.max(0.4, 1 - (depth - 1) * 0.15)
        });
      });
    }, 500);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(depthEffectsTimeout);
      if (animationController) {
        animationController.destroy();
      }
      if (depthController) {
        depthController.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen scroll-snap-container">
      <Header />
      
      <main>
        {/* Hero Section */}
        <SimpleHero
          title="Privacy Policy"
          subtitle="Narvex Data Protection"
          description="Kebijakan privasi dan perlindungan data Narvex"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' }
          ]}
          className="scroll-snap-section"
        />

        {/* Privacy Content */}
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-20 w-56 h-56 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card variant="service" className="glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-12">
                  <h2 className="heading-2 mb-8 text-center" data-text-animation="fade-in" data-animation-delay="0.2">Kebijakan Privasi</h2>
                  <div className="prose prose-lg max-w-none scroll-animate" data-animation-delay="0.4">
                    <p className="body-large text-gray-600 mb-8 text-center">
                      Narvex berkomitmen untuk melindungi privasi dan data pribadi klien kami.
                    </p>
                    
                    <div className="space-y-8">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <h3 className="heading-3 text-blue-900 mb-4">1. Pengumpulan Data</h3>
                        <p className="text-gray-600">
                          Kami mengumpulkan data yang diperlukan untuk memberikan layanan terbaik kepada klien.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-gold-50 to-gold-100 rounded-xl border border-gold-200">
                        <h3 className="heading-3 text-blue-900 mb-4">2. Penggunaan Data</h3>
                        <p className="text-gray-600">
                          Data yang dikumpulkan digunakan untuk keperluan layanan dan komunikasi dengan klien.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <h3 className="heading-3 text-blue-900 mb-4">3. Perlindungan Data</h3>
                        <p className="text-gray-600">
                          Kami menerapkan langkah-langkah keamanan untuk melindungi data pribadi klien.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-gold-50 to-gold-100 rounded-xl border border-gold-200">
                        <h3 className="heading-3 text-blue-900 mb-4">4. Kontak</h3>
                        <p className="text-gray-600">
                          Untuk pertanyaan mengenai kebijakan privasi, silakan hubungi kami melalui halaman kontak.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}