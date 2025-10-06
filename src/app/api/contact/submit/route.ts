import { NextRequest, NextResponse } from 'next/server';
import { StrapiContentService } from '@/lib/strapi/content';
import { transformContactMessageData } from '@/lib/contact-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'budget', 'timeline', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Transform form data to match Strapi API format
    const contactData = transformContactMessageData(body);
    
    console.log('Contact form submission:', contactData);
    
    try {
      // Try to submit to Strapi first
      const strapiService = new StrapiContentService();
      const result = await strapiService.submitContactMessage(contactData);
      
      return NextResponse.json({
        success: true,
        message: 'Contact message submitted successfully to Strapi',
        data: result
      });
      
    } catch (strapiError) {
      console.warn('Strapi submission failed, using fallback:', strapiError);
      
      // Fallback: Log the submission and return success
      // In production, you might want to store this in a database or send email
      console.log('Contact form submission (fallback):', {
        ...contactData,
        submittedAt: new Date().toISOString(),
        status: 'received',
        source: 'fallback'
      });
      
      return NextResponse.json({
        success: true,
        message: 'Contact message received successfully (Strapi unavailable)',
        data: {
          id: Date.now(),
          ...contactData,
          submittedAt: new Date().toISOString(),
          status: 'received',
          source: 'fallback'
        }
      });
    }
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to submit contact message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
