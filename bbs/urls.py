from django.urls import path
from . import views
from django.views.generic import TemplateView

# from .views import ContactFormView, ContactResultView

app_name = 'bbs'

urlpatterns = [
	path('',views.index, name='index'),
    path('contact/', views.contact_form, name='contact_form'),
    path('contact/complete/', views.complete, name='complete'),
	path('<slug:slug>/',views.detail, name='detail'),
	path('category/<str:category>/',views.category, name='category'),
	path('tag/<str:tag>/',views.tag, name='tag'),
	path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
]