import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PDF Image Size Detector - Extract & Analyze PDF Images Online",
  description:
    "Free online tool to extract images from PDF files and analyze their dimensions, format, file size, and aspect ratio. Fast, secure, and easy to use PDF image extractor.",
  keywords:
    "PDF image extractor, PDF to image converter, image size detector, PDF image analysis, extract images from PDF, PDF tools, image dimensions, aspect ratio calculator",
  authors: [{ name: "Your Name", url: "https://github.com/yourusername" }],
  creator: "Your Name",
  publisher: "PDF Image Size Detector",
  robots: "index, follow",
  openGraph: {
    title: "PDF Image Size Detector - Extract & Analyze PDF Images",
    description:
      "Extract images from PDF files and get detailed information about dimensions, format, and file size. Free online PDF image analysis tool.",
    url: "https://your-vercel-app-url.vercel.app",
    siteName: "PDF Image Size Detector",
    type: "website",
    images: [
      {
        url: "https://your-vercel-app-url.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDF Image Size Detector - Extract and analyze PDF images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Image Size Detector - Extract & Analyze PDF Images",
    description:
      "Free online tool to extract images from PDF files and analyze their properties. Fast and secure PDF image extraction.",
    images: ["https://your-vercel-app-url.vercel.app/og-image.png"],
    creator: "@yourtwitterhandle",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://your-vercel-app-url.vercel.app" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta
          name="google-site-verification"
          content="your-google-verification-code"
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Analytics (replace with your tracking code) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics or other analytics code
              // gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
