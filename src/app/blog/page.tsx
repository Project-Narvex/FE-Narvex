'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Calendar, User, Search, AlertCircle, ExternalLink, Award, Star, ArrowRight } from 'lucide-react';
// Animation imports removed as they're not used in this simplified version
import { blogArticles, BlogArticle } from '@/data/blog';

export default function BlogPage() {
  // Blog Query Section state variables
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [blogYearFilter, setBlogYearFilter] = useState('all');
  const [blogAuthorFilter, setBlogAuthorFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState('all');
  
  // Custom hook for debounced search
  function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  // Debounced search term for performance
  const debouncedBlogSearchQuery = useDebounce(blogSearchQuery, 300);
  
  // Blog query filtering options
  const blogCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'company-updates', name: 'Company Updates' },
    { id: 'industry-insights', name: 'Industry Insights' },
    { id: 'project-stories', name: 'Project Stories' },
    { id: 'tips-tricks', name: 'Tips & Tricks' },
    { id: 'company-news', name: 'Company News' }
  ];
  
  // Get unique years from blog articles
   const availableYears = useMemo(() => {
     const years = [...new Set(blogArticles.map(article => new Date(article.publishDate).getFullYear()))];
     return years.sort((a, b) => b - a);
   }, []);
   
   // Get unique authors from blog articles
   const availableAuthors = useMemo(() => {
     return [...new Set(blogArticles.map(article => article.author))];
   }, []);
  
  const statusOptions = [
     { id: 'all', name: 'All Status' },
     { id: 'published', name: 'Published' },
     { id: 'featured', name: 'Featured' }
   ];
   
   // Get featured articles
    const featuredArticles = useMemo(() => {
      return blogArticles.filter(article => article.featured && article.published).slice(0, 3);
    }, []);

   // Blog query filtering logic
   const filteredBlogArticles = useMemo(() => {
     const filtered = blogArticles.filter(article => {
       const matchesSearch = debouncedBlogSearchQuery === '' || 
         article.title.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
         article.excerpt.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
         article.author.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
         article.tags.some(tag => tag.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()));
       
       const matchesCategory = blogCategoryFilter === 'all' || article.category === blogCategoryFilter;
       const matchesYear = blogYearFilter === 'all' || new Date(article.publishDate).getFullYear().toString() === blogYearFilter;
       const matchesAuthor = blogAuthorFilter === 'all' || article.author === blogAuthorFilter;
       const matchesStatus = blogStatusFilter === 'all' || 
         (blogStatusFilter === 'published' && article.published) ||
         (blogStatusFilter === 'featured' && article.featured);
       
       return matchesSearch && matchesCategory && matchesYear && matchesAuthor && matchesStatus && article.published;
     });
     
     return filtered;
   }, [debouncedBlogSearchQuery, blogCategoryFilter, blogYearFilter, blogAuthorFilter, blogStatusFilter]);
   
   // Enhanced articles with slug and proper date handling
   const filteredBlogArticlesEnhanced = useMemo(() => {
     return filteredBlogArticles.map(article => ({
       ...article,
       slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
       publishDate: article.publishDate || article.date
     }));
   }, [filteredBlogArticles]);

  // Animation effects can be added later when animation utilities are available
  
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
  
  // Add missing properties to articles for compatibility
  const enhancedArticles = blogArticles.map(article => ({
    ...article,
    slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    publishDate: article.publishDate || article.date
  }));
  
  const filteredArticles = enhancedArticles.filter(article => {
     const matchesCategory = blogCategoryFilter === 'all' || article.category === blogCategoryFilter;
     const matchesSearch = debouncedBlogSearchQuery === '' || 
                          article.title.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
                          article.author.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()));
     
     const matchesYear = blogYearFilter === 'all' || new Date(article.publishDate).getFullYear().toString() === blogYearFilter;
     const matchesAuthor = blogAuthorFilter === 'all' || article.author === blogAuthorFilter;
     const matchesStatus = blogStatusFilter === 'all' || 
       (blogStatusFilter === 'published' && article.published) ||
       (blogStatusFilter === 'featured' && article.featured);
     
     return matchesCategory && matchesSearch && matchesYear && matchesAuthor && matchesStatus && article.published;
   });

   return (
    <div className="min-h-screen scroll-snap-container">
      <Header />
      
      <main>
        {/* Hero Section */}
        <SimpleHero 
          title="Blog & Insights"
          subtitle="Temukan artikel terbaru, tips, dan insights dari dunia creative services dan event production"
        />

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

        {/* Blog Query Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/4 left-1/6 w-28 h-28 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            <div className="absolute top-3/5 left-3/4 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.25" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-20 h-20 bg-gold-300/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="14" data-float-duration="7"></div>
            <div className="absolute bottom-1/8 right-1/8 w-24 h-24 bg-blue-300/10 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="18" data-float-duration="10"></div>
            <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
            
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Explore Our Full Blog Archive</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Discover our complete collection of articles across all categories. Use the search and filters below to find specific content.
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/50" data-animation-delay="0.6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles by title, content, author, or tags..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={blogCategoryFilter}
                    onChange={(e) => setBlogCategoryFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    {blogCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={blogYearFilter}
                    onChange={(e) => setBlogYearFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>
                
                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <select
                    value={blogAuthorFilter}
                    onChange={(e) => setBlogAuthorFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    <option value="all">All Authors</option>
                    {availableAuthors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={blogStatusFilter}
                    onChange={(e) => setBlogStatusFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    {statusOptions.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results Counter */}
              <div className="flex items-center justify-between">
                <div className="text-gray-600">
                  <span className="font-semibold text-blue-600">{filteredBlogArticlesEnhanced.length}</span> articles found
                </div>
                <button
                  onClick={() => {
                    setBlogSearchQuery('');
                    setBlogCategoryFilter('all');
                    setBlogYearFilter('all');
                    setBlogAuthorFilter('all');
                    setBlogStatusFilter('all');
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
            
            {/* Query Results Section */}
            {filteredBlogArticlesEnhanced.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate" data-animation-delay="0.8">
                 {filteredBlogArticlesEnhanced.map((article, index) => (
                  <Link 
                    key={article.id}
                    href={`/blog/${article.slug || article.id}`}
                    className="block h-full cursor-pointer"
                  >
                    <Card 
                      variant="service" 
                      className="blog-query-card group glass-morphism depth-4 bg-white/95 backdrop-blur-lg border-white/30 hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-full"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {article.featured && (
                        <div className="absolute top-4 right-4 z-20">
                          <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3" />
                            Featured
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Article Thumbnail */}
                        <div className="h-48 bg-gradient-to-br from-blue-100 via-blue-200 to-gold-100 flex items-center justify-center overflow-hidden relative group-hover:scale-110 transition-transform duration-700">
                          <div className="text-center text-blue-600 transition-all duration-500 group-hover:scale-125">
                            <div className="text-4xl mb-3 transition-transform duration-500 group-hover:rotate-12">📰</div>
                            <p className="text-sm font-semibold uppercase tracking-wide">{article.category.replace('-', ' ')}</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating particles effect */}
                          <div className="absolute top-4 left-4 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
                          <div className="absolute bottom-6 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse animation-delay-1000" data-float="true" data-float-amplitude="4" data-float-duration="3"></div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category Badge */}
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium capitalize w-fit mb-3">
                            {article.category.replace('-', ' ')}
                          </div>
                          
                          {/* Article Title */}
                          <h3 className="text-xl font-bold text-blue-900 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300 min-w-0 mb-3">
                            {article.title}
                          </h3>
                          
                          {/* Article Meta */}
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 min-w-0 mb-4">
                            <div className="flex items-center min-w-0">
                              <User className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{article.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                              <span>{new Date(article.publishDate).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{article.readTime}</span>
                            </div>
                          </div>
                          
                          {/* Brief Excerpt */}
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">
                            {article.excerpt}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {article.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:from-gold-100 hover:to-gold-200 hover:text-gold-700">
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 2 && (
                              <span className="text-xs text-gray-400 self-center font-medium">+{article.tags.length - 2} more</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Hover overlay with "Click to read" */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Click to read article
                          </div>
                        </div>
                        
                        {/* Bottom accent line */}
                        <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-700 rounded-b-xl"></div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              /* No Results Message */
              <div className="text-center py-16">
                <div className="text-6xl mb-4 opacity-60">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters to find more articles.</p>
                <button
                  onClick={() => {
                    setBlogSearchQuery('');
                    setBlogCategoryFilter('all');
                    setBlogYearFilter('all');
                    setBlogAuthorFilter('all');
                    setBlogStatusFilter('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 scroll-snap-section relative overflow-hidden py-20">
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
          
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 text-center relative z-10 flex items-center justify-center min-h-full">
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