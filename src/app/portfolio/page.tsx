'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Calendar, Users, Award, ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const narvexProjects = [
    {
      id: 'jbbi-expo',
      title: 'JBBI Expo & Seminar Nasional',
      category: 'exhibition',
      location: 'Grand Ballroom Sudirman, Bandung',
      date: '2023',
      client: 'JBBI (Jaringan Bisnis Berkelanjutan Indonesia)',
      description: 'Penyelenggaraan expo dan seminar nasional dengan tema sustainability dan bisnis berkelanjutan.',
      services: ['Event Management', 'Exhibition Design', 'Audio Visual', 'Registration System'],
      results: {
        participants: '500+',
        exhibitors: '50+',
        satisfaction: '95%'
      },
      featured: true
    },
    {
      id: 'spg-kefii',
      title: 'SPG Kefii Booth',
      category: 'booth',
      location: 'Grand City Mall, Surabaya',
      date: '2023',
      client: 'Kefii',
      description: 'Desain dan konstruksi booth promosi produk Kefii dengan konsep modern dan eye-catching.',
      services: ['Booth Design', 'Construction', 'Brand Activation', 'Staff Coordination'],
      results: {
        visitors: '2000+',
        leads: '300+',
        conversion: '15%'
      },
      featured: true
    },
    {
      id: 'activity-camel',
      title: 'Activity Camel',
      category: 'activation',
      location: 'Taman Apsari, Surabaya',
      date: '2023',
      client: 'Camel',
      description: 'Brand activation outdoor dengan konsep adventure dan petualangan yang sesuai dengan brand Camel.',
      services: ['Event Activation', 'Outdoor Setup', 'Entertainment', 'Safety Management'],
      results: {
        participants: '1000+',
        engagement: '85%',
        reach: '50K+'
      },
      featured: true
    },
    {
      id: 'gathering-inova',
      title: 'Gathering Inova Reborn',
      category: 'tour',
      location: 'Jember-Banyuwangi-Bali',
      date: '2023',
      client: 'Inova Community',
      description: 'Community tour multi-destinasi dengan program team building dan networking.',
      services: ['Tour Management', 'Transportation', 'Accommodation', 'Activity Coordination'],
      results: {
        participants: '150+',
        destinations: '3',
        satisfaction: '98%'
      },
      featured: true
    },
    {
      id: 'kementerian-lhk',
      title: 'Corporate Outings Kementerian LHK',
      category: 'corporate',
      location: 'Various Locations',
      date: '2022-2023',
      client: 'Kementerian Lingkungan Hidup dan Kehutanan',
      description: 'Serangkaian corporate outing dan team building untuk pegawai Kementerian LHK.',
      services: ['Event Planning', 'Venue Management', 'Team Building', 'Catering'],
      results: {
        events: '5+',
        participants: '800+',
        satisfaction: '92%'
      },
      featured: false
    }
  ];
  
  const subsidiaryProjects = [
    {
      id: 'skywork-portfolio',
      title: 'Skywork.id Creative Projects',
      category: 'creative',
      subsidiary: 'Skywork.id',
      description: 'Koleksi project branding dan desain kreatif dengan pendekatan "Bekerja dengan Seni".',
      count: '25+ Projects'
    },
    {
      id: 'gutama-portfolio',
      title: 'Gutama Learning Programs',
      category: 'education',
      subsidiary: 'Gutama Learning',
      description: 'Program-program edukasi dan training yang telah diselenggarakan untuk berbagai klien.',
      count: '15+ Programs'
    },
    {
      id: 'creativework-portfolio',
      title: 'CreativeWork Solutions',
      category: 'creative',
      subsidiary: 'CreativeWork',
      description: 'Solusi kreatif dan strategi bisnis untuk brand-brand modern.',
      count: '20+ Solutions'
    },
    {
      id: 'evervow-portfolio',
      title: 'Evervow.wo Weddings',
      category: 'wedding',
      subsidiary: 'Evervow.wo',
      description: 'Pernikahan-pernikahan indah yang telah diorganisir dengan detail sempurna.',
      count: '30+ Weddings'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'Semua Project' },
    { id: 'exhibition', name: 'Exhibition' },
    { id: 'booth', name: 'Booth Design' },
    { id: 'activation', name: 'Brand Activation' },
    { id: 'tour', name: 'Community Tour' },
    { id: 'corporate', name: 'Corporate Event' },
    { id: 'creative', name: 'Creative Services' },
    { id: 'education', name: 'Education' },
    { id: 'wedding', name: 'Wedding' }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? narvexProjects 
    : narvexProjects.filter(project => project.category === activeFilter);
    
  const filteredSubsidiaryProjects = activeFilter === 'all'
    ? subsidiaryProjects
    : subsidiaryProjects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Portfolio & <span className="text-orange-400">Case Studies</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Showcase project-project terbaik dari Narvex dan seluruh subsidiaries
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
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
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
                      <div className="inline-flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Award className="w-4 h-4 mr-2" />
                        Featured Project
                      </div>
                    )}
                    
                    <h3 className="text-3xl font-bold text-navy-900 mb-4">{project.title}</h3>
                    
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
                      <h4 className="font-semibold text-navy-900 mb-3">Services Provided:</h4>
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
                          <div className="text-2xl font-bold text-orange-500">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
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

        {/* Subsidiary Portfolios */}
        {filteredSubsidiaryProjects.length > 0 && (
          <section className="section-padding bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="heading-2 mb-6">Subsidiary Portfolios</h2>
                <p className="body-large text-gray-600 max-w-3xl mx-auto">
                  Portfolio dari masing-masing subsidiary yang menunjukkan keahlian spesifik mereka.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredSubsidiaryProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h3 className="text-xl font-bold text-navy-900 mb-2">{project.title}</h3>
                      <p className="text-orange-500 font-medium text-sm">{project.subsidiary}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-500 mb-3">{project.count}</div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                        Lihat Portfolio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="section-padding bg-navy-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Pencapaian Kami</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
                <div className="text-white">Total Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">25+</div>
                <div className="text-white">Happy Clients</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
                <div className="text-white">Satisfaction Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">4</div>
                <div className="text-white">Subsidiaries</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
                Siap Menjadi Bagian dari Portfolio Kami?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Mari diskusikan project Anda dan wujudkan visi kreatif yang luar biasa bersama tim Narvex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Mulai Project
                </button>
                <button className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
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