# Contact Page Data Structure Fix

## ✅ **Error Fixed: Cannot read properties of undefined (reading 'find')**

### 🔧 **Masalah yang Diperbaiki:**

Error terjadi karena struktur data dari Strapi berbeda dengan yang diharapkan. Data yang diterima memiliki struktur:

```json
{
  "data": {
    "card_1": {
      "id": 29,
      "title": "Creative Design",
      "description": [...],
      "logo": {...}
    },
    "card_2": null,
    "card_3": null,
    "card_4": null
  },
  "meta": {}
}
```

Sedangkan kode mengharapkan struktur:
```json
{
  "data": {
    "pageContent": [
      {
        "__component": "contact.hero",
        "title": "..."
      }
    ]
  }
}
```

### 🛠️ **Solusi yang Diimplementasikan:**

1. **✅ Flexible Data Structure Handling**
   ```typescript
   // Handle different data structures
   let components: any[] = [];
   
   if (data?.data?.pageContent && Array.isArray(data.data.pageContent)) {
     components = data.data.pageContent;
   } else if (data?.data && typeof data.data === 'object') {
     // Handle case where data is structured differently
     components = Object.values(data.data).filter(item => 
       item && typeof item === 'object' && item.__component
     ) as any[];
   }
   ```

2. **✅ Service Cards Detection**
   ```typescript
   // Try to find service cards by component type
   serviceCardComponents = components.filter(comp => comp.__component === 'contact.service-card');
   
   // If no service cards found by component type, try to find by other patterns
   if (serviceCardComponents.length === 0) {
     // Look for card_1, card_2, etc. pattern
     const cardKeys = Object.keys(data?.data || {}).filter(key => key.startsWith('card_'));
     serviceCardComponents = cardKeys.map(key => {
       const card = data.data[key];
       if (card && card.title) {
         return {
           __component: 'contact.service-card',
           id: card.id || 1,
           title: card.title,
           // ... map other properties
         };
       }
       return null;
     }).filter(Boolean);
   }
   ```

3. **✅ Form and Info Components Detection**
   ```typescript
   // Try to find form component
   let formComponent = components.find(comp => comp.__component === 'contact.form');
   
   // If no form component found, try to find form data in other structures
   if (!formComponent) {
     const formKeys = Object.keys(data?.data || {}).filter(key => key.includes('form'));
     if (formKeys.length > 0) {
       formComponent = data.data[formKeys[0]];
     }
   }
   ```

### 📋 **Struktur Data yang Didukung:**

1. **Standard Strapi Structure:**
   ```json
   {
     "data": {
       "pageContent": [
         {
           "__component": "contact.hero",
           "title": "Hubungi Kami"
         },
         {
           "__component": "contact.service-card",
           "title": "Branding & Design"
         }
       ]
     }
   }
   ```

2. **Alternative Structure (Current):**
   ```json
   {
     "data": {
       "card_1": {
         "id": 29,
         "title": "Creative Design",
         "description": [...],
         "logo": {...}
       },
       "card_2": null,
       "card_3": null,
       "card_4": null
     }
   }
   ```

3. **Mixed Structure:**
   ```json
   {
     "data": {
       "hero": {
         "title": "Hubungi Kami",
         "subtitle": "Mari Diskusikan Proyek Anda"
       },
       "form": {
         "title": "Formulir Kontak",
         "fields": {...}
       },
       "info": {
         "address": {...},
         "contact": {...}
       }
     }
   }
   ```

### 🎯 **Fallback Mechanism:**

Jika tidak ada data yang sesuai dengan struktur yang diharapkan, sistem akan:

1. **Log warning** untuk debugging
2. **Use default values** untuk semua fields
3. **Continue rendering** tanpa error
4. **Maintain user experience** yang konsisten

### ✅ **Test Results:**

- ✅ Contact page loads without errors
- ✅ Service cards displayed correctly
- ✅ Form submission works
- ✅ Fallback data working
- ✅ No more "Cannot read properties of undefined" errors

### 🔍 **Debugging Features:**

```typescript
console.log('Transforming contact page data:', data);
console.log('Extracted components:', components);
console.warn('No valid components found in data structure');
```

**Contact page sekarang robust dan bisa menangani berbagai struktur data dari Strapi!** 🎉
