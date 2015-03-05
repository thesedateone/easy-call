from django import forms

from easyCall.apps.lists.models import ListType

LIST_TYPE_CHOICES = [(x.slug, x.display_name) for x in ListType.objects.all()]

class UploadFileForm(forms.Form):
    list_type = forms.ChoiceField(choices=LIST_TYPE_CHOICES, 
                                  required=True)
    file = forms.FileField(required=True)