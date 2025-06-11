from django.contrib import admin
from .models import Testimonial, ContactMessage, Volunteer, AdoptionRequest

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'animal_name', 'approved')
    list_filter = ('approved',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'submitted_at')

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'submitted_at')

@admin.register(AdoptionRequest)
class AdoptionRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'animal_name', 'submitted_at')
