'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Palette, GraduationCap, Lightbulb, Heart, Instagram, ExternalLink } from 'lucide-react';
import InstagramFeed from '@/components/social/InstagramFeed';
import SocialMediaGrid from '@/components/social/SocialMediaGrid';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function SubsidiariesPage() {
  const subsidiaries = [
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
      // Add 3D card effects to subsidiary cards
      document.querySelectorAll('.subsidiary-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
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
      <Header />
      
      <main>
        {/* Hero Section */}
        <SimpleHero
          title="Subsidiaries Kami"
          subtitle="Narvex Ecosystem"
          description="Ekosistem perusahaan yang terintegrasi untuk memberikan solusi kreatif dan layanan terbaik"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Subsidiaries' }
          ]}
          className="scroll-snap-section"
        />

        {/* Subsidiaries Overview */}
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section morphing-bg-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-20 w-56 h-56 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Keluarga Besar Narvex</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Setiap subsidiary memiliki keahlian khusus yang saling melengkapi untuk memberikan 
                solusi komprehensif bagi klien.
              </p>
            </div>
            
            <div className="space-y-24 scroll-animate" data-animation-delay="0.6">
              {subsidiaries.map((subsidiary, index) => {
                const IconComponent = subsidiary.icon;
                return (
                  <Card 
                    key={subsidiary.id} 
                    variant="service" 
                    className="subsidiary-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 hover:shadow-2xl transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <CardContent className="p-8">
                      {/* Subsidiary Header */}
                      <div className="text-center mb-12">
                        <div className={`w-24 h-24 ${subsidiary.color} rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="heading-3 text-blue-900 mb-3">{subsidiary.name}</h3>
                        <p className="text-xl text-gold-500 font-medium mb-4">{subsidiary.tagline}</p>
                        <p className="body-large text-gray-600 max-w-2xl mx-auto">{subsidiary.description}</p>
                        
                        {subsidiary.notice && (
                          <div className="mt-6 bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-xl p-4 max-w-2xl mx-auto shadow-sm">
                            <p className="text-gold-700 text-sm">
                              <strong>Notice:</strong> {subsidiary.notice}
                            </p>
                          </div>
                        )}
                      </div>
                    
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Services */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-8">
                            <h4 className="text-2xl font-bold text-blue-900 mb-6">Layanan</h4>
                            <div className="space-y-3">
                              {subsidiary.services.map((service, idx) => (
                                <div key={idx} className="flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-1">
                                  <div className="w-2 h-2 bg-gold-400 rounded-full mr-3 flex-shrink-0 transition-all duration-300 hover:scale-150"></div>
                                  <span className="text-gray-700">{service}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Portfolio */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-8">
                            <h4 className="text-2xl font-bold text-blue-900 mb-6">Portfolio Highlights</h4>
                            <div className="space-y-4">
                              {subsidiary.portfolio.map((project, idx) => (
                                <div key={idx} className="bg-white/80 rounded-xl p-4 transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-md">
                                  <h5 className="font-semibold text-blue-900 mb-1">{project.title}</h5>
                                  <span className="text-sm text-gold-500">{project.category}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      
                        {/* Contact & Social */}
                        <Card variant="service" className="glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-8">
                            <SocialMediaGrid 
                              companyId={subsidiary.id}
                              title="Kontak & Social"
                              layout="vertical"
                              className="mb-6"
                            />
                            
                            <div className="border-t pt-6">
                              <div className="space-y-4">
                                <div className="flex items-center transition-colors duration-300 hover:text-pink-600">
                                  <Instagram className="w-5 h-5 text-pink-500 mr-3" />
                                  <span className="text-gray-700">{subsidiary.instagram}</span>
                                </div>
                                
                                <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
                                  <ExternalLink className="w-5 h-5 text-blue-500 mr-3" />
                                  <span className="text-gray-700">{subsidiary.website}</span>
                                </div>
                              </div>
                              
                              <div className="mt-6">
                                <h5 className="font-semibold text-blue-900 mb-3">Major Clients</h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {subsidiary.clients.map((client, idx) => (
                                    <div key={idx} className="bg-white/80 rounded-lg px-3 py-2 text-center text-sm text-gray-600 transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-sm">
                                      {client}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="mt-6">
                                <button className={`w-full ${subsidiary.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform`}>
                                  Hubungi {subsidiary.name}
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Instagram Feed */}
                      <Card variant="service" className="mt-12 glass-morphism depth-3 bg-gray-50/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-8">
                          <InstagramFeed 
                            username={subsidiary.instagram.replace('@', '')}
                            displayName={subsidiary.name}
                            limit={4}
                            className=""
                          />
                        </CardContent>
                      </Card>
                      
                      {index < subsidiaries.length - 1 && (
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
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Keunggulan Integrasi</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Dengan subsidiaries yang terintegrasi, kami dapat memberikan solusi end-to-end 
                yang lebih efisien dan efektif.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-animate" data-animation-delay="0.6">
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Sinergi</h3>
                  <p className="text-gray-600">Kolaborasi antar subsidiary untuk hasil optimal</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Efisiensi</h3>
                  <p className="text-gray-600">Proses yang lebih cepat dengan koordinasi internal</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Spesialisasi</h3>
                  <p className="text-gray-600">Keahlian khusus di setiap bidang layanan</p>
                </CardContent>
              </Card>
              
              <Card variant="service" className="benefit-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">One-Stop</h3>
                  <p className="text-gray-600">Solusi lengkap dari satu ekosistem perusahaan</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 scroll-snap-section morphing-bg-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gold-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>
          
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-1 text-white mb-6" data-text-animation="wave" data-animation-delay="0.2">
                Tertarik Berkolaborasi?
              </h2>
              <p className="body-large text-gray-300 mb-8" data-text-animation="fade-in" data-animation-delay="0.4">
                Hubungi subsidiary yang sesuai dengan kebutuhan Anda atau konsultasikan 
                untuk solusi terintegrasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate" data-animation-delay="0.6">
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Konsultasi Gratis
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Lihat Portfolio Lengkap
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}