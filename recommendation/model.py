import pandas as pd
import numpy as np
from surprise import Reader, Dataset, SVD
from surprise.model_selection import cross_validate, train_test_split
from surprise import accuracy
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from datetime import datetime
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
# Additional imports...

def recommend_businesses(uid):
    # Load the data into pandas dataframes
    review_df = pd.read_csv('Review.csv')
    review_with_df = pd.read_csv('ReviewWith.csv')
    cate_df = pd.read_csv('Cate.csv')
    user_file_df = pd.read_csv('UserFile.csv')
    friend_df = pd.read_csv('Friend.csv')
    cool_history_df = pd.read_csv('coolHistory.csv')

    # Time-Based Filtering: Add weight to recent reviews
    current_year = datetime.now().year
    review_df['date'] = pd.to_datetime(review_df['date'])
    review_df['year'] = review_df['date'].dt.year
    review_df['recency_weight'] = review_df['year'].apply(lambda x: current_year - x + 1)

    # Incorporate UserFile and UserAuth data: Weight users based on how long they've been on the platform
    user_file_df['createTime'] = pd.to_datetime(user_file_df['createTime'])
    user_file_df['account_age'] = user_file_df['createTime'].apply(lambda x: current_year - x.year + 1)

    # Social Network-Based Recommendations: Recommend businesses rated highly by friends
    friends = set(friend_df[friend_df['uid1'] == uid]['uid2'])

    # Use coolHistory data: Weight reviews by users who have a lot of 'cool' ratings
    cool_users = set(cool_history_df['uid'])

    # Sentiment Analysis on Reviews: Add sentiment score to the reviews
    sia = SentimentIntensityAnalyzer()
    review_df['sentiment'] = review_df['text'].apply(lambda x: sia.polarity_scores(x)['compound'])

    # Join the two dataframes on the review id
    joined_df = pd.merge(review_df, review_with_df, how='inner', on='rid')

    # Create a merged dataframe of businesses and their categories
    business_cate_df = pd.merge(joined_df, cate_df, how='inner', on='bid')

    # Preprocess categories: create a dict where each business_id is associated with a string of its categories
    business_to_categories = business_cate_df.groupby('bid')['cate'].apply(lambda x: ', '.join(x)).to_dict()

    # Create a TfidfVectorizer object
    vectorizer = TfidfVectorizer(token_pattern=r'[^\s]+')

    # Fit and transform the cate column
    X = vectorizer.fit_transform(business_to_categories.values())

    # Compute the cosine similarity matrix
    cos_sim = cosine_similarity(X, X)

    # Create a reverse map of indices and business ids
    indices = pd.Series(range(len(business_to_categories)), index=business_to_categories.keys())

    # Define a Reader object
    reader = Reader(rating_scale=(1, 5))

    # Create the dataset to be used for building the filter
    data = Dataset.load_from_df(joined_df[['uid', 'bid', 'stars']], reader)

    # Split the dataset into train and test
    train_set, test_set = train_test_split(data, test_size=0.25)

    # Define the algorithm object; SVD
    algo = SVD()

    # Train the algorithm with the train_set
    algo.fit(train_set)

    # Predict ratings for the test_set
    predictions = algo.test(test_set)

    # Then compute RMSE
    accuracy.rmse(predictions)

    # Get the list of all business ids
    all_business_ids = set(joined_df['bid'])

    # Get the list of businesses that the user has rated
    user_business_ids = set(joined_df.loc[joined_df['uid'] == uid, 'bid'])

    # Handling Cold Start Problem: Provide default recommendations for new users/businesses
    if uid not in joined_df['uid'].values:
        # Recommend the most popular or highly-rated businesses
        return joined_df['bid'].value_counts()[:10].index.tolist()

    # Use the model to predict the rating the user would give to each business
    # and compute a score based on category similarity
    predicted_ratings = []
    for bid in all_business_ids:
        predicted_rating = algo.predict(uid, bid, r_ui=None)
        similarity_scores = [cos_sim[indices[bid]][indices[other_bid]] for other_bid in user_business_ids if other_bid != bid and other_bid in indices]
        similarity_score = np.mean(similarity_scores) if similarity_scores else 0
        weighted_score = predicted_rating.est * similarity_score
        predicted_ratings.append((bid, weighted_score))

    # Sort the businesses by predicted rating, and select the top k
    k = 10
    recommended_business_ids = sorted(predicted_ratings, key=lambda x: x[1], reverse=True)[:k]

    # Return the recommended business ids
    recommended_business_ids = [bid for bid, _ in recommended_business_ids]
    return recommended_business_ids

recommend_businesses("MGPQVLsODMm9ZtYQW-g_OA")

