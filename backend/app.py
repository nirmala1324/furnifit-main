from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient

# IMPORT FOR MACHINE LEARNING AND SEARCH BAR
import pickle
import string
import pandas as pd
import nltk
nltk.download('punkt')
nltk.download('stopwords')
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

from nltk.stem import WordNetLemmatizer
from nltk.tag import pos_tag
import spacy
from googletrans import Translator
from flask_caching import Cache

app = Flask(__name__)

# Configure CORS
CORS(app)

# Configure Flask-Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


# MONGODB connection details ==========================================
client = MongoClient('mongodb+srv://nirmalapusparatna20031107:npr20031107@cluster0.cqhgovi.mongodb.net/')  # Assuming MongoDB is running locally on the default port

# Accessing the database
db = client['dbfurnifit']

# Accessing the collection
collection = db['furnitures']



# ================ GET DATA FROM DATABASE ======================

@app.route('/api/furnitures', methods=['GET'])
def get_furnitures():
    page = int(request.args.get('page', 1))  # Get the page number from the query parameter, default to 1
    per_page = 12  # Number of items per page

    # Calculate the starting index and ending index for pagination
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    # Retrieve a slice of documents from the collection
    furniture_data = list(collection.find({}, {'_id': False, 'furni_id': True, 'furni_name': True, 'furni_type': True, 'space_cat': True, 'furni_picture': True}).skip(start_index).limit(per_page))
    
    # Count total number of items in the collection
    total_items = collection.count_documents({})

    # Returning the documents and total items as JSON
    return jsonify({
        'furnitureData': furniture_data,
        'totalItems': total_items
    })



# ================ ML PREFERENCES ========================

# Load the trained model and dataset
with open('./assets/model.pkl', 'rb') as model_file:
    vectorizer, tags_tfidf_matrix, df = pickle.load(model_file)
    
# Function for text-preprocessing
def preprocess_text(text):
    tokens = word_tokenize(text.lower())  # Tokenization
    tokens = [token for token in tokens if token.isalpha()]  # Removes punctuation and numbers
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]  # Removes stopwords
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]  # Stemming
    return " ".join(tokens)

# Function to recommend product names based on descriptions
def recommend_product_names(user_input, n=20):
    preprocessed_query = preprocess_text(user_input)  # Preprocess query
    user_input_vector = vectorizer.transform([preprocessed_query])  # Calculates TF-IDF for input user
    similarities = cosine_similarity(user_input_vector, tags_tfidf_matrix)  # Calculating similarity with cosine similarity
    top_indices = similarities.argsort(axis=1)[:, -n:][:, ::-1]  # Get the product index with the highest similarity
    recommended_product_names = [df.iloc[idx]['id'] for idx in top_indices[0]]  # Gets the name of the recommended product
    return recommended_product_names

# Route for recommendation
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    input_space_category = data.get("space_category", "")
    input_subspace_category = data.get("room_category", "")
    input_product = data.get("product_type", "")
    input_material = data.get("material_type", "")
    input_style = data.get("style_type", "")
    input_color = data.get("furniture_color", "")
    
    keywords = input_space_category + " " + input_subspace_category + " " + input_product + " " + input_material + " " + input_style + " " + input_color
    keywords = keywords.lower()  # Convert keywords to lower case
    recommended_products = recommend_product_names(keywords)
    
    return jsonify({"recommended_products": recommended_products})


# ================ SEARCH BAR ========================

# Load the dataset
df = pd.read_csv("./assets/cleaned_datasets.csv")

# Initialize NLTK and Spacy resources
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('maxent_ne_chunker')
nltk.download('words')
nlp = spacy.load("en_core_web_sm")

# Define preprocessing functions

def tokenize(sentence):
    """
    Tokenizes a sentence into words.

    Args:
        sentence (str): The input sentence to be tokenized.

    Returns:
        list: A list of tokens (words) extracted from the sentence.
    """
    return nltk.word_tokenize(sentence)

def lemmatize(tokens):
    """
    Lemmatizes tokens (words) to their base forms.

    Args:
        tokens (list): A list of tokens (words) to be lemmatized.

    Returns:
        list: A list of lemmatized tokens.
    """
    lemmatizer = WordNetLemmatizer()
    return [lemmatizer.lemmatize(token) for token in tokens]

def pos_tag_tokens(tokens):
    """
    Performs Part-of-Speech (POS) tagging on tokens.

    Args:
        tokens (list): A list of tokens (words) to be tagged.

    Returns:
        list: A list of tuples where each tuple contains a token and its corresponding POS tag.
    """
    return pos_tag(tokens)

