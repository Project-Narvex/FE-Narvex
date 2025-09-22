'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import MapComponent from '@/components/ui/MapComponent';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function ContactPage() {
  const [selectedCompany, setSelectedCompany] = useState('branding');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  });
  
  const services = [
    {
      id: 'branding',
      name: 'Creative Design & Branding',
      description: 'Identitas visual yang kuat dan memorable untuk brand Anda',
      services: [
        'Brand Strategy & Identity',
        'Logo & Visual Design',
        'Brand Guidelines',
        'Marketing Collaterals',
        'Brand Consultation'
      ],
      contact: {
        phone: '+62 xxx xxxx xxxx',
        email: 'creative@narvex.id',
        whatsapp: '+62 xxx xxxx xxxx'
      },
      color: 'bg-blue-500'
    },
    {
      id: 'event',
      name: 'Event Production',
      description: 'Produksi event berkualitas tinggi dari konsep hingga eksekusi',
      services: [
        'Event Planning & Management',
        'Stage & Set Design',
        'Audio Visual Production',
        'Live Streaming',
        'Event Coordination'
      ],
      contact: {
        phone: '+62 xxx xxxx xxxx',
        email: 'event@narvex.id',
        whatsapp: '+62 xxx xxxx xxxx'
      },
      color: 'bg-gold-500'
    },
    {
      id: 'digital',
      name: 'Digital Marketing',
      description: 'Strategi digital marketing yang efektif dan terukur',
      services: [
        'Social Media Strategy',
        'Content Creation',
        'Influencer Marketing',
        'Performance Advertising',
        'Digital Analytics'
      ],
      contact: {
        phone: '+62 xxx xxxx xxxx',
        email: 'digital@narvex.id',
        whatsapp: '+62 xxx xxxx xxxx'
      },
      color: 'bg-blue-600'
    },
    {
      id: 'consultation',
      name: 'Brand Consultation',
      description: 'Konsultasi strategis untuk pengembangan dan transformasi brand',
      services: [
        'Brand Audit & Research',
        'Market Analysis',
        'Brand Strategy Development',
        'Implementation Support',
        'Performance Monitoring'
      ],
      contact: {
        phone: '+62 xxx xxxx xxxx',
        email: 'consultation@narvex.id',
        whatsapp: '+62 xxx xxxx xxxx'
      },
      color: 'bg-gold-600'
    }
  ];
  
  const selectedCompanyData = services.find(c => c.id === selectedCompany);
  
  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to contact cards
      document.querySelectorAll('.contact-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to service selection cards
      document.querySelectorAll('.service-selection-card').forEach(card => {
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { ...formData, targetCompany: selectedCompany });
  };

  return (
    <div className="min-h-screen scroll-snap-container">
      <Header />
      
      <main>
        {/* Hero Section */}
        <SimpleHero
          title="Hubungi Kami"
          subtitle="Narvex Creative Services"
          description="Siap membantu mewujudkan project impian Anda dengan layanan creative services terbaik dari Narvex"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Kontak' }
          ]}
          className="scroll-snap-section"
        />

        {/* Company Selection */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="heading-2 mb-4" style={{color: '#27364d'}} data-text-animation="fade-in" data-animation-delay="0.2">Pilih Layanan yang Tepat</h2>
              <p className="text-gray-600">Setiap layanan memiliki keahlian khusus untuk kebutuhan project Anda</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-animate" data-animation-delay="0.4">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  variant="service"
                  onClick={() => setSelectedCompany(service.id)}
                  className={`service-selection-card cursor-pointer transition-all duration-500 hover:scale-105 glass-morphism depth-3 text-left p-6 rounded-2xl border-2 ${
                    selectedCompany === service.id
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl border-blue-400 transform scale-105'
                      : 'border-gray-200 hover:border-gray-300 bg-white/80 hover:bg-blue-50/80 border-white/50'
                  }`}
                  style={{
                    borderColor: selectedCompany === service.id ? '#dbc48a' : undefined,
                    backgroundColor: selectedCompany === service.id ? '#f5f1e8' : undefined,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}>
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 transition-colors duration-300" style={{color: selectedCompany === service.id ? 'white' : '#27364d'}}>{service.name}</h3>
                    <p className={`text-sm mb-3 transition-colors duration-300 ${
                      selectedCompany === service.id ? 'text-blue-100' : 'text-gray-600'
                    }`}>{service.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {service.services.slice(0, 2).map((item, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs ${
                          selectedCompany === service.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item}
                        </span>
                      ))}
                      {service.services.length > 2 && (
                        <span className={`text-xs ${
                          selectedCompany === service.id ? 'text-blue-200' : 'text-gray-400'
                        }`}>+{service.services.length - 2} more</span>
                      )}
                    </div>
                    
                    {/* Selection indicator */}
                    {selectedCompany === service.id && (
                      <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section morphing-bg-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-20 w-56 h-56 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card variant="service" className="contact-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="heading-3 mb-2" style={{color: '#27364d'}} data-text-animation="fade-in" data-animation-delay="0.2">
                      Konsultasi {selectedCompanyData?.name}
                    </h3>
                    <p className="text-gray-600">
                      Form akan diteruskan langsung ke tim spesialis {selectedCompanyData?.name} untuk konsultasi yang tepat.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 scroll-animate" data-animation-delay="0.4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: '#27364d'}}>
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition-all duration-300 focus:border-[#dbc48a] hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: '#27364d'}}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: '#27364d'}}>
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                        placeholder="Nama perusahaan (opsional)"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Layanan yang Dibutuhkan *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Pilih layanan</option>
                        {selectedCompanyData?.services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                        <option value="consultation">Konsultasi Umum</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">Pilih budget range</option>
                        <option value="under-10m">&lt; 10 Juta</option>
                        <option value="10m-50m">10 - 50 Juta</option>
                        <option value="50m-100m">50 - 100 Juta</option>
                        <option value="100m-500m">100 - 500 Juta</option>
                        <option value="above-500m">&gt; 500 Juta</option>
                        <option value="discuss">Diskusi Lebih Lanjut</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Timeline Project
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Pilih timeline</option>
                      <option value="urgent">Urgent (&lt; 1 minggu)</option>
                      <option value="1-2weeks">1-2 minggu</option>
                      <option value="1month">1 bulan</option>
                      <option value="2-3months">2-3 bulan</option>
                      <option value="flexible">Fleksibel</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Detail Project *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#dbc48a] focus:outline-none transition-all duration-300 resize-none hover:border-blue-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Ceritakan detail project Anda, tujuan, target audience, dan ekspektasi hasil..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:opacity-90 hover:scale-105 hover:shadow-lg transform"
                    style={{backgroundColor: '#dbc48a'}}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh tim kami.
                  </p>
                  </form>
                </CardContent>
              </Card>
              
              {/* Company Contact Info */}
              <div className="space-y-8">
                {/* Selected Company Info */}
                <Card variant="service" className="contact-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50">
                  <CardContent className="p-8">
                  <div className={`w-16 h-16 ${selectedCompanyData?.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-white text-2xl">🏢</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#27364d'}}>
                    {selectedCompanyData?.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{selectedCompanyData?.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3" style={{color: '#dbc48a'}} />
                      <span className="text-gray-700">{selectedCompanyData?.contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3" style={{color: '#dbc48a'}} />
                      <span className="text-gray-700">{selectedCompanyData?.contact.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">WhatsApp: {selectedCompanyData?.contact.whatsapp}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3" style={{color: '#27364d'}}>Layanan Tersedia:</h4>
                    <div className="space-y-2">
                      {selectedCompanyData?.services.map((service, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#dbc48a'}}></div>
                          <span className="text-gray-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Office Location */}
                <Card variant="service" className="contact-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50">
                  <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6" style={{color: '#27364d'}}>Lokasi Kantor</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 mt-1" style={{color: '#dbc48a'}} />
                      <div>
                        <p className="font-semibold" style={{color: '#27364d'}}>Alamat Kantor</p>
                        <p className="text-gray-600">Jakarta, Indonesia</p>
                        <p className="text-gray-600 text-sm">Alamat lengkap akan diberikan setelah konfirmasi meeting</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gold-500 mr-3" />
                      <div>
                        <p className="font-semibold text-blue-900">Jam Operasional</p>
                        <p className="text-gray-600">Senin - Jumat: 09:00 - 18:00</p>
                        <p className="text-gray-600">Sabtu: 09:00 - 15:00</p>
                      </div>
                    </div>
                  </div>
                  
                    {/* Interactive Map */}
                    <MapComponent height="h-48" className="shadow-sm rounded-xl" />
                  </CardContent>
                </Card>
                
                {/* Live Chat */}
                <Card variant="service" className="contact-card glass-morphism depth-3 bg-gradient-to-r from-gold-500 to-gold-600 border-gold-400/50">
                  <CardContent className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Butuh Respon Cepat?</h3>
                  <p className="mb-6">Tim customer support kami siap membantu Anda secara real-time.</p>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-white text-gold-500 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Live Chat
                    </button>
                    
                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Contact */}
        <section className="section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white scroll-snap-section morphing-bg-section">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-gold-400 rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4" data-text-animation="fade-in" data-animation-delay="0.2">
                Atau Hubungi Langsung Tim Spesialis
              </h2>
              <p className="body-large text-gray-300 max-w-2xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Setiap divisi memiliki kontak khusus untuk memberikan layanan yang lebih personal dan tepat sasaran.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-animate" data-animation-delay="0.6">
              {services.map((service, index) => (
                <Card 
                  key={service.id} 
                  variant="service" 
                  className="contact-card glass-morphism depth-4 bg-gray-800/80 backdrop-blur-sm border-gray-700/50 hover:bg-gray-700/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}>
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 transition-colors duration-300">{service.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm transition-colors duration-300 hover:text-blue-300">
                        <Phone className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{service.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-sm transition-colors duration-300 hover:text-blue-300">
                        <Mail className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{service.contact.email}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedCompany(service.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-xl transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg transform"
                    >
                      Konsultasi {service.name.split(' ')[0]}
                    </button>
                    
                    {/* Progress bar effect */}
                    <div className="mt-4 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-gold-500 rounded-full transform -translate-x-full hover:translate-x-0 transition-transform duration-1000"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}