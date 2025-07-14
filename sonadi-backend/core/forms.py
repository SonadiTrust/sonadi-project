from django import forms
from django.core.exceptions import ValidationError
import re

from .models import (
    ContactMessage,
    Testimonial,
    Volunteer,
    AdoptionRequest,
)

# ------------------------------------------------------------------
# 🔸 Custom Validators
# ------------------------------------------------------------------
def validate_name(value):
    if not re.fullmatch(r"[A-Za-z ]+", value):
        raise ValidationError("Enter a valid name. Only letters and spaces are allowed.")


def validate_phone(value):
    if not value.isdigit():
        raise ValidationError("Phone number must contain digits only.")
    if len(value) != 10:
        raise ValidationError("Enter a valid 10-digit mobile number.")


def validate_email(value):
    if not re.fullmatch(r"[^@]+@[^@]+\.[^@]+", value):
        raise ValidationError("Enter a valid email address.")


def validate_message(value):
    if not value.strip():
        raise ValidationError("Message field cannot be empty.")


# ------------------------------------------------------------------
# 🔸 Contact Form
# ------------------------------------------------------------------
class ContactForm(forms.ModelForm):
    name = forms.CharField(
        validators=[validate_name],
        error_messages={"required": "Please enter your name."},
    )
    phone = forms.CharField(
        validators=[validate_phone],
        error_messages={"required": "Please enter your mobile number."},
    )
    email = forms.EmailField(
        validators=[validate_email],
        error_messages={"required": "Please enter your email address."},
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={"class": "input-field"}),
        validators=[validate_message],
        error_messages={"required": "Please enter a message."},
    )

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "message"]
        widgets = {
            "name":  forms.TextInput(attrs={"class": "input-field"}),
            "email": forms.EmailInput(attrs={"class": "input-field"}),
            "phone": forms.TextInput(attrs={"class": "input-field"}),
        }


# ------------------------------------------------------------------
# 🔸 Testimonial Form (Uploadcare)
# ------------------------------------------------------------------
class TestimonialForm(forms.ModelForm):
    name = forms.CharField(
        validators=[validate_name],
        error_messages={"required": "Please enter your name."},
    )
    phone = forms.CharField(
        validators=[validate_phone],
        error_messages={"required": "Please enter your mobile number."},
    )
    email = forms.EmailField(
        validators=[validate_email],
        error_messages={"required": "Please enter your email address."},
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={"class": "input-field"}),
        validators=[validate_message],
        error_messages={"required": "Please enter your testimonial message."},
    )

    class Meta:
        model = Testimonial
        fields = [
            "title",
            "message",
            "name",
            "animal_name",
            "email",
            "phone",
            "image_url",   # Uploadcare CDN URL
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Attach Uploadcare widget (no placeholder text)
        self.fields["image_url"].widget = forms.TextInput(
            attrs={
                "role": "uploadcare-uploader",
                "data-public-key": "e27d1532e4be9cc99d76",
                "data-images-only": "true",
                "data-crop": "free",           # ✅ enables free-form cropping

            }
        )
        # Uncomment if you want to force image upload:
        # self.fields["image_url"].required = True


# ------------------------------------------------------------------
# 🔸 Volunteer Form
# ------------------------------------------------------------------
class VolunteerForm(forms.ModelForm):
    name = forms.CharField(
        validators=[validate_name],
        error_messages={"required": "Please enter your name."},
    )
    phone = forms.CharField(
        validators=[validate_phone],
        error_messages={"required": "Please enter your mobile number."},
    )
    email = forms.EmailField(
        validators=[validate_email],
        error_messages={"required": "Please enter your email address."},
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={"class": "input-field"}),
        validators=[validate_message],
        error_messages={"required": "Please tell us why you want to volunteer."},
    )

    class Meta:
        model = Volunteer
        fields = ["name", "email", "phone", "message"]
        widgets = {
            "name":  forms.TextInput(attrs={"class": "input-field"}),
            "email": forms.EmailInput(attrs={"class": "input-field"}),
            "phone": forms.TextInput(attrs={"class": "input-field"}),
        }


# ------------------------------------------------------------------
# 🔸 Adoption Request Form
# ------------------------------------------------------------------
class AdoptionForm(forms.ModelForm):
    name = forms.CharField(
        validators=[validate_name],
        error_messages={"required": "Please enter your name."},
    )
    phone = forms.CharField(
        validators=[validate_phone],
        error_messages={"required": "Please enter your mobile number."},
    )
    email = forms.EmailField(
        validators=[validate_email],
        error_messages={"required": "Please enter your email address."},
    )
    reason = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 3}),
        validators=[validate_message],
        error_messages={"required": "Please explain why you want to adopt."},
    )

    class Meta:
        model = AdoptionRequest
        fields = [
            "name",
            "email",
            "phone",
            "reason",
            "animal_name",
            "animal_age",
            "animal_gender",
            "animal_breed",
            "animal_personality",
        ]
