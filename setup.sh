#!/bin/bash
# Quick Setup Script for Contact Form

echo "🚀 Portfolio Contact Form - Quick Setup"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "📋 Step 1: Create .env file"
    echo "Copy .env.example to .env:"
    echo "  cp .env.example .env"
    echo ""
    echo "📧 Step 2: Configure Gmail"
    echo "1. Go to https://myaccount.google.com/apppasswords"
    echo "2. Generate a new app password (16 characters)"
    echo "3. Copy the password"
    echo ""
    echo "🔧 Step 3: Edit .env"
    echo "Edit the .env file and paste:"
    echo "  GMAIL_USER=archinamattia@gmail.com"
    echo "  GMAIL_APP_PASSWORD=your-16-char-password"
    echo ""
    exit 1
fi

echo "✅ .env file found!"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🎯 Ready to start!"
echo ""
echo "Choose an option:"
echo ""
echo "1. npm run dev              → Frontend only (port 4321)"
echo "2. npm run server           → Backend only (port 4307)"
echo "3. npm run dev-server       → Both (frontend + backend)"
echo ""
echo "For testing locally:"
echo "  Open Terminal 1: npm run dev"
echo "  Open Terminal 2: npm run server"
echo "  Then visit: http://localhost:4321"
echo ""

