'use client';

import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Palette, Calendar, Smartphone, Users } from 'lucide-react';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function ServicesPage() {
  const services = [
    {
      icon: Palette,
      title: "Creative Design & Branding",
      subtitle: "Brand Identity, Graphic Design, Visual Communication",
      description: "Layanan komprehensif untuk membangun brand identity yang kuat dan memorable melalui strategi kreatif yang tepat sasaran.",
      features: [
        "Brand Identity Development",
        "Logo Design & Brand Guidelines",
        "Marketing Materials Design",
        "Packaging Design",
        "Visual Communication",
        "Brand Strategy & Positioning"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Event Production",
      subtitle: "Corporate Events, Product Launches, Conferences",
      description: "Event production yang memorable dan impactful dengan eksekusi yang sempurna dari perencanaan hingga pelaksanaan.",
      features: [
        "Event Planning & Coordination",
        "Stage Design & Decoration",
        "Event Management",
        "Audio Visual Equipment",
        "Live Streaming & Documentation",
        "Vendor Coordination"
      ],
      color: "bg-gold-500"
    },
    {
      icon: Smartphone,
      title: "Digital Marketing",
      subtitle: "Social Media, SEO, Digital Advertising, Website Development",
      description: "Strategi digital marketing yang efektif dan terukur untuk mengoptimalkan digital presence dan mencapai target audience.",
      features: [
        "Social Media Management",
        "Search Engine Optimization (SEO)",
        "Google Ads & Facebook Ads",
        "Content Marketing & Copywriting",
        "Website Development",
        "Digital Strategy & Analytics"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Brand Consultation",
      subtitle: "Strategic Planning, Brand Positioning, Competitive Analysis",
      description: "Konsultasi strategis untuk membantu klien membangun brand yang kuat dengan positioning yang tepat di pasar.",
      features: [
        "Brand Positioning Strategy",
        "Competitive Analysis",
        "Market Research & Insights",
        "Brand Messaging Development",
        "Creative Strategy Planning",
        "Brand Performance Evaluation"
      ],
      color: "bg-gold-600"
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
    <div className="min-h-screen scroll-snap-container">
      <Header />
      
      <main>
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
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Portfolio Layanan Lengkap</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Dari creative design hingga digital marketing, kami menyediakan solusi terintegrasi 
                untuk kesuksesan setiap project Anda.
              </p>
            </div>
            
            <div className="space-y-16 scroll-animate" data-animation-delay="0.6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={index} 
                    variant="service" 
                    className={`service-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50 grid lg:grid-cols-2 gap-12 items-center hover:shadow-2xl transition-all duration-500 ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <CardContent className={`p-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
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
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center transition-all duration-300 hover:text-blue-600 hover:translate-x-1">
                            <div className="w-2 h-2 bg-gold-400 rounded-full mr-3 flex-shrink-0 transition-all duration-300 hover:scale-150"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
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
                Siap Memulai Project Anda?
              </h2>
              <p className="body-large text-gray-300 mb-8" data-text-animation="fade-in" data-animation-delay="0.4">
                Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi terbaik untuk kebutuhan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate" data-animation-delay="0.6">
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Konsultasi Gratis
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                  Lihat Portfolio
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