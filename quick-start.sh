#!/bin/bash

echo "🚀 Sistem Manajemen Uji Kompetensi Keahlian - Quick Start Script"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Check Database Status${NC}"
echo ""

# Check if MySQL is installed
if command -v mysql &> /dev/null; then
    echo -e "${GREEN}✅ MySQL is installed${NC}"
    # Check if MySQL service is running
    if systemctl is-active --quiet mysql 2>/dev/null; then
        echo -e "${GREEN}✅ MySQL service is running${NC}"
    else
        echo -e "${YELLOW}⚠️  MySQL service is not running${NC}"
        echo -e "${YELLOW}   Start MySQL: sudo systemctl start mysql${NC}"
    fi
else
    echo -e "${RED}❌ MySQL is not installed${NC}"
    echo -e "${RED}   Install MySQL: sudo apt-get install mysql-server${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Check Environment Variables${NC}"
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
    # Check if DATABASE_URL is set
    if grep -q "DATABASE_URL=" .env 2>/dev/null; then
        echo -e "${GREEN}✅ DATABASE_URL is configured${NC}"
    else
        echo -e "${YELLOW}⚠️  DATABASE_URL is not set in .env${NC}"
        echo -e "${YELLOW}   Run: cp .env.example .env${NC}"
        echo -e "${YELLOW}   Then edit .env with your database credentials${NC}"
    fi
else
    echo -e "${RED}❌ .env file does not exist${NC}"
    echo -e "${YELLOW}   Run: cp .env.example .env${NC}"
    echo -e "${YELLOW}   Then edit .env with your database credentials${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Check Dependencies${NC}"
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependencies are installed${NC}"

    # Check if next-auth is installed
    if npm list next-auth &> /dev/null; then
        echo -e "${GREEN}✅ next-auth is installed${NC}"
    else
        echo -e "${YELLOW}⚠️  next-auth is not installed${NC}"
        echo -e "${YELLOW}   Run: npm install next-auth@beta${NC}"
    fi

    # Check if @prisma/client is installed
    if npm list @prisma/client &> /dev/null; then
        echo -e "${GREEN}✅ @prisma/client is installed${NC}"
    else
        echo -e "${YELLOW}⚠️  @prisma/client is not installed${NC}"
        echo -e "${YELLOW}   Run: npm install @prisma/client${NC}"
    fi

    # Check if bcryptjs is installed
    if npm list bcryptjs &> /dev/null; then
        echo -e "${GREEN}✅ bcryptjs is installed${NC}"
    else
        echo -e "${YELLOW}⚠️  bcryptjs is not installed${NC}"
        echo -e "${YELLOW}   Run: npm install bcryptjs${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Dependencies are not installed${NC}"
    echo -e "${YELLOW}   Run: npm install${NC}"
fi

echo ""
echo -e "${BLUE}Step 4: Check Prisma Setup${NC}"
echo ""

# Check if Prisma Client is generated
if [ -f "node_modules/.prisma/client/index.js" ]; then
    echo -e "${GREEN}✅ Prisma Client is generated${NC}"
else
    echo -e "${YELLOW}⚠️  Prisma Client is not generated${NC}"
    echo -e "${YELLOW}   Run: npx prisma generate${NC}"
fi

echo ""
echo -e "${BLUE}Step 5: Setup Instructions${NC}"
echo ""

echo -e "${YELLOW}1. Create MySQL Database${NC}"
echo "   mysql -u root -p"
echo "   CREATE DATABASE manajemen_uji_kompetensi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo ""
echo -e "${YELLOW}2. Setup Environment Variables${NC}"
echo "   cp .env.example .env"
echo "   nano .env  # Edit DATABASE_URL with your credentials"
echo ""
echo -e "${YELLOW}3. Install Missing Dependencies${NC}"
echo "   npm install next-auth@beta @prisma/client bcryptjs"
echo ""
echo -e "${YELLOW}4. Generate Prisma Client${NC}"
echo "   npx prisma generate"
echo ""
echo -e "${YELLOW}5. Push Database Schema${NC}"
echo "   npx prisma db push"
echo ""
echo -e "${YELLOW}6. Seed Database with Sample Data${NC}"
echo "   npx tsx prisma/seed.ts"
echo ""
echo -e "${YELLOW}7. Start Development Server${NC}"
echo "   npm run dev"
echo ""
echo -e "${GREEN}8. Access Application${NC}"
echo "   Open: http://localhost:3000"
echo ""
echo -e "${YELLOW}Demo Accounts:${NC}"
echo "   Admin: admin@sekolah.sch.id / admin123"
echo "   Guru: guru@sekolah.sch.id / guru123"
echo "   Siswa: siswa1@sekolah.sch.id / siswa123"
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Quick Start Guide Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "📚 For detailed setup instructions, see: SETUP_GUIDE.md"
echo "📊 For feature summary, see: FEATURE_SUMMARY.md"
echo "🔐 For security notes, see: README.md"
