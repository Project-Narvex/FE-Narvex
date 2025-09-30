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

// Function to get homepage data from imported JSON
export function getHomepageData(): HomepageData | null {
  try {
    return homepageDataJson as HomepageData;
  } catch (error) {
    console.error('Error reading homepage data:', error);
    return null;
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
export function getImageUrl(image: StrapiImage, format: 'large' | 'medium' | 'small' | 'thumbnail' = 'medium'): string {
  // Use environment variable or fallback to localhost:7245 (your API port)
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:7245';
  
  const formatData = image.formats[format];
  
  if (formatData) {
    return `${baseUrl}${formatData.url}`;
  }
  
  return `${baseUrl}${image.url}`;
}
