import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CMSImage from '@/components/ui/CMSImage';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  User,
  Clock,
  Eye,
  Heart,
  Star,
  Tag
} from 'lucide-react';
import { blogArticles, BlogArticle } from '@/data/blog';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // Find article by slug
  const article = blogArticles.find(a => a.slug === params.slug);
  if (!article) {
    notFound();
  }
  
  // Find related articles (same category, excluding current)
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.id !== article.id && a.published)
    .slice(0, 3);
  
  // Find previous and next articles
  const currentIndex = blogArticles.findIndex(a => a.id === article.id);
  const previousArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Article Not Found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryNames = {
    'company-updates': 'Company Updates',
    'industry-insights': 'Industry Insights',
    'project-stories': 'Project Stories',
    'tips-tricks': 'Tips & Tricks',
    'company-news': 'Company News'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Enhanced Navigation Bar */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-700 overflow-hidden">
                <Link href="/" className="font-medium hover:text-gold-500 transition-colors duration-200 whitespace-nowrap">Home</Link>
                <span className="text-gray-400">/</span>
                <Link href="/blog" className="font-medium hover:text-gold-500 transition-colors duration-200 whitespace-nowrap">Blog</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gold-500 font-medium truncate max-w-[150px] sm:max-w-none" title={article.title}>
                  {article.title}
                </span>
              </div>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-gold-500 font-medium transition-colors duration-200 whitespace-nowrap text-sm lg:text-base flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Blog</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {article.featured && (
                <div className="inline-flex items-center bg-gradient-to-r from-gold-100 to-gold-200 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  Featured Article
                </div>
              )}
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(article.publishDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {categoryNames[article.category]}
                  </span>
                </div>
                {article.views && (
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    <span>{article.views} views</span>
                  </div>
                )}
                {article.likes && (
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    <span>{article.likes} likes</span>
                  </div>
                )}
              </div>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Featured Image - CMS Ready */}
              {article.featuredImage && (
                <div className="rounded-xl overflow-hidden shadow-lg mb-12">
                  <CMSImage 
                     src={article.featuredImage}
                     alt={`${article.title} - Featured image`}
                     className="w-full h-64 sm:h-80 lg:h-96"
                     fallbackText={article.title}
                     category={article.category}
                   />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
                <div className="prose prose-lg max-w-none
                  [&>h1]:text-4xl [&>h1]:md:text-5xl [&>h1]:font-bold [&>h1]:mb-8 [&>h1]:text-blue-900 [&>h1]:leading-tight
                  [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:text-blue-800 [&>h2]:leading-tight
                  [&>h3]:text-2xl [&>h3]:md:text-3xl [&>h3]:font-semibold [&>h3]:mb-5 [&>h3]:text-blue-700 [&>h3]:leading-tight
                  [&>h4]:text-xl [&>h4]:md:text-2xl [&>h4]:font-semibold [&>h4]:mb-4 [&>h4]:text-blue-600 [&>h4]:leading-tight
                  [&>h5]:text-lg [&>h5]:md:text-xl [&>h5]:font-medium [&>h5]:mb-3 [&>h5]:text-blue-600 [&>h5]:leading-tight
                  [&>h6]:text-base [&>h6]:md:text-lg [&>h6]:font-medium [&>h6]:mb-3 [&>h6]:text-blue-500 [&>h6]:leading-tight
                  [&>p]:text-base [&>p]:md:text-lg [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-gray-700
                  [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul]:ml-6 [&>ul]:list-disc
                  [&>ol]:space-y-2 [&>ol]:mb-6 [&>ol]:ml-6 [&>ol]:list-decimal
                  [&>li]:text-gray-700 [&>li]:leading-relaxed
                  [&>blockquote]:border-l-4 [&>blockquote]:border-gold-500 [&>blockquote]:bg-gold-50 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:mb-6
                  [&>pre]:bg-gray-100 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:mb-6 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:overflow-x-auto
                  [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:font-mono [&>code]:text-sm
                  [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>a]:transition-colors
                  [&>img]:rounded-lg [&>img]:shadow-md [&>img]:mb-6 [&>img]:w-full [&>img]:h-auto
                  [&>table]:w-full [&>table]:border-collapse [&>table]:mb-6
                  [&>thead]:bg-gray-50
                  [&>th]:border [&>th]:border-gray-300 [&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-semibold [&>th]:text-gray-900
                  [&>td]:border [&>td]:border-gray-300 [&>td]:px-4 [&>td]:py-2 [&>td]:text-gray-700
                  [&>tr:nth-child(even)]:bg-gray-50
                  [&>em]:font-semibold [&>em]:text-blue-800 [&>em]:italic
                  [&>strong]:font-bold [&>strong]:text-blue-900
                ">
                  {/* Rich text content - CMS friendly */}
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    {article.content ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
                      />
                    ) : (
                      <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">{article.excerpt}</p>
                    )}
                  </div>
                </div>
              </div>
              

              
              {/* Tags Section */}
              {article.tags && article.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-200 hover:to-blue-300 transition-all duration-300 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group">
                        <div className="h-48 bg-gradient-to-br from-blue-100 via-blue-200 to-gold-100 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-700">
                          <div className="text-center text-blue-600">
                            <div className="text-3xl mb-2">📰</div>
                            <p className="text-xs font-semibold uppercase tracking-wide">{categoryNames[relatedArticle.category]}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {relatedArticle.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{new Date(relatedArticle.publishDate).toLocaleDateString('id-ID')}</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{relatedArticle.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation to Previous/Next Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                {previousArticle ? (
                  <Link 
                    href={`/blog/${previousArticle.slug}`}
                    className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-center mb-3">
                      <ArrowLeft className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="text-sm font-medium text-blue-500">Previous Article</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-800 transition-colors line-clamp-2">
                      {previousArticle.title}
                    </h3>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
                
                {nextArticle ? (
                  <Link 
                    href={`/blog/${nextArticle.slug}`}
                    className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-right"
                  >
                    <div className="flex items-center justify-end mb-3">
                      <span className="text-sm font-medium text-blue-500">Next Article</span>
                      <ArrowRight className="w-5 h-5 ml-2 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-800 transition-colors line-clamp-2">
                      {nextArticle.title}
                    </h3>
                  </Link>
                ) : (
                  <div className="flex-1"></div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Generate static params for all blog articles
export async function generateStaticParams() {
  return blogArticles
    .filter(article => article.published)
    .map((article) => ({
      slug: article.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps) {
  const article = blogArticles.find(a => a.slug === params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }
  
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}