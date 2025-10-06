'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import SimpleHero from '@/components/ui/SimpleHero';
import { Card, CardContent } from '@/components/ui/Card';
import { Calendar, User, Search, Star, ArrowRight } from 'lucide-react';
import { transformBlogListData } from '@/lib/blog-utils';

interface BlogClientProps {
  initialArticles: any[];
  featuredArticles: any[];
  blogCategories: { id: string; name: string; }[];
  availableYears: number[];
  availableAuthors: string[];
  statusOptions: { id: string; name: string; }[];
  heroData: {
    title: string;
    subtitle?: string;
    description: string;
  };
}

export default function BlogClient({
  initialArticles,
  featuredArticles,
  blogCategories,
  availableYears,
  availableAuthors,
  statusOptions,
  heroData
}: BlogClientProps) {
  // Blog Query Section state variables
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [blogYearFilter, setBlogYearFilter] = useState('all');
  const [blogAuthorFilter, setBlogAuthorFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState('all');
  
  // API state
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update filtered articles when initial articles change
  useEffect(() => {
    setFilteredArticles(initialArticles);
  }, [initialArticles]);
  
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

  // Function to fetch filtered articles from API
  const fetchFilteredArticles = async () => {
    setIsLoading(true);
    try {
      // Build query parameters for API call
      const params = new URLSearchParams();
      
      if (blogCategoryFilter !== 'all') {
        params.append('category', blogCategoryFilter);
      }
      
      if (blogYearFilter !== 'all') {
        params.append('year', blogYearFilter);
      }
      
      if (blogAuthorFilter !== 'all') {
        params.append('author', blogAuthorFilter);
      }
      
      if (blogStatusFilter !== 'all') {
        params.append('status', blogStatusFilter);
      }
      
      if (debouncedBlogSearchQuery) {
        params.append('search', debouncedBlogSearchQuery);
      }
      
      // Call our API route instead of Strapi directly
      const response = await fetch(`/api/blog/filter?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const transformedArticles = transformBlogListData(data);
      
      // Apply search filter locally since it's more efficient for text search
      let filtered = transformedArticles;
      if (debouncedBlogSearchQuery) {
        filtered = transformedArticles.filter(article => 
          article.title.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(debouncedBlogSearchQuery.toLowerCase()))
        );
      }
      
      // Apply status filter locally
      if (blogStatusFilter !== 'all') {
        filtered = filtered.filter(article => {
          if (blogStatusFilter === 'featured') {
            return featuredArticles.some(featured => featured.id === article.id);
          }
          return true; // For 'published', we assume all articles from API are published
        });
      }
      
      setFilteredArticles(filtered);
    } catch (error) {
      console.error('Error fetching filtered articles:', error);
      // Fallback to local filtering
      setFilteredArticles(initialArticles);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch filtered articles when filters change (but not on initial load)
  useEffect(() => {
    // Only fetch if we have filters applied or search query
    if (blogCategoryFilter !== 'all' || blogYearFilter !== 'all' || blogAuthorFilter !== 'all' || blogStatusFilter !== 'all' || debouncedBlogSearchQuery) {
      fetchFilteredArticles();
    } else {
      // Use initial articles when no filters are applied
      setFilteredArticles(initialArticles);
    }
  }, [blogCategoryFilter, blogYearFilter, blogAuthorFilter, blogStatusFilter, debouncedBlogSearchQuery, initialArticles]);

   // Enhanced articles with slug and proper date handling
   const filteredBlogArticlesEnhanced = useMemo(() => {
     return filteredArticles.map(article => ({
       ...article,
       slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
       publishDate: article.publishDate
     }));
   }, [filteredArticles]);

   return (
    <div className="min-h-screen scroll-snap-container">
      <main>
        {/* Hero Section */}
        <SimpleHero 
          title={heroData.title}
          subtitle={heroData.subtitle}
          description={heroData.description}
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
            
            <div className="text-center mb-12 sm:mb-16 ">
              <h2 className="heading-2 mb-6 sm:mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                Artikel Unggulan
              </h2>
              <p className="body-large text-gray-contrast-700 max-w-3xl mx-auto leading-relaxed" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.25" data-stagger="0.01">
                Artikel-artikel terpilih yang memberikan insights berharga tentang industri dan project terbaru kami.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {featuredArticles.map((article, index) => (
                <Link 
                  key={`featured-${article.id}-${index}`}
                  href={`/blog/${article.slug || article.id}`}
                  className="block h-full cursor-pointer"
                >
                  <Card variant="service" className={`article-card group flex flex-col h-full rounded-3xl shadow-depth-3 hover:shadow-depth-5 hover:scale-105 transition-all duration-500 backdrop-blur-sm glass-morphism overflow-hidden cursor-pointer ${index % 2 === 0 ? 'scroll-animate-left' : 'scroll-animate-right'}`}>
                    <div className="h-48 relative overflow-hidden">
                      {article.cover?.url ? (
                        <>
                          {console.log('Featured article cover URL:', article.cover.url)}
                          <img 
                            src={article.cover.url} 
                            alt={article.cover.alternativeText || article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('Image failed to load:', article.cover.url);
                              // Hide the image and show fallback
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          {/* Hidden fallback for when image fails to load */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-gold-500/10 hidden items-center justify-center">
                            <div className="text-center text-blue-600">
                              <div className="text-5xl mb-2">📰</div>
                              <p className="text-sm font-medium">{article.category || 'Featured Article'}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gold-100 flex items-center justify-center">
                          <div className="text-center text-blue-600">
                            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">📰</div>
                            <p className="text-sm font-medium">{article.category || 'Featured Article'}</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 w-3 h-3 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-gray-contrast-500 mb-4 flex-wrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          {new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          {article.author || 'Narvex Team'}
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{article.readTime || '5 min'} read</span>
                        {article.category && article.category !== 'No Category' && (
                          <span className="bg-gold-100 text-gold-700 px-2 py-1 rounded-full text-xs">{article.category}</span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300 leading-snug">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-contrast-600 mb-4 line-clamp-3 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300">
                        {article.excerpt || 'Artikel menarik dari tim Narvex...'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags && article.tags.length > 0 ? (
                          article.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 px-3 py-1 rounded-full text-xs font-medium hover-depth-subtle">
                              {tag.name || tag}
                            </span>
                          ))
                        ) : (
                          <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                            No Tags
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                    
                    {/* Hover overlay with "Click to read" */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-blue-900 font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Click to read article
                      </div>
                    </div>
                  </Card>
                </Link>
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
                  {isLoading ? (
                    <span className="font-semibold text-blue-600">Loading...</span>
                  ) : (
                    <span className="font-semibold text-blue-600">{filteredBlogArticlesEnhanced.length}</span>
                  )} articles found
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
            {isLoading ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4 opacity-60">⏳</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Loading articles...</h3>
                <p className="text-gray-500">Please wait while we fetch the latest articles.</p>
              </div>
            ) : filteredBlogArticlesEnhanced.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate" data-animation-delay="0.8">
                  {filteredBlogArticlesEnhanced.map((article, index) => (
                    <Link 
                      key={`query-${article.id}-${index}`}
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
                        <div className="h-48 relative overflow-hidden group-hover:scale-110 transition-transform duration-700">
                          {article.cover?.url ? (
                            <img 
                              src={article.cover.url} 
                              alt={article.cover.alternativeText || article.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-gold-100 flex items-center justify-center">
                              <div className="text-center text-blue-600 transition-all duration-500 group-hover:scale-125">
                                <div className="text-4xl mb-3 transition-transform duration-500 group-hover:rotate-12">📰</div>
                                <p className="text-sm font-semibold uppercase tracking-wide">{article.category.replace('-', ' ')}</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating particles effect */}
                          <div className="absolute top-4 left-4 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
                          <div className="absolute bottom-6 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse animation-delay-1000" data-float="true" data-float-amplitude="4" data-float-duration="3"></div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category Badge */}
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium capitalize w-fit mb-3">
                            {article.blog_category?.name || 'No Category'}
                          </div>
                          
                          {/* Article Title */}
                          <h3 className="text-xl font-bold text-blue-900 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300 min-w-0 mb-3">
                            {article.title}
                          </h3>
                          
                          {/* Article Meta */}
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 min-w-0 mb-4">
                            <div className="flex items-center min-w-0">
                              <User className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{article.author || 'Narvex Team'}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 flex-shrink-0 text-blue-500" />
                              <span>{new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{article.readTime || '5 min'}</span>
                            </div>
                          </div>
                          
                          {/* Brief Excerpt */}
                          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-grow mb-4">
                            {article.excerpt}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {article.tags && article.tags.length > 0 ? (
                              <>
                                {article.tags.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:from-gold-100 hover:to-gold-200 hover:text-gold-700">
                                    {tag.name || tag}
                                  </span>
                                ))}
                                {article.tags.length > 2 && (
                                  <span className="text-xs text-gray-400 self-center font-medium">+{article.tags.length - 2} more</span>
                                )}
                              </>
                            ) : (
                              <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                                No Tags
                              </span>
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
            <div className="max-w-2xl mx-auto ">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-depth-lg" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                Stay Updated
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed text-depth" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.3" data-stagger="0.015">
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
    </div>
  );
}