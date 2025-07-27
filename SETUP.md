# Setup Instructions for PDF Image Size Detector

## Quick Start Guide

### 1. Install Frontend Dependencies

```powershell
cd "c:\Users\Tharusha\Documents\A-Project\new\new\pdf image size detector"
npm install
```

### 2. Install Python Backend Dependencies

```powershell
cd "c:\Users\Tharusha\Documents\A-Project\new\new\pdf image size detector\api"
pip install flask flask-cors Pillow PyPDF2 pdf2image python-dotenv gunicorn
```

### 3. Install Poppler (Required for pdf2image)

**Windows:**

1. Download poppler from: https://github.com/oschwartz10612/poppler-windows/releases/
2. Extract to a folder (e.g., C:\poppler)
3. Add C:\poppler\bin to your PATH environment variable

**Alternative for Windows:**

```powershell
# Using conda (if you have it)
conda install -c conda-forge poppler

# Or using chocolatey
choco install poppler
```

### 4. Start Development Servers

**Option A: Manual (Recommended for first time)**

Terminal 1 - Start Python API:

```powershell
cd "c:\Users\Tharusha\Documents\A-Project\new\new\pdf image size detector\api"
python app.py
```

Terminal 2 - Start Next.js Frontend:

```powershell
cd "c:\Users\Tharusha\Documents\A-Project\new\new\pdf image size detector"
npm run dev
```

**Option B: Using batch script**

```powershell
# Double-click start-dev.bat or run:
.\start-dev.bat
```

### 5. Access the Application

- Frontend: http://localhost:3000
- API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Drag and drop a PDF file or click to select one
3. Wait for processing (this may take a few seconds)
4. View the extracted images with their size information

## Deployment to Vercel

### Prerequisites

- Vercel account
- GitHub repository

### Steps

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Connect to Vercel:

   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and Python

3. Deploy:
   - Vercel handles the deployment automatically
   - Both frontend and API will be deployed

### Environment Variables (Optional)

No environment variables are required for basic functionality.

## Troubleshooting

### Common Issues

1. **"poppler not found" error**

   - Install poppler as described above
   - Restart terminal after adding to PATH

2. **Python module not found**

   ```powershell
   pip install <missing-module>
   ```

3. **Port already in use**

   - Change ports in app.py (Flask) or package.json (Next.js)
   - Or kill existing processes

4. **CORS errors**
   - Ensure Flask server is running on port 5000
   - Check next.config.js rewrites configuration

### System Requirements

- Node.js 18+
- Python 3.8+
- At least 2GB RAM for processing large PDFs
- 500MB disk space for dependencies

### Performance Notes

- Large PDFs (>50MB) may take longer to process
- Complex PDFs with many images may use significant memory
- Consider implementing pagination for very large results

## Project Structure

```
pdf-image-size-detector/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page component
├── api/                   # Python Flask API
│   ├── app.py            # Main Flask application
│   ├── index.py          # Vercel entry point
│   └── requirements.txt  # Python dependencies
├── types/                 # TypeScript type definitions
├── package.json          # Node.js dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vercel.json           # Vercel deployment configuration
└── README.md             # This file
```

## API Documentation

### Endpoints

**GET /health**

- Returns API health status

**POST /extract-images**

- Extracts images from PDF
- Accepts: multipart/form-data with 'pdf' field
- Returns: JSON with image data and base64 previews

**POST /analyze-image**

- Analyzes a single image file
- Accepts: multipart/form-data with 'image' field
- Returns: JSON with image properties

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify all dependencies are installed
3. Check terminal output for error messages
4. Ensure file permissions are correct
