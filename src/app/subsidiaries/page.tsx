import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Palette, GraduationCap, Lightbulb, Heart, Instagram, ExternalLink } from 'lucide-react';
import InstagramFeed from '@/components/social/InstagramFeed';
import SocialMediaGrid from '@/components/social/SocialMediaGrid';

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

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Subsidiaries <span className="text-orange-400">Kami</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Ekosistem perusahaan yang terintegrasi untuk memberikan solusi kreatif dan layanan terbaik
              </p>
            </div>
          </div>
        </section>

        {/* Subsidiaries Overview */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Keluarga Besar Narvex</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Setiap subsidiary memiliki keahlian khusus yang saling melengkapi untuk memberikan 
                solusi komprehensif bagi klien.
              </p>
            </div>
            
            <div className="space-y-24">
              {subsidiaries.map((subsidiary, index) => {
                const IconComponent = subsidiary.icon;
                return (
                  <div key={subsidiary.id} className="">
                    {/* Subsidiary Header */}
                    <div className="text-center mb-12">
                      <div className={`w-24 h-24 ${subsidiary.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-4xl font-bold text-navy-900 mb-3">{subsidiary.name}</h3>
                      <p className="text-xl text-orange-500 font-medium mb-4">{subsidiary.tagline}</p>
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subsidiary.description}</p>
                      
                      {subsidiary.notice && (
                        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
                          <p className="text-orange-700 text-sm">
                            <strong>Notice:</strong> {subsidiary.notice}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Services */}
                      <div className="bg-gray-50 rounded-2xl p-8">
                        <h4 className="text-2xl font-bold text-navy-900 mb-6">Layanan</h4>
                        <div className="space-y-3">
                          {subsidiary.services.map((service, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Portfolio */}
                      <div className="bg-gray-50 rounded-2xl p-8">
                        <h4 className="text-2xl font-bold text-navy-900 mb-6">Portfolio Highlights</h4>
                        <div className="space-y-4">
                          {subsidiary.portfolio.map((project, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-4">
                              <h5 className="font-semibold text-navy-900 mb-1">{project.title}</h5>
                              <span className="text-sm text-orange-500">{project.category}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Contact & Social */}
                      <div className="bg-gray-50 rounded-2xl p-8">
                        <SocialMediaGrid 
                          companyId={subsidiary.id}
                          title="Kontak & Social"
                          layout="vertical"
                          className="mb-6"
                        />
                        
                        <div className="border-t pt-6">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Instagram className="w-5 h-5 text-pink-500 mr-3" />
                              <span className="text-gray-700">{subsidiary.instagram}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <ExternalLink className="w-5 h-5 text-blue-500 mr-3" />
                              <span className="text-gray-700">{subsidiary.website}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="font-semibold text-navy-900 mb-3">Major Clients</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {subsidiary.clients.map((client, idx) => (
                                <div key={idx} className="bg-white rounded px-3 py-2 text-center text-sm text-gray-600">
                                  {client}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <button className={`w-full ${subsidiary.color} hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-opacity`}>
                              Hubungi {subsidiary.name}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Instagram Feed */}
                    <div className="mt-12 bg-gray-50 rounded-2xl p-8">
                      <InstagramFeed 
                        username={subsidiary.instagram.replace('@', '')}
                        displayName={subsidiary.name}
                        limit={4}
                        className=""
                      />
                    </div>
                    
                    {index < subsidiaries.length - 1 && (
                      <div className="border-b border-gray-200 mt-16"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Keunggulan Integrasi</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Dengan subsidiaries yang terintegrasi, kami dapat memberikan solusi end-to-end 
                yang lebih efisien dan efektif.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Sinergi</h3>
                <p className="text-gray-600">Kolaborasi antar subsidiary untuk hasil optimal</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Efisiensi</h3>
                <p className="text-gray-600">Proses yang lebih cepat dengan koordinasi internal</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Spesialisasi</h3>
                <p className="text-gray-600">Keahlian khusus di setiap bidang layanan</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">One-Stop</h3>
                <p className="text-gray-600">Solusi lengkap dari satu ekosistem perusahaan</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tertarik Berkolaborasi?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Hubungi subsidiary yang sesuai dengan kebutuhan Anda atau konsultasikan 
                untuk solusi terintegrasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Konsultasi Gratis
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
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