// Strapi API client for Next.js frontend

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const STRAPI_HOME_PAGE_URL = process.env.STRAPI_HOME_PAGE_URL || '/api/home-page?populate=*';
const STRAPI_ABOUT_PAGE_URL = process.env.STRAPI_ABOUT_PAGE_URL || '/api/about-page?populate=*';
const STRAPI_SERVICE_PAGE_URL = process.env.STRAPI_SERVICE_PAGE_URL || '/api/service-page?populate=*';

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
  attributes: Record<string, unknown>;
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
    filters?: Record<string, unknown>;
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
        searchParams.append(`filters[${key}]`, String(value));
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
    filters?: Record<string, unknown>;
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
        searchParams.append(`filters[${key}]`, String(value));
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

  // Homepage
  async getHomepage() {
    // Extract the endpoint path from STRAPI_HOME_PAGE_URL
    const homepageEndpoint = STRAPI_HOME_PAGE_URL.replace(STRAPI_URL, '').replace('/api', '') || '/home-page?populate=*';
    
    const url = `${this.baseURL}/api${homepageEndpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // Blog Articles
  async getBlogArticles(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
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
        searchParams.append(`filters[${key}]`, String(value));
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

  // About Page
  async getAboutPage() {
    // Extract the endpoint path from STRAPI_ABOUT_PAGE_URL
    const aboutPageEndpoint = STRAPI_ABOUT_PAGE_URL.replace(STRAPI_URL, '').replace('/api', '') || '/about-page?populate=*';
    
    const url = `${this.baseURL}/api${aboutPageEndpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // Service Page
  async getServicePage() {
    try {
      // Extract the endpoint path from STRAPI_SERVICE_PAGE_URL
      const servicePageEndpoint = STRAPI_SERVICE_PAGE_URL.replace(STRAPI_URL, '').replace('/api', '') || '/service-page?populate=*';
      
      const url = `${this.baseURL}/api${servicePageEndpoint}`;
      
      console.log('Fetching service page from:', url);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.token) {
        (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Service page API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching service page:', error);
      throw error;
    }
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

// Helper function to get optimized image URL from Strapi image
export function getStrapiImageUrl(image: StrapiImage, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  if (size === 'original') {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  const format = image.formats?.[size];
  if (format) {
    return format.url.startsWith('http') ? format.url : `${STRAPI_URL}${format.url}`;
  }
  
  // Fallback to original image if format not available
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}

// Helper function for automatic logo mapping with better error handling
export function mapStrapiLogo(logoData: any, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium', fallbackText?: string): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackText?: string;
} {
  // Check if logo exists and has proper structure
  if (!logoData || !logoData.url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: fallbackText || 'Logo',
      fallbackText: fallbackText || '司'
    };
  }

  try {
    const logoUrl = getStrapiImageUrl(logoData as StrapiImage, size);
    return {
      logoUrl,
      hasLogo: true,
      altText: logoData.alternativeText || logoData.name || fallbackText || 'Logo',
      fallbackText: fallbackText || '司'
    };
  } catch (error) {
    console.warn('Error mapping Strapi logo:', logoData, error);
    return {
      logoUrl: null,
      hasLogo: false,
      altText: fallbackText || 'Logo',
      fallbackText: fallbackText ? fallbackText.slice(0, 3).toUpperCase() : '司'
    };
  }
}

// Helper function for client logo mapping specifically for carousel
export function mapClientLogo(client: any): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackInitials: string;
} {
  const fallbackInitials = client.name 
    ? client.name.split(' ').map((word: string) => word.charAt(0)).join('').toUpperCase().slice(0, 3)
    : 'LOGO';

  if (!client.logo || !client.logo.url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${client.name || 'Client'} logo`,
      fallbackInitials
    };
  }

  try {
    const logoUrl = getStrapiImageUrl(client.logo as StrapiImage, 'medium');
    return {
      logoUrl,
      hasLogo: true,
      altText: client.logo.alternativeText || client.logo.name || `${client.name} logo`,
      fallbackInitials
    };
  } catch (error) {
    console.warn('Error mapping client logo:', client, error);
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${client.name || 'Client'} logo`,
      fallbackInitials
    };
  }
}

// Helper function to transform homepage component based on its type
export function transformHomepageComponent(component: any): HomepageComponent {
  switch (component.__component) {
    case 'sections.hero-section':
      return component as HeroSection;
    case 'components.company-highlights':
      return component as CompanyHighlight;
    case 'components.service-highlight':
      return component as ServiceHighlight;
    case 'sections.project-highlights':
      return component as ProjectHighlight;
    case 'sections.testimonial-carousel':
      return component as TestimonialCarousel;
    case 'sections.article':
      return component as ArticleSection;
    case 'sections.contact':
      return component as ContactSection;
    case 'sections.collaboration':
      return component as CollaborationSection;
    default:
      return component as HomepageComponent;
  }
}

// Helper function to transform about page component based on its type
export function transformAboutPageComponent(component: any): AboutPageComponent {
  switch (component.__component) {
    case 'about.hero':
      return component as AboutHero;
    case 'about.aspect':
      return component as AboutAspect;
    case 'about.vision-mission':
      return component as AboutVisionMission;
    case 'about.legal':
      return component as AboutLegal;
    case 'sections.team-highlight':
      return component as AboutTeamHighlight;
    case 'sections.awards-section':
      return component as AboutAwardsSection;
    case 'about.company-culture':
      return component as AboutCompanyCulture;
    default:
      return component as AboutPageComponent;
  }
}

// Helper function to extract text from Strapi rich text content
export function extractTextFromRichText(richTextArray: Array<{
  type: string;
  children: Array<{
    text: string;
    type: string;
  }>;
}>): string {
  return richTextArray
    .map(item => 
      item.children
        .filter(child => child.type === 'text')
        .map(child => child.text)
        .join('')
    )
    .join(' ');
}

// Helper function to extract list items from Strapi rich text content
export function extractListFromRichText(richTextArray: Array<{
  type: string;
  format?: string;
  children: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
}>): string[] {
  return richTextArray
    .filter(item => item.type === 'list')
    .map(item => 
      item.children
        .filter(child => child.type === 'list-item')
        .map(child => 
          child.children
            .filter(grandChild => grandChild.type === 'text')
            .map(grandChild => grandChild.text)
            .join('')
        )
    )
    .flat();
}

// Type definitions for the transformed data
export interface Company {
  id: number;
  name: string;
  tagline: string;
  description: string;
  logo?: StrapiImage;
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
  images?: unknown[];
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
  featuredImage?: unknown;
  views: number;
  likes: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

// Homepage Types
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  orderNo: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  image: StrapiImage;
}

export interface Statistic {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface Company {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  phone_number?: string;
  logo?: StrapiImage;
}

export interface Service {
  id: number;
  title: string;
  description?: string;
  orderNo?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  Subtitle?: string;
  icon: StrapiImage;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

export interface ProjectGalleryItem extends StrapiImage {}

export interface FeaturedProject {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  linkURL: string;
  orderNo?: number;
  Highlight?: boolean;
  date?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  cover: StrapiImage;
  gallery: ProjectGalleryItem[] | null;
  portfolio_categories: ProjectCategory[];
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string;
  companyName: string;
  content: string;
  rating?: number;
  isFeatured?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  avatar?: StrapiImage | null;
}

export interface Client {
  id: number;
  name: string;
  website?: string;
  type: string;
  orderNo?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  logo: StrapiImage;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

export interface BlogArticleItem {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  content?: string;
  cover?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      large?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      medium?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale?: string;
  };
  blog_category?: BlogCategory;
  tags: BlogTag[];
}

export interface SocialLink {
  instagram: string;
  tiktok: string;
  facebook: string;
  x: string;
  linkedin: string;
  youtube: string;
}

export interface Address {
  id: number;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  long: number;
  Lat: number;
}

export interface HomepageComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface HeroSection extends HomepageComponent {
  __component: "sections.hero-section";
  subtitleLine1: string;
  subtitleLine2: string;
  title: string;
  hero_slides: HeroSlide[];
  statistic1?: Statistic;
  statistic2?: Statistic;
  statistic3?: Statistic;
}

export interface CompanyHighlight extends HomepageComponent {
  __component: "components.company-highlights";
  title: string;
  description: string;
  selected_companies: Company[];
}

export interface ServiceHighlight extends HomepageComponent {
  __component: "components.service-highlight";
  title: string;
  description: string;
  services: Service[];
}

export interface ProjectHighlight extends HomepageComponent {
  __component: "sections.project-highlights";
  title: string;
  description: string;
  featuredProjects: FeaturedProject[];
}

export interface TestimonialCarousel extends HomepageComponent {
  __component: "sections.testimonial-carousel";
  title: string;
  description: string;
  selected_testimonials: Testimonial[];
  clients: Client[];
  statistic1?: Statistic;
  statistic2?: Statistic;
  statistic3?: Statistic;
  statistic4?: Statistic;
}

export interface ArticleSection extends HomepageComponent {
  __component: "sections.article";
  title: string;
  description: string;
  blog_articles: BlogArticleItem[];
}

export interface ContactSection extends HomepageComponent {
  __component: "sections.contact";
  title: string;
  description: string;
  phone_number: string;
  email: string;
  socialLinks: SocialLink;
}

export interface CollaborationSection extends HomepageComponent {
  __component: "sections.collaboration";
  title: string;
  description: string;
  phone: string;
  contact_messages: any[];
  address: Address;
  socialLinks?: SocialLink | null;
}

export interface HomepageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  pageContent: HomepageComponent[];
}

// About Page Types
export interface AboutPageComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface AboutHero extends AboutPageComponent {
  __component: "about.hero";
  title: string;
  description: string;
}

export interface AboutAspect extends AboutPageComponent {
  __component: "about.aspect";
  title: string;
  description: string;
  Subtitle: string;
  aspect1: {
    id: number;
    title: string;
    description: string;
  };
  aspect2: {
    id: number;
    title: string;
    description: string;
  };
  aspect3: {
    id: number;
    title: string;
    description: string;
  };
  aspect4: {
    id: number;
    title: string;
    description: string;
  };
  card_highlight: {
    id: number;
    title: string;
    description: string;
    media: StrapiImage;
    statistic1: Statistic;
    statistic2: Statistic;
  };
}

export interface AboutVisionMission extends AboutPageComponent {
  __component: "about.vision-mission";
  title: string;
  description?: string;
  vision: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    logo: StrapiImage;
  };
  mission: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      format?: string;
      children: Array<{
        type: string;
        children: Array<{
          text: string;
          type: string;
        }>;
      }>;
    }>;
    logo: StrapiImage;
  };
}

