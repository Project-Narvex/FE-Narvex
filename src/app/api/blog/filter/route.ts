import { NextRequest, NextResponse } from 'next/server';
import { StrapiContentService } from '@/lib/strapi/content';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const author = searchParams.get('author');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    // Create Strapi service instance
    const strapiService = new StrapiContentService();
    
    // Fetch filtered articles using manual query string
    let queryString = 'populate=cover&populate=blog_category&populate=tags&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=50';
    
    if (category && category !== 'all') {
      if (category === 'none') {
        queryString += '&filters[blog_category][$null]=true';
      } else {
        const categoryMap: Record<string, string> = {
          'romance': 'Romance',
          'aman': 'Aman'
        };
        const properCategory = categoryMap[category.toLowerCase()] || category;
        queryString += `&filters[blog_category][name][$eq]=${encodeURIComponent(properCategory)}`;
      }
    }
    
    if (year && year !== 'all') {
      queryString += `&filters[createdAt][$gte]=${year}-01-01T00:00:00.000Z`;
      queryString += `&filters[createdAt][$lt]=${parseInt(year) + 1}-01-01T00:00:00.000Z`;
    }
    
    if (author && author !== 'all') {
      queryString += `&filters[author][$eq]=${encodeURIComponent(author)}`;
    }
    
    if (status && status !== 'all') {
      if (status === 'featured') {
        queryString += '&filters[featured][$eq]=true';
      } else if (status === 'published') {
        queryString += '&filters[publishedAt][$notNull]=true';
      }
    }
    
    if (search) {
      queryString += `&filters[$or][0][title][$containsi]=${encodeURIComponent(search)}`;
      queryString += `&filters[$or][1][content][$containsi]=${encodeURIComponent(search)}`;
      queryString += `&filters[$or][2][tags][name][$containsi]=${encodeURIComponent(search)}`;
    }
    
    const data = await strapiService.requestPage(`/blog-articles?${queryString}`);
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Blog filter API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filtered articles' },
      { status: 500 }
    );
  }
}
