'use client';

import React, { useEffect } from 'react';
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
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-28 h-28 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            <div className="absolute top-2/3 right-1/4 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.25" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 right-1/8 w-20 h-20 bg-gold-300/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="14" data-float-duration="7"></div>
            <div className="absolute bottom-1/8 left-1/8 w-24 h-24 bg-blue-300/10 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="18" data-float-duration="10"></div>
            <div className="absolute top-3/5 left-2/3 w-16 h-16 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute bottom-2/5 right-1/3 w-26 h-26 bg-blue-200/12 rounded-full filter blur-3xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="11"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card variant="service" className="glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-12">
                  <h2 className="heading-2 mb-8 text-center" data-text-animation="fade-in" data-animation-delay="0.2">Kebijakan Privasi</h2>
                  <div className="prose prose-lg max-w-none " data-animation-delay="0.4">
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
    </div>
  );
}