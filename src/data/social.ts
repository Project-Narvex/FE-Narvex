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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tech%20startup%20branding%20design%20mockup%20with%20colorful%20logo%20and%20business%20cards%20on%20clean%20white%20background%20professional%20photography&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20exhibition%20booth%20design%20construction%20behind%20the%20scenes%20with%20workers%20and%20creative%20materials%20professional%20photography&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20client%20meeting%20in%20modern%20office%20with%20brand%20presentation%20materials%20and%20smiling%20people%20professional%20photography&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20marketing%20course%20promotional%20graphic%20with%20laptop%20books%20and%20educational%20materials%20modern%20design&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=successful%20professional%20in%20modern%20office%20environment%20with%20achievement%20certificates%20and%20inspirational%20setting&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=rebranding%20announcement%20graphic%20with%20old%20and%20new%20logo%20transition%20modern%20design%20creative%20agency&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20romantic%20wedding%20ceremony%20with%20elegant%20decorations%20flowers%20and%20happy%20couple%20professional%20wedding%20photography&image_size=square',
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
    imageUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20planning%20vision%20board%20with%20photos%20fabric%20samples%20and%20inspiration%20materials%20on%20white%20background&image_size=square',
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