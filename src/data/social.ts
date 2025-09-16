export interface SocialMediaAccount {
  id: string;
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok';
  username: string;
  displayName: string;
  url: string;
  companyId: string;
  isActive: boolean;
  followerCount?: number;
  description?: string;
  profileImage?: string;
}

export interface InstagramPost {
  id: string;
  username: string;
  caption: string;
  imageUrl: string;
  postUrl: string;
  timestamp: string;
  likes: number;
  comments: number;
  hashtags: string[];
  type: 'image' | 'video' | 'carousel';
}

export const socialMediaAccounts: SocialMediaAccount[] = [
  // Narvex Social Media
  {
    id: 'narvex-instagram',
    platform: 'instagram',
    username: 'narvex.id',
    displayName: 'Narvex Indonesia',
    url: 'https://instagram.com/narvex.id',
    companyId: 'narvex',
    isActive: true,
    followerCount: 2500,
    description: 'Your Trusted MICE Partner in Indonesia 🇮🇩',
    profileImage: '/images/social/narvex-profile.jpg'
  },
  {
    id: 'narvex-linkedin',
    platform: 'linkedin',
    username: 'narvex-indonesia',
    displayName: 'Narvex Indonesia',
    url: 'https://linkedin.com/company/narvex-indonesia',
    companyId: 'narvex',
    isActive: true,
    followerCount: 1200,
    description: 'Professional MICE Services & Event Management'
  },
  
  // Skywork.id Social Media
  {
    id: 'skywork-instagram',
    platform: 'instagram',
    username: 'skywork.id',
    displayName: 'Skywork Indonesia',
    url: 'https://instagram.com/skywork.id',
    companyId: 'skywork',
    isActive: true,
    followerCount: 15000,
    description: 'Bekerja dengan Seni 🎨 Creative Solutions for Your Business',
    profileImage: '/images/social/skywork-profile.jpg'
  },
  {
    id: 'skywork-linkedin',
    platform: 'linkedin',
    username: 'skywork-indonesia',
    displayName: 'Skywork Indonesia',
    url: 'https://linkedin.com/company/skywork-indonesia',
    companyId: 'skywork',
    isActive: true,
    followerCount: 3500
  },
  
  // Gutama Learning Social Media
  {
    id: 'gutama-instagram',
    platform: 'instagram',
    username: 'gutamalearning',
    displayName: 'Gutama Learning',
    url: 'https://instagram.com/gutamalearning',
    companyId: 'gutama',
    isActive: true,
    followerCount: 8500,
    description: 'Educational Excellence & Professional Development 📚',
    profileImage: '/images/social/gutama-profile.jpg'
  },
  {
    id: 'gutama-youtube',
    platform: 'youtube',
    username: 'gutamalearning',
    displayName: 'Gutama Learning',
    url: 'https://youtube.com/@gutamalearning',
    companyId: 'gutama',
    isActive: true,
    followerCount: 5200
  },
  
  // CreativeWork Social Media
  {
    id: 'creativesky-instagram',
    platform: 'instagram',
    username: 'creativesky.id',
    displayName: 'CreativeSky (Transitioning to CreativeWork)',
    url: 'https://instagram.com/creativesky.id',
    companyId: 'creativework',
    isActive: true,
    followerCount: 6800,
    description: '🔄 Rebranding to CreativeWork | Creative Design Solutions',
    profileImage: '/images/social/creativesky-profile.jpg'
  },
  {
    id: 'creativework-instagram',
    platform: 'instagram',
    username: 'creativework.id',
    displayName: 'CreativeWork',
    url: 'https://instagram.com/creativework.id',
    companyId: 'creativework',
    isActive: false, // New account, not yet active
    followerCount: 150,
    description: 'Creative Design & Branding Solutions 🎨'
  },
  
  // Evervow.wo Social Media
  {
    id: 'evervow-instagram',
    platform: 'instagram',
    username: 'evervow.wo',
    displayName: 'Evervow Wedding Organizer',
    url: 'https://instagram.com/evervow.wo',
    companyId: 'evervow',
    isActive: true,
    followerCount: 12000,
    description: 'Creating Magical Wedding Moments 💕 Your Dream Wedding Partner',
    profileImage: '/images/social/evervow-profile.jpg'
  },
  {
    id: 'evervow-tiktok',
    platform: 'tiktok',
    username: 'evervow.wo',
    displayName: 'Evervow Wedding',
    url: 'https://tiktok.com/@evervow.wo',
    companyId: 'evervow',
    isActive: true,
    followerCount: 25000
  }
];

