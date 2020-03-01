from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, redirect, url_for
# from flask_httpauth import HTTPBasicAuth
from config import Config
from random import randint
from test import test_concept

#wtf man
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from forms import LoginForm, PlayForm

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


# auth = HTTPBasicAuth()
app = Flask(__name__)
app.config.from_object(Config)



########################################### Tester Routes #####################################################
@app.route('/test/test')
def test():
    # Test - tests combination concept
    return test_concept()

@app.route('/test/mix')
def mix():
    #Mix - tests mongo
    recipes = recs.find()
    ingredient = dontmixthat.find()
    return render_template('mix.html', ingredients=ingredient, recipes=recipes)

@app.route('/test/book') # methods=['POST'])
def book():
    #Book - tests our recipies, (should be cleared every run)
    recipes = recs.find()
    return render_template('book.html', recipes=recipes)

@app.route('/test/chars')
def chars():
    #Char - tests characters
    users = use.find()
    chars = characters.find()
    return render_template('chars.html', characters = chars, users=users)

@app.route('/test/recipes')
# @auth.login_required
def recipes():
    #recipes
    users = use.find()
    return render_template('recipes.html', users=users)



############################################# Main Routes #####################################################
@app.route('/')
# @auth.login_required
def index():
    #Character selection
    #users = use.find() --> #no longer a need for users, 
    return render_template('index.html') #, users=users) --> #change to align with html



@app.route('/game')
def game():
  return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
