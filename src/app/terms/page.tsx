import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Terms of <span className="text-gold-400">Service</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Syarat dan ketentuan penggunaan layanan Narvex
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-2 mb-6">Syarat dan Ketentuan</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  Halaman syarat dan ketentuan akan diisi dengan konten legal yang sesuai.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Penerimaan Syarat</h3>
                <p className="text-gray-600 mb-6">
                  Dengan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan yang berlaku.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Layanan</h3>
                <p className="text-gray-600 mb-6">
                  Narvex menyediakan layanan creative services, event production, dan digital marketing.
                </p>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">3. Tanggung Jawab</h3>
                <p className="text-gray-600 mb-6">
                  Kedua belah pihak memiliki tanggung jawab sesuai dengan kesepakatan yang telah dibuat.
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