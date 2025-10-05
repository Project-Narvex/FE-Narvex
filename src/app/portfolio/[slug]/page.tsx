import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { strapi, PortfolioItem, getStrapiImageUrl } from '@/lib/strapi';

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  // Await params in Next.js 15
  const { slug } = await params;
  
  let project: Project | null = null;
  let portfolioItem: PortfolioItem | null = null;
  
  try {
    // First try to fetch from Strapi API
    const portfolioResponse = await strapi.getPortfolios({
      populate: ['cover', 'gallery', 'portfolio_categories', 'company', 'client', 'services'],
      filters: { slug: { $eq: slug } }
    });
    
    if (portfolioResponse.data && portfolioResponse.data.length > 0) {
      portfolioItem = portfolioResponse.data[0];
      
      // Transform Strapi data to Project format
      project = {
        id: portfolioItem.id.toString(),
        title: portfolioItem.title,
        slug: portfolioItem.slug,
        category: portfolioItem.portfolio_categories?.[0]?.name?.toLowerCase() as any || 'creative',
        companyId: portfolioItem.company?.slug || 'narvex-main',
        client: portfolioItem.client?.name || 'Unknown Client',
        location: portfolioItem.company?.address ? 
          `${portfolioItem.company.address.city}, ${portfolioItem.company.address.province}` : 
          'Unknown Location',
        date: portfolioItem.date || new Date(portfolioItem.createdAt).getFullYear().toString(),
        year: portfolioItem.date ? parseInt(portfolioItem.date.split('-')[0]) : new Date(portfolioItem.createdAt).getFullYear(),
        description: portfolioItem.excerpt,
        longDescription: portfolioItem.excerpt,
        services: portfolioItem.services?.map(service => service.title) || [],
        images: portfolioItem.gallery?.map(img => getStrapiImageUrl(img, 'medium')) || [],
        gallery: portfolioItem.gallery?.map(img => getStrapiImageUrl(img, 'large')) || [],
        tags: portfolioItem.portfolio_categories?.map(cat => cat.name) || [],
        results: {},
        featured: portfolioItem.Highlight || false,
        status: 'completed' as const,
        budget: '',
        duration: '',
        teamSize: 0,
        cover: portfolioItem.cover,
        linkURL: portfolioItem.linkURL
      };
    }
  } catch (error) {
    console.error('Error fetching portfolio from Strapi:', error);
  }
  
  // Fallback to local data if Strapi fails
  if (!project) {
    project = projects.find(p => p.slug === slug) || null;
  }
  
  if (!project) {
    notFound();
  }
  
  // Find related projects (using local data for now)
  const relatedProjects = project.relatedProjects 
    ? project.relatedProjects
        .map(id => projects.find(p => p.id === id))
        .filter(Boolean) as Project[]
    : [];
  
  // Find previous and next projects
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Project Not Found</h1>
          <p className="text-gray-500 mb-6">The portfolio item you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/portfolio" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery || project.images || [];
  const heroImage = portfolioItem?.cover ? getStrapiImageUrl(portfolioItem.cover, 'large') : galleryImages[0] || null;

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Enhanced Navigation Bar - Consistent with Main Header */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-700 overflow-hidden">
                <Link href="/" className="font-medium hover:text-gold-500 transition-colors duration-200 whitespace-nowrap">Home</Link>
                <span className="text-gray-400">/</span>
                <Link href="/portfolio" className="font-medium hover:text-gold-500 transition-colors duration-200 whitespace-nowrap">Portfolio</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gold-500 font-medium truncate max-w-[150px] sm:max-w-none" title={project.title}>
                  {project.title}
                </span>
              </div>
              <Link 
                href="/portfolio" 
                className="text-gray-700 hover:text-gold-500 font-medium transition-colors duration-200 whitespace-nowrap text-sm lg:text-base flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Portfolio</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {project.featured && (
                <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Award className="w-4 h-4 mr-2" />
                  Featured Project
                </div>
              )}
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{project.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{project.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  project.status === 'completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {project.longDescription || project.description}
              </p>
              
              {/* Hero Image - Direct Next.js Image */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-12">
                <ImageWithFallback
                  src={heroImage || '/placeholder-image.jpg'}
                  alt={`${project.title} - Portfolio showcase image`}
                  className="w-full h-64 sm:h-80 lg:h-96"
                  fallbackText={project.title}
                  category={project.category}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rich Content Area */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none">
                  {/* Rich text content blocks - CMS friendly */}
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {project.longDescription ? (
                      <div dangerouslySetInnerHTML={{ __html: project.longDescription.replace(/\n/g, '<br>') }} />
                    ) : (
                      <p>{project.description}</p>
                    )}
                    
                    {/* Additional rich content blocks can be added here */}
                    {project.objectives && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Objectives</h3>
                        <ul className="space-y-2">
                          {project.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.challenges && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Challenges</h3>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.solutions && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Solutions</h3>
                        <ul className="space-y-2">
                          {project.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Services */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Provided</h3>
                  <div className="space-y-3">
                    {project.services.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  {project.technologies && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Duration</span>
                      <p className="text-gray-700 font-medium">{project.duration || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Team Size</span>
                      <p className="text-gray-700 font-medium">{project.teamSize || 'N/A'} members</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Category</span>
                      <p className="text-gray-700 font-medium capitalize">{project.category}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Company</span>
                      <p className="text-gray-700 font-medium capitalize">{project.companyId}</p>
                    </div>
                  </div>
                </div>
                
                {/* Results */}
                {project.results && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
                    <div className="space-y-3">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-white rounded border">
                          <div className="text-xl font-bold text-blue-600 mb-1">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        {project.timeline && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Timeline</h2>
                
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="space-y-6">
                    {project.timeline.map((phase, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0 ${
                          phase.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                            <span className="text-sm text-gray-500">{phase.date}</span>
                          </div>
                          <p className="text-gray-700">{phase.description}</p>
                          {phase.completed && (
                            <div className="flex items-center mt-2 text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span className="text-sm font-medium">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {project.testimonials && project.testimonials.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Client Testimonial</h2>
                
                <div className="bg-gray-50 rounded-lg p-8">
                  {project.testimonials.slice(0, 1).map((testimonial, index) => (
                    <div key={index}>
                      <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full mr-4 overflow-hidden bg-gray-200 flex-shrink-0">
                          {testimonial.avatar ? (
                            <ImageWithFallback
                              src={testimonial.avatar}
                              alt={`${testimonial.name} - Client testimonial`}
                              className="w-full h-full"
                              fallbackText={testimonial.name.charAt(0)}
                              width={48}
                              height={48}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-lg">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Deliverables */}
        {project.deliverables && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Deliverables</h2>
                
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedProjects.slice(0, 2).map((relatedProject) => (
                    <Link key={relatedProject.id} href={`/portfolio/${relatedProject.slug}`}>
                      <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProject.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProject.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium capitalize">
                            {relatedProject.category}
                          </span>
                          <span className="text-sm text-gray-500">{relatedProject.year}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                {/* Previous Project */}
                <div className="flex-1">
                  {previousProject ? (
                    <Link href={`/portfolio/${previousProject.slug}`} className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-xs text-gray-500">Previous</div>
                        <div className="font-medium text-sm">{previousProject.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                
                {/* Back to Portfolio */}
                <div className="flex-1 text-center">
                  <Link 
                    href="/portfolio" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center text-sm"
                  >
                    View All Projects
                  </Link>
                </div>
                
                {/* Next Project */}
                <div className="flex-1 text-right">
                  {nextProject ? (
                    <Link href={`/portfolio/${nextProject.slug}`} className="group flex items-center justify-end text-gray-600 hover:text-blue-600 transition-colors">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Next</div>
                        <div className="font-medium text-sm">{nextProject.title}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    // Try to fetch from Strapi first
    const portfolioResponse = await strapi.getPortfolios({
      populate: ['slug'],
      pagination: { page: 1, pageSize: 100 }
    });
    
    if (portfolioResponse.data && portfolioResponse.data.length > 0) {
      return portfolioResponse.data.map((item) => ({
        slug: item.slug,
      }));
    }
  } catch (error) {
    console.error('Error fetching portfolio slugs from Strapi:', error);
  }
  
  // Fallback to local data
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  // Await params in Next.js 15
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | Narvex Portfolio',
      description: 'The requested portfolio project could not be found.'
    };
  }
  
  return {
    title: project.seoTitle || `${project.title} | Narvex Portfolio`,
    description: project.seoDescription || project.description,
    openGraph: {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.description,
      images: project.ogImage ? [project.ogImage] : project.images,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.description,
      images: project.ogImage ? [project.ogImage] : project.images
    }
  };
}