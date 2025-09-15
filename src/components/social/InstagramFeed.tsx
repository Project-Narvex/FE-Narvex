'use client';

import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { getInstagramPostsByUsername, InstagramPost } from '@/data/social';

interface InstagramFeedProps {
  username: string;
  displayName: string;
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({
  username,
  displayName,
  limit = 6,
  showHeader = true,
  className = ''
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const instagramPosts = getInstagramPostsByUsername(username, limit);
        setPosts(instagramPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load Instagram posts');
        console.error('Instagram feed error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username, limit]);

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const truncateCaption = (caption: string, maxLength: number = 100): string => {
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-6">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
          </div>
        )}
        <div className="text-center py-8">
          <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{error}</p>
          <p className="text-sm text-gray-400 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`${className}`}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-6">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
          </div>
        )}
        <div className="text-center py-8">
          <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No posts available</p>
          <a 
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 mt-2"
          >
            Visit @{username} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Instagram className="w-8 h-8 text-pink-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
              <p className="text-gray-600">@{username}</p>
            </div>
          </div>
          <a 
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
          >
            Follow <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={post.imageUrl} 
                alt={truncateCaption(post.caption, 50)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {truncateCaption(post.caption, 80)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Post info */}
            <div className="mt-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {truncateCaption(post.caption, 60)}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(post.timestamp)}
                </span>
                <a 
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-500 hover:text-pink-600 flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View more link */}
      <div className="text-center mt-6">
        <a 
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
        >
          View More on Instagram <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;