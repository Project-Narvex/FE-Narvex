# Narvex Brand Guidelines

## 1. Brand Overview

Narvex (CV. Nara Exhibition Indonesia) adalah perusahaan creative services yang mengkhususkan diri dalam branding, event production, dan digital marketing. Brand identity Narvex dirancang untuk mencerminkan profesionalisme, kreativitas, dan inovasi dengan pendekatan yang modern dan sophisticated.

### 1.1 Brand Personality
- **Professional**: Dapat diandalkan, kompeten, dan berpengalaman
- **Creative**: Inovatif, out-of-the-box, dan inspiring
- **Trustworthy**: Transparan, konsisten, dan hasil-oriented
- **Modern**: Up-to-date, teknologi-savvy, dan forward-thinking
- **Collaborative**: Partnership-focused, komunikatif, dan supportive

## 2. Logo & Visual Identity

### 2.1 Logo Usage
- Logo harus selalu digunakan dalam proporsi yang benar
- Minimum clear space di sekitar logo adalah 1x tinggi huruf 'N'
- Logo tidak boleh diubah, dirotasi, atau dimodifikasi tanpa persetujuan
- Gunakan logo versi yang sesuai dengan background (light/dark)

### 2.2 Logo Variations
- **Primary Logo**: Full color pada background putih/terang
- **Reverse Logo**: Putih pada background gelap
- **Monochrome Logo**: Single color untuk aplikasi khusus
- **Icon Only**: Untuk aplikasi dengan space terbatas

## 3. Color Palette

### 3.1 Primary Brand Colors

#### Primary Blue - Main Brand Color
```
Hex: #4A90E2
RGB: 74, 144, 226
CMYK: 67, 36, 0, 11
Pantone: 2925 C
```

**Penggunaan:**
- Header dan navigation
- Primary buttons dan CTAs
- Headings dan titles
- Brand accents dan borders
- Professional elements

**Makna:** Profesionalisme, kepercayaan, stabilitas, keandalan

#### Secondary Gold - Accent Color
```
Hex: #D4AF37
RGB: 212, 175, 55
CMYK: 0, 17, 74, 17
Pantone: 7555 C
```

**Penggunaan:**
- Secondary buttons dan highlights
- Call-to-action elements
- Creative accents dan decorations
- Hover states dan interactions
- Prestise dan emphasis elements

**Makna:** Kreativitas, prestise, inovasi, optimisme

### 3.2 Extended Color Palette

#### Primary Blue Variations
```
--blue-50: #eff6ff   (Lightest - backgrounds)
--blue-100: #dbeafe  (Very light - subtle backgrounds)
--blue-200: #bfdbfe  (Light - borders, dividers)
--blue-300: #93c5fd  (Medium light - inactive states)
--blue-400: #60a5fa  (Medium - secondary text)
--blue-500: #4A90E2  (Primary brand color)
--blue-600: #2563eb  (Medium dark - active states)
--blue-700: #1d4ed8  (Dark - headings)
--blue-800: #1e40af  (Very dark - emphasis)
--blue-900: #1e3a8a  (Darkest - maximum contrast)
```

#### Secondary Gold Variations
```
--gold-50: #fefce8   (Lightest - backgrounds)
--gold-100: #fef9c3  (Very light - subtle highlights)
--gold-200: #fef08a  (Light - hover backgrounds)
--gold-300: #fde047  (Medium light - secondary accents)
--gold-400: #facc15  (Medium - secondary text)
--gold-500: #D4AF37  (Secondary gold - main accent)
--gold-600: #ca8a04  (Medium dark - active states)
--gold-700: #a16207  (Dark - pressed states)
--gold-800: #854d0e  (Very dark - emphasis)
--gold-900: #713f12  (Darkest - maximum contrast)
```

### 3.3 Neutral Colors
```
--white: #FFFFFF      (Pure white - backgrounds, text on dark)
--gray-50: #f9fafb    (Lightest gray - page backgrounds)
--gray-100: #f3f4f6   (Very light - card backgrounds)
--gray-200: #e5e7eb   (Light - borders, dividers)
--gray-300: #d1d5db   (Medium light - placeholders)
--gray-400: #9ca3af   (Medium - inactive text)
--gray-500: #6B7280   (Supporting gray - secondary text)
--gray-600: #4b5563   (Medium dark - body text)
--gray-700: #374151   (Dark - primary text)
--gray-800: #1f2937   (Very dark - headings)
--gray-900: #111827   (Darkest - maximum contrast)
--black: #000000      (Pure black - special emphasis)
```

### 3.4 Semantic Colors
```
/* Success - untuk feedback positif */
--success-50: #f0fff4
--success-500: #38a169
--success-600: #2f855a

/* Warning - untuk peringatan */
--warning-50: #fefce8
--warning-500: #D4AF37  (menggunakan gold brand)
--warning-600: #ca8a04

/* Error - untuk error states */
--error-50: #fed7d7
--error-500: #e53e3e
--error-600: #c53030

/* Info - untuk informasi */
--info-50: #eff6ff
--info-500: #4A90E2  (menggunakan blue brand)
--info-600: #2563eb
```

