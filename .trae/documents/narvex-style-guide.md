# Narvex Style Guide & Design System

## 1. Brand Overview
Narvex adalah perusahaan creative services yang mengkhususkan diri dalam branding, event production, dan digital marketing. Brand identity harus mencerminkan profesionalisme, kreativitas, dan inovasi dengan pendekatan yang modern dan sophisticated.

## 2. Color Palette

### 2.1 Primary Colors
```css
/* Navy Blue - Primary Brand Color */
--navy-50: #f0f4f8;
--navy-100: #d9e2ec;
--navy-200: #bcccdc;
--navy-300: #9fb3c8;
--navy-400: #829ab1;
--navy-500: #627d98;
--navy-600: #486581;
--navy-700: #334e68;
--navy-800: #243b53;
--navy-900: #1a365d; /* Primary */

/* Orange - Accent Color */
--orange-50: #fffaf0;
--orange-100: #feebc8;
--orange-200: #fbd38d;
--orange-300: #f6ad55;
--orange-400: #ed8936; /* Primary Accent */
--orange-500: #dd6b20;
--orange-600: #c05621;
--orange-700: #9c4221;
--orange-800: #7b341e;
--orange-900: #652b19;
```

### 2.2 Neutral Colors
```css
/* Gray Scale */
--gray-50: #f7fafc;
--gray-100: #edf2f7;
--gray-200: #e2e8f0;
--gray-300: #cbd5e0;
--gray-400: #a0aec0;
--gray-500: #718096;
--gray-600: #4a5568;
--gray-700: #2d3748;
--gray-800: #1a202c;
--gray-900: #171923;

/* Pure Colors */
--white: #ffffff;
--black: #000000;
```

### 2.3 Semantic Colors
```css
/* Success */
--success-50: #f0fff4;
--success-500: #38a169;
--success-600: #2f855a;

/* Warning */
--warning-50: #fffbeb;
--warning-500: #ed8936;
--warning-600: #dd6b20;

/* Error */
--error-50: #fed7d7;
--error-500: #e53e3e;
--error-600: #c53030;

/* Info */
--info-50: #ebf8ff;
--info-500: #3182ce;
--info-600: #2c5282;
```

## 3. Typography

### 3.1 Font Families
```css
/* Primary Font - Headings */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary Font - Body Text */
--font-secondary: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Code */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### 3.2 Font Scales
```css
/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
--text-8xl: 6rem;      /* 96px */
--text-9xl: 8rem;      /* 128px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weights */
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

### 3.3 Typography Classes
```css
/* Heading Styles */
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--navy-900);
}

.heading-2 {
  font-family: var(--font-primary);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--navy-900);
}

.heading-3 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--navy-900);
}

.heading-4 {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--navy-900);
}

/* Body Text Styles */
.body-large {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-700);
}

.body-normal {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-700);
}

.body-small {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-600);
}

/* Special Text Styles */
.text-accent {
  color: var(--orange-500);
}

.text-muted {
  color: var(--gray-500);
}

.text-inverse {
  color: var(--white);
}
```

## 4. Spacing System

### 4.1 Spacing Scale
```css
/* Spacing Values */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
--space-40: 10rem;    /* 160px */
--space-48: 12rem;    /* 192px */
--space-56: 14rem;    /* 224px */
--space-64: 16rem;    /* 256px */
```

### 4.2 Layout Spacing
```css
/* Section Spacing */
.section-padding {
  padding-top: var(--space-20);
  padding-bottom: var(--space-20);
}

.section-padding-large {
  padding-top: var(--space-32);
  padding-bottom: var(--space-32);
}

/* Container Spacing */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}

/* Component Spacing */
.card-padding {
  padding: var(--space-8);
}

.button-padding {
  padding: var(--space-4) var(--space-8);
}
```

## 5. Component Styles

### 5.1 Buttons
```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: var(--text-base);
  padding: var(--space-4) var(--space-8);
}

/* Primary Button */
.btn-primary {
  background-color: var(--orange-500);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--orange-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--navy-900);
  color: var(--white);
}

.btn-secondary:hover {
  background-color: var(--navy-800);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26, 54, 93, 0.3);
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  color: var(--navy-900);
  border: 2px solid var(--navy-900);
}

.btn-outline:hover {
  background-color: var(--navy-900);
  color: var(--white);
}

/* Ghost Button */
.btn-ghost {
  background-color: transparent;
  color: var(--orange-500);
  border: 2px solid transparent;
}

.btn-ghost:hover {
  background-color: var(--orange-50);
  border-color: var(--orange-200);
}

/* Button Sizes */
.btn-small {
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-6);
}

.btn-large {
  font-size: var(--text-lg);
  padding: var(--space-5) var(--space-12);
}
```

