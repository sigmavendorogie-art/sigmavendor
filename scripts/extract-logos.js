const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image dimensions: 1920x960
// Assuming a grid layout - let's try 6 columns x 5 rows = 30 logos
// Each logo would be approximately 320x192 pixels

const IMAGE_PATH = path.join(__dirname, '../public/images/companies-mix/vecteezy_set-of-abstract-letter-a-z-monogram-logo-design-icons-for_17597558.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/images/company-logos');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function extractLogos() {
  try {
    const image = sharp(IMAGE_PATH);
    const metadata = await image.metadata();
    
    console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);
    
    // Grid configuration: 6 columns, 5 rows
    const cols = 6;
    const rows = 5;
    const logoWidth = Math.floor(metadata.width / cols);
    const logoHeight = Math.floor(metadata.height / rows);
    
    console.log(`Extracting ${cols * rows} logos, each ${logoWidth}x${logoHeight}`);
    
    const extractedLogos = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const left = col * logoWidth;
        const top = row * logoHeight;
        
        // Ensure we don't go out of bounds
        const actualWidth = Math.min(logoWidth, metadata.width - left);
        const actualHeight = Math.min(logoHeight, metadata.height - top);
        
        const logoIndex = row * cols + col;
        const outputPath = path.join(OUTPUT_DIR, `logo-${logoIndex + 1}.png`);
        
        await image
          .clone()
          .extract({
            left,
            top,
            width: actualWidth,
            height: actualHeight
          })
          .png()
          .toFile(outputPath);
        
        extractedLogos.push(`/images/company-logos/logo-${logoIndex + 1}.png`);
        console.log(`Extracted logo ${logoIndex + 1} to ${outputPath}`);
      }
    }
    
    console.log(`\nExtracted ${extractedLogos.length} logos successfully!`);
    return extractedLogos;
  } catch (error) {
    console.error('Error extracting logos:', error);
    throw error;
  }
}

// Run the extraction
extractLogos()
  .then((logos) => {
    console.log('\nLogo paths:', logos);
  })
  .catch((error) => {
    console.error('Failed to extract logos:', error);
    process.exit(1);
  });

