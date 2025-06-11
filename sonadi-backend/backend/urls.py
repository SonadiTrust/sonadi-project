from django.contrib import admin
from django.urls import path
from core import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('volunteer/', views.volunteer, name='volunteer'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('donate/', views.donate, name='donate'),
    path('testimonial/', views.testimonial, name='testimonial'),
    path('adopt-a-dog/', views.adopt_a_dog, name='adopt_a_dog'),
    path('activities/', views.activities, name='activities'),
    path('gallery/', views.gallery, name='gallery'),
    path('founders/', views.founders, name='founders'),
    path('team/', views.team, name='team'),
    path('photos/', views.photos, name='photos'),
]

# Serve uploaded media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

