# Service Page Contact Section - Homepage API Integration

## 📋 Overview

Service Page sekarang menggunakan `contactSection` yang **sama persis** dengan Homepage, dengan mengambil data dari **Homepage API** (`strapi.getHomepage()`).

## ✅ Perubahan yang Dilakukan

### File yang Dimodifikasi
- `src/app/services/page.tsx`

### Detail Perubahan

1. **Import tambahan:**
   - `transformHomepageComponent` - untuk transform komponen homepage
   - `ContactSection` type - untuk type safety

2. **Fetch Homepage API:**
   ```typescript
   const homepageData = await strapi.getHomepage() as any;
   ```

3. **Extract Contact Section dari Homepage:**
   ```typescript
   // Extract contact section FROM HOMEPAGE (not from service page)
   let contactSection: ContactSection | undefined;
   
   // Process homepage data to get contactSection
   if (homepageData) {
     let homepageEntity;
     if (homepageData.data) {
       homepageEntity = Array.isArray(homepageData.data) ? homepageData.data[0] : homepageData.data;
     } else if (homepageData.id) {
       homepageEntity = homepageData;
     }
     
     if (homepageEntity && homepageEntity.pageContent) {
       const homepageComponents = homepageEntity.pageContent.map(transformHomepageComponent);
       contactSection = homepageComponents.find(c => c.__component === 'sections.contact') as ContactSection;
     }
   }
   ```

4. **Pass ke ServicesClient:**
   ```typescript
   <ServicesClient 
     services={services}
     heroSection={heroSection}
     strengthsSection={strengthsSection}
     contactSection={contactSection as ContactSectionData}
   />
   ```

## 🎯 Keuntungan

1. **Single Source of Truth** - Contact section sekarang hanya dikelola dari satu tempat (Homepage API)
2. **Konsistensi Data** - Data contact yang sama di Homepage dan Service Page
3. **Mudah Update** - Update sekali di Homepage API, otomatis apply ke semua page
4. **Tidak Ada Duplikasi** - Tidak perlu maintain data contact di multiple places

## 📍 Contact Section Location

### Sekarang (Setelah Perubahan)
- **Homepage:** Menggunakan `homepageData.contactSection` dari Homepage API ✅
- **Service Page:** Menggunakan `contactSection` dari Homepage API ✅
- **Companies Page:** Menggunakan data static (bisa diupdate juga kalau perlu)

### Data yang Digunakan

Contact Section mengandung:
- `title` - "Siap Memulai Project Anda?"
- `description` - "Hubungi kami melalui berbagai channel yang tersedia..."
- `email` - Email kontak
- `phone_number` - Nomor telepon/WhatsApp
- `socialLinks` - Link Instagram, Facebook, dll

## 🔄 Flow Diagram

```
Homepage API (Strapi)
        ↓
   contactSection
        ↓
   ┌────────────────┐
   │                │
   ↓                ↓
Homepage      Service Page
```

## ✨ Hasil

Sekarang ketika Anda update Contact Section di Strapi Homepage API, perubahan akan otomatis muncul di:
1. ✅ Homepage
2. ✅ Service Page

## 📝 Testing

Untuk test perubahan ini:
1. Jalankan aplikasi: `npm run dev`
2. Buka Homepage dan Service Page
3. Scroll ke bagian contact di bawah
4. Pastikan data contact (email, phone, title, description) **sama persis** di kedua halaman

## 🚀 Next Steps (Optional)

Jika ingin konsistensi lebih lanjut, bisa juga apply ke:
- Companies Page
- About Page
- Portfolio Page

Dengan cara yang sama: fetch `homepageData` dan extract `contactSection` dari situ.

## 🐛 Bug Fix - Contact Cards Mismatch

### Masalah yang Ditemukan
Setelah integrasi API, ternyata **contact cards** yang ditampilkan masih berbeda:
- **Homepage:** Email, WhatsApp, Instagram, **Phone** ✅
- **Service Page:** Email, WhatsApp, Instagram, **Facebook** ❌

### Penyebab
Meskipun Service Page sudah mengambil `contactSection` dari Homepage API, component client (`services-client.tsx`) masih **hardcode render** card Facebook di posisi keempat.

### Solusi yang Diterapkan

**File:** `src/components/pages/services/services-client.tsx`

1. **Mengganti Card Facebook dengan Phone:**
   ```tsx
   // SEBELUM: Card keempat adalah Facebook
   <a href={contactSection?.socialLinks?.facebook || "..."}>
     <Image src="/icons/facebook.png" alt="Facebook" />
     <h3>Facebook</h3>
     <p>Facebook Page</p>
   </a>
   
   // SESUDAH: Card keempat adalah Phone
   <a href={`tel:${contactSection?.phone_number || '+62xxx'}`}>
     <Image src="/icons/phone.png" alt="Phone" />
     <h3>Phone</h3>
     <p>{contactSection?.phone_number ? '+' + contactSection.phone_number : '+62 xxx xxxx xxxx'}</p>
   </a>
   ```

2. **Memperbaiki Format Display Phone Number:**
   - WhatsApp: Menampilkan dengan prefix `+` → `+6281200000`
   - Phone: Menampilkan dengan prefix `+` → `+6281200000`

3. **Memperbaiki Instagram Display:**
   - Mengambil URL dari API dan convert ke format `@username`
   - Menggunakan `.replace('https://www.instagram.com/', '@')`

4. **Konsistensi Link Email:**
   - Homepage: Menggunakan `href="/contact"`
   - Service Page: Diupdate dari `mailto:` menjadi `href="/contact"`

### Hasil Akhir

Sekarang Service Page menampilkan **4 contact cards yang identik** dengan Homepage:

| No | Card Type | Icon | Display Value | Link |
|----|-----------|------|---------------|------|
| 1 | Email | 📧 | `narvex@gmail.com` | `/contact` |
| 2 | WhatsApp | 💬 | `+6281200000` | `https://wa.me/6281200000` |
| 3 | Instagram | 📷 | `@jasonsusantoo` | Instagram URL |
| 4 | Phone | 📞 | `+6281200000` | `tel:+6281200000` |

---

**Created:** October 6, 2025  
**Modified:** October 6, 2025  
**Bug Fixed:** October 6, 2025

