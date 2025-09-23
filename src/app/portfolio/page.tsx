'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { MapPin, Calendar, Users, Award, ExternalLink, Search, Filter } from 'lucide-react';
import { projects, Project } from '@/data/projects';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Use featured projects from the main projects data for Narvex Portfolio section
  const narvexProjects = projects.filter(project => project.featured && project.companyId === 'narvex').slice(0, 4);
  
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

  // Portfolio query filtering logic
  const filteredPortfolioProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
    const matchesYear = yearFilter === 'all' || project.year.toString() === yearFilter;
    const matchesCompany = companyFilter === 'all' || project.companyId === companyFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesYear && matchesCompany && matchesStatus;
  });

  // Get unique years for year filter
  const availableYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
  
  // Get unique companies for company filter
  const availableCompanies = [...new Set(projects.map(p => p.companyId))];
  
  // Category options for portfolio query
  const portfolioCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'exhibition', name: 'Exhibition' },
    { id: 'booth', name: 'Booth' },
    { id: 'activation', name: 'Activation' },
    { id: 'tour', name: 'Tour' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'creative', name: 'Creative' },
    { id: 'education', name: 'Education' },
    { id: 'wedding', name: 'Wedding' }
  ];
  
  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'upcoming', name: 'Upcoming' }
  ];
  
  const companyOptions = [
    { id: 'all', name: 'All Companies' },
    { id: 'narvex', name: 'Narvex' },
    { id: 'skywork', name: 'Skywork.id' },
    { id: 'gutama', name: 'Gutama Learning' },
    { id: 'creativework', name: 'CreativeWork' },
    { id: 'evervow', name: 'Evervow.wo' }
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
      // Add 3D card effects to portfolio cards
      document.querySelectorAll('.portfolio-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to portfolio query cards
      document.querySelectorAll('.portfolio-query-card').forEach(card => {
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


        {/* Narvex Portfolio */}
        <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-20 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-10 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
            <div className="absolute top-3/5 right-1/3 w-20 h-20 bg-blue-200/10 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-2/5 left-1/8 w-32 h-32 bg-gold-200/12 rounded-full filter blur-3xl" data-parallax="0.2" data-float="true" data-float-amplitude="22" data-float-duration="11"></div>
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
                    
                    <Link 
                      href={`/portfolio/${project.slug}`}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center hover:scale-105 hover:shadow-lg transform"
                    >
                      Lihat Detail Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
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

        {/* Portfolio Query Section */}
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
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Explore Our Full Portfolio</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Discover our complete collection of projects across all services and companies. Use the search and filters below to find specific projects.
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/50" data-animation-delay="0.6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by title, client, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    {portfolioCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>
                
                {/* Company Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <select
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    {companyOptions.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
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
                  <span className="font-semibold text-blue-600">{filteredPortfolioProjects.length}</span> projects found
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setYearFilter('all');
                    setCompanyFilter('all');
                    setStatusFilter('all');
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
            
            {/* Portfolio Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate" data-animation-delay="0.8">
              {filteredPortfolioProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  variant="service" 
                  className="portfolio-query-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Project Image Placeholder */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 mb-6 flex items-center justify-center overflow-hidden relative group">
                      <div className="text-center text-gray-500 transition-all duration-300 group-hover:scale-110">
                        <div className="text-3xl mb-2 transition-transform duration-300 group-hover:rotate-12">📸</div>
                        <p className="text-sm font-medium">{project.category}</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4 capitalize">
                      {project.category}
                    </div>
                    
                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-4 text-blue-900 line-clamp-2">{project.title}</h3>
                    
                    {/* Project Meta */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center min-w-0">
                        <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{project.client}</span>
                      </div>
                      <div className="flex items-center min-w-0">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 min-h-[2rem]">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs transition-all duration-300 hover:from-gold-100 hover:to-gold-200 hover:text-gold-700">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-gray-400 self-center">+{project.tags.length - 3} more</span>
                      )}
                    </div>
                    
                    {/* Status and Featured Section */}
                    <div className="flex items-center justify-between mb-6 min-h-[1.75rem]">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                      {project.featured ? (
                        <div className="flex items-center text-gold-600 text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      ) : (
                        <div className="w-16"></div>
                      )}
                    </div>
                    
                    {/* View Details Button */}
                    <Link 
                      href={`/portfolio/${project.slug}`}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform inline-flex items-center justify-center mt-auto"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* No Results Message */}
            {filteredPortfolioProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters to find more projects.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setYearFilter('all');
                    setCompanyFilter('all');
                    setStatusFilter('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}