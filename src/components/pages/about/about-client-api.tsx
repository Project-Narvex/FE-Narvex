'use client';

import React, { useEffect } from 'react';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';
import { AboutPageData, transformAboutPageComponent } from '@/lib/strapi';
import CompanyAspects from '@/components/ui/CompanyAspects';
import VisionMission from '@/components/ui/VisionMission';
import LegalDocument from '@/components/ui/LegalDocument';
import TeamMembers from '@/components/ui/TeamMembers';
import Award from '@/components/ui/Award';
import CompanyCulture from '@/components/ui/CompanyCulture';

interface AboutPageClientProps {
  aboutData: AboutPageData;
}

export default function AboutPageClient({ aboutData }: AboutPageClientProps) {
  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to service cards
      document.querySelectorAll('.service-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 12,
          perspective: 1200,
          shadowIntensity: 0.25,
          liftHeight: 15
        });
      });
      
      // Add 3D effects to value cards
      document.querySelectorAll('.value-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
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

  // Transform components
  const transformedComponents = aboutData.pageContent.map(component => 
    transformAboutPageComponent(component)
  );

  // Find specific components
  const heroComponent = transformedComponents.find(c => c.__component === 'about.hero');
  const aspectComponent = transformedComponents.find(c => c.__component === 'about.aspect');
  const visionMissionComponent = transformedComponents.find(c => c.__component === 'about.vision-mission');
  const legalComponent = transformedComponents.find(c => c.__component === 'about.legal');
  const teamComponent = transformedComponents.find(c => c.__component === 'sections.team-highlight');
  const awardsComponent = transformedComponents.find(c => c.__component === 'sections.awards-section');
  const cultureComponent = transformedComponents.find(c => c.__component === 'about.company-culture');

  return (
    <div className="min-h-screen scroll-snap-container overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-section floating-container layered-bg perspective-2000">
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 gradient-hero">
          {/* Depth Layer 1 - Furthest back */}
          <div className="absolute inset-0 opacity-15" data-depth-layer="3" data-parallax="0.8">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse bg-gold-500" data-float="true" data-float-amplitude="15" data-float-duration="4"></div>
              <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000 bg-blue-500" data-float="true" data-float-amplitude="20" data-float-duration="5"></div>
              <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000 bg-gold-500" data-float="true" data-float-amplitude="12" data-float-duration="3.5"></div>
            </div>
          </div>
          
          {/* Depth Layer 2 - Middle */}
          <div className="absolute inset-0 opacity-25" data-depth-layer="2" data-parallax="0.5">
            <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-gold-400/20 filter blur-lg" data-float="true" data-float-amplitude="10" data-float-duration="6"></div>
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-gold-400/15 to-blue-400/15 filter blur-lg" data-float="true" data-float-amplitude="18" data-float-duration="4.5"></div>
          </div>
          
          {/* Depth Layer 3 - Closest */}
          <div className="absolute inset-0 opacity-30" data-depth-layer="1" data-parallax="0.2">
            <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 filter blur-sm" data-float="true" data-float-amplitude="8" data-float-duration="3" data-mouse-parallax="0.3"></div>
            <div className="absolute top-1/4 right-1/2 w-24 h-24 rounded-full bg-gold-300/20 filter blur-sm" data-float="true" data-float-amplitude="12" data-float-duration="4" data-mouse-parallax="0.2"></div>
            <div className="absolute bottom-1/2 right-1/4 w-40 h-40 rounded-full bg-blue-300/15 filter blur-sm" data-float="true" data-float-amplitude="15" data-float-duration="5.5" data-mouse-parallax="0.25"></div>
          </div>
          
          {/* Morphing Gradient Overlay */}
          <div className="absolute inset-0 morphing-gradient opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-depth-3 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl transform-3d text-center">
          <div className="max-w-4xl mx-auto depth-layer-2" data-mouse-parallax="0.1">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 text-depth-lg leading-tight" data-element="title" data-text-animation="wave" data-delay="0.1" data-duration="0.5" data-stagger="0.03">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(heroComponent as any)?.title ? (
                <>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <span className="block transform-3d break-words" data-tilt="8">{(heroComponent as any).title.split(' ').slice(0, 1).join(' ')}</span>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <span className="block text-gold-500 transform-3d break-words" data-tilt="10">{(heroComponent as any).title.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>
                  <span className="block transform-3d break-words" data-tilt="8">Tentang</span>
                  <span className="block text-gold-500 transform-3d break-words" data-tilt="10">Narvex</span>
                </>
              )}
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto text-depth">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(heroComponent as any)?.description || 'CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing'}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Company History */}
      {aspectComponent && (
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Decorative Top Divider */}
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
              <div className="mx-3 sm:mx-4 w-2 h-2 rounded-full bg-gold-500"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 sm:mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(aspectComponent as any).title}
              </h2>
              <p className="body-large text-gray-contrast-700 leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.3" data-stagger="0.015">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(aspectComponent as any).description}
              </p>
            </div>
            
             <CompanyAspects 
               aspects={aspectComponent as any} // eslint-disable-line @typescript-eslint/no-explicit-any
               cardHighlight={(aspectComponent as any)?.card_highlight} // eslint-disable-line @typescript-eslint/no-explicit-any
             />
          </div>
        </section>
      )}

      {/* Vision Mission */}
      {visionMissionComponent && (
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/30 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(visionMissionComponent as any).title}
              </h2>
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
               {(visionMissionComponent as any).description && (
                <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.3" data-stagger="0.015">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(visionMissionComponent as any).description}
                </p>
              )}
            </div>
            
             <VisionMission 
               vision={(visionMissionComponent as any).vision} // eslint-disable-line @typescript-eslint/no-explicit-any
               mission={(visionMissionComponent as any).mission} // eslint-disable-line @typescript-eslint/no-explicit-any
             />
          </div>
        </section>
      )}

      {/* Legal Documentation */}
      {legalComponent && (
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/20 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="scroll-animate">
              <h2 className="heading-2 mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(legalComponent as any).title}
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(legalComponent as any).description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(legalComponent as any).legals.map((document: any) => (
                  <LegalDocument key={document.id} document={document} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Team */}
      {teamComponent && (
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(teamComponent as any).title}
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(teamComponent as any).description}
              </p>
            </div>
            
             <TeamMembers 
               teamMembers={(teamComponent as any).team_members} // eslint-disable-line @typescript-eslint/no-explicit-any
               statistics={teamComponent as any} // eslint-disable-line @typescript-eslint/no-explicit-any
             />
          </div>
        </section>
      )}

      {/* Achievements */}
      {awardsComponent && (
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/20 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="scroll-animate">
              <h2 className="heading-2 mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(awardsComponent as any).title}
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(awardsComponent as any).description}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(awardsComponent as any).Award.map((award: any) => (
                  <Award key={award.id} award={award} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Company Culture */}
      {cultureComponent && (
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="scroll-animate">
              <h2 className="heading-2 mb-8 text-blue-900" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(cultureComponent as any).title}
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 {(cultureComponent as any).description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 <CompanyCulture culture={(cultureComponent as any).culture1} />
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 <CompanyCulture culture={(cultureComponent as any).culture2} />
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 <CompanyCulture culture={(cultureComponent as any).culture3} />
                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                 <CompanyCulture culture={(cultureComponent as any).culture4} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
