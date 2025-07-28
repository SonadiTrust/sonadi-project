from django.contrib import admin
from django.urls import path
from core import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Core Views
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('donate/', views.donate, name='donate'),
    path('donate/payment/', views.donate_payment, name='donate_payment'),
    path('donate/success/', views.donate_success, name='donate_success'),
    path('donate/failure/', views.donate_failure, name='donate_failure'),
    path('volunteer/', views.volunteer, name='volunteer'),
    path('testimonial/', views.testimonial, name='testimonial'),
    path('adopt-a-dog/', views.adopt_a_dog, name='adopt_a_dog'),
    path('activities/', views.activities, name='activities'),
    path('gallery/', views.gallery, name='gallery'),
    path('founders/', views.founders, name='founders'),
    path('team/', views.team, name='team'),
    path('photos/', views.photos, name='photos'),
]

# Media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
