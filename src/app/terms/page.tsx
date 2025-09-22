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

export default function TermsPage() {
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
          title="Terms of Service"
          subtitle="Narvex Legal Terms"
          description="Please read these terms carefully before using our services"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service' }
          ]}
          className="scroll-snap-section"
        />

        {/* Terms Content */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white scroll-snap-start morphing-bg-section relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-400/5 rounded-full blur-xl floating-1" data-parallax="0.2"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 bg-gold-400/5 rounded-full blur-lg floating-2" data-parallax="0.4"></div>
          
          {/* Decorative Divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto relative z-10">
              <Card className="glass-morphism depth-3 hover-lift transition-all duration-500">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="0.1">1. Acceptance of Terms</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">
                      By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="0.3">2. Use License</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="0.4">
                      Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="0.5">3. Disclaimer</h2>
                     <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="0.6">
                       The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                     </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="0.7">4. Limitations</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="0.8">
                      In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="0.9">5. Accuracy of Materials</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="1.0">
                      The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="1.1">6. Links</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="1.2">
                      We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="1.3">7. Modifications</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="1.4">
                      We may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                    </p>

                    <h2 className="heading-2 text-gray-900 mb-6" data-text-animation="fade-in" data-animation-delay="1.5">8. Governing Law</h2>
                    <p className="body-large text-gray-700 mb-6" data-text-animation="fade-in" data-animation-delay="1.6">
                      These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                    </p>
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