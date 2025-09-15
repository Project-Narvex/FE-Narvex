import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Tentang <span className="text-orange-400">Narvex</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Solusi MICE dan Event Production
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
                Didirikan dengan visi untuk menjadi partner terpercaya dalam industri MICE dan event production,
                CV. Nara Exhibition Indonesia telah berkembang menjadi grup perusahaan yang terintegrasi.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="heading-3 mb-6">Sejarah Perusahaan</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-2">2020 - Pendirian</h4>
                      <p className="text-gray-600">CV. Nara Exhibition Indonesia didirikan dengan fokus pada layanan MICE dan event production.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-2">2021 - Ekspansi Layanan</h4>
                      <p className="text-gray-600">Mengembangkan layanan furniture production dan equipment rental untuk melengkapi portfolio.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-2">2022 - Pembentukan Subsidiaries</h4>
                      <p className="text-gray-600">Meluncurkan Skywork.id, Gutama Learning, dan CreativeWork untuk layanan yang lebih spesifik.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-2">2023 - Integrasi Penuh</h4>
                      <p className="text-gray-600">Mengintegrasikan semua layanan subsidiaries untuk memberikan solusi end-to-end.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <h4 className="text-2xl font-bold text-navy-900 mb-4">CV. Nara Exhibition Indonesia</h4>
                  <p className="text-gray-600 mb-6">
                    Perusahaan induk yang menaungi seluruh ekosistem layanan kreatif dan event production.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">50+</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">4</div>
                      <div className="text-sm text-gray-600">Subsidiaries</div>
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
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Visi</h3>
                <p className="text-gray-600">
                  Menjadi perusahaan terdepan dalam industri MICE dan event production yang memberikan 
                  solusi kreatif terintegrasi dengan standar internasional.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Misi</h3>
                <p className="text-gray-600">
                  Memberikan layanan MICE dan event production yang berkualitas tinggi melalui inovasi, 
                  teknologi, dan tim profesional yang berpengalaman.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎪</span>
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Tujuan</h3>
                <p className="text-gray-600">
                  Membangun ekosistem layanan kreatif yang komprehensif untuk mendukung kesuksesan 
                  setiap event dan project klien.
                </p>
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