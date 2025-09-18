'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import InstagramFeed from '@/components/social/InstagramFeed';
import { getRecentArticles } from '@/data/blog';
import { initializeAnimations } from '@/lib/animations';

export default function Home() {
  useEffect(() => {
    // Initialize scroll animations
    const animationController = initializeAnimations();
    
    // Cleanup on unmount
    return () => {
      if (animationController) {
        animationController.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen scroll-snap-container">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Company Introduction - CV. Nara Exhibition Indonesia */}
        <section id="about" className="section-padding bg-white scroll-snap-section">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">
                CV. Nara Exhibition Indonesia
              </h2>
              <p className="body-large text-gray-600 mb-8 scroll-animate animate-stagger-2">
                Perusahaan induk yang menaungi ekosistem layanan kreatif terintegrasi, 
                mengkhususkan diri dalam MICE services, event production, dan solusi kreatif 
                komprehensif. Dengan 4 subsidiary yang saling melengkapi, kami memberikan 
                layanan end-to-end untuk kesuksesan setiap project Anda.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-12 scroll-animate animate-stagger-3">
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="0">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-blue-50">
                    <span className="text-2xl">&#127912;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Creative Design & Branding</h3>
                  <p className="text-gray-600 flex-1">Brand identity, graphic design, dan visual communication</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="150">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gold-50">
                    <span className="text-2xl">&#127914;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Event Production</h3>
                  <p className="text-gray-600 flex-1">Event planning, design, dan technical support</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="300">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-blue-50">
                    <span className="text-2xl">&#128241;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Digital Marketing</h3>
                  <p className="text-gray-600 flex-1">Social media, SEO, digital advertising, dan website development</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="450">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gold-50">
                    <span className="text-2xl">&#128188;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Brand Consultation</h3>
                  <p className="text-gray-600 flex-1">Strategic planning dan brand positioning</p>
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
        <section className="section-padding bg-white scroll-snap-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">Latest Updates</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Berita terbaru, insights industri, dan stories dari project-project terbaru kami.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Articles */}
              <div className="lg:col-span-2 scroll-animate-left">
                <div className="grid md:grid-cols-2 gap-6">
                  {getRecentArticles(4).map((article, index) => (
                    <article key={article.id} className="article-card bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow scroll-animate-scale" data-stagger={index * 200}>
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <div className="text-4xl font-bold opacity-20 text-gold-500">{index + 1}</div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm font-medium mb-2 capitalize text-gold-500">
                          {article.category.replace('-', ' ')}
                        </div>
                        <h3 className="text-lg font-bold mb-3 line-clamp-2 text-blue-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt}
                        </p>
                        <a 
                          href={`/blog/${article.slug}`}
                          className="font-medium transition-colors text-sm hover:opacity-80 text-gold-500"
                        >
                          Baca Selengkapnya →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Instagram Feed */}
              <div className="lg:col-span-1 scroll-animate-right">
                <div className="bg-gray-50 rounded-2xl p-6 card">
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
              <a href="/blog" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block hover:opacity-90 bg-blue-900">
                Lihat Semua Artikel
              </a>
            </div>
          </div>
        </section>
        
        {/* Multi-Channel Contact CTA */}
        <section className="section-padding bg-blue-900 scroll-snap-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate-scale">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate animate-stagger-1">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Hubungi kami melalui berbagai channel yang tersedia. Tim ahli kami siap membantu 
                mewujudkan visi kreatif Anda menjadi kenyataan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 scroll-animate">
              <a href="/contact" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="0">
                <div className="contact-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-gold-500">
                  <img src="/icons/email.png" alt="Email" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </a>
              
              <a href="https://wa.me/62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="100">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
              
              <a href="https://instagram.com/narvex.id" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="200">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-sm">@narvex.id</p>
              </a>
              
              <a href="tel:+62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="300">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/phone.png" alt="Phone" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
            </div>
            
            <div className="text-center scroll-animate animate-stagger-4">
              <a href="/contact" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block mr-4 hover:opacity-90 bg-gold-500 animate-pulse-glow">
                Konsultasi Gratis
              </a>
              <a href="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-[#27364d] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block animate-pulse-hover">
                Lihat Portfolio
              </a>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <div className="scroll-snap-section">
          <ContactSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
