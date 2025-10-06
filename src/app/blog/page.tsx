import React from 'react';
import BlogClient from '@/components/pages/blog/blog-client';
import { StrapiContentService } from '@/lib/strapi/content';
import { transformBlogPageData } from '@/lib/blog-utils';

// This is now a Server Component
export default async function BlogPage() {
  try {
    const strapiService = new StrapiContentService();
    
    // Fetch both blog page data and all blog articles
    const [blogPageData, allBlogArticles] = await Promise.all([
      strapiService.getBlogPage(),
      strapiService.getBlogArticlesList({
        populate: ['cover', 'blog_category', 'tags'],
        sort: ['createdAt:desc'],
        pagination: { page: 1, pageSize: 50 }
      })
    ]);
    
    // Transform the data to our expected format
    console.log('Blog page data from API:', JSON.stringify(blogPageData, null, 2));
    console.log('All blog articles from API:', JSON.stringify(allBlogArticles, null, 2));
    const transformedData = transformBlogPageData(blogPageData, allBlogArticles);
    console.log('Transformed data:', JSON.stringify(transformedData, null, 2));
    
    const statusOptions = [
      { id: 'all', name: 'All Status' },
      { id: 'published', name: 'Published' },
      { id: 'featured', name: 'Featured' }
    ];

    // Pass all pre-computed data to the client component
    return (
      <BlogClient 
        initialArticles={transformedData.allArticles}
        featuredArticles={transformedData.featuredArticles}
        blogCategories={transformedData.categories}
        availableYears={transformedData.years}
        availableAuthors={transformedData.authors}
        statusOptions={statusOptions}
        heroData={transformedData.hero}
      />
    );
  } catch (error) {
    console.error('Error fetching blog page data:', error);
    
    // Fallback to empty data if API fails
    const fallbackData = {
      hero: {
        title: 'Blog & Insights',
        subtitle: '',
        description: 'Temukan artikel terbaru, tips, dan insights dari dunia creative services dan event production'
      },
      featuredArticles: [],
      allArticles: [],
      categories: [{ id: 'all', name: 'All Categories' }],
      years: [],
      authors: []
    };
    
    const statusOptions = [
      { id: 'all', name: 'All Status' },
      { id: 'published', name: 'Published' },
      { id: 'featured', name: 'Featured' }
    ];

    return (
      <BlogClient 
        initialArticles={fallbackData.allArticles}
        featuredArticles={fallbackData.featuredArticles}
        blogCategories={fallbackData.categories}
        availableYears={fallbackData.years}
        availableAuthors={fallbackData.authors}
        statusOptions={statusOptions}
        heroData={fallbackData.hero}
      />
    );
  }
}