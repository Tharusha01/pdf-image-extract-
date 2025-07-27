from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import PyPDF2
import pdf2image
import io
import base64
import os
import tempfile
from math import gcd

app = Flask(__name__)
CORS(app)

def get_image_info_from_pil(img, filename):
    """
    Get comprehensive information about a PIL Image object
    
    Args:
        img (PIL.Image): PIL Image object
        filename (str): Name of the image file
    """
    try:
        # Get basic info
        width, height = img.size
        format_type = img.format or 'Unknown'
        mode = img.mode
        
        # Convert image to bytes to get file size
        img_bytes = io.BytesIO()
        img.save(img_bytes, format=format_type if format_type != 'Unknown' else 'PNG')
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
    Extract images from PDF file
    
    Args:
        pdf_file: File object containing PDF data
    """
    images = []
    
    try:
        # Method 1: Try using pdf2image to convert pages to images
        try:
            # Create a temporary file for the PDF
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
                temp_pdf.write(pdf_file.read())
                temp_pdf_path = temp_pdf.name
            
            # Convert PDF pages to images
            try:
                pages = pdf2image.convert_from_path(temp_pdf_path, dpi=200)
                for i, page in enumerate(pages):
                    filename = f"page_{i+1}.png"
                    image_info = get_image_info_from_pil(page, filename)
                    if image_info:
                        images.append(image_info)
            except Exception as e:
                print(f"pdf2image failed: {e}")
                # If pdf2image fails, try alternative method
                pass
            
            # Clean up temp file
            os.unlink(temp_pdf_path)
            
        except Exception as e:
            print(f"Error with pdf2image: {e}")
        
        # Method 2: Try to extract embedded images using PyPDF2
        if not images:
            pdf_file.seek(0)  # Reset file pointer
            try:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                
                for page_num, page in enumerate(pdf_reader.pages):
                    if '/XObject' in page['/Resources']:
                        xObject = page['/Resources']['/XObject'].get_object()
                        
                        for obj in xObject:
                            if xObject[obj]['/Subtype'] == '/Image':
                                try:
                                    size = (xObject[obj]['/Width'], xObject[obj]['/Height'])
                                    data = xObject[obj].get_data()
                                    
                                    if xObject[obj]['/ColorSpace'] == '/DeviceRGB':
                                        mode = "RGB"
                                    else:
                                        mode = "P"
                                    
                                    if '/Filter' in xObject[obj]:
                                        if xObject[obj]['/Filter'] == '/FlateDecode':
                                            img = Image.frombytes(mode, size, data)
                                            filename = f"embedded_image_{page_num+1}_{obj}.png"
                                            image_info = get_image_info_from_pil(img, filename)
                                            if image_info:
                                                images.append(image_info)
                                        elif xObject[obj]['/Filter'] == '/DCTDecode':
                                            img = Image.open(io.BytesIO(data))
                                            filename = f"embedded_image_{page_num+1}_{obj}.jpg"
                                            image_info = get_image_info_from_pil(img, filename)
                                            if image_info:
                                                images.append(image_info)
                                except Exception as e:
                                    print(f"Error extracting embedded image: {e}")
                                    continue
            except Exception as e:
                print(f"Error with PyPDF2: {e}")
        
        return images
        
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return []

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'PDF Image Size Detector API is running'})

@app.route('/extract-images', methods=['POST'])
def extract_images():
    try:
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
    app.run(debug=True, host='0.0.0.0', port=5000)
