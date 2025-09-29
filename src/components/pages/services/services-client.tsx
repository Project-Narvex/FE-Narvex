
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Palette, Calendar, Smartphone, Users, LucideIcon } from 'lucide-react';
import {
  initializeAnimations,
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

interface Service {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
}

interface ServicesClientProps {
  services: Service[];
}

// Icon mapping function
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    palette: Palette,
    calendar: Calendar,
    smartphone: Smartphone,
    users: Users,
  };
  return iconMap[iconName] || Palette; // fallback to Palette if icon not found
};

export default function ServicesClient({ services }: ServicesClientProps) {
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
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });

      // Add 3D effects to feature cards
      document.querySelectorAll('.feature-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 6,
          perspective: 800,
          shadowIntensity: 0.15,
          liftHeight: 8
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
        <SimpleHero
          title="Layanan Kami"
          subtitle="Narvex Creative Services"
          description="Solusi komprehensif untuk semua kebutuhan creative services, event production, dan digital marketing Anda"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Layanan' }
          ]}
          className="scroll-snap-section"
        />

        {/* Services Overview */}
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/20 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/25 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/15 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-500/8 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-400/12 rounded-full blur-xl" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/15 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/18 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
            <div className="absolute top-3/5 right-1/3 w-20 h-20 bg-blue-200/12 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-2/5 left-1/8 w-32 h-32 bg-gold-200/10 rounded-full filter blur-3xl" data-parallax="0.2" data-float="true" data-float-amplitude="22" data-float-duration="11"></div>
            <div className="absolute top-1/8 left-2/3 w-18 h-18 bg-blue-100/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute bottom-1/8 right-2/5 w-28 h-28 bg-gold-300/12 rounded-full filter blur-2xl" data-parallax="0.15" data-float="true" data-float-amplitude="20" data-float-duration="9"></div>
            <div className="absolute top-4/5 left-1/5 w-22 h-22 bg-blue-300/10 rounded-full filter blur-xl" data-parallax="0.45" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-1/3 right-1/6 w-26 h-26 bg-gold-100/15 rounded-full filter blur-2xl" data-parallax="0.28" data-float="true" data-float-amplitude="17" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="heading-2 mb-4 sm:mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Portfolio Layanan Lengkap</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Dari creative design hingga digital marketing, kami menyediakan solusi terintegrasi 
                untuk kesuksesan setiap project Anda.
              </p>
            </div>
            
            <div className="space-y-12 sm:space-y-16 scroll-animate" data-animation-delay="0.6">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                return (
                  <Card 
                    key={index} 
                    variant="service" 
                    className={`service-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center hover:shadow-2xl transition-all duration-500 ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <CardContent className={`p-6 sm:p-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="heading-3 text-blue-900">{service.title}</h3>
                          <p className="text-gold-500 font-medium">{service.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="body-large text-gray-600 mb-8">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-3 list-none">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start transition-all duration-300 hover:text-blue-600 hover:translate-x-1">
                            <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 hover:scale-150" aria-hidden="true"></span>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8">
                        <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                          Pelajari Lebih Lanjut
                        </button>
                      </div>
                    </CardContent>
                    
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} p-8`}>
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden relative group">
                        <div className="text-center text-gray-500 transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="w-24 h-24 mx-auto mb-4 opacity-50 transition-all duration-300 group-hover:opacity-70 group-hover:rotate-12" />
                          <p className="font-semibold">Service Image Placeholder</p>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/30 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/20 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-gold-200/25 rounded-full filter blur-lg" data-parallax="0.15" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            <div className="absolute bottom-1/2 right-1/5 w-32 h-32 bg-gold-100/20 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-22 h-22 bg-blue-300/12 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/8 right-1/8 w-26 h-26 bg-gold-200/15 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
            <div className="absolute top-2/3 left-1/4 w-18 h-18 bg-blue-100/18 rounded-full filter blur-lg" data-parallax="0.35" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute bottom-3/4 right-2/3 w-30 h-30 bg-gold-100/12 rounded-full filter blur-3xl" data-parallax="0.25" data-float="true" data-float-amplitude="20" data-float-duration="10"></div>
            <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-blue-200/10 rounded-full filter blur-2xl" data-parallax="0.45" data-float="true" data-float-amplitude="16" data-float-duration="7"></div>
            <div className="absolute bottom-1/6 left-2/3 w-24 h-24 bg-gold-300/14 rounded-full filter blur-xl" data-parallax="0.2" data-float="true" data-float-amplitude="15" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Mengapa Memilih Narvex?</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Pengalaman bertahun-tahun dan komitmen terhadap kualitas membuat kami menjadi partner terpercaya
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-animate" data-animation-delay="0.6">
              <Card variant="service" className="feature-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Berpengalaman</h3>
                  <p className="text-gray-600">Lebih dari 10 tahun pengalaman dalam industri creative services dan digital marketing</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="feature-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Tim Profesional</h3>
                  <p className="text-gray-600">Tim ahli yang berpengalaman dan berdedikasi tinggi</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="feature-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Tepat Waktu</h3>
                  <p className="text-gray-600">Komitmen untuk menyelesaikan setiap project sesuai timeline</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="feature-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Kualitas Terjamin</h3>
                  <p className="text-gray-600">Standar kualitas tinggi dalam setiap layanan yang kami berikan</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Multi-Channel Contact CTA */}
        <section className="min-h-screen flex items-center py-20 bg-blue-900 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container floating-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/6 left-1/8 w-40 h-40 bg-gold-300/15 rounded-full filter blur-2xl" data-parallax="0.4" data-float="true" data-float-amplitude="25" data-float-duration="12"></div>
            <div className="absolute bottom-1/5 right-1/6 w-32 h-32 bg-blue-300/20 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
            <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-white/10 rounded-full filter blur-lg" data-parallax="0.5" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-1/4 right-2/3 w-28 h-28 bg-gold-200/12 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="20" data-float-duration="10"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-depth-2">
            <div className="text-center mb-12 scroll-animate-scale">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate animate-stagger-1">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Hubungi kami melalui berbagai channel yang tersedia. Tim ahli kami siap membantu 
                mewujudkan visi kreatif Anda menjadi kenyataan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 scroll-animate">
              <a href="/contact" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="0">
                <div className="contact-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-gold-500">
                  <Image src="/icons/email.png" alt="Email" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </a>
              
              <a href="https://wa.me/62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="100">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/whatsapp.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
              
              <a href="https://instagram.com/narvex.id" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="200">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-sm">@narvex.id</p>
              </a>
              
              <a href="tel:+62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="300">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/phone.png" alt="Phone" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
            </div>
            
            <div className="text-center scroll-animate animate-stagger-4">
              <Link href="/contact" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block mr-4 hover:opacity-90 bg-gold-500 animate-pulse-glow">
                Konsultasi Gratis
              </Link>
              <Link href="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-[#27364d] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block animate-pulse-hover">
                Lihat Portfolio
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
}

