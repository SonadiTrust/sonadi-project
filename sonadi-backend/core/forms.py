from django import forms
from django.core.exceptions import ValidationError
import re

from .models import ContactMessage, Testimonial, Volunteer, AdoptionRequest

# Custom Validators
def validate_phone(value):
    if not re.fullmatch(r'\d{10}', value):
        raise ValidationError("Phone number must be exactly 10 digits.")

def validate_email_provider(value):
    allowed_domains = ['gmail.com', 'yahoo.com', 'outlook.com']
    domain = value.split('@')[-1]
    if domain.lower() not in allowed_domains:
        raise ValidationError("Only Gmail, Yahoo, or Outlook emails are allowed.")

# Contact Form
class ContactForm(forms.ModelForm):
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email_provider])

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input-field'}),
            'email': forms.EmailInput(attrs={'class': 'input-field'}),
            'phone': forms.TextInput(attrs={'class': 'input-field'}),
            'message': forms.Textarea(attrs={'class': 'input-field'}),
        }

# Testimonial Form
class TestimonialForm(forms.ModelForm):
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email_provider])

    class Meta:
        model = Testimonial
        fields = ['title', 'message', 'name', 'animal_name', 'email', 'phone', 'photo']

    def clean_photo(self):
        photo = self.cleaned_data.get('photo')
        if photo:
            valid_mime_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            valid_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
            if photo.content_type not in valid_mime_types:
                raise ValidationError("Only image files (jpg, png, gif, webp) are allowed.")
            ext = photo.name.split('.')[-1].lower()
            if ext not in valid_extensions:
                raise ValidationError("Invalid file extension. Allowed: jpg, jpeg, png, gif, webp.")
        return photo

# Volunteer Form
class VolunteerForm(forms.ModelForm):
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email_provider])

    class Meta:
        model = Volunteer
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input-field'}),
            'email': forms.EmailInput(attrs={'class': 'input-field'}),
            'phone': forms.TextInput(attrs={'class': 'input-field'}),
            'message': forms.Textarea(attrs={'class': 'input-field'}),
        }

# Adoption Form
class AdoptionForm(forms.ModelForm):
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email_provider])

    class Meta:
        model = AdoptionRequest
        fields = [
            'name', 'email', 'phone', 'reason',
            'animal_name', 'animal_age', 'animal_gender',
            'animal_breed', 'animal_personality'
        ]
        widgets = {
            'reason': forms.Textarea(attrs={'rows': 3}),
        }
