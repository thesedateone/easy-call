import os

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.db import transaction

from easyCall.apps.user_interface.forms import UploadFileForm
from easyCall.apps.lists.models import ListType
from easyCall.apps.call_records.importer import import_csv

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
    message = None

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            list_type = request.POST['list_type']
            infile = request.FILES['file']
            error = handle_uploaded_file(infile, list_type)
            if error:
                form.add_error(field=None, error=error)
            else:
                message = "File {} uploaded successfully.".format(
                            infile.name)
    else:
        form = UploadFileForm()

    context = {
        'groups': groups,
        'form': form,
        'message': message,
    }
    return render(request, 'user_interface/admin.html', context)


def handle_uploaded_file(the_file, list_type):
    with open('/tmp/file.csv', 'w+b') as destination:
        for chunk in the_file.chunks():
            destination.write(chunk)

    listtype = ListType.objects.get(slug=list_type)
    error = ''

    try:
        with transaction.atomic():
            import_csv('/tmp/file.csv', listtype)
    except KeyError as e:
            error = "Missing key: {}".format(e)

    print("the_file: {}".format(the_file.name))
    print("list: {}".format(listtype))

    os.unlink('/tmp/file.csv')
    return error
