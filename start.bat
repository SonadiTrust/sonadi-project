@echo off
REM Quick Start Script for Sonadi Website (Windows)

echo 🚀 Starting Sonadi Charitable Trust Website...

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Creating .env file from template...
    copy .env.example .env
    echo 📝 Please edit .env file with your API keys before continuing!
    echo    Required: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, EMAIL_HOST_PASSWORD
    pause
    exit /b 1
)

REM Navigate to backend directory
cd sonadi-backend

REM Check if virtual environment exists
if not exist venv (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install requirements
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Run migrations
echo 🗃️  Running database migrations...
python manage.py makemigrations
python manage.py migrate

REM Create superuser if it doesn't exist
echo 👤 Creating superuser if needed...
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@sonadi.org', 'admin123') if not User.objects.filter(is_superuser=True).exists() else print('Superuser already exists')"

REM Collect static files
echo 📁 Collecting static files...
python manage.py collectstatic --noinput

echo ✅ Setup complete!
echo.
echo 🌐 To start the development server:
echo    cd sonadi-backend
echo    python manage.py runserver
echo.
echo 📖 Admin panel: http://localhost:8000/admin
echo 🏠 Website: http://localhost:8000
echo 💳 Donations: http://localhost:8000/donate
echo.
echo 📋 Next steps:
echo    1. Edit .env file with your API keys
echo    2. Configure Razorpay account  
echo    3. Test payment integration
echo.
echo 🆘 Need help? Check PAYMENT_INTEGRATION_GUIDE.md
pause
