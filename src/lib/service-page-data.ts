// Service Page Data Types and API Integration

export interface ServicePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pageContent: ServicePageContent[];
}

export interface ServicePageContent {
  __component: string;
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  // Hero section
  // Services section
  services?: ServiceItem[];
  // Strengths section
  statistic1?: Statistic;
  statistic2?: Statistic;
  statistic3?: Statistic;
  statistic4?: Statistic;
  // Contact section
  phone_number?: string;
  email?: string;
  socialLinks?: SocialLinks;
}

export interface ServiceItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  Subtitle?: string;
  orderNo?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: MediaItem;
  image_placeholder: MediaItem;
}

export interface Statistic {
  id: number;
  value: number | null;
  suffix?: string;
  label: string;
}

export interface SocialLinks {
  id: number;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
}

export interface MediaItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
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
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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

// Function to get service page data from Strapi API
export async function getServicePageData(): Promise<ServicePageData | null> {
  try {
    // Use environment variables for API configuration
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:7245';
    const apiToken = process.env.STRAPI_API_TOKEN;
    
    console.log('🚀 Fetching service page data from Strapi API:', `${apiUrl}/api/service-page`);
    console.log('🔑 Using API Token:', apiToken ? apiToken.substring(0, 20) + '...' : 'Not set');
    console.log('🌐 Environment Variables:', {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ? 'Set' : 'Not Set'
    });
    
    if (!apiToken) {
      throw new Error('STRAPI_API_TOKEN is not configured');
    }
    
    // Fetch data from Strapi API with deep population
    const response = await fetch(`${apiUrl}/api/service-page?populate=deep`, {
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
    console.log('📦 Returning service page data:', {
      id: result.id,
      pageContentCount: result.pageContent?.length || 0
    });
    
    return result as ServicePageData;
    
  } catch (error) {
    console.error('❌ Error fetching service page data from API:', error);
    return null;
  }
}

// Helper functions to extract specific sections from service page data
export function getHeroSection(data: ServicePageData): ServicePageContent | null {
  return data.pageContent.find(content => content.__component === 'service.hero') || null;
}

export function getServicesSection(data: ServicePageData): ServicePageContent | null {
  return data.pageContent.find(content => content.__component === 'service.services') || null;
}

export function getStrengthsSection(data: ServicePageData): ServicePageContent | null {
  return data.pageContent.find(content => content.__component === 'service.strengths') || null;
}

export function getContactSection(data: ServicePageData): ServicePageContent | null {
  return data.pageContent.find(content => content.__component === 'sections.contact') || null;
}

// Helper function to get image URL with fallback
export function getImageUrl(media: MediaItem | null | undefined, format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string {
  if (!media) return '';
  
  // Use environment variable or fallback to production domain
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:7245';
  
  if (media.formats && media.formats[format]) {
    return `${baseUrl}${media.formats[format].url}`;
  }
  
  return `${baseUrl}${media.url}`;
}

// Helper function to extract text from rich text content
export function extractTextFromRichText(richText: any[]): string {
  if (!Array.isArray(richText)) return '';
  
  return richText
    .map(item => {
      if (item.type === 'paragraph' && item.children) {
        return item.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.text)
          .join('');
      }
      if (item.type === 'list' && item.children) {
        return item.children
          .map((listItem: any) => {
            if (listItem.children) {
              return listItem.children
                .filter((child: any) => child.type === 'text')
                .map((child: any) => child.text)
                .join('');
            }
            return '';
          })
          .join('\n');
      }
      return '';
    })
    .join('\n')
    .trim();
}

// Helper function to extract service description as array (for bullet points)
export function extractServiceDescription(description: string): string[] {
  if (!description) return [];
  
  // Split by newlines and filter out empty lines
  const lines = description.split('\n').filter(line => line.trim());
  
  // Extract bullet points (lines starting with -)
  const bulletPoints = lines
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().substring(1).trim());
  
  return bulletPoints.length > 0 ? bulletPoints : [description];
}
