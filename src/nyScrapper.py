import requests as req
import time
API_KEY = 'AmpVAGBXHuVAyTn8S1MvSN0x5D7Z3KLO'  # insert your API_KEY
TOPIC = 'business'
articles = []
paragraph = []
title = []
for i in range(1):
    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + \
        TOPIC+'&api-key='+API_KEY+'&page='+str(i)
    response = req.get(url).json()


# Extract the necessary fields from the response.
    # print(response)
    docs = response['response']['docs']
    for doc in docs:
        filteredDoc = {}
        filteredDoc['paragraph'] = doc['abstract'] + doc['lead_paragraph']
        filteredDoc['title'] = doc['headline']['main']
        paragraph.append(doc['abstract'] + doc['lead_paragraph'])
        title.append(doc['headline']['main'])
        articles.append(filteredDoc)

# Done to avoid hitting the API request limit.
    time.sleep(6)
# print(articles)
for i in range(len(paragraph)):
    print(paragraph[i])
    print(title[i])
    print("--")
    print("")
