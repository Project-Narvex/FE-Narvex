// src/app/page.tsx

// Import your new client component
import HomeClient from '@/components/pages/home/home-client';

// Import your data-fetching functions and data arrays
import { getRecentArticles } from '@/data/blog';
import { projects } from '@/data/projects';
import { teamMembers } from '@/data/team';
import { clientLogos } from '@/data/clients';

// This is now an async Server Component
export default async function Home() {
  // Fetch data directly on the server
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
      recentArticles={recentArticles}
      defaultProjects={defaultProjects}
      defaultTestimonials={defaultTestimonials}
      defaultClients={defaultClients}
    />
  );
}