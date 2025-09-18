// Strapi API client for Next.js frontend

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
}

class StrapiAPI {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string = STRAPI_URL, token?: string) {
    this.baseURL = baseURL;
    this.token = token || STRAPI_TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Companies
  async getCompanies(params?: {
    populate?: string[];
    filters?: Record<string, any>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value);
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
    return this.request<StrapiEntity[]>(`/companies${query ? `?${query}` : ''}`);
  }

  async getCompanyBySlug(slug: string) {
    return this.request<StrapiEntity[]>(`/companies?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Projects
  async getProjects(params?: {
    populate?: string[];
    filters?: Record<string, any>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value);
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
    return this.request<StrapiEntity[]>(`/projects${query ? `?${query}` : ''}`);
  }

  async getFeaturedProjects() {
    return this.request<StrapiEntity[]>('/projects?filters[featured][$eq]=true&populate=*&sort=date:desc');
  }

  async getProjectsByCompany(companySlug: string) {
    return this.request<StrapiEntity[]>(`/projects?filters[company][slug][$eq]=${companySlug}&populate=*`);
  }

  // Blog Articles
  async getBlogArticles(params?: {
    populate?: string[];
    filters?: Record<string, any>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value);
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
    return this.request<StrapiEntity[]>(`/blog-articles${query ? `?${query}` : ''}`);
  }

  async getFeaturedArticles() {
    return this.request<StrapiEntity[]>('/blog-articles?filters[featured][$eq]=true&populate=*&sort=publishDate:desc');
  }

  async getRecentArticles(limit: number = 5) {
    return this.request<StrapiEntity[]>(`/blog-articles?populate=*&sort=publishDate:desc&pagination[pageSize]=${limit}`);
  }
}

// Create a default instance
export const strapi = new StrapiAPI();

// Export the class for custom instances
export { StrapiAPI };

// Helper function to transform Strapi entity to flat object
export function transformStrapiEntity<T>(entity: StrapiEntity): T & { id: number } {
  return {
    id: entity.id,
    ...entity.attributes,
  } as T & { id: number };
}

// Helper function to transform array of Strapi entities
export function transformStrapiEntities<T>(entities: StrapiEntity[]): (T & { id: number })[] {
  return entities.map(entity => transformStrapiEntity<T>(entity));
}

// Type definitions for the transformed data
export interface Company {
  id: number;
  name: string;
  tagline: string;
  description: string;
  logo?: any;
  website?: string;
  email: string;
  phone: string;
  whatsapp: string;
  social?: Record<string, string>;
  services: string[];
  established?: string;
  location: string;
  color: string;
  isParent: boolean;
  slug: string;
  projects?: Project[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  company?: Company;
  client: string;
  location: string;
  date: string;
  year: number;
  description: string;
  longDescription?: string;
  services: string[];
  images?: any[];
  tags: string[];
  results?: Record<string, string>;
  featured: boolean;
  status: string;
  budget?: string;
  duration?: string;
  teamSize?: number;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  authorId?: string;
  publishDate: string;
  lastModified?: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  featuredImage?: any;
  views: number;
  likes: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}