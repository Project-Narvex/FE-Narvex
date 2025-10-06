// Strapi API Content Services

import { StrapiAPI } from './base';

const STRAPI_PORTOFOLIO_URL = process.env.STRAPI_PORTOFOLIO_URL || '/api/portofolios?populate=*';

export class StrapiContentService extends StrapiAPI {
  // Companies
  async getCompanies(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/companies${query ? `?${query}` : ''}`);
  }

  async getCompanyBySlug(slug: string) {
    return this.request(`/companies?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Projects
  async getProjects(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/projects${query ? `?${query}` : ''}`);
  }

  async getFeaturedProjects() {
    return this.request('/projects?filters[featured][$eq]=true&populate=*&sort=date:desc');
  }

  async getProjectsByCompany(companySlug: string) {
    return this.request(`/projects?filters[company][slug][$eq]=${companySlug}&populate=*`);
  }

  // Portfolio List
  async getPortfolios(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    try {
      const portfolioEndpoint = STRAPI_PORTOFOLIO_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/portofolios';
      
      // Build query parameters manually to handle filters properly
      const searchParams = new URLSearchParams();
      
      if (params?.populate) {
        params.populate.forEach(field => {
          searchParams.append('populate', field);
        });
      }
      
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            Object.entries(value as Record<string, unknown>).forEach(([subKey, subValue]) => {
              searchParams.append(`filters[${key}][${subKey}]`, String(subValue));
            });
          } else {
            searchParams.append(`filters[${key}]`, String(value));
          }
        });
      }
      
      if (params?.sort) {
        params.sort.forEach(field => {
          searchParams.append('sort', field);
        });
      }
      
      if (params?.pagination) {
        searchParams.append('pagination[page]', params.pagination.page.toString());
        searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
      }
      
      const query = searchParams.toString();
      const url = `${portfolioEndpoint}${query ? `?${query}` : ''}`;
      
      const fullUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${url}`;
      console.log('Fetching portfolios from:', fullUrl);
      console.log('Query params:', query);
      
      const data = await this.requestPage(url);
      console.log('Portfolios API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }
  }

  // Blog Articles
  async getBlogArticles(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/blog-articles${query ? `?${query}` : ''}`);
  }

  async getFeaturedArticles() {
    return this.request('/blog-articles?filters[featured][$eq]=true&populate=*&sort=publishDate:desc');
  }

  async getRecentArticles(limit: number = 5) {
    return this.request(`/blog-articles?populate=*&sort=publishDate:desc&pagination[pageSize]=${limit}`);
  }

  // Blog Page
  async getBlogPage() {
    const endpoint = '/blog-page?populate=*';
    
    console.log('Fetching blog page from:', `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${endpoint}`);
    console.log('Endpoint:', endpoint);
    
    const data = await this.requestPage(endpoint);
    console.log('Blog page API response:', data);
    return data;
  }

  // Blog Articles List (for filtering)
  async getBlogArticlesList(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    // Use the standard blog-articles endpoint instead of environment variable
    const endpoint = '/blog-articles';
    
    // Build query parameters manually to handle filters properly
    const searchParams = new URLSearchParams();
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value as Record<string, unknown>).forEach(([subKey, subValue]) => {
            searchParams.append(`filters[${key}][${subKey}]`, String(subValue));
          });
        } else {
          searchParams.append(`filters[${key}]`, String(value));
        }
      });
    }
    
    if (params?.sort) {
      params.sort.forEach(field => {
        searchParams.append('sort', field);
      });
    }
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
    
    const query = searchParams.toString();
    const url = `${endpoint}${query ? `?${query}` : ''}`;
    
    const fullUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${url}`;
    console.log('Fetching blog articles from:', fullUrl);
    console.log('Query params:', query);
    
    const data = await this.requestPage(url);
    console.log('Blog articles API response:', data);
    return data;
  }

  // Contact Page
  async getContactPage() {
    const endpoint = '/contact-page?populate=deep';
    
    console.log('Fetching contact page from:', `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${endpoint}`);
    console.log('Endpoint:', endpoint);
    
    const data = await this.requestPage(endpoint);
    console.log('Contact page API response:', data);
    return data;
  }

  // Contact Form Submission
  async submitContactMessage(formData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    serviceType: string;
    budget: string;
    timeline: string;
    subject: string;
    message: string;
  }) {
    const endpoint = '/contact-messages';
    
    console.log('Submitting contact message to:', `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${endpoint}`);
    console.log('Form data:', formData);
    
    const payload = {
      data: formData
    };
    
    const data = await this.requestPage(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Contact message API response:', data);
    return data;
  }

  // Custom query method for blog filtering
  async queryBlogArticles(queryString: string) {
    const endpoint = `/blog-articles?${queryString}`;
    
    console.log('Querying blog articles with:', queryString);
    console.log('Full URL:', `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api${endpoint}`);
    
    const data = await this.requestPage(endpoint);
    console.log('Blog articles query response:', data);
    return data;
  }
}
