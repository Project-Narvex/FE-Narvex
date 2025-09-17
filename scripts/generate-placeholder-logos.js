const fs = require('fs');
const path = require('path');

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Brand data with colors and styles
const brands = [
  // Government & Public Institutions
  { name: 'BPR-RI', filename: 'bpr-ri.png', text: 'BPR-RI', color: '#1e40af' },
  { name: 'Bank Indonesia', filename: 'bank-indonesia.png', text: 'BI', color: '#1e40af' },
  { name: 'Kominfo', filename: 'kominfo.png', text: 'KOMINFO', color: '#1e40af' },
  { name: 'Kementerian Perhubungan RI', filename: 'kemenhub.png', text: 'KEMENHUB', color: '#1e40af' },
  { name: 'Universitas Indonesia', filename: 'ui.png', text: 'UI', color: '#fbbf24' },
  
  // Educational & Government Institutions
  { name: 'DPM-PTSP', filename: 'dpm-ptsp.png', text: 'DPM-PTSP', color: '#1e40af' },
  { name: 'Basarnas', filename: 'basarnas.png', text: 'BASARNAS', color: '#dc2626' },
  { name: 'Universitas Airlangga', filename: 'unair.png', text: 'UNAIR', color: '#1e40af' },
  { name: 'ITB', filename: 'itb.png', text: 'ITB', color: '#1e40af' },
  { name: 'Universitas Gadjah Mada', filename: 'ugm.png', text: 'UGM', color: '#fbbf24' },
  { name: 'SD Muhammadiyah 1-3 Taman', filename: 'sd-muhammadiyah.png', text: 'SD MUH', color: '#059669' },
  
  // Corporate Brands
  { name: 'Puma', filename: 'puma.png', text: 'PUMA', color: '#000000' },
  { name: 'Camping', filename: 'camping.png', text: 'CAMPING', color: '#059669' },
  { name: 'Erajaya', filename: 'erajaya.png', text: 'ERAJAYA', color: '#dc2626' },
  { name: 'Erafone & More', filename: 'erafone.png', text: 'ERAFONE', color: '#dc2626' },
  { name: 'Badminton', filename: 'badminton.png', text: 'BADMINTON', color: '#1e40af' },
  
  // Corporate & Commercial Brands
  { name: 'Jaya Land', filename: 'jaya-land.png', text: 'JAYA', color: '#059669' },
  { name: 'RGH', filename: 'rgh.png', text: 'RGH', color: '#1e40af' },
  { name: 'Plaza Indonesia', filename: 'plaza-indonesia.png', text: 'PLAZA', color: '#fbbf24' },
  { name: 'DGW', filename: 'dgw.png', text: 'DGW', color: '#1e40af' },
  { name: 'SAW.four', filename: 'saw-four.png', text: 'SAW.4', color: '#000000' },
  { name: 'Jigg Vape', filename: 'jigg-vape.png', text: 'JIGG', color: '#7c3aed' }
];

// Generate SVG logos
brands.forEach(brand => {
  const svg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="${brand.color}" rx="10"/>
  <text x="100" y="110" font-family="Arial, sans-serif" font-size="${brand.text.length > 6 ? '24' : '32'}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${brand.text}
  </text>
</svg>`;
  
  // Convert SVG to PNG-like format (we'll save as SVG but with PNG extension for compatibility)
  const filePath = path.join(logosDir, brand.filename.replace('.png', '.svg'));
  fs.writeFileSync(filePath, svg);
  
  console.log(`Generated logo for ${brand.name}`);
});

console.log('\nAll placeholder logos generated successfully!');
console.log('\nTo add real logos:');
console.log('1. Replace the SVG files in public/logos/ with actual PNG/SVG logo files');
console.log('2. Keep the same filenames for automatic replacement');
console.log('3. Recommended size: 200x200px or larger, transparent background');
console.log('4. The logos will be automatically inverted to white for visibility on dark backgrounds');