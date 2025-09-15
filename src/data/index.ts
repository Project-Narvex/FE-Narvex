// Export all data structures and utilities

// Companies data
export * from './companies';
export type { Company } from './companies';

// Projects data
export * from './projects';
export type { Project } from './projects';

// Team data
export * from './team';
export type { TeamMember } from './team';

// Blog data
export * from './blog';
export type { BlogArticle } from './blog';

// Social media data
export * from './social';
export type { SocialMediaAccount, InstagramPost } from './social';

// Centralized data access utilities
export const getAllData = async () => {
  const [companies, projects, team, blog, social] = await Promise.all([
    import('./companies'),
    import('./projects'),
    import('./team'),
    import('./blog'),
    import('./social')
  ]);
  
  return {
    companies,
    projects,
    team,
    blog,
    social
  };
};

// Search utilities across all data
export const globalSearch = (query: string) => {
  // This would be implemented with actual search logic
  // For now, returning empty structure
  const results = {
    companies: [],
    projects: [],
    team: [],
    articles: [],
    social: []
  };

  return results;
};

// Data statistics
export const getDataStats = () => {
  return {
    totalCompanies: 5, // Narvex + 4 subsidiaries
    totalProjects: 20, // Approximate from projects.ts
    totalTeamMembers: 25, // Approximate from team.ts
    totalArticles: 5, // From blog.ts
    totalSocialAccounts: 10 // From social.ts
  };
};