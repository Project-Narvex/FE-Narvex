import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Tentang <span className="text-gold-400">Narvex</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="heading-2 mb-6">Perjalanan Kami</h2>
              <p className="body-large text-gray-600">
                Didirikan dengan visi untuk menjadi partner terpercaya dalam creative services, 
                Narvex menggabungkan kreativitas, teknologi, dan strategi bisnis untuk membantu klien mencapai tujuan mereka.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="heading-3 mb-6">Nilai-Nilai Perusahaan</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gold-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Kreativitas</h4>
                      <p className="text-gray-600">Kami percaya bahwa kreativitas adalah kunci untuk menciptakan solusi yang unik dan memorable.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gold-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Profesionalisme</h4>
                      <p className="text-gray-600">Kami berkomitmen untuk memberikan layanan dengan standar profesional tertinggi.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gold-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Kolaborasi</h4>
                      <p className="text-gray-600">Kami membangun partnership yang kuat dengan klien melalui komunikasi yang terbuka.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-gold-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Inovasi</h4>
                      <p className="text-gray-600">Kami selalu mengikuti perkembangan tren dan teknologi terbaru.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <h4 className="text-2xl font-bold text-blue-900 mb-4">Narvex Creative Services</h4>
                  <p className="text-gray-600 mb-6">
                    Perusahaan creative services yang mengkhususkan diri dalam branding, event production, dan digital marketing.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gold-500">50+</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gold-500">25+</div>
                      <div className="text-sm text-gray-600">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Mission */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-6">Visi, Misi & Tujuan</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Visi</h3>
                <p className="text-gray-600">
                  Menjadi perusahaan creative services terdepan di Indonesia yang memberikan solusi inovatif 
                  dan berkualitas tinggi untuk membantu klien mencapai kesuksesan bisnis mereka.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Misi</h3>
                <div className="text-left text-gray-600 space-y-2">
                  <p>• Memberikan layanan creative services berkualitas tinggi dengan pendekatan profesional dan inovatif</p>
                  <p>• Membantu klien membangun brand identity yang kuat dan memorable</p>
                  <p>• Menghadirkan event production yang memorable dan impactful</p>
                  <p>• Mengoptimalkan digital presence klien melalui strategi digital marketing yang efektif</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder for other sections */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="heading-2 mb-6">Dokumentasi Legal</h2>
            <p className="body-large text-gray-600 mb-8">
              NIB, izin usaha, dan sertifikasi akan ditampilkan di sini.
            </p>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="heading-2 mb-6">Tim Kami</h2>
            <p className="body-large text-gray-600 mb-8">
              Showcase key personnel dengan professional photos akan ditampilkan di sini.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="heading-2 mb-6">Pencapaian</h2>
            <p className="body-large text-gray-600 mb-8">
              Awards, recognitions, dan milestones akan ditampilkan di sini.
            </p>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="heading-2 mb-6">Budaya Perusahaan</h2>
            <p className="body-large text-gray-600 mb-8">
              Values dan working principles akan ditampilkan di sini.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}