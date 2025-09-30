import React from 'react';
import BlogClient from '@/components/pages/blog/blog-client';
import { blogArticles } from '@/data/blog';

// This is now a Server Component
export default function BlogPage() {
  // Pre-compute data on the server
  const publishedArticles = blogArticles.filter(article => article.published);
  
  // Get featured articles
  const featuredArticles = publishedArticles.filter(article => article.featured).slice(0, 3);
  
  // Pre-compute filter options
  const blogCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'company-updates', name: 'Company Updates' },
    { id: 'industry-insights', name: 'Industry Insights' },
    { id: 'project-stories', name: 'Project Stories' },
    { id: 'tips-tricks', name: 'Tips & Tricks' },
    { id: 'company-news', name: 'Company News' }
  ];
  
  // Get unique years from published articles
  const availableYears = [...new Set(publishedArticles.map(article => new Date(article.publishDate).getFullYear()))]
    .sort((a, b) => b - a);
   
  // Get unique authors from published articles
  const availableAuthors = [...new Set(publishedArticles.map(article => article.author))];
  
  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'published', name: 'Published' },
    { id: 'featured', name: 'Featured' }
  ];

  // Pass all pre-computed data to the client component
  return (
    <BlogClient 
      initialArticles={publishedArticles}
      featuredArticles={featuredArticles}
      blogCategories={blogCategories}
      availableYears={availableYears}
      availableAuthors={availableAuthors}
      statusOptions={statusOptions}
    />
  );
}