'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { MapPin, Calendar, Users, Award, ExternalLink } from 'lucide-react';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const narvexProjects = [
    {
      id: 'tech-startup-branding',
      title: 'Tech Startup Complete Branding',
      category: 'branding',
      location: 'Jakarta',
      date: '2023',
      client: 'InnovateTech Solutions',
      description: 'Pengembangan identitas brand lengkap untuk startup teknologi, mulai dari logo hingga brand guidelines.',
      services: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Marketing Collaterals'],
      results: {
        recognition: '300%',
        engagement: '250%',
        satisfaction: '98%'
      },
      featured: true
    },
    {
      id: 'corporate-event-production',
      title: 'Annual Corporate Summit',
      category: 'event',
      location: 'Bali International Convention Centre',
      date: '2023',
      client: 'Global Finance Corp',
      description: 'Produksi event corporate summit tahunan dengan 500+ peserta dan teknologi hybrid streaming.',
      services: ['Event Production', 'Stage Design', 'Audio Visual', 'Live Streaming'],
      results: {
        participants: '500+',
        online_viewers: '2000+',
        satisfaction: '96%'
      },
      featured: true
    },
    {
      id: 'digital-campaign',
      title: 'E-commerce Digital Campaign',
      category: 'digital',
      location: 'Multi-platform',
      date: '2023',
      client: 'FashionForward',
      description: 'Kampanye digital marketing terintegrasi untuk brand fashion dengan fokus pada Gen Z audience.',
      services: ['Social Media Strategy', 'Content Creation', 'Influencer Marketing', 'Performance Ads'],
      results: {
        reach: '1M+',
        engagement: '15%',
        conversion: '8.5%'
      },
      featured: true
    },
    {
      id: 'brand-consultation',
      title: 'Restaurant Chain Rebranding',
      category: 'consultation',
      location: 'Surabaya',
      date: '2023',
      client: 'Nusantara Flavors',
      description: 'Konsultasi dan implementasi rebranding untuk chain restaurant dengan 15 cabang.',
      services: ['Brand Audit', 'Market Research', 'Brand Strategy', 'Implementation Support'],
      results: {
        sales_increase: '40%',
        brand_awareness: '60%',
        satisfaction: '94%'
      },
      featured: true
    }
  ];
  
  const serviceHighlights = [
    {
      id: 'branding-showcase',
      title: 'Creative Design & Branding',
      category: 'branding',
      description: 'Identitas visual yang kuat dan memorable untuk berbagai jenis bisnis.',
      count: '50+ Brands',
      icon: '🎨'
    },
    {
      id: 'event-showcase',
      title: 'Event Production',
      category: 'event',
      description: 'Produksi event berkualitas tinggi dari konsep hingga eksekusi sempurna.',
      count: '100+ Events',
      icon: '🎪'
    },
    {
      id: 'digital-showcase',
      title: 'Digital Marketing',
      category: 'digital',
      description: 'Strategi digital marketing yang efektif untuk meningkatkan brand awareness.',
      count: '75+ Campaigns',
      icon: '📱'
    },
    {
      id: 'consultation-showcase',
      title: 'Brand Consultation',
      category: 'consultation',
      description: 'Konsultasi strategis untuk pengembangan dan transformasi brand.',
      count: '30+ Consultations',
      icon: '💡'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'Semua Project' },
    { id: 'branding', name: 'Creative Design & Branding' },
    { id: 'event', name: 'Event Production' },
    { id: 'digital', name: 'Digital Marketing' },
    { id: 'consultation', name: 'Brand Consultation' }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? narvexProjects 
    : narvexProjects.filter(project => project.category === activeFilter);
    
  const filteredServiceHighlights = activeFilter === 'all'
    ? serviceHighlights
    : serviceHighlights.filter(service => service.category === activeFilter);

  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to portfolio cards
      document.querySelectorAll('.portfolio-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to service highlight cards
      document.querySelectorAll('.service-highlight-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 6,
          perspective: 800,
          shadowIntensity: 0.15,
          liftHeight: 8
        });
      });
      
      // Add 3D effects to filter buttons
      document.querySelectorAll('.filter-button').forEach(button => {
        add3DCardEffect(button, {
          maxRotation: 4,
          perspective: 600,
          shadowIntensity: 0.1,
          liftHeight: 4
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
          title="Portfolio & Case Studies"
          subtitle="Narvex Showcase"
          description="Showcase project-project terbaik dari creative services, event production, dan digital marketing kami"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Portfolio' }
          ]}
          className="scroll-snap-section"
        />

        {/* Filter Section */}
        <section className="py-12 bg-gradient-to-br from-white via-gray-50 to-white border-b scroll-snap-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 scroll-animate" data-animation-delay="0.2">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`filter-button px-6 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105 hover:shadow-lg transform ${
                    activeFilter === category.id
                      ? 'text-white bg-gradient-to-r from-gold-500 to-gold-600 shadow-xl scale-105'
                      : 'bg-white/80 text-gray-700 hover:bg-blue-50/80 border border-gray-200 hover:border-blue-300'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Narvex Portfolio */}
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
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Narvex Portfolio</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Project-project unggulan yang telah kami kerjakan dengan detail case study dan hasil yang dicapai.
              </p>
            </div>
            
            <div className="space-y-16 scroll-animate" data-animation-delay="0.6">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  variant="service" 
                  className={`portfolio-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 grid lg:grid-cols-2 gap-12 items-center hover:shadow-2xl transition-all duration-500 ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <CardContent className={`p-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {project.featured && (
                      <div className="inline-flex items-center bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-4 shadow-sm">
                        <Award className="w-4 h-4 mr-2" />
                        Featured Project
                      </div>
                    )}
                    
                    <h3 className="heading-3 text-blue-900 mb-4">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                      <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.date}
                      </div>
                      <div className="flex items-center transition-colors duration-300 hover:text-blue-600">
                        <Users className="w-4 h-4 mr-2" />
                        {project.client}
                      </div>
                    </div>
                    
                    <p className="body-large text-gray-600 mb-6">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Services Provided:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 hover:scale-105">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center p-3 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200 transition-all duration-300 hover:scale-105 hover:shadow-md">
                          <div className="text-2xl font-bold text-gold-600 mb-1">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center hover:scale-105 hover:shadow-lg transform">
                      Lihat Detail Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </CardContent>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} p-8`}>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden relative group">
                      <div className="text-center text-gray-500 transition-all duration-300 group-hover:scale-110">
                        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:rotate-12">📸</div>
                        <p className="font-semibold mb-2">Project Image Gallery</p>
                        <p className="text-sm">{project.title}</p>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        {filteredServiceHighlights.length > 0 && (
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
                <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Service Highlights</h2>
                <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                  Showcase keahlian kami dalam berbagai layanan creative services yang telah terbukti memberikan hasil optimal.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-animate" data-animation-delay="0.6">
                {filteredServiceHighlights.map((service, index) => (
                  <Card 
                    key={service.id} 
                    variant="service" 
                    className="service-highlight-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 transition-colors duration-300" style={{color: '#6382b4'}}>{service.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold mb-3 transition-colors duration-300" style={{color: '#dbc48a'}}>{service.count}</div>
                        <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-700 hover:text-blue-700 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md transform">
                          Lihat Detail
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 scroll-snap-section morphing-bg-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gold-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-white mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Pencapaian Kami</h2>
              <p className="body-large text-gray-300 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-animate" data-animation-delay="0.6">
              <Card variant="service" className="glass-morphism depth-3 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gold-400 mb-2 transition-transform duration-300 hover:scale-110">100+</div>
                  <div className="text-white">Total Projects</div>
                </CardContent>
              </Card>
              
              <Card variant="service" className="glass-morphism depth-3 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gold-400 mb-2 transition-transform duration-300 hover:scale-110">50+</div>
                  <div className="text-white">Happy Clients</div>
                </CardContent>
              </Card>
              
              <Card variant="service" className="glass-morphism depth-3 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gold-400 mb-2 transition-transform duration-300 hover:scale-110">98%</div>
                  <div className="text-white">Satisfaction Rate</div>
                </CardContent>
              </Card>
              
              <Card variant="service" className="glass-morphism depth-3 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:scale-105 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gold-400 mb-2 transition-transform duration-300 hover:scale-110">4</div>
                  <div className="text-white">Core Services</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-1 text-blue-900 mb-6" data-text-animation="wave" data-animation-delay="0.2">
                Siap Menjadi Bagian dari Portfolio Kami?
              </h2>
              <p className="body-large text-gray-600 mb-8" data-text-animation="fade-in" data-animation-delay="0.4">
                Mari diskusikan project Anda dan wujudkan visi kreatif yang luar biasa bersama tim Narvex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate" data-animation-delay="0.6">
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Mulai Project
                </button>
                <button className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Download Portfolio
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