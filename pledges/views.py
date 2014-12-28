"""Views for the pledges app."""
from django.shortcuts import render


def index(request):
    """Dummy view to test Heroku."""
    return render(request, 'pledges/index.html')
