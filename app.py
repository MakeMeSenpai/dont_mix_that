from flask import Flask, render_template, request, redirect, url_for
from random import randint
from test import test_concept


#mongodb imports
import requests
from pymongo import MongoClient
import json
from bson.objectid import ObjectId
import os


#host for mongodb -link to database
host = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/dontmixthat')
#makes our user into a client
client = MongoClient(host=f'{host}')
#grabs our database for our client
db = client.get_default_database()
#from database grabs our collections
use = db.users
characters = db.characters
dontmixthat = db.dontmixthat
recs = db.recipes


app = Flask(__name__)


""" test routes"""
@app.route('/test')
def test():
    # Test - tests combination concept
    return test_concept()

@app.route('/mix')
def mix():
    #Mix - tests mongo
    recipes = recs.find()
    ingredient = dontmixthat.find()
    return render_template('mix.html', ingredients=ingredient, recipes=recipes)

@app.route('/book') # methods=['POST'])
def book():
    #Book - tests our recipies, (should be cleared every run)
    recipes = recs.find()
    return render_template('book.html', recipes=recipes)

@app.route('/chars')
def chars():
    #Char - tests characters
    users = use.find()
    chars = characters.find()
    return render_template('chars.html', characters = chars, users=users)



"""our main routes"""
@app.route('/')
def login():
    #Login
    return render_template('login.html')

@app.route('/home')
def home():
    #Home
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))