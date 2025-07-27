import sys
import subprocess
import importlib

def check_package(package_name, install_command=None):
    """Check if a Python package is available"""
    try:
        importlib.import_module(package_name)
        print(f"✅ {package_name} is installed")
        return True
    except ImportError:
        print(f"❌ {package_name} is NOT installed")
        if install_command:
            print(f"   Install with: {install_command}")
        return False

def check_system_dependencies():
    """Check system dependencies"""
    print("🔍 Checking system dependencies...")
    
    # Check poppler (for pdf2image)
    try:
        result = subprocess.run(['pdftoppm', '-v'], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0 or 'version' in result.stderr.lower():
            print("✅ Poppler is installed")
        else:
            print("❌ Poppler might not be installed")
            print("   Install poppler for pdf2image to work properly")
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("❌ Poppler is NOT installed")
        print("   Download from: https://github.com/oschwartz10612/poppler-windows/releases/")

def main():
    print("🧪 PDF Image Size Detector - Dependency Check")
    print("=" * 50)
    
    # Check Python version
    python_version = sys.version_info
    print(f"🐍 Python version: {python_version.major}.{python_version.minor}.{python_version.micro}")
    
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("⚠️  Warning: Python 3.8+ is recommended")
    else:
        print("✅ Python version is compatible")
    
    print("\n📦 Checking Python packages...")
    
    # Check required packages
    packages = [
        ('flask', 'pip install flask'),
        ('flask_cors', 'pip install flask-cors'),
        ('PIL', 'pip install Pillow'),
        ('PyPDF2', 'pip install PyPDF2'),
        ('pdf2image', 'pip install pdf2image'),
        ('dotenv', 'pip install python-dotenv'),
    ]
    
    all_installed = True
    for package, install_cmd in packages:
        if not check_package(package, install_cmd):
            all_installed = False
    
    print("\n🖥️  Checking system dependencies...")
    check_system_dependencies()
    
    print("\n" + "=" * 50)
    if all_installed:
        print("🎉 All Python dependencies are installed!")
        print("Run 'python app_safe.py' to start the API server")
    else:
        print("⚠️  Some dependencies are missing. Install them to use all features.")
        print("The API will work with available dependencies.")
    
    print("\n📋 Quick setup commands:")
    print("pip install flask flask-cors Pillow PyPDF2 pdf2image python-dotenv")

if __name__ == "__main__":
    main()
