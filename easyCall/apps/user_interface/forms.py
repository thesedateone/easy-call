from django import forms

from easyCall.apps.lists.models import ListType

class UploadFileForm(forms.Form):
    list_type = forms.ModelChoiceField(queryset = ListType.objects.all(), required=True)
    import_only_headings = forms.BooleanField(required=False)
    file = forms.FileField(required=True)