'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';
import { TeamMember } from '@/data/team';
import { Company } from '@/data/companies';

interface AboutClientProps {
  parentCompany?: Company;
  leadershipTeam: TeamMember[];
  companyStats: {
    totalCompanies: number;
    establishedYear: string;
    totalTeamMembers: number;
    leadershipCount: number;
  };
  companyInfo: {
    vision: string;
    mission: string[];
    values: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function AboutClient({
  parentCompany,
  leadershipTeam,
  companyStats,
  companyInfo
}: AboutClientProps) {
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
                <span className="block transform-3d break-words" data-tilt="8">Tentang</span>
                <span className="block text-gold-500 transform-3d break-words" data-tilt="10">Narvex</span>
              </h1>
              <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto text-depth">
                CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing
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
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-200/15 rounded-full blur-xl" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
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
            
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 ">
              <h2 className="heading-2 mb-6 sm:mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                Perjalanan Kami
              </h2>
              <p className="body-large text-gray-contrast-700 leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.3" data-stagger="0.015">
                {parentCompany ? `Didirikan pada tahun ${parentCompany.established}, ${parentCompany.description}` : 'Didirikan dengan visi untuk menjadi partner terpercaya dalam creative services, Narvex menggabungkan kreativitas, teknologi, dan strategi bisnis untuk membantu klien mencapai tujuan mereka.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="">
                <h3 className="heading-3 mb-8 text-blue-900" data-element="heading" data-text-animation="slide-up" data-delay="0.05" data-duration="0.35" data-stagger="0.02">
                  Nilai-Nilai Perusahaan
                </h3>
                <div className="space-y-6 stagger-children">
                  <div className="value-card flex items-start p-4 rounded-xl hover-depth-subtle glass-morphism backdrop-blur-sm transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mt-1 mr-4 flex-shrink-0 shadow-gold-depth animate-pulse"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 text-lg">Kreativitas</h4>
                      <p className="text-gray-contrast-600 leading-relaxed">Kami percaya bahwa kreativitas adalah kunci untuk menciptakan solusi yang unik dan memorable.</p>
                    </div>
                  </div>
                  <div className="value-card flex items-start p-4 rounded-xl hover-depth-subtle glass-morphism backdrop-blur-sm transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mt-1 mr-4 flex-shrink-0 shadow-gold-depth animate-pulse"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 text-lg">Profesionalisme</h4>
                      <p className="text-gray-contrast-600 leading-relaxed">Kami berkomitmen untuk memberikan layanan dengan standar profesional tertinggi.</p>
                    </div>
                  </div>
                  <div className="value-card flex items-start p-4 rounded-xl hover-depth-subtle glass-morphism backdrop-blur-sm transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mt-1 mr-4 flex-shrink-0 shadow-gold-depth animate-pulse"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 text-lg">Kolaborasi</h4>
                      <p className="text-gray-contrast-600 leading-relaxed">Kami membangun partnership yang kuat dengan klien melalui komunikasi yang terbuka.</p>
                    </div>
                  </div>
                  <div className="value-card flex items-start p-4 rounded-xl hover-depth-subtle glass-morphism backdrop-blur-sm transition-all duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mt-1 mr-4 flex-shrink-0 shadow-gold-depth animate-pulse"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2 text-lg">Inovasi</h4>
                      <p className="text-gray-contrast-600 leading-relaxed">Kami selalu mengikuti perkembangan tren dan teknologi terbaru.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <Card variant="service" className="service-card group text-center flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism">
                  <CardContent className="px-8 py-12 flex flex-col h-full">
                    <div className="service-icon w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-blue-depth">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🎨</span>
                    </div>
                    <h4 className="text-2xl font-bold text-blue-900 mb-6 group-hover:text-blue-800 transition-colors duration-300 leading-snug text-center">Narvex Creative Services</h4>
                    <p className="text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300 mb-8">
                      Perusahaan creative services yang mengkhususkan diri dalam branding, event production, dan digital marketing.
                    </p>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover-depth-subtle">
                        <div className="text-3xl font-bold text-gold-600 mb-2 text-depth">50+</div>
                        <div className="text-sm text-gray-contrast-600 font-medium">Projects</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover-depth-subtle">
                        <div className="text-3xl font-bold text-gold-600 mb-2 text-depth">25+</div>
                        <div className="text-sm text-gray-contrast-600 font-medium">Happy Clients</div>
                      </div>
                    </div>
                    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Mission */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/30 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.15" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-blue-200/10 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            <div className="absolute bottom-1/2 right-1/5 w-32 h-32 bg-gold-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-22 h-22 bg-blue-300/15 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/8 right-1/8 w-26 h-26 bg-gold-200/12 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10">
            <div className="text-center mb-16 ">
              <h2 className="heading-2 mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                Visi, Misi & Tujuan
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <Card variant="service" className="service-card group text-center flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism ">
                <CardContent className="px-8 py-12 flex flex-col h-full">
                  <div className="service-icon w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-blue-depth">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-6 group-hover:text-blue-800 transition-colors duration-300 leading-snug" data-element="heading" data-text-animation="scale-bounce" data-delay="0.1" data-duration="0.5">
                    Visi
                  </h3>
                  <p className="text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                    {companyInfo.vision}
                  </p>
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                </CardContent>
              </Card>
              
              <Card variant="service" className="service-card group text-center flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism ">
                <CardContent className="px-8 py-12 flex flex-col h-full">
                  <div className="service-icon w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 group-hover:from-gold-200 group-hover:to-gold-300 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-gold-depth">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-6 group-hover:text-blue-800 transition-colors duration-300 leading-snug" data-element="heading" data-text-animation="scale-bounce" data-delay="0.1" data-duration="0.5">
                    Misi
                  </h3>
                  <ul className="text-left text-gray-contrast-600 space-y-3 flex-1 group-hover:text-gray-contrast-700 transition-colors duration-300 leading-relaxed list-none" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                    {companyInfo.mission.map((missionItem, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></span>
                        <span>{missionItem}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Legal Documentation */}
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/20 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="">
              <h2 className="heading-2 mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Dokumentasi Legal
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                NIB, izin usaha, dan sertifikasi akan ditampilkan di sini.
              </p>
              <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-gold-50 shadow-depth-2 hover-depth-subtle">
                <span className="text-4xl mr-4">📋</span>
                <span className="text-lg font-medium text-blue-900">Coming Soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.15" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-blue-200/10 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-22 h-22 bg-blue-300/15 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/8 right-1/8 w-26 h-26 bg-gold-200/12 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 relative z-10">
            <div className="text-center mb-16 ">
              <h2 className="heading-2 mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Tim Kami
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                Tim profesional yang berpengalaman dan berdedikasi untuk memberikan layanan terbaik.
              </p>
            </div>
            
            {/* Leadership Team */}
            {leadershipTeam.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-blue-900 text-center mb-8" data-element="heading" data-text-animation="scale-bounce" data-delay="0.1" data-duration="0.5">
                  Tim Kepemimpinan
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {leadershipTeam.slice(0, 6).map((member, index) => (
                    <Card key={member.id} variant="service" className="service-card group text-center flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism " style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="px-6 py-8 flex flex-col h-full">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 shadow-blue-depth overflow-hidden">
                          <Image 
                            src={member.avatar} 
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<span class="text-2xl">👤</span>';
                              }
                            }}
                          />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-800 transition-colors duration-300" data-element="heading" data-text-animation="scale-bounce" data-delay="0.1" data-duration="0.5">
                          {member.name}
                        </h4>
                        <p className="text-gold-600 font-medium mb-3 text-sm">
                          {member.position}
                        </p>
                        <p className="text-gray-contrast-600 text-sm leading-relaxed flex-1 group-hover:text-gray-contrast-700 transition-colors duration-300" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4">
                          {member.bio}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1 justify-center">
                          {member.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Team Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-depth-2 hover-depth-subtle ">
                <div className="text-3xl font-bold text-blue-900 mb-2">{companyStats.totalTeamMembers}</div>
                <div className="text-sm text-gray-contrast-600">Total Tim</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 shadow-depth-2 hover-depth-subtle ">
                <div className="text-3xl font-bold text-blue-900 mb-2">{companyStats.leadershipCount}</div>
                <div className="text-sm text-gray-contrast-600">Pemimpin</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-depth-2 hover-depth-subtle ">
                <div className="text-3xl font-bold text-blue-900 mb-2">{companyStats.totalCompanies}</div>
                <div className="text-sm text-gray-contrast-600">Perusahaan</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 shadow-depth-2 hover-depth-subtle ">
                <div className="text-3xl font-bold text-blue-900 mb-2">{companyStats.establishedYear}</div>
                <div className="text-sm text-gray-contrast-600">Didirikan</div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/20 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="">
              <h2 className="heading-2 mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Pencapaian
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                Awards, recognitions, dan milestones akan ditampilkan di sini.
              </p>
              <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-gold-50 shadow-depth-2 hover-depth-subtle">
                <span className="text-4xl mr-4">🏆</span>
                <span className="text-lg font-medium text-blue-900">Coming Soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.15" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-blue-200/10 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-22 h-22 bg-blue-300/15 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/8 right-1/8 w-26 h-26 bg-gold-200/12 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="">
              <h2 className="heading-2 mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Budaya Perusahaan
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                Values dan working principles akan ditampilkan di sini.
              </p>
              <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-blue-50 shadow-depth-2 hover-depth-subtle">
                <span className="text-4xl mr-4">🌟</span>
                <span className="text-lg font-medium text-blue-900">Coming Soon</span>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}