from django.db import models


# ----------------------------
# Contact / Feedback
# ----------------------------
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} – {self.email}"


# ----------------------------
# Testimonials
# ----------------------------
class Testimonial(models.Model):
    title = models.CharField(max_length=255)          # Heading
    message = models.TextField()
    name = models.CharField(max_length=100)
    animal_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    # Uploadcare stores the file and returns a CDN URL; we save that URL.
    image_url = models.URLField(blank=True, null=True)

    approved = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} – {self.title}"


# ----------------------------
# Volunteer Sign-ups
# ----------------------------
class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} – {self.email}"


# ----------------------------
# Adoption Requests
# ----------------------------
class AdoptionRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    reason = models.TextField()

    animal_name = models.CharField(max_length=100)
    animal_age = models.CharField(max_length=50)
    animal_gender = models.CharField(max_length=10)
    animal_breed = models.CharField(max_length=100)
    animal_personality = models.TextField()

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} wants to adopt {self.animal_name}"

from django.db import models

class HomepageStats(models.Model):
    animals_rescued = models.CharField(max_length=50, default='10,000+')
    sterilizations_done = models.CharField(max_length=50, default='30,000+')

    def __str__(self):
        return "Homepage Stats"
