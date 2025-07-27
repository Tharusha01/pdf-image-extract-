# 📄🔍 PDF Image Size Detector

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pdf-image-size-detector)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/pdf-image-size-detector?style=social)](https://github.com/yourusername/pdf-image-size-detector)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/pdf-image-size-detector?style=social)](https://github.com/yourusername/pdf-image-size-detector/fork)
[![GitHub license](https://img.shields.io/github/license/yourusername/pdf-image-size-detector)](https://github.com/yourusername/pdf-image-size-detector/blob/main/LICENSE)

> 🚀 **Live Demo:** [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app)

A modern, fast, and user-friendly web application that extracts images from PDF files and provides detailed analysis of their properties. Built with Next.js, Python Flask, and optimized for Vercel deployment.

![PDF Image Size Detector Screenshot](https://your-vercel-app-url.vercel.app/screenshot-desktop.png)

## ✨ Features

### 🔧 Core Functionality

- **📄 PDF Image Extraction**: Extract all images from PDF files using multiple methods
- **📏 Comprehensive Analysis**: Get detailed information about each image:
  - Dimensions (width × height in pixels)
  - File format (PNG, JPEG, GIF, BMP, TIFF, WebP)
  - Color mode (RGB, CMYK, Grayscale, etc.)
  - File size (bytes, KB, MB)
  - Aspect ratio calculation
- **🖼️ Live Preview**: View extracted images with base64 encoding
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎯 User Experience

- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **⚡ Fast Processing**: Optimized extraction algorithms
- **🔒 Privacy-First**: No data stored on servers, client-side processing
- **📤 Drag & Drop**: Easy file upload with visual feedback
- **⏱️ Real-time Progress**: Loading indicators and status updates

### 🛠️ Technical Features

- **🔄 Multiple Extraction Methods**:
  - pdf2image for page-to-image conversion
  - PyPDF2 for embedded image extraction
- **🌐 SEO Optimized**: Complete meta tags, structured data, sitemap
- **📱 PWA Ready**: Web app manifest and offline support
- **🚀 Vercel Deployment**: Serverless functions with Python backend

## 🏗️ Tech Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Dropzone](https://react-dropzone.js.org/)** - File upload component
- **[Axios](https://axios-http.com/)** - HTTP client for API requests

### Backend

- **[Python Flask](https://flask.palletsprojects.com/)** - Lightweight web framework
- **[Pillow (PIL)](https://python-pillow.org/)** - Python image processing library
- **[PyPDF2](https://pypdf2.readthedocs.io/)** - PDF manipulation and parsing
- **[pdf2image](https://github.com/Belval/pdf2image)** - PDF to image conversion
- **[Flask-CORS](https://flask-cors.readthedocs.io/)** - Cross-Origin Resource Sharing

### Infrastructure

- **[Vercel](https://vercel.com/)** - Deployment and hosting
- **[Poppler](https://poppler.freedesktop.org/)** - PDF rendering engine (system dependency)

## 🚀 Quick Start

### 📋 Prerequisites

- Node.js 18+ and npm 8+
- Python 3.8+
- Git

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pdf-image-size-detector.git
   cd pdf-image-size-detector
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd api
   pip install -r requirements.txt
   ```

4. **Install Poppler (required for pdf2image)**

   **Windows:**

   ```bash
   # Download from: https://github.com/oschwartz10612/poppler-windows/releases/
   # Extract and add to PATH
   ```

   **macOS:**

   ```bash
   brew install poppler
   ```

   **Ubuntu/Debian:**

   ```bash
   sudo apt-get install poppler-utils
   ```

### 🏃‍♂️ Development

1. **Start the backend API**

   ```bash
   cd api
   python app.py
   ```

2. **Start the frontend (in a new terminal)**

   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### 🚀 Deployment

#### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pdf-image-size-detector)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Vercel auto-detects Next.js and Python configuration
   - Deploy with one click!

## 📊 API Documentation

### Endpoints

#### `GET /health`

Health check endpoint with dependency status.

**Response:**

```json
{
  "status": "healthy",
  "message": "PDF Image Size Detector API is running",
  "dependencies": {
    "PIL": true,
    "PyPDF2": true,
    "pdf2image": true
  }
}
```

#### `POST /extract-images`

Extract images from uploaded PDF file.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: PDF file with key `pdf`

**Response:**

```json
{
  "success": true,
  "message": "Successfully extracted 3 images",
  "total_images": 3,
  "images": [
    {
      "filename": "page_1.png",
      "width": 1920,
      "height": 1080,
      "format": "PNG",
      "mode": "RGB",
      "file_size": 2048576,
      "aspect_ratio": "16:9",
      "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

## 🎯 Use Cases

- **📋 Document Analysis**: Extract images from reports, presentations, and documents
- **🎨 Design Asset Recovery**: Retrieve images from PDF portfolios and design files
- **📚 Academic Research**: Extract figures and charts from research papers
- **💼 Business Intelligence**: Analyze visual content in business documents
- **🔍 Quality Assurance**: Verify image quality and specifications in PDF files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 🐛 Bug Reports

Found a bug? Please create an issue with:

- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 📈 Performance

- **⚡ Fast Processing**: Optimized algorithms for quick image extraction
- **💾 Memory Efficient**: Handles large PDFs without memory issues
- **🔧 Multiple Methods**: Fallback extraction methods for reliability
- **📱 Responsive**: Smooth experience across all devices

## 🔒 Privacy & Security

- **🛡️ No Data Storage**: Files are processed temporarily and not stored
- **🔐 Client-Side Processing**: Sensitive data stays in your browser
- **🌐 HTTPS Only**: Secure connections for all data transfer
- **🔍 Open Source**: Transparent code for security auditing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourtwitterhandle](https://twitter.com/yourtwitterhandle)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Website: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- [Vercel](https://vercel.com/) for excellent hosting platform
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Flask](https://flask.palletsprojects.com/) community for the lightweight backend
- [Pillow](https://python-pillow.org/) contributors for image processing capabilities
- All contributors who help improve this project

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/pdf-image-size-detector&type=Date)](https://star-history.com/#yourusername/pdf-image-size-detector&Date)

---

<div align="center">

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

[⭐ Star this repo](https://github.com/yourusername/pdf-image-size-detector/stargazers) | [🐛 Report Bug](https://github.com/yourusername/pdf-image-size-detector/issues) | [✨ Request Feature](https://github.com/yourusername/pdf-image-size-detector/issues)

</div>
