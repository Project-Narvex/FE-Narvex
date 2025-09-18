import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Privacy <span className="text-gold-400">Policy</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Kebijakan privasi dan perlindungan data Narvex
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-2 mb-6">Kebijakan Privasi</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  Narvex berkomitmen untuk melindungi privasi dan data pribadi klien kami.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Pengumpulan Data</h3>
                <p className="text-gray-600 mb-6">
                  Kami mengumpulkan data yang diperlukan untuk memberikan layanan terbaik kepada klien.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Penggunaan Data</h3>
                <p className="text-gray-600 mb-6">
                  Data yang dikumpulkan digunakan untuk keperluan layanan dan komunikasi dengan klien.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">3. Perlindungan Data</h3>
                <p className="text-gray-600 mb-6">
                  Kami menerapkan langkah-langkah keamanan untuk melindungi data pribadi klien.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">4. Kontak</h3>
                <p className="text-gray-600 mb-6">
                  Untuk pertanyaan mengenai kebijakan privasi, silakan hubungi kami melalui halaman kontak.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}