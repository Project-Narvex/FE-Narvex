# Service Page - Strength Section Dynamic Cards Integration

## 📋 Overview

Service Page bagian **Strengths (Mengapa Memilih Narvex?)** sekarang menggunakan **dynamic cards (0-4)** dari Service Page API, sama seperti Integration Section di Company Page.

**SEBELUM:** Menggunakan `statistic1-4` dengan format statistik
**SEKARANG:** Menggunakan `card_1-4` dengan rich text description dan logo support

## ✅ Perubahan yang Dilakukan

### File yang Dimodifikasi
1. `src/app/services/page.tsx` - Server Component
2. `src/components/pages/services/services-client.tsx` - Client Component

---

## 🔧 Detail Implementasi

### API Structure

Service Page API - Strengths Section:
```json
{
  "__component": "service.strengths",
  "id": 5,
  "title": "Mengapa Memilih Narvex?",
  "description": "Pengalaman bertahun-tahun dan komitmen...",
  "card_1": {
    "id": 50,
    "title": "Berpengalaman",
    "description": [
      {
        "type": "paragraph",
        "children": [
          {
            "text": "Lebih dari 10 tahun pengalaman...",
            "type": "text"
          }
        ]
      }
    ],
    "logo": {
      "id": 1,
      "url": "/uploads/...",
      "formats": {...}
    }
  },
  "card_2": { ... },
  "card_3": { ... },
  "card_4": { ... }
}
```

---

### 1. Server Component (`page.tsx`)

#### Extract Strength Cards

**Lokasi:** Setelah extract contactSection, sebelum transform services

```typescript
// Extract strength cards from strengthsSection (card_1, card_2, card_3, card_4)
const strengthData: any = {
  title: (strengthsSection as any)?.title || '',
  description: (strengthsSection as any)?.description || '',
  cards: []
};

// Build cards array from card_1, card_2, card_3, card_4
if (strengthsSection) {
  const cardFields = ['card_1', 'card_2', 'card_3', 'card_4'] as const;
  cardFields.forEach((fieldName) => {
    const card = (strengthsSection as any)[fieldName];
    if (card && card.title) {
      // Extract text from rich text description
      let descriptionText = '';
      if (card.description && Array.isArray(card.description)) {
        card.description.forEach((block: any) => {
          if (block.type === 'paragraph' && block.children) {
            block.children.forEach((child: any) => {
              if (child.text) {
                descriptionText += child.text;
              }
            });
          }
        });
      }
      
      strengthData.cards.push({
        title: card.title,
        description: descriptionText,
        logo: card.logo ? getStrapiImageUrl(card.logo, 'thumbnail') : null
      });
    }
  });
}
```

#### Pass ke ServicesClient

```typescript
return (
  <ServicesClient 
    services={services}
    heroSection={heroSection}
    strengthData={strengthData}  // ← Changed from strengthsSection
    contactSection={contactSection as ContactSectionData}
  />
);
```

---

### 2. Client Component (`services-client.tsx`)

#### Interfaces

```typescript
interface StrengthCard {
  title: string;
  description: string;
  logo: string | null;
}

interface StrengthData {
  title: string;
  description: string;
  cards: StrengthCard[];
}

interface ServicesClientProps {
  services: Service[];
  heroSection?: ServicePageComponent;
  strengthData?: StrengthData;  // ← Changed from strengthsSection
  contactSection?: ContactSectionData;
}
```

#### Function Parameter Update

```typescript
export default function ServicesClient({ 
  services, 
  heroSection, 
  strengthData,  // ← Changed from strengthsSection
  contactSection 
}: ServicesClientProps) {
```

#### Render Dynamic Cards

**SEBELUM:**
```tsx
{(strengthsSection as any) && [
  (strengthsSection as any).statistic1,
  (strengthsSection as any).statistic2,
  (strengthsSection as any).statistic3,
  (strengthsSection as any).statistic4
].map((stat: unknown, index: number) => {
  const statData = stat as any;
  return (
    <Card>
      <span className="text-3xl">{icons[index]}</span>
      <h3>{statData.suffix}</h3>
      <p>{statData.label}</p>
    </Card>
  );
})}
```

**SEKARANG:**
```tsx
{strengthData && strengthData.cards && strengthData.cards.length > 0 && (
  <section>
    <h2>{strengthData.title || "Mengapa Memilih Narvex?"}</h2>
    <p>{strengthData.description || "Pengalaman bertahun-tahun..."}</p>
    
    <div className={`grid md:grid-cols-2 ${
      strengthData.cards.length === 4 ? 'lg:grid-cols-4' : 
      strengthData.cards.length === 3 ? 'lg:grid-cols-3' : 
      'lg:grid-cols-2'
    } gap-8`}>
      {strengthData.cards.map((card, index) => {
        const gradients = [
          'from-gold-100 to-gold-200',
          'from-blue-100 to-blue-200',
          'from-green-100 to-green-200',
          'from-purple-100 to-purple-200'
        ];
        
        return (
          <Card key={index}>
            <div className={`bg-gradient-to-br ${gradients[index % 4]} ...`}>
              {card.logo ? (
                <Image src={card.logo} alt={card.title} width={60} height={60} />
              ) : (
                <span className="text-3xl">
                  {index === 0 ? '🏆' : index === 1 ? '⚡' : index === 2 ? '🎯' : '💎'}
                </span>
              )}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Card>
        );
      })}
    </div>
  </section>
)}
```

