// Homepage data reader for server-side rendering
import homepageDataJson from '../../home-page-api.json' with { type: 'json' };

// Types based on the home-page-api.json structure
export interface HomepageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  pageContent: PageContent[];
}

export interface PageContent {
  __component: string;
  id: number;
  [key: string]: unknown;
}

export interface HeroSection extends PageContent {
  __component: 'sections.hero-section';
  subtitleLine1: string;
  subtitleLine2: string;
  title: string;
  hero_slides: HeroSlide[];
  statistic1: Statistic;
  statistic2: Statistic;
  statistic3: Statistic;
}

export interface HeroSlide {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  orderNo: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  image: StrapiImage;
}

export interface Statistic {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface CompanyHighlights extends PageContent {
  __component: 'components.company-highlights';
  title: string;
  description: string;
  selected_companies: Company[];
}

export interface Company {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  logo: StrapiImage;
}

export interface ServiceHighlight extends PageContent {
  __component: 'components.service-highlight';
  title: string;
  description: string;
  services: Service[];
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  description: string;
  orderNo: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  icon: StrapiImage;
}

export interface ProjectHighlights extends PageContent {
  __component: 'sections.project-highlights';
  title: string;
  description: string;
  featuredProjects: FeaturedProject[];
}

export interface PortfolioCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

export interface BlogTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

export interface FeaturedProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  linkURL: string;
  orderNo: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  cover: StrapiImage;
  gallery: StrapiImage[] | null;
  portfolio_categories: PortfolioCategory[];
}

export interface TestimonialCarousel extends PageContent {
  __component: 'sections.testimonial-carousel';
  title: string;
  description: string;
  selected_testimonials: Testimonial[];
  clients: Client[];
  statistic1: Statistic;
  statistic2: Statistic;
  statistic3: Statistic;
  statistic4: Statistic;
}

export interface Testimonial {
  id: number;
  documentId: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  content: string;
  rating: number | null;
  isFeatured: boolean | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  avatar: StrapiImage | null;
}

export interface Client {
  id: number;
  documentId: string;
  name: string;
  website: string | null;
  type: string;
  orderNo: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  logo: StrapiImage;
}

export interface ArticleSection extends PageContent {
  __component: 'sections.article';
  title: string;
  description: string;
  blog_articles: BlogArticle[];
}

export interface BlogArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  cover: StrapiImage;
  blog_category: BlogCategory;
  tags: BlogTag[];
}

export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

export interface BlogArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  cover: StrapiImage;
  blog_category: BlogCategory;
  tags: BlogTag[];
}

export interface ContactSection extends PageContent {
  __component: 'sections.contact';
  title: string;
  description: string;
  phone_number: string;
  email: string;
  socialLinks: SocialLinks;
}

export interface CollaborationSection extends PageContent {
  __component: 'sections.collaboration';
  title: string;
  description: string;
  phone: string | null;
  contact_messages: unknown[];
  address: Address;
  socialLinks: SocialLinks;
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

export interface SocialLinks {
  id: number;
  instagram: string;
  tiktok: string;
  facebook: string;
  x: string;
  linkedin: string;
  youtube: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Function to get homepage data from Strapi API
export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    // Use environment variables for API configuration
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.narvex.id';
    const apiToken = process.env.STRAPI_API_TOKEN || '73c1029c3d809e1708c993bbc11ae8adefdbd7064e1342082135c0c1db8995795665357264f328c5eb7f6ed3fc90ba8bbf568ea9dbef8f8ba66b86ea80f3c56d142200d5e8030c3ce305fecffa7c6ab57b0aae74b33ca36dcd395c729aa935a2ce01a21a3bf4305a812d11cf88466b6213f8f521211a9dba4ccc17bdcce0b642';
    
    console.log('🚀 Fetching data from Strapi API:', `${apiUrl}/api/home-page`);
    console.log('🔑 Using API Token:', apiToken.substring(0, 20) + '...');
    console.log('🌐 Environment Variables:', {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ? 'Set' : 'Not Set'
    });
    
