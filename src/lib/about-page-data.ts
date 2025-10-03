// About Page Data Types and API Integration

export interface AboutPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pageContent: AboutPageContent[];
  seo: any[];
}

export interface AboutPageContent {
  __component: string;
  id: number;
  title?: string;
  description?: string;
  subtitle?: string;
  // Hero section
  // Aspect section
  aspect1?: AspectItem;
  aspect2?: AspectItem;
  aspect3?: AspectItem;
  aspect4?: AspectItem;
  card_highlight?: CardHighlight;
  // Vision Mission section
  vision?: VisionMissionItem;
  mission?: VisionMissionItem;
  // Legal section
  legals?: LegalDocument[];
  // Team section
  team_members?: TeamMember[];
  statistic1?: Statistic;
  statistic2?: Statistic;
  statistic3?: Statistic;
  statistic4?: Statistic;
  // Awards section
  Award?: Award[];
  // Company Culture section
  culture1?: CultureItem;
  culture2?: CultureItem;
  culture3?: CultureItem;
  culture4?: CultureItem;
}

export interface AspectItem {
  id: number;
  title: string;
  description: string;
}

export interface CardHighlight {
  id: number;
  title: string;
  description: string;
  media: MediaItem;
  statistic1: Statistic;
  statistic2: Statistic;
}

export interface VisionMissionItem {
  id: number;
  title: string;
  description: any[];
  logo: MediaItem;
}

export interface LegalDocument {
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
  file: MediaItem;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position: string;
  bio: string;
  orderNo?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo?: MediaItem;
}

export interface Statistic {
  id: number;
  value: number;
  suffix?: string;
  label: string;
}

export interface Award {
  id: number;
  title: string;
  issuer: string;
  year: string;
}

export interface CultureItem {
  id: number;
  title: string;
  description: any[];
  media: MediaItem;
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

// Function to get about page data from Strapi API
export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    // Use environment variables for API configuration
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:7245';
    const apiToken = process.env.STRAPI_API_TOKEN;
    
    console.log('🚀 Fetching about page data from Strapi API:', `${apiUrl}/api/about-page`);
    console.log('🔑 Using API Token:', apiToken ? apiToken.substring(0, 20) + '...' : 'Not set');
    console.log('🌐 Environment Variables:', {
      NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ? 'Set' : 'Not Set'
    });
    
    if (!apiToken) {
      throw new Error('STRAPI_API_TOKEN is not configured');
    }
    
    // Fetch data from Strapi API with deep population
    const response = await fetch(`${apiUrl}/api/about-page?populate=deep`, {
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
    console.log('📦 Returning about page data:', {
      id: result.id,
      pageContentCount: result.pageContent?.length || 0
    });
    
    return result as AboutPageData;
    
  } catch (error) {
    console.error('❌ Error fetching about page data from API:', error);
    return null;
  }
}

// Helper functions to extract specific sections from about page data
export function getHeroSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'about.hero') || null;
}

export function getAspectSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'about.aspect') || null;
}

export function getVisionMissionSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'about.vision-mission') || null;
}

export function getLegalSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'about.legal') || null;
}

export function getTeamSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'sections.team-highlight') || null;
}

export function getAwardsSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'sections.awards-section') || null;
}

export function getCompanyCultureSection(data: AboutPageData): AboutPageContent | null {
  return data.pageContent.find(content => content.__component === 'about.company-culture') || null;
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

// Helper function to extract mission content as mixed array (paragraphs and bullet points)
export function extractMissionContent(richText: any[]): Array<{type: 'paragraph' | 'bullet', content: string}> {
  if (!Array.isArray(richText)) return [];
  
  const missionContent: Array<{type: 'paragraph' | 'bullet', content: string}> = [];
  
  richText.forEach(item => {
    if (item.type === 'paragraph' && item.children) {
      const text = item.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.text)
        .join('');
      if (text.trim()) {
        missionContent.push({ type: 'paragraph', content: text.trim() });
      }
    }
    if (item.type === 'list' && item.children) {
      item.children.forEach((listItem: any) => {
        if (listItem.children) {
          const text = listItem.children
            .filter((child: any) => child.type === 'text')
            .map((child: any) => child.text)
            .join('');
          if (text.trim()) {
            missionContent.push({ type: 'bullet', content: text.trim() });
          }
        }
      });
    }
  });
  
  return missionContent;
}

// Helper function to extract vision text (paragraph only, no bullet points)
export function extractVisionText(richText: any[]): string {
  if (!Array.isArray(richText)) return '';
  
  const paragraphs: string[] = [];
  
  richText.forEach(item => {
    if (item.type === 'paragraph' && item.children) {
      const text = item.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.text)
        .join('');
      if (text.trim()) {
        paragraphs.push(text.trim());
      }
    }
  });
  
  return paragraphs.join(' ');
}
