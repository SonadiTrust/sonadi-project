#!/bin/bash
# Quick Start Script for Sonadi Website

echo "🚀 Starting Sonadi Charitable Trust Website..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your API keys before continuing!"
    echo "   Required: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, EMAIL_HOST_PASSWORD"
    exit 1
fi

# Navigate to backend directory
cd sonadi-backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "🗃️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if it doesn't exist
echo "👤 Checking for superuser..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
    print('Creating superuser...')
    User.objects.create_superuser('admin', 'admin@sonadi.org', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
"

# Check if static files are collected
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Setup complete!"
echo ""
echo "🌐 To start the development server:"
echo "   cd sonadi-backend"
echo "   python manage.py runserver"
echo ""
echo "📖 Admin panel: http://localhost:8000/admin"
echo "🏠 Website: http://localhost:8000"
echo "💳 Donations: http://localhost:8000/donate"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env file with your API keys"
echo "   2. Configure Razorpay account"
echo "   3. Test payment integration"
echo ""
echo "🆘 Need help? Check PAYMENT_INTEGRATION_GUIDE.md"
