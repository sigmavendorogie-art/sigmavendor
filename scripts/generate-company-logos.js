const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/company-logos');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generic company logo SVGs - abstract, professional designs
// These are demo logos that don't represent real companies
const logoDesigns = [
  // Geometric abstract designs
  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <circle cx="160" cy="96" r="60" fill="url(#grad1)"/>
    <circle cx="160" cy="96" r="40" fill="white" opacity="0.3"/>
  </svg>`,
  
  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="100" y="46" width="120" height="100" rx="20" fill="url(#grad2)"/>
    <rect x="120" y="66" width="80" height="60" rx="10" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <polygon points="160,36 220,146 100,146" fill="url(#grad3)"/>
    <polygon points="160,66 190,126 130,126" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fa709a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fee140;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <ellipse cx="160" cy="96" rx="70" ry="50" fill="url(#grad4)"/>
    <ellipse cx="160" cy="96" rx="50" ry="35" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#30cfd0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#330867;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <path d="M 80 96 L 160 46 L 240 96 L 200 146 L 120 146 Z" fill="url(#grad5)"/>
    <path d="M 120 96 L 160 66 L 200 96 L 180 126 L 140 126 Z" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#a8edea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fed6e3;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="90" y="56" width="140" height="80" rx="15" fill="url(#grad6)"/>
    <rect x="110" y="76" width="100" height="40" rx="8" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9a9e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fecfef;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <circle cx="130" cy="96" r="35" fill="url(#grad7)"/>
    <circle cx="190" cy="96" r="35" fill="url(#grad7)"/>
    <circle cx="160" cy="96" r="25" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffecd2;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fcb69f;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="100" y="66" width="120" height="60" rx="30" fill="url(#grad8)"/>
    <rect x="120" y="76" width="80" height="40" rx="20" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6e7f;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#bfe9ff;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <polygon points="160,46 240,146 160,146 80,146" fill="url(#grad9)"/>
    <polygon points="160,76 210,126 160,126 110,126" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad10" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#c471f5;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fa71cd;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <ellipse cx="160" cy="96" rx="80" ry="60" fill="url(#grad10)"/>
    <ellipse cx="160" cy="96" rx="55" ry="40" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad11" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fbc2eb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#a6c1ee;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="80" y="56" width="160" height="80" rx="10" fill="url(#grad11)"/>
    <rect x="100" y="76" width="120" height="40" rx="5" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad12" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#84fab0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8fd3f4;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <path d="M 160 36 Q 240 96 160 156 Q 80 96 160 36" fill="url(#grad12)"/>
    <path d="M 160 66 Q 210 96 160 126 Q 110 96 160 66" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad13" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9a56;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ff6a88;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <circle cx="110" cy="96" r="40" fill="url(#grad13)"/>
    <circle cx="210" cy="96" r="40" fill="url(#grad13)"/>
    <rect x="110" y="56" width="100" height="80" rx="40" fill="url(#grad13)"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad14" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#a1c4fd;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#c2e9fb;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <polygon points="160,36 240,96 200,156 120,156 80,96" fill="url(#grad14)"/>
    <polygon points="160,66 210,96 180,126 140,126 110,96" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad15" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffecd2;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fcb69f;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="90" y="46" width="140" height="100" rx="20" fill="url(#grad15)"/>
    <circle cx="160" cy="96" r="30" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad16" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <ellipse cx="160" cy="96" rx="90" ry="50" fill="url(#grad16)"/>
    <ellipse cx="160" cy="96" rx="60" ry="35" fill="white" opacity="0.3"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad17" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <path d="M 80 96 L 160 46 L 240 96 L 220 146 L 100 146 Z" fill="url(#grad17)"/>
    <circle cx="160" cy="96" r="25" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad18" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <rect x="100" y="56" width="120" height="80" rx="15" fill="url(#grad18)"/>
    <polygon points="160,66 200,96 160,126 120,96" fill="white" opacity="0.4"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad19" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fa709a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#fee140;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <circle cx="130" cy="96" r="40" fill="url(#grad19)"/>
    <circle cx="190" cy="96" r="40" fill="url(#grad19)"/>
    <rect x="130" y="56" width="60" height="80" rx="40" fill="url(#grad19)"/>
  </svg>`,

  `<svg width="320" height="192" viewBox="0 0 320 192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad20" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#30cfd0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#330867;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="192" fill="#f8fafc"/>
    <polygon points="160,36 240,96 200,146 120,146 80,96" fill="url(#grad20)"/>
    <circle cx="160" cy="96" r="30" fill="white" opacity="0.3"/>
  </svg>`
];

// Generate logo files
logoDesigns.forEach((svg, index) => {
  const logoNumber = index + 1;
  const filePath = path.join(OUTPUT_DIR, `logo-${logoNumber}.png`);
  
  // For now, save as SVG (we can convert to PNG later if needed)
  // Actually, let's save as SVG since they're vector and will scale better
  const svgPath = path.join(OUTPUT_DIR, `logo-${logoNumber}.svg`);
  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log(`Generated logo-${logoNumber}.svg`);
});

console.log(`\n✅ Generated ${logoDesigns.length} premium company logos!`);