def extract_entities(text):
    """
    Extracts named entities from the input text.

    Args:
        text (str): The input text from which entities are to be extracted.

    Returns:
        list: A list of tuples where each tuple contains a named entity and its label.
    """
    doc = nlp(text)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities

def translate_text(text, src_lang='auto', dest_lang='en'):
    """
    Translates text from the source language to the destination language.

    Args:
        text (str): The input text to be translated.
        src_lang (str, optional): The source language of the text. Defaults to 'auto'.
        dest_lang (str, optional): The destination language for translation. Defaults to 'en' (English).

    Returns:
        str: The translated text.
    """
    translator = Translator()
    translated_text = translator.translate(text, src=src_lang, dest=dest_lang).text
    return translated_text

def detect_language(text):
    """
    Detects the language of the input text.

    Args:
        text (str): The input text for language detection.

    Returns:
        str: The detected language code.
    """
    translator = Translator()
    detected_lang = translator.detect(text).lang
    return detected_lang

def translate_input(text):
    """
    Translates input text to English if it's not already in English.

    Args:
        text (str): The input text to be translated.

    Returns:
        str: The translated text in English.
    """
    detected_lang = detect_language(text)
    if detected_lang != 'en':
        translated_text = translate_text(text, src_lang=detected_lang, dest_lang='en')
    else:
        translated_text = text
    return translated_text

# Function to preprocess and search for products
@cache.memoize(timeout=3600)  # Cache the results for 1 hour
def search_products(user_query):
    translated_input = translate_input(user_query)
    processed_query = tokenize(translated_input)
    lemmatized_query = lemmatize(processed_query)
    pos_tagged_query = pos_tag_tokens(lemmatized_query)

    search_keyword_list = []
    for word, tag in pos_tagged_query:
        if tag.startswith("NN") or tag.startswith("JJ"):
            for index, row in df.iterrows():
                if word.lower() in row['name'].lower() or \
                   word.lower() in row['product_type'].lower() or \
                   word.lower() in row['space_category'].lower() or \
                   word.lower() in row['sub_space_category'].lower() or \
                   word.lower() in row['style'].lower() or \
                   word.lower() in row['detail_material'].lower() or \
                   word.lower() in row['furniture_color'].lower() or \
                   word.lower() in row['description'].lower():
                    search_keyword_list.append(word.lower())

    search_keyword = " ".join(set(search_keyword_list))

    matching_rows = pd.DataFrame()
    product_keyword_count = {}

    for col in ['product_type', 'style', 'name', 'detail_material', 'description', 'space_category', 'sub_space_category', 'furniture_color']:
        for word in search_keyword_list:
            matches = df[df[col].str.contains(word, case=False)]
            matching_rows = pd.concat([matching_rows, matches])

            for index, row in matches.iterrows():
                product_id = row['name']
                product_keyword_count[product_id] = product_keyword_count.get(product_id, 0) + 1

    matching_rows = matching_rows.drop_duplicates()

    product_keyword_df = pd.DataFrame.from_dict(product_keyword_count, orient='index', columns=['keyword_count'])
    product_keyword_df = product_keyword_df.sort_values(by='keyword_count', ascending=False)

    matching_rows_sorted = pd.DataFrame()

    for index, row in product_keyword_df.iterrows():
        product_id = index
        matches = df[df['name'].str.contains(product_id, case=False) |
                     df['product_type'].str.contains(product_id, case=False) |
                     df['space_category'].str.contains(product_id, case=False) |
                     df['sub_space_category'].str.contains(product_id, case=False) |
                     df['style'].str.contains(product_id, case=False) |
                     df['detail_material'].str.contains(product_id, case=False) |
                     df['furniture_color'].str.contains(product_id, case=False) |
                     df['description'].str.contains(product_id, case=False)]
        matching_rows_sorted = pd.concat([matching_rows_sorted, matches])

    matching_rows_sorted = matching_rows_sorted.drop_duplicates()
    data = matching_rows_sorted['id']

    return data.head(12)

# Route for recommendation
@app.route('/search', methods=['POST'])
def searchbar():
    data = request.json
    user_query = data.get("user_query", "")
    matching_rows = search_products(user_query)
    recommended_products = matching_rows.to_dict(orient='records')
    return jsonify(recommended_products)


# ROUTE GET Data to Targeted Page
@app.route('/api/furniture/<furni_id>', methods=['GET'])
def get_furniture_by_id(furni_id):
    furniture = collection.find_one(
            {'furni_id': furni_id},
            {'_id': False}
        )
    if furniture:
        return jsonify(furniture)
    else:
        return jsonify({'error': 'Furniture not found'}), 404

if __name__ == "__main__":
    app.run(debug=True)