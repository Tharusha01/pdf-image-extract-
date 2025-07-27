"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

interface ImageInfo {
  filename: string;
  width: number;
  height: number;
  format: string;
  mode: string;
  file_size: number;
  aspect_ratio: string;
  base64: string;
}

interface ProcessingResult {
  success: boolean;
  message: string;
  images: ImageInfo[];
  total_images: number;
}

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setProcessing(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      // Use different API endpoints for development and production
      const apiUrl =
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
          ? "/api/py/extract-images"
          : "/api/extract-images";

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "An error occurred while processing the PDF"
      );
    } finally {
      setProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with GitHub Link */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              PDF Image Size Detector
            </h1>
            <p className="text-lg text-gray-600">
              Extract images from PDFs and analyze their dimensions and
              properties
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Tharusha01/pdf-image-extract-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              aria-label="View source code on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </header>

        {/* Mobile GitHub Link */}
        <div className="md:hidden text-center mb-6">
          <a
            href="https://github.com/Tharusha01/pdf-image-extract-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            aria-label="View source code on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? "dragover" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            {isDragActive ? (
              <p className="text-lg text-blue-600">Drop the PDF here...</p>
            ) : (
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Drag & drop a PDF file here, or click to select
                </p>
                <p className="text-sm text-gray-500">Supports PDF files only</p>
              </div>
            )}
          </div>
        </div>

        {/* Processing Indicator */}
        {processing && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
            <div className="loading-spinner mb-4"></div>
            <p className="text-lg text-gray-600">
              Processing PDF and extracting images...
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Extraction Results
              </h2>
              <p className="text-gray-600">
                Found {results.total_images} images in the PDF
              </p>
            </div>

            {results.images.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-600">
                  No images found in this PDF
                </p>
              </div>
            ) : (
              <div className="image-grid">
                {results.images.map((image, index) => (
                  <div key={index} className="image-card">
                    <div className="mb-4">
                      <img
                        src={`data:image/${image.format.toLowerCase()};base64,${
                          image.base64
                        }`}
                        alt={image.filename}
                        className="w-full h-48 object-cover rounded border"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <span className="w-4 h-4 mr-2">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                        {image.filename}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Dimensions:</span>
                          <br />
                          {image.width} × {image.height} px
                        </div>
                        <div>
                          <span className="font-medium">Format:</span>
                          <br />
                          {image.format}
                        </div>
                        <div>
                          <span className="font-medium">Color Mode:</span>
                          <br />
                          {image.mode}
                        </div>
                        <div>
                          <span className="font-medium">File Size:</span>
                          <br />
                          {formatFileSize(image.file_size)}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Aspect Ratio:</span>{" "}
                          {image.aspect_ratio}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 bg-white rounded-lg">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-6 mb-4">
              <a
                href="https://github.com/Tharusha01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="GitHub Repository"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/yourtwitterhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-200"
                aria-label="X Profile"
              >
               <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                  href="https://www.linkedin.com/in/tharusha-nishajith-18b30919a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
                  aria-label="LinkedIn Profile"
              >
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Built with ❤️ using Next.js, Python Flask.
            </p>
            <p className="text-xs text-gray-400">
              © 2025 PDF Image Size Detector. Open source project available on
              GitHub. (Tharusha Wijerathna)
            </p>
          </div>
        </footer>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PDF Image Size Detector",
              description:
                "Free online tool to extract images from PDF files and analyze their dimensions, format, file size, and aspect ratio",
              url: "https://your-vercel-app-url.vercel.app",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Any",
              permissions: "Offline use",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Person",
                name: "Your Name",
                url: "https://github.com/yourusername",
              },
              potentialAction: {
                "@type": "UseAction",
                target: "https://your-vercel-app-url.vercel.app",
                object: {
                  "@type": "DigitalDocument",
                  name: "PDF File",
                  encodingFormat: "application/pdf",
                },
              },
              featureList: [
                "Extract images from PDF files",
                "Analyze image dimensions",
                "Detect image format and color mode",
                "Calculate file size and aspect ratio",
                "Preview extracted images",
                "No file upload limits",
                "Privacy-focused processing",
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}
