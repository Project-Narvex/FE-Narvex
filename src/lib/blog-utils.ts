// Blog utilities for transforming API data

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
export function transformBlogArticle(article: any): TransformedBlogArticle {
  console.log('Transforming article:', article.title, 'Cover:', article.cover);
  
  // Build full image URL
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    const fullUrl = `https://admin.narvex.id${url}`;
    console.log('Image URL transformation:', url, '->', fullUrl);
    return fullUrl;
  };

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.content ? extractExcerpt(article.content) : 'Artikel menarik dari tim Narvex...',
    content: article.content,
    category: article.blog_category?.name || 'No Category',
    author: article.users_permissions_user?.username || 'Narvex Team',
    publishDate: article.publishDate || article.createdAt,
    readTime: calculateReadTime(article.content),
    tags: article.tags?.map((tag: any) => tag.name || tag) || [],
    featured: article.featured || false,
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
      .filter((item: any) => item.type === 'paragraph')
      .map((item: any) => item.children?.map((child: any) => child.text).join('') || '')
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
      .filter((item: any) => item.type === 'paragraph')
      .map((item: any) => item.children?.map((child: any) => child.text).join('') || '')
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
  
  // Transform featured articles from Highlight_Article section
  console.log('Highlight_Article data:', data.Highlight_Article);
  console.log('Data structure check:', {
    hasHighlightArticle: !!data.Highlight_Article,
    hasBlogArticles: !!data.Highlight_Article?.blog_articles,
    blogArticlesLength: data.Highlight_Article?.blog_articles?.length || 0
  });
  const featuredArticles = data.Highlight_Article?.blog_articles?.map(transformBlogArticle) || [];
  
  console.log('Featured articles after transform:', featuredArticles);
  
  // Transform all articles from API
  const allArticles = allBlogArticles?.data?.map(transformBlogArticle) || [];
  
  // Mark featured articles
  featuredArticles.forEach((article: TransformedBlogArticle) => {
    article.featured = true;
  });
  
  console.log('Featured articles from Highlight_Article:', featuredArticles);
  console.log('All articles:', allArticles);
  
  // Remove duplicates - if an article is in featured, don't include it in allArticles
  const featuredIds = new Set(featuredArticles.map((article: TransformedBlogArticle) => article.id));
  const uniqueAllArticles = allArticles.filter((article: TransformedBlogArticle) => !featuredIds.has(article.id));
  
  console.log('Featured IDs:', Array.from(featuredIds));
  console.log('Unique all articles (after removing featured):', uniqueAllArticles);
  
  // Combine featured and unique all articles
  const allArticlesCombined = [...featuredArticles, ...uniqueAllArticles];
  
  console.log('All articles combined (no duplicates):', allArticlesCombined);
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(allArticlesCombined.map((article: TransformedBlogArticle) => article.category)));
  const categories = [
    { id: 'all', name: 'All Categories' },
    ...uniqueCategories.map((category: string) => ({ 
      id: category.toLowerCase().replace(/\s+/g, '-'), 
      name: category 
    }))
  ];
  
  // Get unique years
  const years = Array.from(new Set(
    allArticlesCombined.map((article: TransformedBlogArticle) => new Date(article.publishDate).getFullYear())
  )).sort((a, b) => b - a);
  
  // Get unique authors
  const authors = Array.from(new Set(allArticlesCombined.map((article: TransformedBlogArticle) => article.author)));
  
  return {
    hero: {
      title: data.hero?.title || 'Blog & Insights',
      subtitle: data.hero?.subtitle,
      description: data.hero?.description || 'Temukan artikel terbaru, tips, dan insights dari dunia creative services dan event production'
    },
    featuredArticles,
    allArticles: allArticlesCombined, // This now contains no duplicates
    categories,
    years,
    authors
  };
}

// Transform blog list data for filtering
export function transformBlogListData(data: any): TransformedBlogArticle[] {
  return data.data?.map(transformBlogArticle) || [];
}
