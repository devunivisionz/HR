#!/bin/bash

echo "🚀 Setting up Interview MERN App for deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd server_2 && npm install
cd ../frontend && npm install
cd ..

# Build frontend
echo "🏗️ Building frontend..."
cd frontend && npm run build
cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps for Render deployment:"
echo "1. Backend Service:"
echo "   - Root Directory: server_2"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "2. Frontend Service:"
echo "   - Root Directory: frontend"
echo "   - Build Command: npm install && npm run build"
echo "   - Publish Directory: dist"
echo ""
echo "3. Don't forget to set environment variables!"
