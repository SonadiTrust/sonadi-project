from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMessage
from .forms import ContactForm, TestimonialForm, VolunteerForm
from .models import Testimonial

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()

            # Prepare email
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']

            full_message = f"""
New Contact Form Submission:

Name: {name}
Email: {email}
Phone: {phone}

Message:
{message}
"""

            email_msg = EmailMessage(
                subject=f"New message from {name}",
                body=full_message,
                from_email='sonadicharitytrust@gmail.com',
                to=['sonadicharitytrust@gmail.com'],
                reply_to=[email],
            )
            email_msg.send(fail_silently=False)

            messages.success(request, "Your message has been sent successfully!")
            return redirect('contact')
    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})

def donate(request):
    return render(request, 'donate.html')

def testimonial(request):
    testimonials = Testimonial.objects.filter(approved=True)
    if request.method == 'POST':
        form = TestimonialForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Thanks for your testimonial! It will appear once approved.")
            return redirect('testimonial')
    else:
        form = TestimonialForm()
    return render(request, 'testimonial.html', {'form': form, 'testimonials': testimonials})

from django.core.mail import EmailMessage

def volunteer(request):
    if request.method == 'POST':
        form = VolunteerForm(request.POST)
        if form.is_valid():
            form.save()

            # Prepare email content
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            message = form.cleaned_data['message']

            email_content = f"""
New Volunteer Submission:

Name: {name}
Email: {email}
Phone: {phone}

Message:
{message}
"""

            email_msg = EmailMessage(
                subject=f"New Volunteer Request from {name}",
                body=email_content,
                from_email='sonadicharitytrust@gmail.com',  # must match your EMAIL_HOST_USER
                to=['sonadicharitytrust@gmail.com'],         # your receiving email
                reply_to=[email]
            )
            email_msg.send(fail_silently=False)

            messages.success(request, "Thank you for volunteering with us!")
            return redirect('volunteer')
    else:
        form = VolunteerForm()

    return render(request, 'volunteer.html', {'form': form})


def adopt_a_dog(request):
    return render(request, 'adopt-a-dog.html')

def activities(request):
    return render(request, 'activities.html')

def gallery(request):
    return render(request, 'gallery.html')

def founders(request):
    return render(request, 'founders.html')

def team(request):
    return render(request, 'team.html')

def photos(request):
    return render(request, 'photos.html')