export interface AboutLegal extends AboutPageComponent {
  __component: "about.legal";
  title: string;
  description: string;
  legals: Array<{
    id: number;
    documentId: string;
    Document_Name: string;
    no: string;
    Issued_By: string;
    Issue_Date: string;
    Expiry_Date: string;
    Statuses: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    file: StrapiImage;
  }>;
}

export interface AboutTeamHighlight extends AboutPageComponent {
  __component: "sections.team-highlight";
  title: string;
  description: string;
  Subtitle: string;
  team_members: Array<{
    id: number;
    documentId: string;
    name: string;
    position: string;
    bio: string;
    orderNo?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    photo?: StrapiImage | null;
  }>;
  statistic1: Statistic;
  statistic2: Statistic;
  statistic3: Statistic;
  statistic4: Statistic;
}

export interface AboutAwardsSection extends AboutPageComponent {
  __component: "sections.awards-section";
  title: string;
  description: string;
  Award: Array<{
    id: number;
    title: string;
    issuer: string;
    year: string;
  }>;
}

export interface AboutCompanyCulture extends AboutPageComponent {
  __component: "about.company-culture";
  title: string;
  description: string;
  culture1: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    media: StrapiImage;
  };
  culture2: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    media: StrapiImage;
  };
  culture3: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    media: StrapiImage;
  };
  culture4: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    media: StrapiImage;
  };
}

