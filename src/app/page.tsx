import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import InstagramFeed from '@/components/social/InstagramFeed';
import { getRecentArticles } from '@/data/blog';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Company Introduction - CV. Nara Exhibition Indonesia */}
        <section id="about" className="section-padding bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="heading-2 mb-6">
                CV. Nara Exhibition Indonesia
              </h2>
              <p className="body-large text-gray-600 mb-8">
                Perusahaan induk yang menaungi ekosistem layanan kreatif terintegrasi, 
                mengkhususkan diri dalam MICE services, event production, dan solusi kreatif 
                komprehensif. Dengan 4 subsidiary yang saling melengkapi, kami memberikan 
                layanan end-to-end untuk kesuksesan setiap project Anda.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f0f4f8'}}>
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: '#27364d'}}>Creative Design & Branding</h3>
                  <p className="text-gray-600">Brand identity, graphic design, dan visual communication</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f5f1e8'}}>
                    <span className="text-2xl">🎪</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: '#27364d'}}>Event Production</h3>
                  <p className="text-gray-600">Event planning, design, dan technical support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f0f4f8'}}>
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: '#27364d'}}>Digital Marketing</h3>
                  <p className="text-gray-600">Social media, SEO, digital advertising, dan website development</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f5f1e8'}}>
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{color: '#27364d'}}>Brand Consultation</h3>
                  <p className="text-gray-600">Strategic planning dan brand positioning</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Portfolio Section */}
        <PortfolioSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Latest Updates - Blog/News Integration */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Latest Updates</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Berita terbaru, insights industri, dan stories dari project-project terbaru kami.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Articles */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  {getRecentArticles(4).map((article, index) => (
                    <article key={article.id} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <div className="text-4xl font-bold opacity-20" style={{color: '#dbc48a'}}>{index + 1}</div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm font-medium mb-2 capitalize" style={{color: '#dbc48a'}}>
                          {article.category.replace('-', ' ')}
                        </div>
                        <h3 className="text-lg font-bold mb-3 line-clamp-2" style={{color: '#27364d'}}>
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt}
                        </p>
                        <a 
                          href={`/blog/${article.slug}`}
                          className="font-medium transition-colors text-sm hover:opacity-80" style={{color: '#dbc48a'}}
                        >
                          Baca Selengkapnya →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Instagram Feed */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <InstagramFeed 
                    username="skywork.id"
                    displayName="Skywork.id"
                    limit={4}
                    showHeader={true}
                    className=""
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a href="/blog" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block hover:opacity-90" style={{backgroundColor: '#27364d'}}>
                Lihat Semua Artikel
              </a>
            </div>
          </div>
        </section>
        
        {/* Multi-Channel Contact CTA */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Hubungi kami melalui berbagai channel yang tersedia. Tim ahli kami siap membantu 
                mewujudkan visi kreatif Anda menjadi kenyataan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <a href="/contact" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{backgroundColor: '#dbc48a'}}>
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </a>
              
              <a href="https://wa.me/62xxx" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
              
              <a href="https://instagram.com/narvex.id" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-sm">@narvex.id</p>
              </a>
              
              <a href="tel:+62xxx" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
            </div>
            
            <div className="text-center">
              <a href="/contact" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block mr-4 hover:opacity-90" style={{backgroundColor: '#dbc48a'}}>
                Konsultasi Gratis
              </a>
              <a href="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-[#27364d] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
                Lihat Portfolio
              </a>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
