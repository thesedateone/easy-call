from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    groups = request.user.groups.values_list('name',flat=True)
    if ('Admin' in groups):
        return redirect('ui:admin')
    elif ('Inbound' in groups):
        return redirect('ui:search')
    elif ('Caller' in groups):
        return redirect('ui:call')
    else:
        return redirect('logout')


@login_required
def call(request):
    groups = request.user.groups.values_list('name',flat=True)
    if ('Caller' not in groups):
        return redirect('logout')
    context = {
        'groups': groups
    }
    return render(request, 'user_interface/call.html', context)


@login_required
def search(request):
    groups = request.user.groups.values_list('name',flat=True)
    if ('Inbound' not in groups):
        return redirect('logout')
    context = {
        'groups': groups
    }
    return render(request, 'user_interface/search.html', context)


@login_required
def admin(request):
    groups = request.user.groups.values_list('name',flat=True)
    if ('Admin' not in groups):
        return redirect('logout')
    context = {
        'groups': groups
    }
    return render(request, 'user_interface/admin.html', context)