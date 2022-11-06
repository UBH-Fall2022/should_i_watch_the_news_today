# Scraping financial news data
- Financial news data is collected using PerigonAPI (https://www.goperigon.com/data-solutions/demo) which enables comparison of news from all sides, deciphering fact from fiction, and transforming big media into actionable insights.
- The scraper helps in the collection of training data which will later be annotated manually aiding in building the Large Language Model used for text classification
- The scraper fetches top financial news headlines from the past five years using the PerigonAPI. 
- The collected data is converted into a Pandas dataframe (https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#) which will be imported into a .csv file.
- The data from the .csv file is annotated by four individuals. 
- The text from the financial news headlines will belong to one of three categories - Positive, Neutral and Negative. 
- This annotated dataset is used in the text classification task. 