export interface AboutPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  pageContent: AboutPageComponent[];
  seo: any[];
}

// Service Page Types
export interface ServicePageComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface ServiceHero extends ServicePageComponent {
  __component: "service.hero";
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  orderNo?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Subtitle?: string;
  icon: StrapiImage;
  image_placeholder?: StrapiImage | null;
}

export interface ServiceServices extends ServicePageComponent {
  __component: "service.services";
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface ServiceStrengths extends ServicePageComponent {
  __component: "service.strengths";
  title: string;
  description: string;
  statistic1: {
    id: number;
    value: number | null;
    suffix: string;
    label: string;
  };
  statistic2: {
    id: number;
    value: number | null;
    suffix: string;
    label: string;
  };
  statistic3: {
    id: number;
    value: number | null;
    suffix: string;
    label: string;
  };
  statistic4: {
    id: number;
    value: number | null;
    suffix: string;
    label: string;
  };
}

export interface ServiceContact extends ServicePageComponent {
  __component: "sections.contact";
  title: string;
  description: string;
  phone_number: string;
  email: string;
  socialLinks: SocialLink;
}

export interface ServicePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  pageContent: ServicePageComponent[];
}

// Helper function to transform service page component based on its type
export function transformServicePageComponent(component: any): ServicePageComponent {
  switch (component.__component) {
    case 'service.hero':
      return component as ServiceHero;
    case 'service.services':
      return component as ServiceServices;
    case 'service.strengths':
      return component as ServiceStrengths;
    case 'sections.contact':
      return component as ServiceContact;
    default:
      return component as ServicePageComponent;
  }
}

// Helper function to get optimized image URL for company logos
export function getCompanyLogoUrl(image: StrapiImage, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // For company logos, prefer medium size for better quality
  if (size === 'original') {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  const format = image.formats?.[size];
  if (format) {
    return format.url.startsWith('http') ? format.url : `${STRAPI_URL}${format.url}`;
  }
  
  // Fallback to original image if format not available
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}

// Helper function to validate and process service images
export function processServiceImage(imageData: any): {
  hasImage: boolean;
  imageUrl: string | null;
  altText: string;
} {
  if (!imageData || !imageData.url) {
    return {
      hasImage: false,
      imageUrl: null,
      altText: 'Service Image'
    };
  }

  try {
    const imageUrl = getCompanyLogoUrl(imageData as StrapiImage, 'medium');
    return {
      hasImage: true,
      imageUrl,
      altText: imageData.alternativeText || imageData.name || 'Service Image'
    };
  } catch (error) {
    console.warn('Error processing service image:', imageData, error);
    return {
      hasImage: false,
      imageUrl: null,
      altText: 'Service Image'
    };
  }
}