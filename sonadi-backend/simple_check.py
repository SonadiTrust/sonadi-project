#!/usr/bin/env python
"""
Simple script to check testimonial image configuration
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

def check_simple():
    print("=== SIMPLE TESTIMONIAL CHECK ===\n")
    
    testimonials = Testimonial.objects.all()
    print(f"Total testimonials: {testimonials.count()}")
    print(f"Approved testimonials: {testimonials.filter(approved=True).count()}\n")
    
    for i, t in enumerate(testimonials, 1):
        print(f"Testimonial {i}: {t.name} - {t.title}")
        print(f"  Approved: {t.approved}")
        
        # Check what fields exist
        fields = [field.name for field in t._meta.fields]
        print(f"  Available fields: {', '.join(fields)}")
        
        # Check image_url field
        try:
            image_url = getattr(t, 'image_url', None)
            print(f"  Image URL field: {image_url if image_url else 'EMPTY'}")
        except:
            print("  Image URL field: ERROR")
        
        # Check get_image_url method
        try:
            result = t.get_image_url
            print(f"  get_image_url result: {result if result else 'EMPTY'}")
        except Exception as e:
            print(f"  get_image_url error: {e}")
        
        print("-" * 50)

if __name__ == "__main__":
    check_simple()
