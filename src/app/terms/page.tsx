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
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white scroll-snap-start morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
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