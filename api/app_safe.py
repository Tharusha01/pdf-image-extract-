from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import base64
import io
from math import gcd

# Try to import required libraries with fallbacks
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("Warning: PIL/Pillow not available. Please install with: pip install Pillow")

try:
    import PyPDF2
    PYPDF2_AVAILABLE = True
except ImportError:
    PYPDF2_AVAILABLE = False
    print("Warning: PyPDF2 not available. Please install with: pip install PyPDF2")

try:
    import pdf2image
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False
    print("Warning: pdf2image not available. Please install with: pip install pdf2image")

app = Flask(__name__)
CORS(app)

def get_image_info_from_pil(img, filename):
    """
    Get comprehensive information about a PIL Image object
    """
    if not PIL_AVAILABLE:
        return None
        
    try:
        # Get basic info
        width, height = img.size
        format_type = img.format or 'PNG'
        mode = img.mode
        
        # Convert image to bytes to get file size
        img_bytes = io.BytesIO()
        
        # Ensure we can save the image
        if format_type.upper() not in ['JPEG', 'PNG', 'GIF', 'BMP', 'TIFF']:
            format_type = 'PNG'
            
        img_rgb = img.convert('RGB') if mode in ['RGBA', 'P'] and format_type.upper() == 'JPEG' else img
        img_rgb.save(img_bytes, format=format_type)
        file_size = len(img_bytes.getvalue())
        
        # Calculate aspect ratio
        aspect_gcd = gcd(width, height)
        aspect_ratio = f"{width//aspect_gcd}:{height//aspect_gcd}"
        
        # Convert to base64 for frontend display
        img_bytes.seek(0)
        base64_image = base64.b64encode(img_bytes.getvalue()).decode('utf-8')
        
        return {
            'filename': filename,
            'width': width,
            'height': height,
            'format': format_type,
            'mode': mode,
            'file_size': file_size,
            'aspect_ratio': aspect_ratio,
            'base64': base64_image
        }
        
    except Exception as e:
        print(f"Error processing image {filename}: {e}")
        return None

def extract_images_from_pdf(pdf_file):
    """
    Extract images from PDF file using available methods
    """
    images = []
    
    if not (PIL_AVAILABLE and (PDF2IMAGE_AVAILABLE or PYPDF2_AVAILABLE)):
        return []
    
    try:
        # Method 1: Try using pdf2image to convert pages to images
        if PDF2IMAGE_AVAILABLE:
            try:
                # Create a temporary file for the PDF
                with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
                    temp_pdf.write(pdf_file.read())
                    temp_pdf_path = temp_pdf.name
                
                # Convert PDF pages to images
                try:
                    pages = pdf2image.convert_from_path(temp_pdf_path, dpi=150)
                    for i, page in enumerate(pages):
                        filename = f"page_{i+1}.png"
                        image_info = get_image_info_from_pil(page, filename)
                        if image_info:
                            images.append(image_info)
                except Exception as e:
                    print(f"pdf2image failed: {e}")
                
                # Clean up temp file
                try:
                    os.unlink(temp_pdf_path)
                except:
                    pass
                    
            except Exception as e:
                print(f"Error with pdf2image: {e}")
        
        # Method 2: Try to extract embedded images using PyPDF2
        if not images and PYPDF2_AVAILABLE:
            pdf_file.seek(0)  # Reset file pointer
            try:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                
                for page_num, page in enumerate(pdf_reader.pages):
                    try:
                        if '/Resources' in page and '/XObject' in page['/Resources']:
                            xObject = page['/Resources']['/XObject'].get_object()
                            
                            for obj in xObject:
                                try:
                                    if xObject[obj]['/Subtype'] == '/Image':
                                        size = (xObject[obj]['/Width'], xObject[obj]['/Height'])
                                        data = xObject[obj].get_data()
                                        
                                        # Try to create image from data
                                        try:
                                            img = Image.open(io.BytesIO(data))
                                            filename = f"embedded_image_{page_num+1}_{obj}.png"
                                            image_info = get_image_info_from_pil(img, filename)
                                            if image_info:
                                                images.append(image_info)
                                        except:
                                            # If direct opening fails, try with mode and size
                                            try:
                                                mode = "RGB" if xObject[obj].get('/ColorSpace') == '/DeviceRGB' else "P"
                                                img = Image.frombytes(mode, size, data)
                                                filename = f"embedded_image_{page_num+1}_{obj}.png"
                                                image_info = get_image_info_from_pil(img, filename)
                                                if image_info:
                                                    images.append(image_info)
                                            except:
                                                continue
                                except Exception as e:
                                    print(f"Error extracting embedded image: {e}")
                                    continue
                    except Exception as e:
                        print(f"Error processing page {page_num}: {e}")
                        continue
                        
            except Exception as e:
                print(f"Error with PyPDF2: {e}")
        
        return images
        
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return []

@app.route('/health', methods=['GET'])
def health_check():
    status = {
        'status': 'healthy',
        'message': 'PDF Image Size Detector API is running',
        'dependencies': {
            'PIL': PIL_AVAILABLE,
            'PyPDF2': PYPDF2_AVAILABLE,
            'pdf2image': PDF2IMAGE_AVAILABLE
        }
    }
    return jsonify(status)

@app.route('/extract-images', methods=['POST'])
def extract_images():
    try:
        # Check dependencies
        if not PIL_AVAILABLE:
            return jsonify({'error': 'PIL/Pillow not installed. Please install with: pip install Pillow'}), 500
        
        if not (PDF2IMAGE_AVAILABLE or PYPDF2_AVAILABLE):
            return jsonify({'error': 'No PDF processing library available. Please install pdf2image or PyPDF2'}), 500
        
        # Check if PDF file is provided
        if 'pdf' not in request.files:
            return jsonify({'error': 'No PDF file provided'}), 400
        
        pdf_file = request.files['pdf']
        
        if pdf_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not pdf_file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'File must be a PDF'}), 400
        
        # Extract images from PDF
        images = extract_images_from_pdf(pdf_file)
        
        return jsonify({
            'success': True,
            'message': f'Successfully extracted {len(images)} images',
            'images': images,
            'total_images': len(images)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error processing PDF: {str(e)}'
        }), 500

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    """
    Analyze a single uploaded image
    """
    try:
        if not PIL_AVAILABLE:
            return jsonify({'error': 'PIL/Pillow not installed. Please install with: pip install Pillow'}), 500
        
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Open and analyze the image
        img = Image.open(image_file)
        image_info = get_image_info_from_pil(img, image_file.filename)
        
        if image_info:
            return jsonify({
                'success': True,
                'image': image_info
            })
        else:
            return jsonify({'error': 'Failed to analyze image'}), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Error analyzing image: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("Starting PDF Image Size Detector API...")
    print(f"PIL/Pillow available: {PIL_AVAILABLE}")
    print(f"PyPDF2 available: {PYPDF2_AVAILABLE}")
    print(f"pdf2image available: {PDF2IMAGE_AVAILABLE}")
    
    if not PIL_AVAILABLE:
        print("⚠️  Warning: Install Pillow with: pip install Pillow")
    if not (PDF2IMAGE_AVAILABLE or PYPDF2_AVAILABLE):
        print("⚠️  Warning: Install PDF libraries with: pip install pdf2image PyPDF2")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
