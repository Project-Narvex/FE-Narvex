// src/app/page.tsx

// Import your new client component
import HomeClient from '@/components/pages/home/home-client';

// Import homepage data reader
import { getHomepageData } from '@/lib/homepage-data';

// Import your data-fetching functions and data arrays as fallback
import { getRecentArticles } from '@/data/blog';
import { projects } from '@/data/projects';
import { teamMembers } from '@/data/team';
import { clientLogos } from '@/data/clients';

// This is now an async Server Component
export default async function Home() {
  // Fetch homepage data from Strapi API
  const homepageData = await getHomepageData();
  
  // Log the data for debugging
  console.log('🏠 Homepage data received:', {
    hasData: !!homepageData,
    dataId: homepageData?.id,
    pageContentCount: homepageData?.pageContent?.length || 0
  });
  
  // If no data from API, show error message
  if (!homepageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Homepage Data
          </h1>
          <p className="text-gray-600 mb-4">
            There was an error fetching data from the API. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  // Fallback data
  const recentArticles = getRecentArticles(4);
  const defaultProjects = projects;
  const defaultClients = clientLogos;
  
  // Create your testimonial data
  const defaultTestimonials = teamMembers.slice(0, 4).map(member => ({
    id: member.id,
    name: member.name,
    company: member.companyId,
    position: member.position,
    avatar: member.avatar,
    quote: member.bio,
    rating: 5,
  }));

  // Render the client component and pass the data down
  return (
    <HomeClient 
      homepageData={homepageData || null}
      recentArticles={recentArticles}
      defaultProjects={defaultProjects}
      defaultTestimonials={defaultTestimonials}
      defaultClients={defaultClients}
    />
  );
}