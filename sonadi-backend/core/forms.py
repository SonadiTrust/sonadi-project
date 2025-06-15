from django import forms
from django.core.exceptions import ValidationError
import re

from .models import ContactMessage, Testimonial, Volunteer, AdoptionRequest

# New Validators
def validate_name(value):
    if not re.fullmatch(r'[A-Za-z ]+', value):
        raise ValidationError("Name should contain only letters and spaces.")

def validate_phone(value):
    if not re.fullmatch(r'\d{10}', value):
        raise ValidationError("Phone number must be exactly 10 digits.")

def validate_email(value):
    if not re.fullmatch(r"[^@]+@[^@]+\.[^@]+", value):
        raise ValidationError("Enter a valid email address.")

# Contact Form
class ContactForm(forms.ModelForm):
    name = forms.CharField(validators=[validate_name])
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email])

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
    name = forms.CharField(validators=[validate_name])
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email])

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
    name = forms.CharField(validators=[validate_name])
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email])

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
    name = forms.CharField(validators=[validate_name])
    phone = forms.CharField(validators=[validate_phone])
    email = forms.EmailField(validators=[validate_email])

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