    // Fetch data from Strapi API with deep population
    const response = await fetch(`${apiUrl}/api/home-page?populate=deep`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      // Add cache control for development
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log('📡 API Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API request failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log the response for debugging
    console.log('✅ API Response received:', {
      status: response.status,
      hasData: !!data.data,
      dataKeys: data.data ? Object.keys(data.data) : 'No data',
      hasPageContent: !!data.data?.pageContent,
      pageContentLength: data.data?.pageContent?.length || 0
    });
    
    // Return the data in the expected format
    const result = data.data || data;
    console.log('📦 Returning data:', {
      id: result.id,
      pageContentCount: result.pageContent?.length || 0
    });
    
    return result as HomepageData;
    
  } catch (error) {
    console.error('❌ Error fetching homepage data from API:', error);
    
    // Fallback to local JSON file
    try {
      console.log('🔄 Falling back to local JSON file...');
      const fallbackData = homepageDataJson as HomepageData;
      console.log('✅ Successfully loaded fallback data');
      return fallbackData;
    } catch (fallbackError) {
      console.error('❌ Error reading fallback data:', fallbackError);
      return null;
    }
  }
}

// Helper methods to get specific sections
export function getHeroSection(data: HomepageData): HeroSection | null {
  return data.pageContent.find(
    (content): content is HeroSection => content.__component === 'sections.hero-section'
  ) || null;
}

export function getCompanyHighlights(data: HomepageData): CompanyHighlights | null {
  return data.pageContent.find(
    (content): content is CompanyHighlights => content.__component === 'components.company-highlights'
  ) || null;
}

export function getServiceHighlight(data: HomepageData): ServiceHighlight | null {
  return data.pageContent.find(
    (content): content is ServiceHighlight => content.__component === 'components.service-highlight'
  ) || null;
}

export function getProjectHighlights(data: HomepageData): ProjectHighlights | null {
  return data.pageContent.find(
    (content): content is ProjectHighlights => content.__component === 'sections.project-highlights'
  ) || null;
}

export function getTestimonialCarousel(data: HomepageData): TestimonialCarousel | null {
  return data.pageContent.find(
    (content): content is TestimonialCarousel => content.__component === 'sections.testimonial-carousel'
  ) || null;
}

export function getArticleSection(data: HomepageData): ArticleSection | null {
  return data.pageContent.find(
    (content): content is ArticleSection => content.__component === 'sections.article'
  ) || null;
}

export function getContactSection(data: HomepageData): ContactSection | null {
  return data.pageContent.find(
    (content): content is ContactSection => content.__component === 'sections.contact'
  ) || null;
}

export function getCollaborationSection(data: HomepageData): CollaborationSection | null {
  return data.pageContent.find(
    (content): content is CollaborationSection => content.__component === 'sections.collaboration'
  ) || null;
}

// Helper method to get image URL
export function getImageUrl(image: StrapiImage | null | undefined, format: 'large' | 'medium' | 'small' | 'thumbnail' = 'medium'): string {
  // Return empty string if image is null or undefined
  if (!image) {
    console.warn('⚠️ Image is null or undefined, returning empty string');
    return '';
  }

  // Use environment variable or fallback to production domain
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.narvex.id';
  
  console.log('🖼️ Image URL generation:', {
    baseUrl,
    envVar: process.env.NEXT_PUBLIC_STRAPI_URL,
    imageFormat: format,
    imageUrl: image.url,
    hasFormats: !!image.formats
  });
  
  // Check if formats exist
  if (!image.formats) {
    console.warn('⚠️ Image formats not available, using original URL');
    const fullUrl = `${baseUrl}${image.url}`;
    console.log('🖼️ Generated image URL (no formats):', fullUrl);
    return fullUrl;
  }
  
  const formatData = image.formats[format];
  
  if (formatData) {
    const fullUrl = `${baseUrl}${formatData.url}`;
    console.log('🖼️ Generated image URL:', fullUrl);
    return fullUrl;
  }
  
  const fullUrl = `${baseUrl}${image.url}`;
  console.log('🖼️ Generated image URL (fallback):', fullUrl);
  return fullUrl;
}
