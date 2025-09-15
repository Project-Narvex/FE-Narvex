'use client';

import React from 'react';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { getSocialAccountsByCompany } from '@/data/social';

interface SocialMediaGridProps {
  companyId: string;
  title?: string;
  showFollowerCount?: boolean;
  layout?: 'grid' | 'horizontal' | 'vertical';
  className?: string;
}

const SocialMediaGrid: React.FC<SocialMediaGridProps> = ({
  companyId,
  title,
  showFollowerCount = true,
  layout = 'grid',
  className = ''
}) => {
  const socialAccounts = getSocialAccountsByCompany(companyId);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6" />;
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      default:
        return <ExternalLink className="w-6 h-6" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700';
      case 'facebook':
        return 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
      case 'linkedin':
        return 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      case 'twitter':
        return 'from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600';
      case 'youtube':
        return 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700';
      default:
        return 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
    }
  };

  const formatFollowerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (socialAccounts.length === 0) {
    return (
      <div className={`${className}`}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        <p className="text-gray-500 text-center py-4">No social media accounts available</p>
      </div>
    );
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'vertical':
        return 'flex flex-col gap-3';
      case 'grid':
      default:
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    }
  };

  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      )}
      
      <div className={getLayoutClasses()}>
        {socialAccounts.map((account) => (
          <a
            key={account.id}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${getPlatformColor(account.platform)} p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  {getPlatformIcon(account.platform)}
                </div>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  {account.displayName}
                </h4>
                <p className="text-xs opacity-90 mb-2">
                  @{account.username}
                </p>
                
                {showFollowerCount && account.followerCount && (
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">
                      {formatFollowerCount(account.followerCount)}
                    </span>
                    <span className="text-xs opacity-80">followers</span>
                  </div>
                )}
                
                {account.description && (
                  <p className="text-xs opacity-80 mt-2 line-clamp-2">
                    {account.description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        ))}
      </div>
      
      {/* Total followers summary */}
      {showFollowerCount && socialAccounts.length > 1 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Social Media Reach</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatFollowerCount(
                socialAccounts.reduce((total, account) => total + (account.followerCount || 0), 0)
              )}
            </p>
            <p className="text-xs text-gray-500">combined followers</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaGrid;