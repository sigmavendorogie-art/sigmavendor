const fs = require('fs');
const path = require('path');

const VENDORS_FILE = path.join(__dirname, '../data/vendors.json');
const LOGOS_DIR = path.join(__dirname, '../public/images/company-logos');

// Read vendors.json
const vendors = JSON.parse(fs.readFileSync(VENDORS_FILE, 'utf8'));

// Get all logo files from the directory (supports .png, .jpg, .jpeg, .svg)
function getLogoFiles() {
  if (!fs.existsSync(LOGOS_DIR)) {
    console.error(`❌ Logo directory not found: ${LOGOS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(LOGOS_DIR);
  const logoFiles = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.svg'].includes(ext);
    })
    .sort((a, b) => {
      // Sort by number in filename (logo-1.png, logo-2.png, etc.)
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    })
    .map(file => `/images/company-logos/${file}`);

  return logoFiles;
}

// Get all available logos
const logos = getLogoFiles();

if (logos.length === 0) {
  console.error('❌ No logo files found in', LOGOS_DIR);
  console.log('📁 Please add logo files (PNG, JPG, or SVG) to this directory');
  process.exit(1);
}

console.log(`📸 Found ${logos.length} logo files:`);
logos.forEach((logo, i) => console.log(`   ${i + 1}. ${logo}`));

// Simulate the same logic as homepage to find featured agencies
// Featured agencies are those with: isSigmaRemotePartner OR SigmaVerified OR PayrollReady
function getFeaturedAgencies(agencies) {
  return agencies
    .filter(
      (agency) =>
        agency.isSigmaRemotePartner ||
        (agency.certifications && (
          agency.certifications.includes("SigmaVerified") ||
          agency.certifications.includes("PayrollReady")
        ))
    )
    .slice(0, 6);
}

// Get featured agencies (first 6 that will appear on landing page)
const featuredAgencies = getFeaturedAgencies(vendors);

console.log(`\n🌟 Found ${featuredAgencies.length} featured agencies for landing page:`);
featuredAgencies.forEach((agency, i) => {
  console.log(`   ${i + 1}. ${agency.name} (${agency.id})`);
});

// Shuffle logos array for random assignment
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Ensure we have at least as many logos as featured agencies
if (logos.length < featuredAgencies.length) {
  console.warn(`⚠️  Warning: Only ${logos.length} logos but ${featuredAgencies.length} featured agencies. Some will repeat.`);
}

// Create a map to track which logos are assigned
const assignedLogos = new Map();

// First, assign unique logos to featured agencies (first 6 on landing page)
const shuffledLogos = shuffleArray(logos);
featuredAgencies.forEach((agency, index) => {
  // Use modulo to cycle if we have fewer logos than featured agencies
  const logoIndex = index % shuffledLogos.length;
  const logo = shuffledLogos[logoIndex];
  assignedLogos.set(agency.id, logo);
  console.log(`   ✓ Assigned ${logo} to featured agency: ${agency.name}`);
});

// Then assign logos to all other vendors
vendors.forEach((vendor) => {
  if (!assignedLogos.has(vendor.id)) {
    // For non-featured agencies, use random assignment
    const randomIndex = Math.floor(Math.random() * logos.length);
    assignedLogos.set(vendor.id, logos[randomIndex]);
  }
  vendor.logoUrl = assignedLogos.get(vendor.id);
});

// Write updated vendors.json
fs.writeFileSync(VENDORS_FILE, JSON.stringify(vendors, null, 2), 'utf8');

console.log(`\n✅ Assigned logos to ${vendors.length} vendors`);
console.log(`   - ${featuredAgencies.length} featured agencies got unique logos (first 6 on landing page)`);
console.log(`   - ${vendors.length - featuredAgencies.length} other agencies got random logos`);
console.log(`📝 Updated ${VENDORS_FILE}`);
