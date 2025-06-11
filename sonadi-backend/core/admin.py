from django.contrib import admin
from .models import Testimonial

from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('title', 'name', 'animal_name', 'approved')  # optional
    list_filter = ('approved',)  # optional