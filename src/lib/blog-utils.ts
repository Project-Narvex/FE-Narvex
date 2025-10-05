// Blog utilities for transforming API data

import { BlogArticleItem, BlogPageData, BlogListData } from './strapi/types';

export interface TransformedBlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  cover?: {
    url: string;
    alternativeText?: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

export interface BlogPageContent {
  hero: {
    title: string;
    subtitle?: string;
    description: string;
  };
  featuredArticles: TransformedBlogArticle[];
  allArticles: TransformedBlogArticle[];
  categories: { id: string; name: string; }[];
  years: number[];
  authors: string[];
}

// Transform Strapi blog article to our format
export function transformBlogArticle(article: BlogArticleItem): TransformedBlogArticle {
  // Build full image URL
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    return `https://admin.narvex.id${url}`;
  };

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.content ? extractExcerpt(article.content) : 'No excerpt available',
    content: article.content,
    category: article.blog_category?.name || 'None',
    author: 'Narvex Team', // Default author since it's not in the API
    publishDate: article.createdAt,
    readTime: calculateReadTime(article.content),
    tags: article.tags?.map(tag => tag.name) || [],
    featured: false, // We'll determine this based on highlight section
    cover: article.cover ? {
      url: getImageUrl(article.cover.url),
      alternativeText: article.cover.alternativeText,
      formats: article.cover.formats ? {
        large: article.cover.formats.large ? { url: getImageUrl(article.cover.formats.large.url) } : undefined,
        medium: article.cover.formats.medium ? { url: getImageUrl(article.cover.formats.medium.url) } : undefined,
        small: article.cover.formats.small ? { url: getImageUrl(article.cover.formats.small.url) } : undefined,
        thumbnail: article.cover.formats.thumbnail ? { url: getImageUrl(article.cover.formats.thumbnail.url) } : undefined,
      } : undefined
    } : undefined
  };
}

// Extract excerpt from content
function extractExcerpt(content: any): string {
  if (typeof content === 'string') {
    return content.substring(0, 150) + '...';
  }
  
  if (Array.isArray(content)) {
    // Handle rich text content
    const textContent = content
      .filter(item => item.type === 'paragraph')
      .map(item => item.children?.map((child: any) => child.text).join('') || '')
      .join(' ')
      .substring(0, 150);
    
    return textContent + (textContent.length >= 150 ? '...' : '');
  }
  
  return 'No excerpt available';
}

// Calculate read time based on content
function calculateReadTime(content: any): string {
  let wordCount = 0;
  
  if (typeof content === 'string') {
    wordCount = content.split(' ').length;
  } else if (Array.isArray(content)) {
    // Handle rich text content
    const textContent = content
      .filter(item => item.type === 'paragraph')
      .map(item => item.children?.map((child: any) => child.text).join('') || '')
      .join(' ');
    
    wordCount = textContent.split(' ').length;
  }
  
  const minutes = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
  return `${minutes} min read`;
}

// Transform blog page data
export function transformBlogPageData(data: any, allBlogArticles?: any): BlogPageContent {
  console.log('Transforming blog page data:', data);
  console.log('All blog articles from API:', allBlogArticles);
  
  const featuredArticles = data.Highlight_Article?.blog_articles?.map(transformBlogArticle) || [];
  
  // Use all blog articles from API if provided, otherwise fallback to Article section
  let allArticles: any[] = [];
  if (allBlogArticles?.data) {
    allArticles = allBlogArticles.data.map(transformBlogArticle);
  } else {
    allArticles = data.Article?.blog_articles?.map(transformBlogArticle) || [];
  }
  
  console.log('Featured articles:', featuredArticles);
  console.log('All articles:', allArticles);
  
  // Mark featured articles
  featuredArticles.forEach(article => {
    article.featured = true;
  });
  
  // Don't remove duplicates - show all articles including featured ones
  // This allows users to see all articles in the filter section
  const allArticlesCombined = [...featuredArticles, ...allArticles];
  const uniqueCategories = Array.from(new Set(allArticlesCombined.map(article => article.category)));
  const categories = [
    { id: 'all', name: 'All Categories' },
    ...uniqueCategories.map(category => ({ 
      id: category.toLowerCase().replace(/\s+/g, '-'), 
      name: category 
    }))
  ];
  
  // Get unique years
  const years = Array.from(new Set(
    allArticlesCombined.map(article => new Date(article.publishDate).getFullYear())
  )).sort((a, b) => b - a);
  
  // Get unique authors
  const authors = Array.from(new Set(allArticlesCombined.map(article => article.author)));
  
  return {
    hero: {
      title: data.hero?.title || 'Blog & Insights',
      subtitle: data.hero?.subtitle,
      description: data.hero?.description || 'Temukan artikel terbaru, tips, dan insights dari dunia creative services dan event production'
    },
    featuredArticles,
    allArticles: allArticles, // Use all articles including featured ones
    categories,
    years,
    authors
  };
}

// Transform blog list data for filtering
export function transformBlogListData(data: BlogListData): TransformedBlogArticle[] {
  return data.data?.map(transformBlogArticle) || [];
}
