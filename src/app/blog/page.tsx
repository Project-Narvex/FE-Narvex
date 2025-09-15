'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'Semua Artikel', count: 24 },
    { id: 'company-updates', name: 'Company Updates', count: 8 },
    { id: 'industry-insights', name: 'Industry Insights', count: 6 },
    { id: 'project-stories', name: 'Project Stories', count: 5 },
    { id: 'tips-tricks', name: 'Tips & Tricks', count: 3 },
    { id: 'subsidiary-news', name: 'Subsidiary News', count: 2 }
  ];
  
  const articles = [
    {
      id: 1,
      title: 'Narvex Meluncurkan Layanan MICE Terintegrasi untuk Pasar Indonesia',
      excerpt: 'Dengan pengalaman lebih dari 3 tahun, Narvex kini memperluas layanan dengan solusi MICE yang komprehensif untuk memenuhi kebutuhan industri yang berkembang pesat.',
      category: 'company-updates',
      author: 'Tim Narvex',
      date: '2024-01-15',
      readTime: '5 min',
      tags: ['MICE', 'Layanan Baru', 'Ekspansi'],
      featured: true
    },
    {
      id: 2,
      title: 'Tren Event Hybrid: Masa Depan Industri MICE di Era Digital',
      excerpt: 'Analisis mendalam tentang bagaimana event hybrid mengubah landscape industri MICE dan strategi adaptasi yang perlu dilakukan oleh event organizer.',
      category: 'industry-insights',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      readTime: '8 min',
      tags: ['Hybrid Event', 'Digital Transformation', 'MICE Industry'],
      featured: false
    },
    {
      id: 3,
      title: 'Behind the Scenes: JBBI Expo & Seminar Nasional di Bandung',
      excerpt: 'Cerita di balik layar penyelenggaraan JBBI Expo yang sukses, mulai dari perencanaan hingga eksekusi dengan 500+ peserta dan 50+ exhibitor.',
      category: 'project-stories',
      author: 'Ahmad Rizki',
      date: '2024-01-10',
      readTime: '6 min',
      tags: ['Case Study', 'Exhibition', 'Event Management'],
      featured: true
    },
    {
      id: 4,
      title: 'Skywork.id Raih Penghargaan Best Creative Agency 2023',
      excerpt: 'Subsidiary Narvex, Skywork.id, meraih penghargaan bergengsi sebagai Best Creative Agency 2023 berkat pendekatan "Bekerja dengan Seni" yang inovatif.',
      category: 'subsidiary-news',
      author: 'Tim Skywork',
      date: '2024-01-08',
      readTime: '4 min',
      tags: ['Penghargaan', 'Skywork.id', 'Creative Agency'],
      featured: false
    },
    {
      id: 5,
      title: '5 Tips Memilih Venue yang Tepat untuk Corporate Event',
      excerpt: 'Panduan praktis untuk memilih venue yang sesuai dengan kebutuhan corporate event, mulai dari kapasitas hingga fasilitas pendukung.',
      category: 'tips-tricks',
      author: 'Maria Sari',
      date: '2024-01-05',
      readTime: '7 min',
      tags: ['Event Planning', 'Venue Selection', 'Corporate Event'],
      featured: false
    },
    {
      id: 6,
      title: 'Inovasi Furniture Custom untuk Exhibition Booth Modern',
      excerpt: 'Bagaimana tim furniture production Narvex menghadirkan inovasi desain booth yang tidak hanya fungsional tapi juga estetis dan sustainable.',
      category: 'industry-insights',
      author: 'Budi Santoso',
      date: '2024-01-03',
      readTime: '5 min',
      tags: ['Furniture Design', 'Exhibition', 'Innovation'],
      featured: false
    },
    {
      id: 7,
      title: 'Gutama Learning Luncurkan Program Sertifikasi Event Management',
      excerpt: 'Program sertifikasi komprehensif untuk para profesional yang ingin mengembangkan karir di bidang event management dan MICE industry.',
      category: 'subsidiary-news',
      author: 'Tim Gutama Learning',
      date: '2023-12-28',
      readTime: '6 min',
      tags: ['Education', 'Certification', 'Event Management'],
      featured: false
    },
    {
      id: 8,
      title: 'Sukses Activity Camel di Taman Apsari: Brand Activation yang Memorable',
      excerpt: 'Case study brand activation outdoor yang sukses menciptakan engagement tinggi dan brand awareness yang signifikan untuk brand Camel.',
      category: 'project-stories',
      author: 'Lisa Permata',
      date: '2023-12-25',
      readTime: '8 min',
      tags: ['Brand Activation', 'Outdoor Event', 'Case Study'],
      featured: false
    }
  ];
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Blog & <span className="text-orange-400">News Center</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Insights, updates, dan stories dari dunia MICE, event production, dan industri kreatif
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Artikel Unggulan</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Artikel-artikel terpilih yang memberikan insights berharga tentang industri dan project terbaru kami.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📰</div>
                      <p>Featured Article Image</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.date).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {article.author}
                      </div>
                      <span>{article.readTime} read</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center transition-colors">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories & Articles */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar - Categories */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-6">Kategori</h3>
                  
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          activeCategory === category.id
                            ? 'bg-orange-500 text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className={`text-sm ${
                            activeCategory === category.id ? 'text-orange-200' : 'text-gray-400'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-navy-900 mb-4">Tags Populer</h4>
                    <div className="flex flex-wrap gap-2">
                      {['MICE', 'Event Planning', 'Creative Design', 'Case Study', 'Industry Trends'].map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content - Articles */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">
                    {activeCategory === 'all' ? 'Semua Artikel' : categories.find(c => c.id === activeCategory)?.name}
                  </h3>
                  <p className="text-gray-600">
                    {filteredArticles.length} artikel ditemukan
                    {searchTerm && ` untuk "${searchTerm}"`}
                  </p>
                </div>
                
                <div className="space-y-8">
                  {filteredArticles.map((article) => (
                    <article key={article.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <div className="text-2xl mb-1">📄</div>
                              <p className="text-xs">Article Image</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(article.date).toLocaleDateString('id-ID')}
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {article.author}
                            </div>
                            <span>{article.readTime} read</span>
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 mr-1" />
                              {categories.find(c => c.id === article.category)?.name}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-navy-900 mb-3 hover:text-orange-500 cursor-pointer transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.map((tag, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <button className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center transition-colors">
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      3
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="section-padding bg-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Dapatkan artikel terbaru, industry insights, dan update project langsung ke email Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Kami menghormati privasi Anda. Unsubscribe kapan saja.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}