// Mock Instagram posts data
export const instagramPosts: InstagramPost[] = [
  // Skywork.id posts
  {
    id: 'skywork-post-1',
    username: 'skywork.id',
    caption: 'Bekerja dengan Seni 🎨 Latest branding project for tech startup. Swipe to see the creative process! #BekerjaDenganSeni #BrandingDesign #CreativeSolutions',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/skywork1',
    timestamp: '2024-01-14T10:30:00Z',
    likes: 245,
    comments: 18,
    hashtags: ['BekerjaDenganSeni', 'BrandingDesign', 'CreativeSolutions'],
    type: 'carousel'
  },
  {
    id: 'skywork-post-2',
    username: 'skywork.id',
    caption: 'Behind the scenes of our latest exhibition booth design 📐 From concept to reality! #ExhibitionDesign #CreativeProcess #Skywork',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/skywork2',
    timestamp: '2024-01-12T14:15:00Z',
    likes: 189,
    comments: 12,
    hashtags: ['ExhibitionDesign', 'CreativeProcess', 'Skywork'],
    type: 'image'
  },
  {
    id: 'skywork-post-3',
    username: 'skywork.id',
    caption: 'Client appreciation post! 🙏 Thank you for trusting us with your brand identity. #ClientLove #BrandIdentity #Grateful',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/skywork3',
    timestamp: '2024-01-10T09:45:00Z',
    likes: 156,
    comments: 8,
    hashtags: ['ClientLove', 'BrandIdentity', 'Grateful'],
    type: 'image'
  },
  
  // Gutama Learning posts
  {
    id: 'gutama-post-1',
    username: 'gutamalearning',
    caption: 'New course alert! 📚 Professional Development in Digital Marketing. Early bird discount available! #DigitalMarketing #ProfessionalDevelopment #Learning',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/gutama1',
    timestamp: '2024-01-13T16:20:00Z',
    likes: 134,
    comments: 15,
    hashtags: ['DigitalMarketing', 'ProfessionalDevelopment', 'Learning'],
    type: 'image'
  },
  {
    id: 'gutama-post-2',
    username: 'gutamalearning',
    caption: 'Success story from our alumni! 🌟 From student to industry leader. Your journey starts here! #SuccessStory #Alumni #Inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/gutama2',
    timestamp: '2024-01-11T11:30:00Z',
    likes: 98,
    comments: 7,
    hashtags: ['SuccessStory', 'Alumni', 'Inspiration'],
    type: 'image'
  },
  
  // CreativeSky (transitioning) posts
  {
    id: 'creativesky-post-1',
    username: 'creativesky.id',
    caption: '🔄 Big announcement! We\'re rebranding to CreativeWork! Same great service, fresh new identity. Stay tuned! #Rebranding #CreativeWork #NewBeginnings',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/creativesky1',
    timestamp: '2024-01-09T13:00:00Z',
    likes: 167,
    comments: 23,
    hashtags: ['Rebranding', 'CreativeWork', 'NewBeginnings'],
    type: 'image'
  },
  
  // Evervow.wo posts
  {
    id: 'evervow-post-1',
    username: 'evervow.wo',
    caption: 'Magical moments from Sarah & David\'s wedding 💕 Every detail crafted with love. Your dream wedding awaits! #WeddingMagic #DreamWedding #Love',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/evervow1',
    timestamp: '2024-01-15T18:45:00Z',
    likes: 456,
    comments: 34,
    hashtags: ['WeddingMagic', 'DreamWedding', 'Love'],
    type: 'carousel'
  },
  {
    id: 'evervow-post-2',
    username: 'evervow.wo',
    caption: 'Wedding planning tip: Start with your vision board! 📌 Let us help bring your dreams to life. #WeddingTips #VisionBoard #WeddingPlanning',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop&crop=center',
    postUrl: 'https://instagram.com/p/evervow2',
    timestamp: '2024-01-13T12:15:00Z',
    likes: 289,
    comments: 19,
    hashtags: ['WeddingTips', 'VisionBoard', 'WeddingPlanning'],
    type: 'image'
  }
];

export const getSocialAccountsByCompany = (companyId: string): SocialMediaAccount[] => {
  return socialMediaAccounts.filter(account => account.companyId === companyId && account.isActive);
};

export const getInstagramPostsByUsername = (username: string, limit: number = 6): InstagramPost[] => {
  return instagramPosts
    .filter(post => post.username === username)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getAllInstagramPosts = (limit: number = 12): InstagramPost[] => {
  return instagramPosts
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getSocialAccountByPlatform = (companyId: string, platform: string): SocialMediaAccount | undefined => {
  return socialMediaAccounts.find(account => 
    account.companyId === companyId && 
    account.platform === platform && 
    account.isActive
  );
};

export const getActiveSocialAccounts = (): SocialMediaAccount[] => {
  return socialMediaAccounts.filter(account => account.isActive);
};

export const getTotalFollowers = (companyId?: string): number => {
  const accounts = companyId 
    ? socialMediaAccounts.filter(account => account.companyId === companyId && account.isActive)
    : socialMediaAccounts.filter(account => account.isActive);
  
  return accounts.reduce((total, account) => total + (account.followerCount || 0), 0);
};

// Social media integration utilities
export const formatInstagramUrl = (username: string): string => {
  return `https://instagram.com/${username}`;
};

export const formatHashtags = (hashtags: string[]): string => {
  return hashtags.map(tag => `#${tag}`).join(' ');
};

export const getEngagementRate = (post: InstagramPost): number => {
  // Simple engagement rate calculation (likes + comments) / estimated reach
  // This is a simplified calculation for demo purposes
  const totalEngagement = post.likes + post.comments;
  const estimatedReach = post.likes * 10; // Rough estimate
  return (totalEngagement / estimatedReach) * 100;
};