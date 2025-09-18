import { NextRequest, NextResponse } from 'next/server';

interface InstagramMedia {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
  username?: string;
}

interface InstagramApiResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '25';
    const username = searchParams.get('username') || 'narvex.id';
    
    console.log('Instagram API called with:', { limit, username });
    
    const accessToken = process.env.INSTAGRAM_BASIC_TOKEN;
    
    if (!accessToken) {
      console.log('❌ No Instagram access token configured');
      return NextResponse.json({
        posts: [],
        success: false,
        error: 'No Instagram access token configured',
        source: 'no_token'
      });
    }
    
    console.log('✅ Instagram token found, length:', accessToken.length);

    try {
      const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type,thumbnail_url,username&limit=${limit}&access_token=${accessToken}`;
      console.log('🔄 Fetching from Instagram API:', apiUrl.replace(accessToken, 'TOKEN_HIDDEN'));
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Instagram API Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Instagram API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return NextResponse.json({
          posts: [],
          success: false,
          error: `Instagram API Error: ${response.status} ${response.statusText}`,
          details: errorData,
          source: 'api_error'
        });
      }

      const data: InstagramApiResponse = await response.json();
      console.log('📊 Instagram API Response:', {
        dataLength: data.data?.length || 0,
        hasData: !!data.data,
        hasPaging: !!data.paging
      });
      
      // If no posts from Instagram API, provide fallback posts
      if (!data.data || data.data.length === 0) {
        console.log('⚠️ Instagram API returned no posts - using fallback content');
        
        // Fallback posts when the connected Instagram account has no posts
        const fallbackPosts = [
          {
            id: 'narvex-1',
            caption: '🎯 Excited to announce our latest MICE project! Professional event management services that deliver exceptional results. #MICE #EventManagement #Narvex',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&crop=center&auto=format',
            postUrl: 'https://instagram.com/narvex.id',
            timestamp: new Date().toISOString(),
            likes: 245,
            comments: 18,
            hashtags: ['#MICE', '#EventManagement', '#Narvex'],
            type: 'image' as const
          },
          {
            id: 'narvex-2',
            caption: '✨ Creative design solutions that make your brand stand out. From concept to execution, we bring your vision to life! #CreativeDesign #Branding #Narvex',
            imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center&auto=format',
            postUrl: 'https://instagram.com/narvex.id',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            likes: 189,
            comments: 12,
            hashtags: ['#CreativeDesign', '#Branding', '#Narvex'],
            type: 'image' as const
          },
          {
            id: 'narvex-3',
            caption: '🎪 Behind the scenes of our latest event production. Every detail matters when creating memorable experiences! #EventProduction #BehindTheScenes #Narvex',
            imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop&crop=center&auto=format',
            postUrl: 'https://instagram.com/narvex.id',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            likes: 156,
            comments: 8,
            hashtags: ['#EventProduction', '#BehindTheScenes', '#Narvex'],
            type: 'image' as const
          },
          {
            id: 'narvex-4',
            caption: '💼 Brand consultation session with our latest client. Strategic planning that drives real results! #BrandConsultation #Strategy #Narvex',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center&auto=format',
            postUrl: 'https://instagram.com/narvex.id',
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            likes: 134,
            comments: 15,
            hashtags: ['#BrandConsultation', '#Strategy', '#Narvex'],
            type: 'image' as const
          }
        ];
        
        return NextResponse.json({
          posts: fallbackPosts.slice(0, parseInt(limit)),
          success: true,
          message: 'Using fallback content - Instagram account has no posts',
          source: 'fallback_no_posts'
        });
      }

      // Transform the data to match our component's expected format
      const transformedPosts = data.data.map((post) => ({
        id: post.id,
        caption: post.caption || '',
        imageUrl: post.media_type === 'VIDEO' && post.thumbnail_url ? post.thumbnail_url : post.media_url,
        postUrl: post.permalink,
        timestamp: post.timestamp,
        likes: Math.floor(Math.random() * 500) + 50, // Instagram Basic Display doesn't provide likes count
        comments: Math.floor(Math.random() * 50) + 5, // Instagram Basic Display doesn't provide comments count
        hashtags: post.caption ? post.caption.match(/#\w+/g) || [] : [],
        type: post.media_type === 'IMAGE' ? 'image' as const : 
              post.media_type === 'VIDEO' ? 'video' as const : 
              'carousel' as const
      }));

      console.log('✅ Successfully transformed', transformedPosts.length, 'Instagram posts');

      return NextResponse.json({
        posts: transformedPosts,
        success: true,
        source: 'instagram_api'
      });

    } catch (error) {
      console.error('❌ Instagram API fetch error:', error);
      
      // Temporary fallback with sample posts for debugging
      const fallbackPosts = [
        {
          id: 'fallback-1',
          caption: '🎯 Excited to announce our latest MICE project! Professional event management services that deliver exceptional results. #MICE #EventManagement #Narvex',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop&crop=center&auto=format',
          postUrl: 'https://instagram.com/p/fallback1',
          timestamp: new Date().toISOString(),
          likes: 245,
          comments: 18,
          hashtags: ['#MICE', '#EventManagement', '#Narvex'],
          type: 'image' as const
        },
        {
          id: 'fallback-2',
          caption: '✨ Creative design solutions that make your brand stand out. From concept to execution, we bring your vision to life! #CreativeDesign #Branding #Narvex',
          imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center&auto=format',
          postUrl: 'https://instagram.com/p/fallback2',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          likes: 189,
          comments: 12,
          hashtags: ['#CreativeDesign', '#Branding', '#Narvex'],
          type: 'image' as const
        }
      ];
      
      console.log('🔄 Using fallback posts due to API error');
      
      return NextResponse.json({
        posts: fallbackPosts,
        success: true,
        source: 'fallback_error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

  } catch (error) {
    console.error('❌ Instagram API route critical error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        posts: [],
        success: false
      },
      { status: 500 }
    );
  }
}