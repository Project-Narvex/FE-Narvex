'use client';

import React from 'react';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, Palette, Calendar, Megaphone } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: 'creative-design',
    icon: <Palette className="w-8 h-8 text-white" />,
    title: 'Creative Design',
    description: 'Branding, logo design, dan visual identity yang memorable untuk membuat brand Anda tampil menonjol.',
    features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Packaging Design']
  },
  {
    id: 'event-production',
    icon: <Calendar className="w-8 h-8 text-white" />,
    title: 'Event Production',
    description: 'Event planning dan production dari konsep hingga eksekusi untuk menciptakan pengalaman yang tak terlupakan.',
    features: ['Event Planning', 'Stage Design', 'Audio Visual', 'Event Coordination']
  },
  {
    id: 'digital-marketing',
    icon: <Megaphone className="w-8 h-8 text-white" />,
    title: 'Digital Marketing',
    description: 'Strategi digital yang efektif untuk growth bisnis Anda di era digital yang kompetitif.',
    features: ['Social Media Management', 'Content Creation', 'SEO Optimization', 'Digital Advertising']
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = "Layanan Kami",
  subtitle = "Solusi kreatif terpadu yang dirancang untuk mengangkat brand Anda ke level yang lebih tinggi.",
  services = defaultServices
}) => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-2 mb-6" style={{color: '#6382b4'}}>
            {title}
          </h2>
          <p className="body-large max-w-3xl mx-auto text-gray-700">
            {subtitle}
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.id}
              variant="service"
              className={`group animate-bounce-in hover:shadow-2xl`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-pulse-hover">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all duration-300">
                  {service.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 transition-colors" style={{color: '#6382b4'}}>
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 animate-fade-in" style={{ animationDelay: `${(index * 200) + (idx * 100)}ms` }}>
                    <div className="w-3 h-3 rounded-full mr-3 transition-colors shadow-sm" style={{backgroundColor: '#dbc48a'}}></div>
                    <span className="text-sm font-medium group-hover:text-blue-900 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <button 
                onClick={scrollToContact}
                className="font-semibold transition-all duration-300 group flex items-center hover:shadow-lg px-4 py-2 rounded-lg hover:bg-blue-50" style={{color: '#dbc48a'}}
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center animate-fade-in animation-delay-600">
          <p className="body-large mb-8 text-gray-600">
            Siap untuk mengembangkan bisnis Anda? Mari diskusikan project impian Anda bersama tim ahli kami.
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={scrollToContact}
            className="group"
          >
            Mulai Project Sekarang
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
export type { ServicesSectionProps, Service };