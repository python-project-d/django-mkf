from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from App.models import User


def index(request):
    # return HttpResponse("你好,Django")
    # return render(request, 'index.html', context={
    #     'title': 'baidu',
    #     'name': 'Django'
    # })
    return render(request,'jc1.html')

def s(request):
    return render(request,'index.html')