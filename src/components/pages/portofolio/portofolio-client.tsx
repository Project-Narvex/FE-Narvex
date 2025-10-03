'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { MapPin, Calendar, Users, Award, ExternalLink, Search } from 'lucide-react';
// import { 
//   initializeAnimations, 
//   addGSAPHoverAnimations,
//   DepthAnimationController,
//   add3DCardEffect,
//   addEnhancedParallax,
//   createMorphingBackground
// } from '@/lib/animations';
import { Project } from '@/data/projects';

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

interface PortfolioClientProps {
  initialProjects: Project[];
  portfolioCategories: Array<{ id: string; name: string }>;
  availableYears: number[];
  availableClients: string[];
  statusOptions: Array<{ id: string; name: string }>;
}

export default function PortofolioClient({
  initialProjects,
  portfolioCategories,
  availableYears,
  availableClients,
  statusOptions
}: PortfolioClientProps) {
  // All hooks must be called at the top level, before any early returns
  // Portfolio Query Section state variables
  const [portfolioSearchQuery, setPortfolioSearchQuery] = useState('');
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('all');
  const [portfolioYearFilter, setPortfolioYearFilter] = useState('all');
  const [portfolioClientFilter, setPortfolioClientFilter] = useState('all');
  const [portfolioStatusFilter, setPortfolioStatusFilter] = useState('all');
  
  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 3x3 grid for optimal performance
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Debounced search term for performance
  const debouncedPortfolioSearchQuery = useDebounce(portfolioSearchQuery, 300);
  
  // Portfolio query filtering logic
  const filteredProjects = useMemo(() => {
    if (!initialProjects || !Array.isArray(initialProjects)) {
      return [];
    }
    
    try {
      return initialProjects.filter((project: Project) => {
        if (!project) return false;
        
        const matchesSearch = debouncedPortfolioSearchQuery === '' || 
          (project.title?.toLowerCase().includes(debouncedPortfolioSearchQuery.toLowerCase())) ||
          (project.description?.toLowerCase().includes(debouncedPortfolioSearchQuery.toLowerCase())) ||
          (project.client?.toLowerCase().includes(debouncedPortfolioSearchQuery.toLowerCase())) ||
          (project.services?.some?.((service: string) => service?.toLowerCase().includes(debouncedPortfolioSearchQuery.toLowerCase())));
        
        const matchesCategory = portfolioCategoryFilter === 'all' || project.category === portfolioCategoryFilter;
        const matchesYear = portfolioYearFilter === 'all' || project.date === portfolioYearFilter;
        const matchesClient = portfolioClientFilter === 'all' || project.client === portfolioClientFilter;
        const matchesStatus = portfolioStatusFilter === 'all' || 
          (portfolioStatusFilter === 'completed') ||
          (portfolioStatusFilter === 'featured' && project.featured);
        
        return matchesSearch && matchesCategory && matchesYear && matchesClient && matchesStatus;
      });
    } catch (error) {
      console.error('Error filtering projects:', error);
      return [];
    }
  }, [debouncedPortfolioSearchQuery, portfolioCategoryFilter, portfolioYearFilter, portfolioClientFilter, portfolioStatusFilter, initialProjects]);

  // Pagination calculations
  const totalPages = Math.ceil((filteredProjects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects?.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsPageTransitioning(true);
      setCurrentPage(page);
      
      // Scroll to top of results section
      setTimeout(() => {
        const resultsSection = document.querySelector('.portfolio-results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsPageTransitioning(false);
      }, 100);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handleGoToPage = (page: number) => {
    handlePageChange(page);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedPortfolioSearchQuery, portfolioCategoryFilter, portfolioYearFilter, portfolioClientFilter, portfolioStatusFilter]);

  // Defensive checks after all hooks are declared
  if (!initialProjects || !Array.isArray(initialProjects)) {
    return <div>Loading portfolio...</div>;
  }
  
  if (!portfolioCategories || !Array.isArray(portfolioCategories)) {
    return <div>Loading portfolio categories...</div>;
  }
  
  if (!availableYears || !Array.isArray(availableYears)) {
    return <div>Loading portfolio years...</div>;
  }
  
  if (!availableClients || !Array.isArray(availableClients)) {
    return <div>Loading portfolio clients...</div>;
  }
  
  if (!statusOptions || !Array.isArray(statusOptions)) {
    return <div>Loading status options...</div>;
  }

  // useEffect(() => {
  //   // Initialize GSAP scroll animations
  //   const animationController = initializeAnimations();
  //   
  //   // Initialize depth animation controller
  //   const depthController = new DepthAnimationController();
  //   
  //   // Add hover animations
  //   addGSAPHoverAnimations();
  //   
  //   // Add depth effects to specific elements after a delay
  //   const depthEffectsTimeout = setTimeout(() => {
  //     // Add 3D card effects to portfolio cards
  //     document.querySelectorAll('.portfolio-card').forEach(card => {
  //       add3DCardEffect(card, {
  //         maxRotation: 8,
  //         perspective: 1000,
  //         shadowIntensity: 0.2,
  //         liftHeight: 12
  //       });
  //     });
  //     
  //     // Add 3D effects to filter buttons
  //     document.querySelectorAll('.filter-button').forEach(button => {
  //       add3DCardEffect(button, {
  //         maxRotation: 4,
  //         perspective: 600,
  //         shadowIntensity: 0.1,
  //         liftHeight: 4
  //       });
  //     });
  //     
  //     // Create morphing background for sections
  //     const sectionsWithMorphing = document.querySelectorAll('.morphing-bg-section');
  //     sectionsWithMorphing.forEach(section => {
  //       createMorphingBackground(section);
  //     });
  //     
  //     // Add enhanced parallax to background elements
  //     document.querySelectorAll('[data-parallax]').forEach(element => {
  //       const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
  //       const depth = parseFloat(element.getAttribute('data-depth') || '1');
  //       addEnhancedParallax(element, {
  //         speed,
  //         depth,
  //         blur: Math.max(0, (depth - 1) * 1.5),
  //         opacity: Math.max(0.4, 1 - (depth - 1) * 0.15)
  //       });
  //     });
  //   }, 500);
  //   
  //   // Cleanup on unmount
  //   return () => {
  //     clearTimeout(depthEffectsTimeout);
  //     if (animationController && typeof animationController.destroy === 'function') {
  //       animationController.destroy();
  //     }
  //     if (depthController && typeof depthController.destroy === 'function') {
  //       depthController.destroy();
  //     }
  //   };
  // }, []);

  return (
    <div className="min-h-screen scroll-snap-container">
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
            
            {(filteredProjects?.length || 0) > 0 ? (
              <div className="space-y-16 " data-animation-delay="0.6">
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
                      
                      {project.results && (
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {Object.entries(project.results).map(([key, value]) => (
                            <div key={key} className="text-center p-3 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200 transition-all duration-300 hover:scale-105 hover:shadow-md">
                              <div className="text-2xl font-bold text-gold-600 mb-1">{value}</div>
                              <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center hover:scale-105 hover:shadow-lg transform">
                        Lihat Detail Case Study
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
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
            ) : (
              /* No Results Message */
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters to find more projects.</p>
                <button
                  onClick={() => {
                    setPortfolioSearchQuery('');
                    setPortfolioCategoryFilter('all');
                    setPortfolioYearFilter('all');
                    setPortfolioClientFilter('all');
                    setPortfolioStatusFilter('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
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
              <h2 className="heading-2 mb-6" data-text-animation="fade-in" data-animation-delay="0.2">Explore Our Portfolio</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto" data-text-animation="fade-in" data-animation-delay="0.4">
                Discover our complete collection of projects across all categories. Use the search and filters below to find specific work.
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/50" data-animation-delay="0.6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, client, or services..."
                  value={portfolioSearchQuery}
                  onChange={(e) => setPortfolioSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={portfolioCategoryFilter}
                    onChange={(e) => setPortfolioCategoryFilter(e.target.value)}
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
                    value={portfolioYearFilter}
                    onChange={(e) => setPortfolioYearFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>
                
                {/* Client Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select
                    value={portfolioClientFilter}
                    onChange={(e) => setPortfolioClientFilter(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700"
                  >
                    <option value="all">All Clients</option>
                    {availableClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={portfolioStatusFilter}
                    onChange={(e) => setPortfolioStatusFilter(e.target.value)}
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
                  <span className="font-semibold text-blue-600">{filteredProjects?.length || 0}</span> projects found
                  {totalPages > 1 && (
                    <span className="ml-2 text-sm">
                      (Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects?.length || 0)} of {filteredProjects?.length || 0})
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setPortfolioSearchQuery('');
                    setPortfolioCategoryFilter('all');
                    setPortfolioYearFilter('all');
                    setPortfolioClientFilter('all');
                    setPortfolioStatusFilter('all');
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
            
            {/* Query Results Section */}
            <div className="portfolio-results-section">
              {(filteredProjects?.length || 0) > 0 ? (
                <>
                  <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8  transition-opacity duration-300 ${isPageTransitioning ? 'opacity-50' : 'opacity-100'}`} data-animation-delay="0.8">
                    {currentProjects.map((project, index) => (
                  <Link 
                    key={project.id}
                    href={`/portfolio/${project.id}`}
                    className="block group cursor-pointer"
                  >
                    <Card 
                      variant="service" 
                      className="portfolio-query-card h-full glass-morphism depth-4 bg-white/95 backdrop-blur-lg border-white/30 hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {project.featured && (
                        <div className="absolute top-3 right-3 z-20">
                          <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Award className="w-3 h-3" />
                            Featured
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Project Thumbnail */}
                        <div className="h-56 bg-gradient-to-br from-blue-100 via-blue-200 to-gold-100 flex items-center justify-center overflow-hidden relative group-hover:scale-110 transition-transform duration-700">
                          <div className="text-center text-blue-600 transition-all duration-500 group-hover:scale-125">
                            <div className="text-4xl mb-3 transition-transform duration-500 group-hover:rotate-12">🎨</div>
                            <p className="text-sm font-semibold uppercase tracking-wide">{project.category.replace('-', ' ')}</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Hover overlay with text */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              Click to view details
                            </span>
                          </div>
                          
                          {/* Floating particles effect */}
                          <div className="absolute top-4 left-4 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
                          <div className="absolute bottom-6 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse animation-delay-1000" data-float="true" data-float-amplitude="4" data-float-duration="3"></div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow space-y-4">
                          {/* Category Badge */}
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium capitalize w-fit">
                            {project.category.replace('-', ' ')}
                          </div>
                          
                          {/* Project Title */}
                          <h3 className="text-xl font-bold text-blue-900 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300 leading-tight">
                            {project.title}
                          </h3>
                          
                          {/* Project Meta */}
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <div className="flex items-center min-w-0">
                              <Users className="w-4 h-4 mr-1.5 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{project.client}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0 text-blue-500" />
                              <span>{project.date}</span>
                            </div>
                            <div className="flex items-center min-w-0">
                              <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{project.location}</span>
                            </div>
                          </div>
                          
                          {/* Brief Description */}
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                            {project.description}
                          </p>
                          
                          {/* Results Metrics */}
                          {project.results && (
                            <div className="grid grid-cols-3 gap-3 pt-2">
                              {Object.entries(project.results).slice(0, 3).map(([key, value]) => (
                                <div key={key} className="text-center p-3 rounded-lg bg-gradient-to-br from-gold-50 to-gold-100 border border-gold-200 transition-all duration-300 hover:scale-105">
                                  <div className="text-sm font-bold text-gold-600 mb-1 leading-tight">{value}</div>
                                  <div className="text-xs text-gray-600 capitalize leading-tight">{key.replace('_', ' ')}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Bottom accent line */}
                        <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-700 rounded-b-xl"></div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center space-y-6">
                      {/* Pagination Info */}
                      <div className="text-center text-gray-600">
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                      
                      {/* Pagination Navigation */}
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Previous Button */}
                        <button
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {/* Page Numbers */}
                        <div className="flex items-center gap-2">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handleGoToPage(pageNum)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                                  currentPage === pageNum
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Next Button */}
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === totalPages
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                      
                      {/* Go to Page Input */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Go to page:</span>
                        <input
                          type="number"
                          min="1"
                          max={totalPages}
                          value={currentPage}
                          onChange={(e) => {
                            const page = parseInt(e.target.value);
                            if (page >= 1 && page <= totalPages) {
                              handleGoToPage(page);
                            }
                          }}
                          className="w-16 px-2 py-1 border border-gray-200 rounded text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
            
            {/* No Results Message */}
            {(filteredProjects?.length || 0) === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4 opacity-60">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters to find more projects.</p>
                <button
                  onClick={() => {
                    setPortfolioSearchQuery('');
                    setPortfolioCategoryFilter('all');
                    setPortfolioYearFilter('all');
                    setPortfolioClientFilter('all');
                    setPortfolioStatusFilter('all');
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
    </div>
  );
}