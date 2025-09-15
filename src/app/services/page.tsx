import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Building2, Calendar, Package, Hammer, Zap } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: "MICE Services",
      subtitle: "Meeting, Incentive, Convention, Exhibition",
      description: "Layanan komprehensif untuk kebutuhan MICE dengan standar internasional dan teknologi terdepan.",
      features: [
        "Meeting & Conference Management",
        "Incentive Travel Programs",
        "Convention Planning & Execution",
        "Exhibition Design & Management",
        "Venue Selection & Management",
        "Audio Visual Solutions"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Event Organization",
      subtitle: "Corporate Events, Seminars, Exhibitions",
      description: "Penyelenggaraan event corporate yang profesional dari konsep hingga eksekusi dengan detail yang sempurna.",
      features: [
        "Corporate Event Planning",
        "Seminar & Workshop Organization",
        "Product Launch Events",
        "Team Building Activities",
        "Gala Dinner & Award Ceremonies",
        "Trade Show Management"
      ],
      color: "bg-green-500"
    },
    {
      icon: Package,
      title: "Equipment Rental",
      subtitle: "Complete MICE Equipment Catalog",
      description: "Penyewaan peralatan MICE lengkap dengan kualitas terbaik dan dukungan teknis profesional.",
      features: [
        "Audio Visual Equipment",
        "Lighting Systems",
        "Stage & Backdrop",
        "Furniture & Seating",
        "Registration Systems",
        "Technical Support"
      ],
      color: "bg-purple-500"
    },
    {
      icon: Hammer,
      title: "Furniture Production",
      subtitle: "Custom Wooden Furniture untuk Events",
      description: "Produksi furniture kayu custom berkualitas tinggi untuk kebutuhan event dan exhibition yang unik.",
      features: [
        "Custom Exhibition Booth",
        "Event Furniture Design",
        "Wooden Display Systems",
        "Reception Counters",
        "Modular Furniture",
        "Installation Services"
      ],
      color: "bg-orange-500"
    },
    {
      icon: Zap,
      title: "Integrated Solutions",
      subtitle: "Cross-Subsidiary Service Combinations",
      description: "Solusi terintegrasi yang menggabungkan semua layanan subsidiaries untuk hasil yang optimal.",
      features: [
        "End-to-End Event Solutions",
        "Multi-Service Packages",
        "Creative & Technical Integration",
        "One-Stop Event Management",
        "Coordinated Team Approach",
        "Comprehensive Project Management"
      ],
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Layanan <span className="text-orange-400">Kami</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Solusi komprehensif untuk semua kebutuhan MICE, event production, dan layanan kreatif Anda
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
                Dari MICE services hingga furniture production, kami menyediakan solusi terintegrasi 
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
                          <h3 className="text-3xl font-bold text-navy-900">{service.title}</h3>
                          <p className="text-orange-500 font-medium">{service.subtitle}</p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 mb-8">
                        {service.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
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
                Pengalaman, profesionalisme, dan komitmen untuk memberikan hasil terbaik dalam setiap project.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Berpengalaman</h3>
                <p className="text-gray-600">Lebih dari 3 tahun pengalaman dalam industri MICE dan event production</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Responsif</h3>
                <p className="text-gray-600">Tim yang responsif dan siap memberikan solusi cepat untuk setiap kebutuhan</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Terintegrasi</h3>
                <p className="text-gray-600">Layanan terintegrasi dari berbagai subsidiaries untuk solusi menyeluruh</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Berkualitas</h3>
                <p className="text-gray-600">Komitmen pada kualitas tinggi dalam setiap aspek layanan dan produk</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Konsultasikan kebutuhan MICE dan event production Anda dengan tim ahli kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Konsultasi Gratis
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
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