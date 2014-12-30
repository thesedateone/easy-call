"""Views for the pledges app."""
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required()
def index(request):
    """Dummy view to test Heroku."""
    return render(request, 'pledges/index.html')
