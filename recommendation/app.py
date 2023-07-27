import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from surprise import Reader, Dataset, SVD
from surprise.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from datetime import datetime
import pickle
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def train_and_save_model():
    # Load the data into pandas dataframes
    review_df = pd.read_csv('Review.csv')
    review_with_df = pd.read_csv('ReviewWith.csv')
    cate_df = pd.read_csv('Cate.csv')

    # Time-Based Filtering: Add weight to recent reviews
    current_year = datetime.now().year
    review_df['date'] = pd.to_datetime(review_df['date'])
    review_df['year'] = review_df['date'].dt.year
    review_df['recency_weight'] = review_df['year'].apply(lambda x: current_year - x + 1)

    # Sentiment Analysis on Reviews: Add sentiment score to the reviews
    sia = SentimentIntensityAnalyzer()
    review_df['sentiment'] = review_df['text'].apply(lambda x: sia.polarity_scores(x)['compound'])

    # Join the two dataframes on the review id
    joined_df = pd.merge(review_df, review_with_df, how='inner', on='rid')

    # Create a merged dataframe of businesses and their categories
    business_cate_df = pd.merge(joined_df, cate_df, how='inner', on='bid')

    # Preprocess categories: create a dict where each business_id is associated with a string of its categories
    business_cate_df['cate'] = business_cate_df['cate'].fillna('')
    business_to_categories = business_cate_df.groupby('bid')['cate'].apply(lambda x: ', '.join(x)).to_dict()

    # Create a TfidfVectorizer object
    vectorizer = TfidfVectorizer(token_pattern=r'[^\s]+')

    # Fit and transform the cate column
    X = vectorizer.fit_transform(business_to_categories.values())

    # Compute the cosine similarity matrix
    cos_sim = cosine_similarity(X, X)

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

    # Save the trained model and necessary data using pickle
    with open('trained_model.pkl', 'wb') as f:
        pickle.dump(algo, f)
    with open('cosine_similarity_matrix.pkl', 'wb') as f:
        pickle.dump(cos_sim, f)
    with open('tfidf_vectorizer.pkl', 'wb') as f:
        pickle.dump(vectorizer, f)

def load_pretrained_model():
    # Load the trained SVD model
    with open('trained_model.pkl', 'rb') as f:
        algo = pickle.load(f)

    # Load the cosine similarity matrix
    with open('cosine_similarity_matrix.pkl', 'rb') as f:
        cos_sim = pickle.load(f)

    # Load the TfidfVectorizer
    with open('tfidf_vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)

    return algo, cos_sim, vectorizer

def recommend_businesses(uid, algo, cos_sim, vectorizer):
    # Load the data into pandas dataframes
    review_df = pd.read_csv('Review.csv')
    review_with_df = pd.read_csv('ReviewWith.csv')
    cate_df = pd.read_csv('Cate.csv')

    # Join the two dataframes on the review id
    joined_df = pd.merge(review_df, review_with_df, how='inner', on='rid')

    # Create a merged dataframe of businesses and their categories
    business_cate_df = pd.merge(joined_df, cate_df, how='inner', on='bid')

    # Preprocess categories: create a dict where each business_id is associated with a string of its categories
    business_cate_df['cate'] = business_cate_df['cate'].fillna('')
    business_to_categories = business_cate_df.groupby('bid')['cate'].apply(lambda x: ', '.join(x)).to_dict()

    # Create a TfidfVectorizer object (use the provided vectorizer)
    vectorizer = vectorizer

    # Fit and transform the cate column (use the provided vectorizer)
    X = vectorizer.transform(business_to_categories.values())

    # Compute the cosine similarity matrix (use the provided cos_sim)
    cos_sim = cos_sim

    # Create a reverse map of indices and business ids
    indices = pd.Series(range(len(business_to_categories)), index=business_to_categories.keys())

    # Get the list of all business ids
    all_business_ids = set(joined_df['bid'])

    # Get the list of businesses that the user has rated
    user_business_ids = set(joined_df.loc[joined_df['uid'] == uid, 'bid'])

    k = 10
    if uid not in joined_df['uid'].values:
        # If user does not exist in the dataset, recommend the most popular or highly-rated businesses
        recommended_business_ids = joined_df['bid'].value_counts()[:k].index.tolist()
    else:
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
        recommended_business_ids = sorted(predicted_ratings, key=lambda x: x[1], reverse=True)[:k]

    # Return only the business ids without the ratings
    recommended_business_ids = [bid for bid, _ in recommended_business_ids[:k]]
    return recommended_business_ids

@app.route('/recommend', methods=['GET'])
def recommend():
    uid = request.args.get('uid')
    algo, cos_sim, vectorizer = load_pretrained_model()
    recommendations = recommend_businesses(uid, algo, cos_sim, vectorizer)
    response = jsonify(recommendations)
    return response

if __name__ == '__main__':
    # Train and save the model before running the Flask app
    train_and_save_model()

    # Start the Flask app
    app.run()
