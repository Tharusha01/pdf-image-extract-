#!/bin/bash

echo "Starting PDF Image Size Detector Development Server"
echo ""

echo "Starting Python Flask API..."
cd api && python app.py &
API_PID=$!

echo "Waiting for API to start..."
sleep 3

echo "Starting Next.js Development Server..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "Development servers started!"
echo "Frontend: http://localhost:3000"
echo "API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop the servers
wait
