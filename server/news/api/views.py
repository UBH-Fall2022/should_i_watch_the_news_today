from django.shortcuts import render


import requests
from time import sleep
from tkinter import ALL
from datetime import date
import cohere 
import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from collections import Counter


# Create your views here.
@api_view(['GET', 'POST'])
def search(request):
    if request.method=='GET':

        #get the query term
        q=request.data["query"]

        search = q.split(' ')
        searchTerms = ""
        for t in search[:-1]:
            searchTerms += t+" OR "

        searchTerms += search[-1]

        articleDescriptions = []
        #articleContents = []

        #dates = ["2022-10-01", "2021-11-01", "2022-01-01", "2021-09-26", "2022-09-07"]

        #get the list of news data for the query term
        DATE = date.today()
        DATE = DATE.strftime("2020-01-05")
        ALL_URL = f'https://api.goperigon.com/v1/all?apiKey={settings.API_KEY}&from={DATE}&sourceGroup=top25finance&sortBy=date&q={searchTerms}'
        for i in range(1):
            curr_url = ALL_URL+f"&page={i}"
            sleep(5)
            response = requests.get(curr_url)
            print('Response obtained for '+DATE)
            articles = response.json()['articles']
            print('Appending to articles for '+DATE)
            for article in articles:
                articleDescriptions.append(article['description'])
        
        #creat a cohere model
        co=cohere.Client(settings.COHERE_CLIENT_TOKEN)
        
        #get the model response
        model_response=co.classify(model=settings.MODEL_ID,inputs=articleDescriptions)

        
        
        preds=[]
        for classification in model_response:
            preds.append(classification.prediction)
        
        pred_count = Counter(preds)
        positives = pred_count['Positive']
        negatives = pred_count['Negative']
        neutral = pred_count['Neutral']

        analytics = positives - negatives

        if analytics < 0:
            analytics = 0
        
        score=(analytics/len(preds))*100
        

        res={"score":score,"predictions":preds}

    return JsonResponse(res)



        
        

        



    

        
    
