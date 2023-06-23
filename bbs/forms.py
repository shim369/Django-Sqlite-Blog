from django import forms

class ContactForm(forms.Form):
	subject = forms.CharField(max_length=100,
            widget=forms.TextInput(
            attrs={'placeholder':'Subject', 'class':'p-contact__input'}))
	sender = forms.EmailField(widget=forms.TextInput(
            attrs={'placeholder':'E-mail', 'class':'p-contact__input'}))
	message = forms.CharField(widget=forms.Textarea(
            attrs={'placeholder':'Message', 'class':'p-contact__textarea'}))
	myself = forms.BooleanField(required=False,widget=forms.CheckboxInput(attrs={'id':'box', 'class':'p-contact__checkbox'}))