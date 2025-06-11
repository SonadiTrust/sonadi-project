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

            # Email content
            title = form.cleaned_data['title']
            message = form.cleaned_data['message']
            name = form.cleaned_data['name']
            animal_name = form.cleaned_data['animal_name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']

            full_message = f"""
New Testimonial Submitted:

Title: {title}
Name: {name}
Animal Name: {animal_name}
Email: {email}
Phone: {phone}

Message:
{message}
"""

            email_msg = EmailMessage(
                subject=f"New Testimonial from {name}",
                body=full_message,
                from_email='sonadicharitytrust@gmail.com',
                to=['sonadicharitytrust@gmail.com'],
                reply_to=[email]
            )
            email_msg.send(fail_silently=False)

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


from django.core.mail import EmailMessage
from .forms import AdoptionForm

def adopt_a_dog(request):
    if request.method == 'POST':
        form = AdoptionForm(request.POST)
        if form.is_valid():
            form.save()

            # Extract data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            reason = form.cleaned_data['reason']
            animal_name = form.cleaned_data['animal_name']
            animal_age = form.cleaned_data['animal_age']
            animal_gender = form.cleaned_data['animal_gender']
            animal_breed = form.cleaned_data['animal_breed']
            animal_personality = form.cleaned_data['animal_personality']

            # Compose email
            message = f"""
New Adoption Request:

Full Name: {name}
Email: {email}
Phone: {phone}
Reason for Adoption: {reason}

Animal Details:
Name: {animal_name}
Age: {animal_age}
Gender: {animal_gender}
Breed: {animal_breed}
Personality: {animal_personality}
"""

            email_msg = EmailMessage(
                subject=f"Adoption Form Submission from {name}",
                body=message,
                from_email='sonadicharitytrust@gmail.com',
                to=['sonadicharitytrust@gmail.com'],
                reply_to=[email]
            )
            email_msg.send(fail_silently=False)

            messages.success(request, "Your adoption request has been submitted!")
            return redirect('adopt_a_dog')
    else:
        form = AdoptionForm()

    return render(request, 'adopt-a-dog.html', {'form': form})



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
