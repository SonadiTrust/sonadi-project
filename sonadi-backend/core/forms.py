from django import forms
from django.core.exceptions import ValidationError

from .models import ContactMessage, Testimonial, Volunteer

# Contact Form
class ContactForm(forms.ModelForm):
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
    class Meta:
        model = Volunteer
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input-field'}),
            'email': forms.EmailInput(attrs={'class': 'input-field'}),
            'phone': forms.TextInput(attrs={'class': 'input-field'}),
            'message': forms.Textarea(attrs={'class': 'input-field'}),
        }


from .models import AdoptionRequest

class AdoptionForm(forms.ModelForm):
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
