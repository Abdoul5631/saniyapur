from django.db import models


class ContactRequest(models.Model):
    class Status(models.TextChoices):
        UNREAD = "unread", "Non lu"
        READ = "read", "Lu"
        DONE = "done", "Traité"

    name = models.CharField(max_length=160)
    company = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    whatsapp = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.UNREAD)
    processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject or 'Contact'}"
