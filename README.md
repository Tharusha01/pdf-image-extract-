# PDF Image Size Detector

A modern web application that extracts images from PDF files and analyzes their dimensions, format, and properties. Built with Next.js and Python Flask, deployable on Vercel.

## Features

- 📄 **PDF Image Extraction**: Extract all images from PDF files
- 📏 **Size Detection**: Get detailed image dimensions and properties
- 🎨 **Format Analysis**: Detect image format, color mode, and file size
- 📊 **Aspect Ratio Calculation**: Automatic aspect ratio computation
- 🖼️ **Image Preview**: View extracted images with detailed information
- 🚀 **Modern UI**: Clean, responsive interface with drag-and-drop upload
- ☁️ **Vercel Ready**: Optimized for Vercel deployment

## Tech Stack

### Frontend

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Dropzone** - File upload
- **Heroicons** - Icons

### Backend

- **Python Flask** - API server
- **PIL (Pillow)** - Image processing
- **PyPDF2** - PDF parsing
- **pdf2image** - PDF to image conversion
- **Flask-CORS** - Cross-origin requests

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
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

4. **Install additional system dependencies (for pdf2image)**

   **Windows:**

   ```bash
   # Download and install poppler-utils from: https://github.com/oschwartz10612/poppler-windows/releases/
   ```

   **macOS:**

   ```bash
   brew install poppler
   ```

   **Ubuntu/Debian:**

   ```bash
   sudo apt-get install poppler-utils
   ```

### Development

1. **Start the backend server**

   ```bash
   cd api
   python app.py
   ```

   The API will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3000`

## Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**

   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the Next.js app and Python API

2. **Environment Variables**
   No environment variables required for basic functionality.

### Manual Deployment

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## API Endpoints

### `POST /api/extract-images`

Extract images from a PDF file.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: PDF file with key 'pdf'

**Response:**

```json
{
  "success": true,
  "message": "Successfully extracted 3 images",
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
  ],
  "total_images": 3
}
```

### `POST /api/analyze-image`

Analyze a single image file.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: Image file with key 'image'

**Response:**

```json
{
  "success": true,
  "image": {
    "filename": "example.jpg",
    "width": 1920,
    "height": 1080,
    "format": "JPEG",
    "mode": "RGB",
    "file_size": 524288,
    "aspect_ratio": "16:9",
    "base64": "/9j/4AAQSkZJRgABAQEAYABgAAD..."
  }
}
```

### `GET /api/health`

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "message": "PDF Image Size Detector API is running"
}
```

## Features Explained

### Image Extraction Methods

The application uses multiple methods to extract images from PDFs:

1. **pdf2image**: Converts PDF pages to images (primary method)
2. **PyPDF2**: Extracts embedded images directly from PDF structure (fallback)

### Image Analysis

For each extracted image, the app provides:

- **Dimensions**: Width and height in pixels
- **Format**: Image format (PNG, JPEG, etc.)
- **Color Mode**: RGB, CMYK, Grayscale, etc.
- **File Size**: Size in bytes, KB, and MB
- **Aspect Ratio**: Simplified ratio (e.g., 16:9, 4:3)
- **Preview**: Base64-encoded image for display

### File Support

- **Input**: PDF files only
- **Output**: Supports various image formats (PNG, JPEG, GIF, BMP, TIFF, WebP)

## Troubleshooting

### Common Issues

1. **pdf2image not working**

   - Ensure poppler-utils is installed
   - Check system PATH includes poppler binaries

2. **Large file uploads failing**

   - Check Vercel function limits (max 50MB)
   - Consider implementing file chunking for larger files

3. **Memory issues with large PDFs**
   - The app processes images in memory
   - For very large PDFs, consider implementing streaming

### Error Handling

The app includes comprehensive error handling:

- File validation
- Format checking
- Processing error recovery
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- Create an issue on GitHub
- Check the troubleshooting section
- Review API documentation

---

Built with ❤️ using Next.js and Python Flask