---

## 🎯 Features

### 1. Dynamic Card Count (0-4)
- ✅ **0 cards:** Section tidak muncul
- ✅ **1 card:** 1 column layout
- ✅ **2 cards:** 2 columns layout
- ✅ **3 cards:** 3 columns layout
- ✅ **4 cards:** 4 columns layout

### 2. Rich Text Support
- Extract description dari Strapi Rich Text format
- Support multiple paragraphs
- Clean text extraction

### 3. Logo Support
- Logo image dari API (jika tersedia)
- Emoji fallback (🏆 ⚡ 🎯 💎)
- Responsive image sizing

### 4. Dynamic Styling
- 4 gradient colors yang berbeda (gold, blue, green, purple)
- Auto-rotate berdasarkan index
- Hover effects

---

## 📊 Comparison

### SEBELUM (Statistics Format)

**API Structure:**
```json
{
  "statistic1": {
    "suffix": "10+",
    "label": "Years Experience"
  },
  "statistic2": { ... },
  "statistic3": { ... },
  "statistic4": { ... }
}
```

**Display:**
- Fixed 4 statistics atau hardcoded fallback
- Hanya text (suffix + label)
- Tidak ada logo support
- Tidak ada rich text

### SEKARANG (Cards Format)

**API Structure:**
```json
{
  "card_1": {
    "title": "Berpengalaman",
    "description": [...],  // Rich text
    "logo": {...}          // Image optional
  },
  "card_2": { ... },
  "card_3": { ... },
  "card_4": { ... }
}
```

**Display:**
- Dynamic 0-4 cards
- Rich text description
- Logo image support
- Emoji fallback
- Responsive grid

---

## 🧪 Testing Scenarios

### Scenario 1: No Cards
- Di Strapi, kosongkan semua card_1 sampai card_4
- **Expected:** Strength section tidak muncul

### Scenario 2: 1 Card
- Isi hanya card_1
- **Expected:** 1 card muncul dengan proper layout

### Scenario 3: 2 Cards
- Isi card_1 dan card_2
- **Expected:** 2 cards dalam 2 column grid

### Scenario 4: 3 Cards
- Isi card_1, card_2, card_3
- **Expected:** 3 cards dalam 3 column grid

### Scenario 5: 4 Cards
- Isi semua card_1 sampai card_4
- **Expected:** 4 cards dalam 4 column grid

### Scenario 6: With Logo
- Upload logo di card_1
- **Expected:** Logo muncul, bukan emoji

### Scenario 7: Without Logo
- Hapus logo dari card_1
- **Expected:** Emoji fallback muncul (🏆)

### Scenario 8: Rich Text Description
- Isi description dengan multiple paragraphs di Strapi
- **Expected:** Text ter-extract dan muncul sebagai plain text

---

## ✨ Benefits

### 1. Consistency dengan Company Page
- Service Page Strengths = Company Page Integration
- Sama-sama menggunakan card_1-4 structure
- Sama-sama support 0-4 cards
- Sama-sama support logo + emoji fallback

### 2. Flexibility
- Bisa 0 cards (section hidden)
- Bisa 1-4 cards sesuai kebutuhan
- Responsive grid auto-adjust
- Logo optional

### 3. Rich Content
- Support rich text description dari Strapi
- Support image upload untuk logo
- Better content management

### 4. Maintainability
- Tidak ada hardcoded fallback yang panjang
- Conditional rendering yang clean
- Type-safe dengan TypeScript

---

## 📝 Summary

### What Changed

| Aspect | Before | After |
|--------|--------|-------|
| **Data Source** | `statistic1-4` | `card_1-4` |
| **Format** | Statistics (suffix + label) | Cards (title + description + logo) |
| **Description** | Plain text (label) | Rich text support |
| **Logo** | ❌ No support | ✅ Logo image or emoji |
| **Card Count** | Fixed 4 or fallback | Dynamic 0-4 |
| **Grid Layout** | Fixed 4 columns | Responsive (1-4 cols) |
| **Conditional** | Fallback array | Conditional section render |

### Migration Path

Jika Anda memiliki data lama dengan `statistic1-4`:
1. Buat `card_1` dengan:
   - `title` = `statistic1.suffix`
   - `description` = `statistic1.label` (convert ke rich text)
   - `logo` = null (optional)
2. Ulangi untuk card_2, card_3, card_4
3. Hapus field statistic1-4 dari API

---

## 🎉 Result

Service Page Strengths Section sekarang:
- ✅ Fully dynamic dari API
- ✅ Support 0-4 cards
- ✅ Rich text description
- ✅ Logo image support
- ✅ Responsive layout
- ✅ Same structure as Company Page Integration
- ✅ Zero linter errors
- ✅ Type-safe

---

**Created:** October 6, 2025  
**Completed:** October 6, 2025  
**Related:** `COMPANY_PAGE_API_INTEGRATION.md`

