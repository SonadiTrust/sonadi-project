from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'animal_name', 'approved')  # optional
    list_filter = ('approved',)  # optional
    
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'message')


