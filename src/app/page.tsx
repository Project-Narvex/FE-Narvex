// src/app/page.tsx

// Import your new client component
import HomeClient from '@/components/pages/home/home-client';

// Import Strapi API functions
import { strapi, transformStrapiEntity, getStrapiImageUrl, transformHomepageComponent } from '@/lib/strapi';
import type { 
  HomepageData, 
  HeroSection, 
  CompanyHighlight, 
  ServiceHighlight, 
  ProjectHighlight, 
  TestimonialCarousel, 
  ArticleSection,
  ContactSection,
  CollaborationSection 
} from '@/lib/strapi';

// Fallback data in case API fails
import { getRecentArticles } from '@/data/blog';
import { projects } from '@/data/projects';
import { teamMembers } from '@/data/team';
import { clientLogos } from '@/data/clients';

// This is now an async Server Component
export default async function Home() {
  try {
    // Fetch homepage data from Strapi
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const strapiResponse = await strapi.getHomepage() as any;
    
    // Check if response exists
    if (!strapiResponse) {
      console.log('No homepage data found in Strapi response, falling back to static data');
      throw new Error('No homepage data available');
    }
    
    // Handle different response structures
    let homepageEntity;
    if (strapiResponse.data) {
      // Standard Strapi v4 response with data wrapper
      homepageEntity = Array.isArray(strapiResponse.data) ? strapiResponse.data[0] : strapiResponse.data;
    } else if (strapiResponse.id) {
      // Direct response without data wrapper (like our example JSON)
      homepageEntity = strapiResponse;
    } else {
      throw new Error('Invalid Strapi response structure');
    }
    
    if (homepageEntity) {
      let homepageData: HomepageData;
      
      // Check if entity has Strapi v4 structure (id + attributes) or direct structure
      if (homepageEntity.id && homepageEntity.attributes) {
        // Standard Strapi v4 structure
        homepageData = transformStrapiEntity<HomepageData>(homepageEntity);
      } else if (homepageEntity.pageContent || homepageEntity.id) {
        // Direct structure (like our example JSON)
        homepageData = homepageEntity as HomepageData;
      } else {
        console.log('Invalid homepage entity structure:', homepageEntity);
        throw new Error('Invalid homepage entity structure');
      }
      
      // Check if pageContent exists before transforming
      if (!homepageData.pageContent || !Array.isArray(homepageData.pageContent)) {
        console.log('No pageContent found or invalid format, falling back to static data');
        console.log('Available properties:', Object.keys(homepageData));
        throw new Error('Invalid pageContent structure');
      }
      
      // Transform all components
      const transformedComponents = homepageData.pageContent.map(component => 
        transformHomepageComponent(component)
      );
      
      // Extract specific sections
      const heroSection = transformedComponents.find(c => c.__component === 'sections.hero-section') as HeroSection;
      const companySection = transformedComponents.find(c => c.__component === 'components.company-highlights') as CompanyHighlight;
      const serviceSection = transformedComponents.find(c => c.__component === 'components.service-highlight') as ServiceHighlight;
      const projectSection = transformedComponents.find(c => c.__component === 'sections.project-highlights') as ProjectHighlight;
      const testimonialSection = transformedComponents.find(c => c.__component === 'sections.testimonial-carousel') as TestimonialCarousel;
      const articleSection = transformedComponents.find(c => c.__component === 'sections.article') as ArticleSection;
      const contactSection = transformedComponents.find(c => c.__component === 'sections.contact') as ContactSection;
      const collaborationSection = transformedComponents.find(c => c.__component === 'sections.collaboration') as CollaborationSection;
      
      // Helper function to map blog categories to valid types
      const mapBlogCategory = (categoryName: string | null | undefined): 'company-updates' | 'industry-insights' | 'project-stories' | 'tips-tricks' | 'company-news' => {
        switch (categoryName) {
          case 'Aman':
            return 'company-updates';
          case 'Romance':
            return 'industry-insights';
          case 'Adventure':
            return 'project-stories';
          case 'Tips':
            return 'tips-tricks';
          case 'News':
            return 'company-news';
          default:
            return 'company-updates';
        }
      };

      // Transform data for client component
      const apiRecentArticles = articleSection?.blog_articles?.map(article => ({
        id: article.id.toString(),
        title: article.title,
        slug: article.slug,
        excerpt: article.content ? article.content.slice(0, 150) + '...' : 'Artikel menarik dari Narvex...',
        category: mapBlogCategory(article.blog_category?.name),
        author: 'Narvex Team',
        publishDate: article.createdAt,
        lastModified: article.updatedAt,
        readTime: '5 min read',
        tags: article.tags?.map(tag => tag.name) || [],
        featured: false,
        published: !!article.publishedAt, // Convert to boolean
        views: 0,
        likes: 0,
        // Add featured image from cover
        featuredImage: article.cover ? {
          url: article.cover.url,
          formats: article.cover.formats,
          alternativeText: article.cover.alternativeText || article.title,
          width: article.cover.width,
          height: article.cover.height
        } : undefined
      })) || [];

      // Helper function to map project categories to valid types
      const mapProjectCategory = (categoryName: string | null | undefined): 'exhibition' | 'booth' | 'activation' | 'tour' | 'corporate' | 'creative' | 'education' | 'wedding' => {
        switch (categoryName) {
          case 'Fun':
            return 'creative';
          case 'Party':
            return 'activation';
          case 'Exhibition':
            return 'exhibition';
          case 'Booth':
            return 'booth';
          case 'Tour':
            return 'tour';
          case 'Corporate':
            return 'corporate';
          case 'Education':
            return 'education';
          case 'Wedding':
            return 'wedding';
          default:
            return 'creative';
        }
      };

      const apiProjects = projectSection?.featuredProjects?.map(project => ({
        id: project.id.toString(),
        title: project.title,
        slug: project.slug,
        category: mapProjectCategory(project.portfolio_categories?.[0]?.name),
        companyId: 'narvex-main', // Default company ID as required by interface
        client: 'Various Clients',
        location: 'Indonesia',
        date: project.date || project.createdAt,
        year: new Date(project.date || project.createdAt).getFullYear(),
        description: project.excerpt,
        longDescription: project.excerpt,
        services: project.portfolio_categories?.map(cat => cat.name) || [],
        images: project.gallery ? project.gallery.map(img => getStrapiImageUrl(img, 'medium')) : [getStrapiImageUrl(project.cover, 'medium')],
        tags: project.portfolio_categories?.map(cat => cat.name) || [],
        featured: project.Highlight || false,
        status: 'completed' as const
      })) || [];

      const apiTestimonials = testimonialSection?.selected_testimonials?.map(testimonial => ({
        id: testimonial.id.toString(),
        name: testimonial.clientName,
        company: testimonial.companyName,
        position: testimonial.clientTitle,
        avatar: testimonial.avatar ? getStrapiImageUrl(testimonial.avatar, 'thumbnail') : '/placeholder-avatar.jpg',
        quote: testimonial.content,
        rating: testimonial.rating || 5,
      })) || [];

      const apiClients = testimonialSection?.clients?.map(client => ({
        id: client.id.toString(),
        name: client.name,
        logo: client.logo,
        website: client.website,
        category: 'Client'
      })) || [];

      // Render with API data
      return (
        <HomeClient 
          homepageData={{
            heroSection,
            companySection,
            serviceSection,
            projectSection,
            testimonialSection,
            articleSection,
            contactSection,
            collaborationSection
          }}
          recentArticles={apiRecentArticles}
          defaultProjects={apiProjects}
          defaultTestimonials={apiTestimonials}
          defaultClients={apiClients}
        />
      );
    }
  } catch (error) {
    console.error('Error fetching homepage data from Strapi:', error);
  }

  // Fallback data in case API fails
  const fallbackRecentArticles = getRecentArticles(4);
  const fallbackProjects = projects;
  const fallbackClients = clientLogos;
  
  const fallbackTestimonials = teamMembers.slice(0, 4).map(member => ({
    id: member.id,
    name: member.name,
    company: member.companyId,
    position: member.position,
    avatar: member.avatar,
    quote: `"${member.bio}"`,
    rating: 5,
    project: 'Team Member Testimonial'
  }));

  // Render with fallback data
  return (
    <HomeClient 
      recentArticles={fallbackRecentArticles}
      defaultProjects={fallbackProjects}
      defaultTestimonials={fallbackTestimonials}
      defaultClients={fallbackClients}
    />
  );
}