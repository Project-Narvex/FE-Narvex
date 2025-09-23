'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import { 
  initializeAnimations, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to article cards
      document.querySelectorAll('.article-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to category cards
       document.querySelectorAll('.category-card').forEach(card => {
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
  
  const categories = [
    { id: 'all', name: 'Semua Artikel', count: 24 },
    { id: 'company-updates', name: 'Company Updates', count: 8 },
    { id: 'industry-insights', name: 'Industry Insights', count: 6 },
    { id: 'project-stories', name: 'Project Stories', count: 5 },
    { id: 'tips-tricks', name: 'Tips & Tricks', count: 3 },
    { id: 'company-news', name: 'Company News', count: 2 }
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
      excerpt: 'Partner company Narvex, Skywork.id, meraih penghargaan bergengsi sebagai Best Creative Agency 2023 berkat pendekatan "Bekerja dengan Seni" yang inovatif.',
      category: 'company-news',
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
      category: 'company-news',
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
    <div className="min-h-screen scroll-snap-container">
      <Header />
      
      <main>
        {/* Hero Section */}
        <SimpleHero 
          title="Blog & Insights"
          subtitle="Temukan artikel terbaru, tips, dan insights dari dunia creative services dan event production"
        />
        
        {/* Categories & Search Section */}
        <section className="section-padding bg-gray-50 morphing-bg-section overflow-x-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base sm:text-lg min-h-[44px] touch-manipulation"
                />
              </div>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-card px-4 sm:px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover-depth-subtle min-h-[44px] touch-manipulation ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold-depth'
                      : 'bg-white/80 backdrop-blur-sm text-gray-contrast-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 hover:text-blue-900 border border-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="mr-2">{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-white/20 text-gold-100' 
                      : 'bg-gray-contrast-100 text-gray-contrast-500'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-200/15 rounded-full blur-xl" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            {/* Decorative Top Divider */}
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
              <div className="mx-3 sm:mx-4 w-2 h-2 rounded-full bg-gold-500"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
            </div>
            
            <div className="text-center mb-12 sm:mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 sm:mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Artikel Unggulan
              </h2>
              <p className="body-large text-gray-contrast-700 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.3" data-stagger="0.015">
                Artikel-artikel terpilih yang memberikan insights berharga tentang industri dan project terbaru kami.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {featuredArticles.map((article, index) => (
                <Card key={article.id} variant="service" className={`article-card group flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism overflow-hidden ${index % 2 === 0 ? 'scroll-animate-left' : 'scroll-animate-right'}`}>
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-gold-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-gold-500/10"></div>
                    <div className="text-center text-blue-600 relative z-10">
                      <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">📰</div>
                      <p className="text-sm font-medium">Featured Article</p>
                    </div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-contrast-500 mb-4 flex-wrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {new Date(article.date).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        {article.author}
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{article.readTime} read</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-contrast-600 mb-4 line-clamp-3 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-medium hover-depth-subtle">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-gold-600 hover:text-gold-700 font-semibold inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories & Articles */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/20 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Sidebar - Categories */}
              <div className="lg:col-span-1 scroll-animate-left">
                <Card variant="service" className="category-card rounded-3xl shadow-depth-3 hover:shadow-depth-4 transition-all duration-500 backdrop-blur-sm glass-morphism lg:sticky lg:top-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-6" data-element="heading" data-text-animation="scale-bounce" data-delay="0.1" data-duration="0.5">
                      Kategori
                    </h3>
                    
                    <div className="space-y-3">
                      {categories.map((category, index) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-3 sm:px-4 py-3 rounded-xl transition-all duration-300 hover-depth-subtle min-h-[44px] touch-manipulation ${
                            activeCategory === category.id
                              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-gold-depth'
                              : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 text-gray-contrast-700 hover:text-blue-900'
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              activeCategory === category.id 
                                ? 'bg-white/20 text-gold-100' 
                                : 'bg-gray-contrast-100 text-gray-contrast-500'
                            }`}>
                              {category.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-contrast-200">
                      <h4 className="font-semibold text-blue-900 mb-4">Tags Populer</h4>
                      <div className="flex flex-wrap gap-2">
                        {['MICE', 'Event Planning', 'Creative Design', 'Case Study', 'Industry Trends'].map((tag, index) => (
                          <span 
                            key={tag} 
                            className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-contrast-600 px-3 py-2 rounded-full text-sm hover:from-gold-100 hover:to-gold-200 hover:text-gold-700 cursor-pointer transition-all duration-300 hover-depth-subtle font-medium"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content - Articles */}
              <div className="lg:col-span-3 scroll-animate-right">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3" data-element="heading" data-text-animation="slide-up" data-delay="0.1" data-duration="0.5">
                    {activeCategory === 'all' ? 'Semua Artikel' : categories.find(c => c.id === activeCategory)?.name}
                  </h3>
                  <p className="text-gray-contrast-600 text-lg">
                    {filteredArticles.length} artikel ditemukan
                    {searchTerm && ` untuk "${searchTerm}"`}
                  </p>
                </div>
                
                <div className="space-y-8">
                  {filteredArticles.map((article, index) => (
                    <Card key={article.id} variant="service" className="article-card group rounded-3xl shadow-depth-2 hover:shadow-depth-4 transition-all duration-500 backdrop-blur-sm glass-morphism overflow-hidden scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                          <div className="md:col-span-1">
                            <div className="h-24 sm:h-32 bg-gradient-to-br from-blue-100 to-gold-100 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-gold-500/10"></div>
                              <div className="text-center text-blue-600 relative z-10">
                                <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">📄</div>
                                <p className="text-xs font-medium">Article</p>
                              </div>
                              <div className="absolute top-2 right-2 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="2" data-float-duration="1.5"></div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-3">
                            <div className="flex items-center gap-4 text-sm text-gray-contrast-500 mb-4 flex-wrap">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                {new Date(article.date).toLocaleDateString('id-ID')}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-500" />
                                {article.author}
                              </div>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{article.readTime} read</span>
                              <div className="flex items-center">
                                <Tag className="w-4 h-4 mr-2 text-gold-500" />
                                <span className="bg-gold-100 text-gold-700 px-2 py-1 rounded-full text-xs">
                                  {categories.find(c => c.id === article.category)?.name}
                                </span>
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-blue-900 mb-3 hover:text-gold-600 cursor-pointer transition-colors duration-300 leading-snug group-hover:text-blue-800">
                              {article.title}
                            </h3>
                            
                            <p className="text-gray-contrast-600 mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.map((tag, idx) => (
                                <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-contrast-600 px-3 py-1 rounded-full text-xs font-medium hover-depth-subtle">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <button className="text-gold-600 hover:text-gold-700 font-semibold inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                              Baca Selengkapnya
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Enhanced Pagination */}
                <div className="mt-12 flex justify-center scroll-animate">
                  <div className="flex items-center space-x-3">
                    <button className="px-6 py-3 border-2 border-gray-contrast-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 hover:border-blue-300 transition-all duration-300 font-medium text-gray-contrast-700 hover:text-blue-900 hover-depth-subtle">
                      Previous
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl shadow-gold-depth hover:shadow-gold-depth font-semibold">
                      1
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-contrast-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 hover:border-blue-300 transition-all duration-300 font-medium text-gray-contrast-700 hover:text-blue-900 hover-depth-subtle">
                      2
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-contrast-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 hover:border-blue-300 transition-all duration-300 font-medium text-gray-contrast-700 hover:text-blue-900 hover-depth-subtle">
                      3
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-contrast-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-gold-50 hover:border-blue-300 transition-all duration-300 font-medium text-gray-contrast-700 hover:text-blue-900 hover-depth-subtle">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 scroll-snap-section relative overflow-hidden">
          {/* Enhanced Background Layers */}
          <div className="absolute inset-0">
            {/* Depth Layer 1 - Furthest back */}
            <div className="absolute inset-0 opacity-10" data-depth-layer="3" data-parallax="0.8">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse bg-gold-500" data-float="true" data-float-amplitude="10" data-float-duration="4"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000 bg-blue-400" data-float="true" data-float-amplitude="15" data-float-duration="5"></div>
              </div>
            </div>
            
            {/* Morphing Gradient Overlay */}
            <div className="absolute inset-0 morphing-gradient opacity-30"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10">
            <div className="max-w-2xl mx-auto scroll-animate">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-depth-lg" data-element="heading" data-text-animation="wave" data-delay="0.2" data-duration="0.6" data-stagger="0.04">
                Stay Updated
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed text-depth" data-element="content" data-text-animation="fade-in" data-delay="0.3" data-duration="0.4" data-stagger="0.02">
                Dapatkan artikel terbaru, industry insights, dan update project langsung ke email Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:border-gold-400 focus:outline-none focus:bg-white/20 transition-all duration-300 text-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-gold-depth hover:shadow-gold-depth hover:scale-105 transform">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed">
                Kami menghormati privasi Anda. Unsubscribe kapan saja.
              </p>
              
              {/* Decorative Elements */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400"></div>
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}