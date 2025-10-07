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
import SimpleHero from '@/components/ui/SimpleHero';

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
      <SimpleHero
        title={(heroComponent as any)?.title || "Tentang Narvex"}
        subtitle={(heroComponent as any)?.subtitle}
        description={(heroComponent as any)?.description || "CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing"}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About' }
        ]}
      />

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
              <p className="body-large text-gray-contrast-700 leading-relaxed">
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
                <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed">
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
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed">
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
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed">
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
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed">
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
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed">
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
