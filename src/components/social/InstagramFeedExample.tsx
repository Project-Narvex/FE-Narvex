'use client';

import React from 'react';
import InstagramFeed from './InstagramFeed';

/**
 * Example component demonstrating the modular InstagramFeed usage patterns
 * Perfect for CMS integration where content editors can choose between different modes
 */
const InstagramFeedExample: React.FC = () => {
  return (
    <div className="space-y-12 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Instagram Feed Component Examples
        </h1>
        
        {/* Example 1: Embed Mode - Single Post */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Embed Mode - Single Post
          </h2>
          <p className="text-gray-600 mb-6">
            Perfect for featuring a specific Instagram post. Just paste the Instagram URL.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <InstagramFeed 
              username="skywork.id"
              displayName="Featured Instagram Post"
              limit={1}
              showHeader={true}
              className="max-w-lg mx-auto"
            />
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Usage:</h3>
            <pre className="text-sm text-blue-700 overflow-x-auto">
{`<InstagramFeed 
  embedUrl="https://www.instagram.com/p/POST_ID/"
  customTitle="Featured Post"
  showHeader={true}
/>`}
            </pre>
          </div>
        </section>

        {/* Example 2: Feed Mode - User Posts Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. Feed Mode - User Posts Grid
          </h2>
          <p className="text-gray-600 mb-6">
            Display a grid of posts from a specific Instagram account.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <InstagramFeed 
              username="skywork.id"
              displayName="Skywork Indonesia"
              limit={6}
              showHeader={true}
              className=""
            />
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Usage:</h3>
            <pre className="text-sm text-green-700 overflow-x-auto">
{`<InstagramFeed 
  username="skywork.id"
  displayName="Skywork Indonesia"
  limit={6}
  showEngagement={true}
/>`}
            </pre>
          </div>
        </section>

        {/* Example 3: Auto Mode with Fallback */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Auto Mode with Fallback
          </h2>
          <p className="text-gray-600 mb-6">
            Tries to embed a specific post, falls back to feed mode if embed fails.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <InstagramFeed 
              username="gutamalearning"
              displayName="Gutama Learning"
              limit={4}
              showHeader={true}
            />
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Usage:</h3>
            <pre className="text-sm text-purple-700 overflow-x-auto">
{`<InstagramFeed 
  embedUrl="https://www.instagram.com/p/POST_ID/"
  username="gutamalearning"  // fallback
  displayName="Gutama Learning"
  mode="auto"
  customTitle="Learning Content"
/>`}
            </pre>
          </div>
        </section>

        {/* Example 4: Minimal Embed without Header */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Minimal Embed (No Header)
          </h2>
          <p className="text-gray-600 mb-6">
            Clean embed without header, perfect for content blocks.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <InstagramFeed 
              username="skywork.id"
              displayName="Skywork"
              limit={1}
              showHeader={false}
              className="max-w-md mx-auto"
            />
          </div>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">Usage:</h3>
            <pre className="text-sm text-orange-700 overflow-x-auto">
{`<InstagramFeed 
  embedUrl="https://www.instagram.com/p/POST_ID/"
  showHeader={false}
/>`}
            </pre>
          </div>
        </section>

        {/* CMS Integration Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            CMS Integration Guide
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Recommended CMS Fields:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Content Type Selection:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Radio: "Embed Single Post" / "Show User Feed"</li>
                  <li>• Mode: "embed" / "feed" / "auto"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Dynamic Fields:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Instagram URL (for embed mode)</li>
                  <li>• Username (for feed mode)</li>
                  <li>• Display Name</li>
                  <li>• Custom Title</li>
                  <li>• Post Limit (1-12)</li>
                  <li>• Show Header (toggle)</li>
                  <li>• Show Engagement (toggle)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded border-l-4 border-blue-400">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Use conditional field visibility in your CMS - show Instagram URL field only when "Embed" is selected, and username/display name fields only when "Feed" is selected.
              </p>
            </div>
          </div>
        </section>

        {/* URL Format Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Supported Instagram URL Formats
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Regular Posts:</span>
                <code className="ml-2 text-blue-600">https://www.instagram.com/p/POST_ID/</code>
              </div>
              <div>
                <span className="font-medium text-gray-700">Reels:</span>
                <code className="ml-2 text-blue-600">https://www.instagram.com/reel/REEL_ID/</code>
              </div>
              <div>
                <span className="font-medium text-gray-700">Mobile URLs:</span>
                <code className="ml-2 text-blue-600">https://instagram.com/p/POST_ID/</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InstagramFeedExample;

/**
 * Component Props Reference:
 * 
 * embedUrl?: string          - Instagram post/reel URL for embed mode
 * username?: string          - Instagram username for feed mode
 * displayName?: string       - Display name for the account
 * limit?: number            - Number of posts to show (feed mode)
 * showHeader?: boolean      - Show/hide component header
 * className?: string        - Additional CSS classes
 * mode?: 'embed'|'feed'|'auto' - Component mode
 * customTitle?: string      - Custom title override
 * showEngagement?: boolean  - Show/hide likes and comments
 */