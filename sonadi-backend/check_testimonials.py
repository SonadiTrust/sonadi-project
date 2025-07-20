#!/usr/bin/env python
"""
Quick script to check testimonial image configuration
"""
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import Testimonial

def check_testimonials():
    print("=== TESTIMONIAL IMAGE ANALYSIS ===\n")
    
    testimonials = Testimonial.objects.all()
    print(f"Total testimonials in database: {testimonials.count()}")
    print(f"Approved testimonials: {testimonials.filter(approved=True).count()}\n")
    
    for i, t in enumerate(testimonials, 1):
        print(f"Testimonial {i}: {t.name} - {t.title}")
        print(f"  Approved: {t.approved}")
        print(f"  Image field: {'YES' if t.image else 'NO'}")
        if t.image:
            print(f"  Image path: {t.image}")
            print(f"  Image URL: {t.image.url}")
        print(f"  Image URL field: {'YES' if t.image_url else 'NO'}")
        if t.image_url:
            print(f"  Image URL: {t.image_url}")
        print(f"  get_image_url result: {t.get_image_url}")
        print(f"  Submitted: {t.submitted_at}")
        print("-" * 50)

if __name__ == "__main__":
    check_testimonials()
