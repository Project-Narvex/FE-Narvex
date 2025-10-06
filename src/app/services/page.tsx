import React from 'react';
import ServicesClient from '@/components/pages/services/services-client';
import { strapi, transformServicePageComponent, processServiceImage, transformHomepageComponent } from '@/lib/strapi';
import type { StrapiResponse, ServicePageData, ServiceItem, ContactSection } from '@/lib/strapi';

interface ContactSectionData {
  title?: string;
  description?: string;
  email?: string;
  phone_number?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
}

// This is now a Server Component
export default async function ServicesPage() {
  try {
    // Fetch both service page data AND homepage data
    const servicePageData = await strapi.getServicePage() as StrapiResponse<ServicePageData>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const homepageData = await strapi.getHomepage() as any;
    
    // Debug: Log the API response structure
    console.log('Service Page API Response:', JSON.stringify(servicePageData, null, 2));
    
    // Check if we have the expected data structure
    if (!servicePageData || !servicePageData.data) {
      throw new Error('Invalid API response structure');
    }
    
    // Extract the actual page data
    const pageData = servicePageData.data;
    
    // Check if pageContent exists
    if (!pageData.pageContent || !Array.isArray(pageData.pageContent)) {
      throw new Error('pageContent not found or not an array');
    }
    
    // Transform components
    const components = pageData.pageContent.map(transformServicePageComponent);
    
    // Extract hero section
    const heroSection = components.find(comp => comp.__component === 'service.hero');
    
    // Extract services section
    const servicesSection = components.find(comp => comp.__component === 'service.services');
    
    // Extract strengths section
    const strengthsSection = components.find(comp => comp.__component === 'service.strengths');
    
    // Extract contact section FROM HOMEPAGE (not from service page)
    let contactSection: ContactSection | undefined;
    
    // Process homepage data to get contactSection
    if (homepageData) {
      let homepageEntity;
      if (homepageData.data) {
        homepageEntity = Array.isArray(homepageData.data) ? homepageData.data[0] : homepageData.data;
      } else if (homepageData.id) {
        homepageEntity = homepageData;
      }
      
      if (homepageEntity && homepageEntity.pageContent) {
        const homepageComponents = homepageEntity.pageContent.map(transformHomepageComponent);
        contactSection = homepageComponents.find(c => c.__component === 'sections.contact') as ContactSection;
      }
    }
    
    // Extract strength cards from strengthsSection (card_1, card_2, card_3, card_4)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const strengthData: any = {
      title: (strengthsSection as any)?.title || '',
      description: (strengthsSection as any)?.description || '',
      cards: []
    };
    
    // Build cards array from card_1, card_2, card_3, card_4
    if (strengthsSection) {
      const cardFields = ['card_1', 'card_2', 'card_3', 'card_4'] as const;
      cardFields.forEach((fieldName) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const card = (strengthsSection as any)[fieldName];
        if (card && card.title) {
          // Extract text from rich text description
          let descriptionText = '';
          if (card.description && Array.isArray(card.description)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            card.description.forEach((block: any) => {
              if (block.type === 'paragraph' && block.children) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                block.children.forEach((child: any) => {
                  if (child.text) {
                    descriptionText += child.text;
                  }
                });
              }
            });
          }
          
          strengthData.cards.push({
            title: card.title,
            description: descriptionText,
            logo: card.logo ? getStrapiImageUrl(card.logo, 'thumbnail') : null
          });
        }
      });
    }
    
    // Transform services data to match the expected format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const services = (servicesSection as any)?.services?.map((service: ServiceItem) => {
      // Extract features from description (assuming they're separated by newlines)
      const features = service.description
        ?.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim()) || [];
      
      // Map icon names to available icons
      const iconMap: Record<string, string> = {
        'Creative Design': 'palette',
        'Event Production': 'calendar',
        'Digital Marketing': 'smartphone',
        'Brand Consultation': 'users',
        'Lorem Ipsum': 'palette' // fallback for test data
      };
      
      const iconName = iconMap[service.title] || 'palette';
      
      // Define colors for different services
      const colorMap: Record<string, string> = {
        'Creative Design': 'bg-blue-500',
        'Event Production': 'bg-gold-500',
        'Digital Marketing': 'bg-blue-500',
        'Brand Consultation': 'bg-gold-600',
        'Lorem Ipsum': 'bg-blue-500'
      };
      
      const color = colorMap[service.title] || 'bg-blue-500';
      
      return {
        icon: iconName,
        title: service.title,
        subtitle: service.Subtitle || service.title,
        description: service.description?.replace(/^-\s*.*$/gm, '').trim() || '',
        features: features.length > 0 ? features : [
          "Professional Service",
          "Quality Assurance",
          "Expert Team",
          "Timely Delivery"
        ],
        color: color,
        iconImage: service.icon,
        placeholderImage: service.image_placeholder,
        iconImageProcessed: processServiceImage(service.icon),
        placeholderImageProcessed: processServiceImage(service.image_placeholder)
      };
    }) || [];

    return (
      <ServicesClient 
        services={services}
        heroSection={heroSection}
        strengthData={strengthData}
        contactSection={contactSection as ContactSectionData}
      />
    );
  } catch (error) {
    console.error('Error fetching service page data:', error);
    
    // Fallback to static data if API fails
    const fallbackServices = [
      {
        icon: "palette",
        title: "Creative Design & Branding",
        subtitle: "Brand Identity, Graphic Design, Visual Communication",
        description: "Layanan komprehensif untuk membangun brand identity yang kuat dan memorable melalui strategi kreatif yang tepat sasaran.",
        features: [
          "Brand Identity Development",
          "Logo Design & Brand Guidelines",
          "Marketing Materials Design",
          "Packaging Design",
          "Visual Communication",
          "Brand Strategy & Positioning"
        ],
        color: "bg-blue-500"
      },
      {
        icon: "calendar",
        title: "Event Production",
        subtitle: "Corporate Events, Product Launches, Conferences",
        description: "Event production yang memorable dan impactful dengan eksekusi yang sempurna dari perencanaan hingga pelaksanaan.",
        features: [
          "Event Planning & Coordination",
          "Stage Design & Decoration",
          "Event Management",
          "Audio Visual Equipment",
          "Live Streaming & Documentation",
          "Vendor Coordination"
        ],
        color: "bg-gold-500"
      },
      {
        icon: "smartphone",
        title: "Digital Marketing",
        subtitle: "Social Media, SEO, Digital Advertising, Website Development",
        description: "Strategi digital marketing yang efektif dan terukur untuk mengoptimalkan digital presence dan mencapai target audience.",
        features: [
          "Social Media Management",
          "Search Engine Optimization (SEO)",
          "Google Ads & Facebook Ads",
          "Content Marketing & Copywriting",
          "Website Development",
          "Digital Strategy & Analytics"
        ],
        color: "bg-blue-500"
      },
      {
        icon: "users",
        title: "Brand Consultation",
        subtitle: "Strategic Planning, Brand Positioning, Competitive Analysis",
        description: "Konsultasi strategis untuk membantu klien membangun brand yang kuat dengan positioning yang tepat di pasar.",
        features: [
          "Brand Positioning Strategy",
          "Competitive Analysis",
          "Market Research & Insights",
          "Brand Messaging Development",
          "Creative Strategy Planning",
          "Brand Performance Evaluation"
        ],
        color: "bg-gold-600"
      }
    ];

    return <ServicesClient services={fallbackServices} />;
  }
}