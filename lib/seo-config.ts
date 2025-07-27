// SEO Configuration for PDF Image Size Detector
export const seoConfig = {
  // Website Information
  siteName: "PDF Image Size Detector",
  siteUrl: "https://your-vercel-app-url.vercel.app", // Update with your actual URL
  title: "PDF Image Size Detector - Extract & Analyze PDF Images Online",
  description:
    "Free online tool to extract images from PDF files and analyze their dimensions, format, file size, and aspect ratio. Fast, secure, and easy to use PDF image extractor.",

  // Author Information
  author: {
    name: "Your Name", // Update with your name
    github: "https://github.com/yourusername", // Update with your GitHub URL
    twitter: "@yourtwitterhandle", // Update with your Twitter handle
    linkedin: "https://linkedin.com/in/yourprofile", // Update with your LinkedIn
    website: "https://yourwebsite.com", // Update with your personal website
  },

  // SEO Keywords
  keywords: [
    "PDF image extractor",
    "PDF to image converter",
    "image size detector",
    "PDF image analysis",
    "extract images from PDF",
    "PDF tools",
    "image dimensions",
    "aspect ratio calculator",
    "PDF image viewer",
    "online PDF tools",
    "image format detector",
    "PDF processing",
    "web application",
    "free PDF tools",
  ],

  // Open Graph Configuration
  openGraph: {
    type: "website",
    locale: "en_US",
    image: {
      url: "/og-image.png", // Create this image (1200x630px)
      width: 1200,
      height: 630,
      alt: "PDF Image Size Detector - Extract and analyze PDF images",
    },
  },

  // Twitter Configuration
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle", // Update with your Twitter handle
    creator: "@yourtwitterhandle", // Update with your Twitter handle
  },

  // Analytics
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // Replace with your GA4 measurement ID
    googleSearchConsole: "your-verification-code", // Replace with your verification code
  },

  // Additional Configuration
  themeColor: "#3b82f6",
  backgroundColor: "#ffffff",
  category: "productivity",
};

// Feature list for structured data
export const features = [
  "Extract images from PDF files",
  "Analyze image dimensions (width × height)",
  "Detect image format (PNG, JPEG, GIF, etc.)",
  "Identify color mode (RGB, CMYK, Grayscale)",
  "Calculate file size in bytes, KB, MB",
  "Compute aspect ratio automatically",
  "Preview extracted images",
  "Drag and drop file upload",
  "No file upload limits",
  "Privacy-focused processing",
  "Works offline after loading",
  "Mobile-responsive design",
  "Fast processing with multiple extraction methods",
  "Support for complex PDF structures",
  "Base64 image encoding for instant preview",
];

// JSON-LD structured data
export const getStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: seoConfig.siteName,
  description: seoConfig.description,
  url: seoConfig.siteUrl,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  browserRequirements: "Modern web browser with JavaScript enabled",
  permissions: "File upload and processing",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Person",
    name: seoConfig.author.name,
    url: seoConfig.author.github,
    sameAs: [
      seoConfig.author.github,
      seoConfig.author.linkedin,
      `https://twitter.com/${seoConfig.author.twitter.replace("@", "")}`,
    ],
  },
  publisher: {
    "@type": "Organization",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
  },
  potentialAction: {
    "@type": "UseAction",
    target: seoConfig.siteUrl,
    object: {
      "@type": "DigitalDocument",
      name: "PDF File",
      encodingFormat: "application/pdf",
    },
  },
  featureList: features,
  screenshot: `${seoConfig.siteUrl}/screenshot-desktop.png`,
  softwareVersion: "1.0.0",
  dateCreated: "2025-01-27",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
  isAccessibleForFree: true,
  isFamilyFriendly: true,
});

export default seoConfig;
