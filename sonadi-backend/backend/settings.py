from pathlib import Path
import os

# ✅ Corrected BASE_DIR to point to the main "Sonadi wesite" folder
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = 'django-insecure-...'  # Replace with your actual secret key
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # ✅ Now correctly pointing to templates/
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


import os

import dj_database_url
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Using PostgreSQL
        'NAME': 'sonadi_db_qy8m',                   # Database name
        'USER': 'sonadi_db_qy8m_user',              # Database username
        'PASSWORD': 'zTxP7v0K8sFXO2cAeA5mYhsvjI9lR1cD',  # Database password
        'HOST': 'dpg-d1plvn7fte5s73cfv5i0-a.singapore-postgres.render.com',  # Hostname (Render's URL)
        'PORT': '5432',                             # Default PostgreSQL port
    }
}




STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    BASE_DIR / 'assets',  # ✅ assets folder is at project root
]

import os
from pathlib import Path

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# =========================
# ✉️  Email configuration
# =========================
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True          # STARTTLS encryption
EMAIL_HOST_USER = 'sonadicharitytrust@gmail.com'
EMAIL_HOST_PASSWORD = 'pwppdyfjpfsnytom'   # ← App password (no spaces)
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Optional—raise errors if email fails during development
# Set to False in production if you’d rather fail silently
EMAIL_FAIL_SILENTLY = False
