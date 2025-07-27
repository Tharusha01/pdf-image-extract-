# 🚀 PDF Image Size Detector - Development Guide

## ✨ What This App Does

This web application allows users to:

- Upload PDF files via drag-and-drop
- Extract all images from the PDF
- View detailed information about each image:
  - Dimensions (width × height)
  - File format (PNG, JPEG, etc.)
  - Color mode (RGB, CMYK, etc.)
  - File size
  - Aspect ratio
- Preview extracted images

## 🛠️ Technology Stack

### Frontend (Next.js)

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Dropzone** - File upload component
- **Axios** - HTTP client

### Backend (Python Flask)

- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Pillow (PIL)** - Python image processing
- **PyPDF2** - PDF manipulation
- **pdf2image** - Convert PDF pages to images
- **Poppler** - PDF rendering library (system dependency)

## 🏗️ Architecture

```
Frontend (Next.js) ←→ Backend (Flask API) ←→ PDF Processing
     Port 3000              Port 5000        (PIL + PyPDF2/pdf2image)
```

**Data Flow:**

1. User uploads PDF via frontend
2. Frontend sends PDF to `/api/extract-images`
3. Backend processes PDF using Python libraries
4. Backend returns JSON with image data (including base64)
5. Frontend displays results with image previews

## 📁 Project Structure

```
pdf-image-size-detector/
├── 📁 app/                     # Next.js App Router
│   ├── 🎨 globals.css         # Global styles + Tailwind
│   ├── 📄 layout.tsx          # Root layout component
│   └── 🏠 page.tsx            # Main page (upload + results)
├── 📁 api/                     # Python Flask API
│   ├── 🐍 app.py              # Main Flask app
│   ├── 🛡️ app_safe.py         # Version with better error handling
│   ├── 🔧 check_dependencies.py # Dependency checker
│   ├── 🌐 index.py            # Vercel entry point
│   └── 📋 requirements.txt    # Python dependencies
├── 📁 types/                   # TypeScript definitions
├── ⚙️ next.config.js          # Next.js configuration
├── 🎨 tailwind.config.js      # Tailwind configuration
├── 📦 package.json            # Node.js dependencies
├── 🚀 vercel.json             # Vercel deployment config
├── 🦇 start-dev.bat           # Windows development starter
├── 🐧 start-dev.sh            # Unix development starter
└── 📖 README.md               # Documentation
```

## 🔧 Development Setup

### 1. Quick Dependency Check

```bash
cd api
python check_dependencies.py
```

### 2. Install Dependencies

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
cd api
pip install flask flask-cors Pillow PyPDF2 pdf2image python-dotenv
```

**System (Windows):**

- Download Poppler: https://github.com/oschwartz10612/poppler-windows/releases/
- Extract and add to PATH

### 3. Start Development Servers

**Option A: Manual**

```bash
# Terminal 1 - API
cd api
python app_safe.py

# Terminal 2 - Frontend
npm run dev
```

**Option B: Automated**

```bash
# Windows
start-dev.bat

# Unix/Linux/Mac
chmod +x start-dev.sh
./start-dev.sh
```

### 4. Access Application

- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## 🔄 API Endpoints

### `GET /health`

Returns API status and available dependencies.

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

### `POST /extract-images`

Extracts images from uploaded PDF.

**Request:**

- Content-Type: `multipart/form-data`
- Field: `pdf` (PDF file)

**Response:**

```json
{
  "success": true,
  "message": "Successfully extracted 2 images",
  "total_images": 2,
  "images": [
    {
      "filename": "page_1.png",
      "width": 1920,
      "height": 1080,
      "format": "PNG",
      "mode": "RGB",
      "file_size": 245760,
      "aspect_ratio": "16:9",
      "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}
```

## 🚀 Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub repository

### Steps

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel:**

   - Visit https://vercel.com
   - Import your GitHub repository
   - Vercel auto-detects Next.js + Python
   - Deploy!

3. **Configuration:**
   - `vercel.json` handles routing
   - Python API becomes serverless functions
   - No additional config needed

## 🐛 Troubleshooting

### Common Issues

**1. "poppler not found"**

```bash
# Windows: Download and add to PATH
# Mac: brew install poppler
# Ubuntu: sudo apt-get install poppler-utils
```

**2. Python modules missing**

```bash
pip install flask flask-cors Pillow PyPDF2 pdf2image
```

**3. CORS errors in development**

- Ensure Flask runs on port 5000
- Check `next.config.js` rewrites

**4. Large PDF processing fails**

- Increase Vercel function timeout
- Consider file size limits (50MB max)

### Development Tips

**Hot Reloading:**

- Next.js: Automatic on file changes
- Flask: Use `debug=True` (already enabled)

**Debugging:**

- Check browser console for frontend errors
- Check terminal output for API errors
- Use `/health` endpoint to verify API status

**Performance:**

- Large PDFs may take 10-30 seconds
- Multiple images increase processing time
- Consider pagination for many results

## 🔮 Future Enhancements

**Possible Features:**

- Batch PDF processing
- Image format conversion
- Image compression analysis
- PDF metadata extraction
- Download extracted images as ZIP
- Image OCR text extraction
- Advanced filtering and sorting

**Technical Improvements:**

- Add progress indicators
- Implement streaming for large files
- Add caching for processed PDFs
- Optimize image compression
- Add unit tests

## 📞 Getting Help

**For Development Issues:**

1. Check `SETUP.md` for detailed instructions
2. Run dependency checker: `python check_dependencies.py`
3. Verify all services are running on correct ports
4. Check browser console and terminal logs

**For Deployment Issues:**

1. Verify `vercel.json` configuration
2. Check Vercel function logs
3. Ensure all dependencies are in requirements.txt
4. Test API endpoints locally first

---

**Happy Coding! 🎉**
