'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Palette, GraduationCap, Lightbulb, Heart, Instagram, ExternalLink } from 'lucide-react';


import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function CompaniesPage() {
  const companies = [
    {
      id: 'skywork',
      name: 'Skywork.id',
      tagline: 'Bekerja dengan Seni',
      description: 'Platform kreatif yang menghadirkan solusi desain dan branding dengan pendekatan artistik yang unik.',
      icon: Palette,
      color: 'bg-blue-500',
      instagram: '@skywork.id',
      website: 'skywork.id',
      services: [
        'Brand Identity Design',
        'Logo & Visual Identity',
        'Print Design',
        'Digital Design',
        'Packaging Design',
        'Marketing Materials',
        'Social Media Design',
        'Creative Consultation'
      ],
      portfolio: [
        { title: 'Brand Identity Project A', category: 'Branding' },
        { title: 'Logo Design Project B', category: 'Logo Design' },
        { title: 'Print Campaign C', category: 'Print Design' },
        { title: 'Digital Campaign D', category: 'Digital Design' }
      ],
      clients: ['Client A', 'Client B', 'Client C', 'Client D']
    },
    {
      id: 'gutama',
      name: 'Gutama Learning',
      tagline: 'Empowering Through Education',
      description: 'Platform pembelajaran yang menyediakan program edukasi dan training berkualitas untuk pengembangan skill.',
      icon: GraduationCap,
      color: 'bg-green-500',
      instagram: '@gutamalearning',
      website: 'gutamalearning.com',
      services: [
        'Professional Training',
        'Skill Development Programs',
        'Corporate Training',
        'Online Courses',
        'Workshop & Seminar',
        'Certification Programs',
        'Learning Resources',
        'Educational Consultation'
      ],
      portfolio: [
        { title: 'Corporate Training Program A', category: 'Corporate Training' },
        { title: 'Online Course B', category: 'Online Learning' },
        { title: 'Workshop Series C', category: 'Workshop' },
        { title: 'Certification Program D', category: 'Certification' }
      ],
      clients: ['Company A', 'Company B', 'Company C', 'Company D']
    },
    {
      id: 'creativework',
      name: 'CreativeWork',
      tagline: 'Creative Solutions for Modern Business',
      description: 'Layanan kreatif komprehensif untuk solusi branding, desain, dan strategi kreatif bisnis modern.',
      icon: Lightbulb,
      color: 'bg-purple-500',
      instagram: '@creativesky.id',
      website: 'creativework.id',
      services: [
        'Creative Strategy',
        'Brand Development',
        'Creative Campaign',
        'Content Creation',
        'Creative Direction',
        'Design Thinking Workshop',
        'Innovation Consultation',
        'Creative Solutions'
      ],
      portfolio: [
        { title: 'Creative Campaign A', category: 'Campaign' },
        { title: 'Brand Development B', category: 'Branding' },
        { title: 'Content Strategy C', category: 'Content' },
        { title: 'Creative Direction D', category: 'Direction' }
      ],
      clients: ['Brand A', 'Brand B', 'Brand C', 'Brand D'],
      notice: 'Transisi dari CreativeSky ke CreativeWork untuk fokus yang lebih spesifik pada solusi kreatif bisnis.'
    },
    {
      id: 'evervow',
      name: 'Evervow.wo',
      tagline: 'Creating Magical Wedding Moments',
      description: 'Spesialis wedding planning dan production yang menghadirkan momen pernikahan yang tak terlupakan.',
      icon: Heart,
      color: 'bg-pink-500',
      instagram: '@evervow.wo',
      website: 'evervow.wo',
      services: [
        'Wedding Planning',
        'Wedding Decoration',
        'Venue Selection',
        'Catering Coordination',
        'Photography & Videography',
        'Entertainment Management',
        'Wedding Consultation',
        'Honeymoon Planning'
      ],
      portfolio: [
        { title: 'Romantic Garden Wedding', category: 'Outdoor Wedding' },
        { title: 'Elegant Ballroom Wedding', category: 'Indoor Wedding' },
        { title: 'Beach Wedding Ceremony', category: 'Destination Wedding' },
        { title: 'Traditional Wedding', category: 'Cultural Wedding' }
      ],
      clients: ['Couple A', 'Couple B', 'Couple C', 'Couple D']
    }
  ];

  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to company cards
      document.querySelectorAll('.company-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 0,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to benefit cards
      document.querySelectorAll('.benefit-card').forEach(card => {
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
    <div className="min-h-screen scroll-snap-container">
      <main>
        {/* Hero Section */}
        <SimpleHero
          title="Companies Kami"
          subtitle="Narvex Ecosystem"
          description="Ekosistem perusahaan yang terintegrasi untuk memberikan solusi kreatif dan layanan terbaik"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Companies' }
          ]}
          className="scroll-snap-section"
        />

        {/* Companies Overview */}
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-20 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-10 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-200/15 rounded-full blur-xl" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
            <div className="absolute top-3/5 right-1/3 w-20 h-20 bg-blue-200/10 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-2/5 left-1/8 w-32 h-32 bg-gold-200/12 rounded-full filter blur-3xl" data-parallax="0.2" data-float="true" data-float-amplitude="22" data-float-duration="11"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Keluarga Besar Narvex</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Setiap company memiliki keahlian khusus yang saling melengkapi untuk memberikan 
                solusi komprehensif bagi klien.
              </p>
            </div>
            
            <div className="space-y-24 scroll-animate" data-animation-delay="0.6">
              {companies.map((company, index) => {
                const IconComponent = company.icon;
                return (
                  <Card 
                      key={company.id} 
                      variant="service" 
                      className="company-card glass-morphism depth-4 bg-gradient-to-br from-blue-200/80 to-blue-100/60 backdrop-blur-sm border-blue-200/50 hover:shadow-lg transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <CardContent className="p-8">
                      {/* Company Header */}
                      <div className="text-center mb-8">
                        <div className={`w-20 h-20 ${company.color} rounded-3xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-102 hover:rotate-2`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="heading-3 text-blue-900 mb-2">{company.name}</h3>
                        <p className="text-xl text-gold-500 font-medium mb-3">{company.tagline}</p>
                        <p className="body-large text-gray-600 max-w-2xl mx-auto">{company.description}</p>
                        
                        {company.notice && (
                          <div className="mt-4 bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-xl p-3 max-w-2xl mx-auto shadow-sm">
                            <p className="text-gold-700 text-sm">
                              <strong>Notice:</strong> {company.notice}
                            </p>
                          </div>
                        )}
                      </div>
                    
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Services */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                          <CardContent className="p-6 flex flex-col h-full">
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Layanan</h4>
                            <div className="flex-1">
                              <ul className="space-y-2 list-none">
                                {company.services.map((service, idx) => (
                                  <li key={idx} className="flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-0.5">
                                    <span className="w-2 h-2 bg-gold-400 rounded-full mr-3 flex-shrink-0 transition-all duration-300 hover:scale-110" aria-hidden="true"></span>
                                    <span className="text-gray-700 text-sm">{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Portfolio */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                          <CardContent className="p-6 flex flex-col h-full">
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Portfolio Highlights</h4>
                            <div className="flex-1">
                              <div className="space-y-2">
                                {company.portfolio.map((project, idx) => (
                                  <div key={idx} className="bg-white/80 rounded-lg p-3 transition-all duration-300 hover:bg-white hover:scale-101 hover:shadow-sm">
                                    <h5 className="font-semibold text-blue-900 mb-1 text-sm">{project.title}</h5>
                                    <span className="text-xs text-gold-500">{project.category}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      
                        {/* Contact & Social */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-all duration-300 h-full flex flex-col md:col-span-2 lg:col-span-1">
                          <CardContent className="p-6 flex flex-col h-full">
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Kontak & Social</h4>
                            
                            <div className="flex-1 space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center transition-colors duration-300 hover:text-pink-600">
                                  <Instagram className="w-4 h-4 text-pink-500 mr-3" />
                                  <span className="text-gray-700 text-sm">{company.instagram}</span>
                                </div>
                                
                                <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
                                  <ExternalLink className="w-4 h-4 text-blue-500 mr-3" />
                                  <span className="text-gray-700 text-sm">{company.website}</span>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <h5 className="font-semibold text-blue-900 mb-3 text-sm">Major Clients</h5>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {company.clients.map((client, idx) => (
                                    <div key={idx} className="bg-white/80 rounded-lg px-2 py-1.5 text-center text-xs text-gray-600 transition-all duration-300 hover:bg-white hover:scale-101 hover:shadow-sm">
                                      {client}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-102 hover:shadow-md transform">
                                Hubungi {company.name}
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      

                      
                      {index < companies.length - 1 && (
                        <div className="border-b border-gray-200 mt-16"></div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Keunggulan Integrasi</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Dengan companies yang terintegrasi, kami dapat memberikan solusi end-to-end 
                yang lebih efisien dan efektif.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-animate" data-animation-delay="0.6">
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:scale-102">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-2">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Sinergi</h3>
                  <p className="text-gray-600">Kolaborasi antar company untuk hasil optimal</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:scale-102">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-2">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Efisiensi</h3>
                  <p className="text-gray-600">Proses yang lebih cepat dengan koordinasi internal</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:scale-102">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-2">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Spesialisasi</h3>
                  <p className="text-gray-600">Keahlian khusus di setiap bidang layanan</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-lg transition-all duration-300 hover:scale-102">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105 hover:rotate-2">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">One-Stop</h3>
                  <p className="text-gray-600">Solusi lengkap dari satu ekosistem perusahaan</p>
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
              <Link href="/contact" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="0">
                <div className="contact-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-gold-500">
                  <Image src="/icons/email.png" alt="Email" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </Link>
              
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
      </main>
    </div>
  );
}