### 5.2 Cards
```css
/* Base Card */
.card {
  background-color: var(--white);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* Service Card */
.service-card {
  padding: var(--space-8);
  text-align: center;
  border: 1px solid var(--gray-200);
}

.service-card:hover {
  border-color: var(--orange-300);
  box-shadow: 0 10px 30px rgba(237, 137, 54, 0.1);
}

/* Portfolio Card */
.portfolio-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.portfolio-card .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(26, 54, 93, 0.8), rgba(237, 137, 54, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolio-card:hover .overlay {
  opacity: 1;
}
```

### 5.3 Forms
```css
/* Form Elements */
.form-input {
  width: 100%;
  padding: var(--space-4);
  border: 2px solid var(--gray-300);
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--orange-500);
  box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.1);
}

.form-input::placeholder {
  color: var(--gray-500);
}

/* Form Labels */
.form-label {
  display: block;
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  color: var(--navy-900);
  margin-bottom: var(--space-2);
}

/* Form Groups */
.form-group {
  margin-bottom: var(--space-6);
}

/* Error States */
.form-input.error {
  border-color: var(--error-500);
}

.form-error {
  color: var(--error-500);
  font-size: var(--text-sm);
  margin-top: var(--space-1);
}
```

## 6. Layout & Grid System

### 6.1 Breakpoints
```css
/* Responsive Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### 6.2 Grid System
```css
/* Grid Container */
.grid {
  display: grid;
  gap: var(--space-6);
}

/* Grid Columns */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive Grid */
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
```

## 7. Shadows & Effects

### 7.1 Box Shadows
```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

/* Colored Shadows */
--shadow-orange: 0 10px 30px rgba(237, 137, 54, 0.2);
--shadow-navy: 0 10px 30px rgba(26, 54, 93, 0.2);
```

### 7.2 Gradients
```css
/* Brand Gradients */
.gradient-primary {
  background: linear-gradient(135deg, var(--navy-900), var(--navy-700));
}

.gradient-accent {
  background: linear-gradient(135deg, var(--orange-500), var(--orange-400));
}

.gradient-hero {
  background: linear-gradient(135deg, 
    rgba(26, 54, 93, 0.9), 
    rgba(237, 137, 54, 0.8)
  );
}

.gradient-overlay {
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(0, 0, 0, 0.6) 100%
  );
}
```

## 8. Animation & Transitions

### 8.1 Transition Timing
```css
/* Transition Durations */
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.5s;

/* Easing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 8.2 Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

## 9. Icons & Imagery

### 9.1 Icon Guidelines
- **Style**: Outline icons dengan stroke width 2px
- **Size**: 16px, 20px, 24px, 32px, 48px
- **Color**: Mengikuti color palette (navy, orange, gray)
- **Library**: Heroicons, Feather Icons, atau Lucide

### 9.2 Image Guidelines
- **Aspect Ratios**: 16:9 untuk hero images, 4:3 untuk portfolio, 1:1 untuk avatars
- **Quality**: High resolution dengan optimasi untuk web
- **Format**: WebP dengan fallback ke JPEG
- **Treatment**: Subtle overlays untuk text readability

## 10. Accessibility

### 10.1 Color Contrast
- **Text pada background putih**: Minimum contrast ratio 4.5:1
- **Large text**: Minimum contrast ratio 3:1
- **Interactive elements**: Clear focus states dengan outline

### 10.2 Typography Accessibility
- **Minimum font size**: 16px untuk body text
- **Line height**: Minimum 1.5 untuk readability
- **Font weight**: Minimum 400 untuk body text

### 10.3 Interactive Elements
- **Touch targets**: Minimum 44px untuk mobile
- **Focus indicators**: Visible dan consistent
- **Alt text**: Descriptive untuk semua images

## 11. Implementation Guidelines

### 11.1 CSS Custom Properties
```css
:root {
  /* Import semua custom properties di atas */
  /* Gunakan untuk consistency across components */
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Override colors untuk dark mode */
  }
}
```

### 11.2 Utility Classes
```css
/* Spacing Utilities */
.mt-4 { margin-top: var(--space-4); }
.mb-8 { margin-bottom: var(--space-8); }
.p-6 { padding: var(--space-6); }

/* Text Utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Display Utilities */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

/* Responsive Utilities */
@media (min-width: 768px) {
  .md\:block { display: block; }
  .md\:hidden { display: none; }
}
```

Style guide ini harus digunakan secara konsisten di seluruh website Narvex untuk memastikan brand identity yang kuat dan user experience yang cohesive.