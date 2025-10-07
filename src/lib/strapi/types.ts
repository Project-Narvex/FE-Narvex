// Strapi API Types and Interfaces

export interface StrapiResponse<T> {
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

export interface StrapiEntity {
  id: number;
  attributes: Record<string, unknown>;
}

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
  provider_metadata?: Record<string, unknown>;
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

export interface Statistic {
  id: number;
  value: number;
  suffix: string;
  label: string;
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

export interface ProjectGalleryItem extends StrapiImage {
  // Gallery-specific properties
  orderNo?: number;
}

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

// Base component interface
export interface BaseComponent {
  __component: string;
  id: number;
  [key: string]: unknown;
}

// Homepage Types
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
  cover?: StrapiImage;
  blog_category?: BlogCategory;
  tags: BlogTag[];
}

// Homepage Component Types
export interface HomepageComponent extends BaseComponent {
  // Homepage-specific properties
  orderNo?: number;
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

export interface ContactCard {
  id: number;
  title: string;
  description: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  logo?: StrapiImage;
}

export interface ContactSection extends HomepageComponent {
  __component: "sections.contact";
  title: string;
  description: string;
  phone_number?: string;
  email?: string;
  socialLinks?: SocialLink;
  card_1?: ContactCard | null;
  card_2?: ContactCard | null;
  card_3?: ContactCard | null;
  card_4?: ContactCard | null;
}

export interface CollaborationSection extends HomepageComponent {
  __component: "sections.collaboration";
  title: string;
  description: string;
  phone: string;
  contact_messages: Array<Record<string, unknown>>;
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
export interface AboutPageComponent extends BaseComponent {
  // About page-specific properties
  orderNo?: number;
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
  aspect1?: {
    id: number;
    title: string;
    description: string;
  };
  aspect2?: {
    id: number;
    title: string;
    description: string;
  };
  aspect3?: {
    id: number;
    title: string;
    description: string;
  };
  aspect4?: {
    id: number;
    title: string;
    description: string;
  };
  card_highlight?: {
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
  seo: Array<Record<string, unknown>>;
}

// Service Page Types
export interface ServicePageComponent extends BaseComponent {
  // Service page-specific properties
  orderNo?: number;
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

// Company Page Types
export interface CompanyPageComponent extends BaseComponent {
  // Company page-specific properties
  orderNo?: number;
}

export interface CompanyHero extends CompanyPageComponent {
  __component: "service.hero";
  title: string;
  subtitle: string;
  description: string;
}

export interface CompanyPageHighlight extends CompanyPageComponent {
  __component: "company.company-highlight";
  title: string;
  description: string;
  Company: Array<{
    id: number;
    title: string;
    Subtitle: string;
    description: string;
    services: {
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
    };
    company: {
      id: number;
      documentId: string;
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      phone_number: string;
      logo: StrapiImage;
      address: {
        id: number;
        address: string;
        city: string;
        province: string;
        country: string;
        postalCode: string;
        long: number | null;
        Lat: number | null;
      };
      socials: {
        id: number;
        instagram: string;
        tiktok: string;
        facebook: string;
        x: string;
        linkedin: string;
        youtube: string;
      };
      tag: {
        id: number;
        documentId: string;
        name: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
      portofolios: Array<{
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        title: string;
        slug: string;
        excerpt: string;
        linkURL: string;
        orderNo: number | null;
        Highlight: boolean;
        date: string | null;
        cover: StrapiImage;
        gallery: StrapiImage[] | null;
        portfolio_categories: Array<{
          id: number;
          documentId: string;
          name: string;
          slug: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        }>;
        seo: Array<Record<string, unknown>>;
      }>;
      clients: Array<{
        id: number;
        documentId: string;
        name: string;
        website: string;
        type: string;
        orderNo: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        logo: StrapiImage;
      }>;
    };
  }>;
}

export interface CompanyPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  pageContent: CompanyPageComponent[];
}

// Portfolio Page Types
export interface PortfolioPageComponent extends BaseComponent {
  // Portfolio page-specific properties
  orderNo?: number;
}

export interface PortfolioHero extends PortfolioPageComponent {
  __component: "portfolio.hero";
  title: string;
  subtitle: string;
  description: string;
}

export interface PortfolioHighlight extends PortfolioPageComponent {
  __component: "portfolio.highlight-portofolio";
  title: string;
  description: string;
  featuredProjects: FeaturedProject[];
}

export interface PortfolioExplore extends PortfolioPageComponent {
  __component: "portfolio.portofolio";
  title: string;
  description: string;
}

export interface PortfolioPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  hero: PortfolioHero;
  highlight_portofolio: PortfolioHighlight;
  portofolio: PortfolioExplore;
}

export interface PortfolioItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  title: string;
  slug: string;
  excerpt: string;
  linkURL: string;
  orderNo?: number;
  Highlight?: boolean;
  date?: string;
  cover: StrapiImage;
  gallery: StrapiImage[] | null;
  portfolio_categories: ProjectCategory[];
  company?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    locale?: string;
    phone_number?: string;
    logo?: StrapiImage;
    address?: {
      id: number;
      address: string;
      city: string;
      province: string;
      country: string;
      postalCode: string;
      long: number | null;
      Lat: number | null;
    };
    socials?: {
      id: number;
      instagram: string;
      tiktok: string;
      facebook: string;
      x: string;
      linkedin: string;
      youtube: string;
    };
    tag?: {
      id: number;
      documentId: string;
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt?: string;
      locale?: string;
    };
  };
  client?: {
    id: number;
    documentId: string;
    name: string;
    website?: string;
    type: string;
    orderNo?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    locale?: string;
  };
  services?: Array<{
    id: number;
    documentId: string;
    title: string;
    description: string;
    orderNo?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    Subtitle?: string;
  }>;
  seo?: Array<Record<string, unknown>>;
}

export interface PortfolioListData {
  data: PortfolioItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Legacy Project interface for compatibility
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
  cover?: StrapiImage;
  linkURL?: string;
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

// Blog Page Types
export interface BlogPageComponent extends BaseComponent {
  // Blog page-specific properties
  orderNo?: number;
}

export interface BlogHero extends BlogPageComponent {
  __component: "blog.hero";
  title: string;
  subtitle?: string;
  description: string;
}

export interface BlogHighlightArticle extends BlogPageComponent {
  __component: "blog.highlight-article";
  title: string;
  description: string;
  blog_articles: BlogArticleItem[];
}

export interface BlogArticleSection extends BlogPageComponent {
  __component: "blog.article-section";
  title: string;
  description: string;
  blog_articles: BlogArticleItem[];
}

export interface BlogPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
  hero: BlogHero;
  Highlight_Article: BlogHighlightArticle;
  Article: BlogArticleSection;
}

export interface BlogListData {
  data: BlogArticleItem[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Contact Page Types
export interface ContactPageComponent {
  __component: string;
  id: number;
  title: string;
  description?: string;
}

export interface ContactHero extends ContactPageComponent {
  __component: 'contact.hero';
  subtitle?: string;
}

export interface ContactServiceCard extends ContactPageComponent {
  __component: 'contact.service-card';
  icon: string;
  color: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

export interface ContactForm extends ContactPageComponent {
  __component: 'contact.form';
  fields: {
    name: { placeholder: string };
    email: { placeholder: string };
    phone: { placeholder: string };
    company: { placeholder: string };
    message: { placeholder: string };
    budget: { options: Array<{ value: string; label: string }> };
    timeline: { options: Array<{ value: string; label: string }> };
  };
  submitButton: {
    text: string;
    loadingText: string;
  };
  successMessage: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ContactInfo extends ContactPageComponent {
  __component: 'contact.info';
  address: {
    city: string;
    country: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday?: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  socialMedia: {
    instagram: string;
  };
}

export interface ContactPageData {
  data: {
    id: number;
    pageContent: ContactPageComponent[];
    seo: any[];
  };
  meta: {};
}

export interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  budget: string;
  timeline: string;
  subject: string;
  message: string;
}
