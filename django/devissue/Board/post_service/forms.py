from django import forms

class LoginForm(forms.Form):
    id = forms.CharField(
        label="ID",
        max_length=12
    )

    password = forms.CharField(
        label="PASSWORD",
        max_length=12
    )
