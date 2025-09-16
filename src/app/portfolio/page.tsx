'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Calendar, Users, Award, ExternalLink } from 'lucide-react';

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

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Portfolio & <span className="text-gold-400">Case Studies</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Showcase project-project terbaik dari creative services, event production, dan digital marketing kami
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                    activeFilter === category.id
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={activeFilter === category.id ? {backgroundColor: '#dbc48a'} : {}}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Narvex Portfolio */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Narvex Portfolio</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Project-project unggulan yang telah kami kerjakan dengan detail case study dan hasil yang dicapai.
              </p>
            </div>
            
            <div className="space-y-16">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    {project.featured && (
                      <div className="inline-flex items-center bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Award className="w-4 h-4 mr-2" />
                        Featured Project
                      </div>
                    )}
                    
                    <h3 className="text-3xl font-bold text-blue-900 mb-4">{project.title}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {project.client}
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-6">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Services Provided:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-gold-500">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                      Lihat Detail Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-4">📸</div>
                        <p>Project Image Gallery</p>
                        <p className="text-sm">{project.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Highlights */}
        {filteredServiceHighlights.length > 0 && (
          <section className="section-padding bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Service Highlights</h2>
                <p className="body-large text-gray-600 max-w-3xl mx-auto">
                  Showcase keahlian kami dalam berbagai layanan creative services yang telah terbukti memberikan hasil optimal.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredServiceHighlights.map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{color: '#6382b4'}}>{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold mb-3" style={{color: '#dbc48a'}}>{service.count}</div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="section-padding bg-blue-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Pencapaian Kami</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">100+</div>
                <div className="text-white">Total Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">50+</div>
                <div className="text-white">Happy Clients</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">98%</div>
                <div className="text-white">Satisfaction Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">4</div>
                <div className="text-white">Core Services</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Siap Menjadi Bagian dari Portfolio Kami?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Mari diskusikan project Anda dan wujudkan visi kreatif yang luar biasa bersama tim Narvex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Mulai Project
                </button>
                <button className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
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