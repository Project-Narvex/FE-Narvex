import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Palette, Calendar, Smartphone, Users } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Palette,
      title: "Creative Design & Branding",
      subtitle: "Brand Identity, Graphic Design, Visual Communication",
      description: "Layanan komprehensif untuk membangun brand identity yang kuat dan memorable melalui strategi kreatif yang tepat sasaran.",
      features: [
        "Brand Identity Development",
        "Logo Design & Brand Guidelines",
        "Marketing Materials Design",
        "Packaging Design",
        "Visual Communication",
        "Brand Strategy & Positioning"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Event Production",
      subtitle: "Corporate Events, Product Launches, Conferences",
      description: "Event production yang memorable dan impactful dengan eksekusi yang sempurna dari perencanaan hingga pelaksanaan.",
      features: [
        "Event Planning & Coordination",
        "Stage Design & Decoration",
        "Event Management",
        "Audio Visual Equipment",
        "Live Streaming & Documentation",
        "Vendor Coordination"
      ],
      color: "bg-gold-500"
    },
    {
      icon: Smartphone,
      title: "Digital Marketing",
      subtitle: "Social Media, SEO, Digital Advertising, Website Development",
      description: "Strategi digital marketing yang efektif dan terukur untuk mengoptimalkan digital presence dan mencapai target audience.",
      features: [
        "Social Media Management",
        "Search Engine Optimization (SEO)",
        "Google Ads & Facebook Ads",
        "Content Marketing & Copywriting",
        "Website Development",
        "Digital Strategy & Analytics"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Brand Consultation",
      subtitle: "Strategic Planning, Brand Positioning, Competitive Analysis",
      description: "Konsultasi strategis untuk membantu klien membangun brand yang kuat dengan positioning yang tepat di pasar.",
      features: [
        "Brand Positioning Strategy",
        "Competitive Analysis",
        "Market Research & Insights",
        "Brand Messaging Development",
        "Creative Strategy Planning",
        "Brand Performance Evaluation"
      ],
      color: "bg-gold-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Layanan <span className="text-gold-400">Kami</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Solusi komprehensif untuk semua kebutuhan creative services, event production, dan digital marketing Anda
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Portfolio Layanan Lengkap</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Dari creative design hingga digital marketing, kami menyediakan solusi terintegrasi 
                untuk kesuksesan setiap project Anda.
              </p>
            </div>
            
            <div className="space-y-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mr-4`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-blue-900">{service.title}</h3>
                          <p className="text-gold-500 font-medium">{service.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 mb-8">
                        {service.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-gold-400 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <button className="bg-gold-primary text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:opacity-90">
                          Pelajari Lebih Lanjut
                        </button>
                      </div>
                    </div>
                    
                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <IconComponent className="w-24 h-24 mx-auto mb-4 opacity-50" />
                          <p>Service Image Placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Mengapa Memilih Narvex?</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Pengalaman bertahun-tahun dan komitmen terhadap kualitas membuat kami menjadi partner terpercaya
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gold-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Berpengalaman</h3>
                <p className="text-gray-600">Lebih dari 10 tahun pengalaman dalam industri creative services dan digital marketing</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Tim Profesional</h3>
                <p className="text-gray-600">Tim ahli yang berpengalaman dan berdedikasi tinggi</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-blue-primary mb-3">Tepat Waktu</h3>
                <p className="text-gray-600">Komitmen untuk menyelesaikan setiap project sesuai timeline</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-xl font-bold text-blue-primary mb-3">Kualitas Terjamin</h3>
                <p className="text-gray-600">Standar kualitas tinggi dalam setiap layanan yang kami berikan</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi terbaik untuk kebutuhan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Konsultasi Gratis
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Lihat Portfolio
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}