## 4. Color Usage Guidelines

### 4.1 Hierarchy & Contrast
- **Primary**: Primary Blue untuk elemen utama dan struktur
- **Accent**: Secondary Gold untuk highlights dan call-to-actions
- **Supporting**: Gray scale untuk content dan supporting elements
- Pastikan contrast ratio minimum 4.5:1 untuk accessibility

### 4.2 Background Combinations
```
/* Recommended Background Combinations */

/* Light Backgrounds */
- White background + Blue text + Gold accents
- Gray-50 background + Gray-700 text + Blue headings
- Gray-100 background + Gray-600 text + Gold highlights

/* Dark Backgrounds */
- Blue-900 background + White text + Gold accents
- Blue-800 background + Gray-100 text + Gold highlights
- Gray-800 background + White text + Blue accents

/* Accent Backgrounds */
- Gold-50 background + Gray-700 text + Blue accents
- Blue-50 background + Blue-700 text + Gold highlights
```

### 4.3 Interactive Elements
```
/* Button States */
Primary Button:
- Default: Blue-500 background, White text
- Hover: Blue-600 background
- Active: Blue-700 background
- Disabled: Gray-300 background, Gray-500 text

Secondary Button:
- Default: Gold-500 background, White text
- Hover: Gold-600 background
- Active: Gold-700 background
- Disabled: Gray-300 background, Gray-500 text

Outline Button:
- Default: Transparent background, Blue-500 border and text
- Hover: Blue-50 background
- Active: Blue-100 background
```

## 5. Typography Integration

### 5.1 Color Application
```
/* Heading Colors */
.heading-1, .heading-2 { color: var(--blue-900); }
.heading-3, .heading-4 { color: var(--blue-800); }
.heading-accent { color: var(--gold-500); }

/* Body Text Colors */
.text-primary { color: var(--gray-700); }
.text-secondary { color: var(--gray-600); }
.text-muted { color: var(--gray-500); }
.text-inverse { color: var(--white); }

/* Special Text */
.text-brand { color: var(--blue-500); }
.text-accent { color: var(--gold-500); }
.text-success { color: var(--success-600); }
.text-warning { color: var(--warning-600); }
.text-error { color: var(--error-600); }
```

## 6. Implementation Guidelines

### 6.1 CSS Custom Properties
Semua warna harus didefinisikan sebagai CSS custom properties di root level:

```css
:root {
  /* Navy Blue Scale */
  --navy-50: #f0f4f8;
  --navy-900: #1a365d;
  
  /* Orange Scale */
  --orange-50: #fffaf0;
  --orange-400: #ed8936;
  
  /* Neutral Scale */
  --white: #ffffff;
  --gray-700: #2d3748;
}
```

### 6.2 Tailwind CSS Configuration
Untuk project yang menggunakan Tailwind CSS, extend color palette:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          900: '#1a365d',
        },
        orange: {
          50: '#fffaf0',
          400: '#ed8936',
        }
      }
    }
  }
}
```

### 6.3 Accessibility Considerations
- Selalu test contrast ratio menggunakan tools seperti WebAIM
- Jangan hanya mengandalkan warna untuk menyampaikan informasi
- Sediakan alternative text dan labels yang descriptive
- Test dengan color blindness simulators

## 7. Brand Applications

### 7.1 Website & Digital
- Header: Navy background dengan white text
- Navigation: Navy dengan orange hover states
- CTAs: Orange primary, navy secondary
- Content areas: White/gray backgrounds dengan navy text

### 7.2 Marketing Materials
- Brochures: Navy sebagai primary dengan orange accents
- Business cards: Navy background atau white dengan navy text
- Presentations: Navy headers dengan orange highlights

### 7.3 Event Materials
- Banners: Navy background dengan white/orange text
- Booth design: Navy struktur dengan orange accents
- Signage: High contrast navy/white atau orange/white

## 8. Do's and Don'ts

### 8.1 Do's
✅ Gunakan navy sebagai primary color untuk struktur dan hierarchy
✅ Gunakan orange sebagai accent untuk highlights dan CTAs
✅ Maintain consistent contrast ratios
✅ Test semua color combinations untuk accessibility
✅ Gunakan neutral grays untuk supporting content

### 8.2 Don'ts
❌ Jangan gunakan orange sebagai primary color untuk large areas
❌ Jangan mix navy dengan colors yang competing
❌ Jangan gunakan low contrast combinations
❌ Jangan modify brand colors tanpa approval
❌ Jangan gunakan gradients yang tidak sesuai brand guidelines

---

*Narvex Brand Guidelines - Memastikan konsistensi visual yang kuat di semua touchpoints untuk membangun brand recognition dan trust yang optimal.*