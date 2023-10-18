from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render,get_object_or_404
from bbs.models import Category, Article, Tag
from django.views.generic import TemplateView
import os
from dotenv import load_dotenv
load_dotenv()
GOOGLE_API_SSID = os.getenv("GOOGLE_API_SSID")
GOOGLE_API_JSON = os.getenv("GOOGLE_API_JSON")
IMG_PATH = os.getenv("IMG_PATH")

from django.shortcuts import render, redirect
from .forms import ContactForm
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import BadHeaderError, send_mail

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt , pandas as pd

def paginate_queryset(request, queryset, count):
	paginator = Paginator(queryset, count)
	page = request.GET.get('page')
	try:
		page_obj = paginator.page(page)
	except PageNotAnInteger:
		page_obj = paginator.page(1)
	except EmptyPage:
		page_obj = paginator.page(paginator.num_pages)
	return page_obj

def index(request):
	articles = Article.objects.order_by('-id')
	page_obj = paginate_queryset(request, articles, 6)
	return render(request,'bbs/index.html',{'articles': page_obj.object_list,'page_obj': page_obj})

def category(request, category):
	category = Category.objects.get(name=category)
	articles = Article.objects.order_by('-id').filter(category=category)
	page_obj = paginate_queryset(request, articles, 6)
	return render(request, 'bbs/list.html',{'category': category, 'articles': page_obj.object_list,'page_obj': page_obj })

def tag(request, tag):
	tag = Tag.objects.get(name=tag)
	articles = Article.objects.order_by('-id').filter(tag=tag)
	page_obj = paginate_queryset(request, articles, 6)
	return render(request, 'bbs/list.html',{'tag': tag, 'articles': page_obj.object_list,'page_obj': page_obj })

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

def detail(request, slug):
	entries = Article.objects.order_by('-id')[:3]
	article = get_object_or_404(Article, slug=slug)

	scope = ['https://spreadsheets.google.com/feeds']
	path = os.path.expanduser(GOOGLE_API_JSON)

	credentials = ServiceAccountCredentials.from_json_keyfile_name(path, scope)
	gc = gspread.authorize(credentials)
	workbook   = gc.open_by_key(GOOGLE_API_SSID)
	worksheet  = workbook.worksheet("weight")
	data = pd.DataFrame(worksheet.get_all_values()[1:], columns=worksheet.get_all_values()[0])
	pngDate = str(worksheet.col_values(1)[-1])

	article_updated_at = article.updated_at

	current_year = datetime.now().year
	formatted_date = f"{current_year}/{pngDate}"
	weight_png_date = datetime.strptime(formatted_date, '%Y/%m/%d').date()

	if article.slug == "fitness":
		if article_updated_at > weight_png_date:
			latest_date = article_updated_at
		else:
			latest_date = weight_png_date
	else:
		latest_date = article_updated_at

	with plt.style.context('Solarize_Light2'):
		plt.rcParams["figure.figsize"] = (10,5)
		plt.ylim(70, 84)
		plt.xticks(size='small')
		plt.plot(data['date'],data['weight'].astype('float'),marker = "o", color = "#4e3b2f")
		plt.title('Weight Graph')
		plt.xlabel('Date')
		plt.ylabel('Weight')
		plt.savefig(IMG_PATH + 'weight.png')

	params = {
		'article': article,
		'entries': entries,
		'pngDate': pngDate,
		'latest_date': latest_date,
	}

	return render(request,'bbs/detail.html', params)


def complete(request):
	entries = Article.objects.order_by('-id')[:3]
	article = Article.objects.order_by('-id')
	return render(request, 'bbs/complete.html', {'article':article,'entries': entries})

def contact_form(request):
	entries = Article.objects.order_by('-id')[:3]
	article = Article.objects.order_by('-id')
	if request.method == 'POST':
		form = ContactForm(request.POST)
		if form.is_valid():
			subject = form.cleaned_data['subject']
			message = form.cleaned_data['message']
			sender = form.cleaned_data['sender']
			myself = form.cleaned_data['myself']
			recipients = [settings.EMAIL_HOST_USER]
			if myself:
				recipients.append(sender)
			try:
				send_mail(subject, message, sender, recipients)
			except BadHeaderError:
				return HttpResponse('Invalid header found')
			return redirect('bbs:complete')
	else:
		form = ContactForm()
	return render(request, 'bbs/contact.html', {'form': form,'article':article,'entries': entries})


