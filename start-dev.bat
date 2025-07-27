@echo off
echo Starting PDF Image Size Detector Development Server
echo.

echo Starting Python Flask API...
start cmd /k "cd api && python app.py"

echo Waiting for API to start...
timeout /t 3 /nobreak >nul

echo Starting Next.js Development Server...
start cmd /k "npm run dev"

echo.
echo Development servers started!
echo Frontend: http://localhost:3000
echo API: http://localhost:5000
echo.
echo Press any key to exit...
pause >nul
