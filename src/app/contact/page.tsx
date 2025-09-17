'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MapComponent from '@/components/ui/MapComponent';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Hubungi <span style={{color: '#dbc48a'}}>Kami</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Siap membantu mewujudkan project impian Anda dengan layanan creative services terbaik dari Narvex
              </p>
            </div>
          </div>
        </section>

        {/* Company Selection */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{color: '#27364d'}}>Pilih Layanan yang Tepat</h2>
              <p className="text-gray-600">Setiap layanan memiliki keahlian khusus untuk kebutuhan project Anda</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedCompany(service.id)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all ${
                    selectedCompany === service.id
                      ? 'bg-white'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  style={{
                    borderColor: selectedCompany === service.id ? '#dbc48a' : undefined,
                    backgroundColor: selectedCompany === service.id ? '#f5f1e8' : undefined
                  }}
                >
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{color: '#27364d'}}>{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.services.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {item}
                      </span>
                    ))}
                    {service.services.length > 2 && (
                      <span className="text-gray-400 text-xs">+{service.services.length - 2} more</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    Konsultasi {selectedCompanyData?.name}
                  </h3>
                  <p className="text-gray-600">
                    Form akan diteruskan langsung ke tim spesialis {selectedCompanyData?.name} untuk konsultasi yang tepat.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-colors focus:border-[#dbc48a]"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#dbc48a] focus:outline-none transition-colors resize-none"
                      placeholder="Ceritakan detail project Anda, tujuan, target audience, dan ekspektasi hasil..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full text-white py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center hover:opacity-90"
                    style={{backgroundColor: '#dbc48a'}}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh tim kami.
                  </p>
                </form>
              </div>
              
              {/* Company Contact Info */}
              <div className="space-y-8">
                {/* Selected Company Info */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
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
                </div>
                
                {/* Office Location */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
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
                  <MapComponent height="h-48" className="shadow-sm" />
                </div>
                
                {/* Live Chat */}
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-white">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Contact */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Kontak Semua Layanan</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Akses langsung ke semua layanan creative services Narvex untuk kebutuhan yang spesifik.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{service.contact.email}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedCompany(service.id)}
                    className={`w-full mt-4 ${service.color} hover:opacity-90 text-white py-2 rounded-lg text-sm font-medium transition-opacity`}
                  >
                    Konsultasi {service.name.split(' ')[0]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}