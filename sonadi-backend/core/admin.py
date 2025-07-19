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

from .models import HomepageStats

admin.site.register(HomepageStats)

from .models import CoreValue  # (if not already)

admin.site.register(CoreValue)

from .models import AboutStats

admin.site.register(AboutStats)

from .models import ActivityInfo

admin.site.register(ActivityInfo)

