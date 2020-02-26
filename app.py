from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, redirect, url_for
from flask_httpauth import HTTPBasicAuth
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


auth = HTTPBasicAuth()
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



############################################# Main Routes #####################################################
@app.route('/')
# @auth.login_required
def index():
    #Character selection
    #users = use.find() --> #no longer a need for users, 
    return render_template('index.html') #, users=users) --> #change to align with html

@app.route('/play', methods=['GET', 'POST'])
# @auth.login_required
def play():
    #Play  --> #talk to front end about forms play.html, conform to javascript, then implement mongo to 
    #  to ensure that both implimentations work. 
    # choices = ["salt", "water", "dirt", "bleach", "lean"]
    # form = PlayForm()
    # if form.validate_on_submit():
    #     cards = [form.card1._value(),form.card2._value()]
    #     cards.sort()
    #     cards = ",".join(cards).lower()
    #     print(cards)
    #     recipe = recs.find_one(filter={"combo":cards})
    #     if recipe:
    #         print("Success") # add user unlocked value equal to recipe if not in unlocked
    #         return redirect(url_for("home"))
    return render_template('play.html')#, choices=choices) --> #conforming to javascript

@app.route('/recipes')
# @auth.login_required
def recipes():
    #recipes
    users = use.find()
    return render_template('recipes.html', users=users)



########################################### Stretch Routes ######################################################
@auth.verify_password #verifies that the username and password match
def verify_password(username, password):
    user = use.find_one(filter={"username":username})
    p_hash = generate_password_hash(password)
    if user: #if user can be found then check password
        return check_password_hash(p_hash, user.password)
    return False

@auth.hash_password #hashes and protects our users passwords
def hash_pw(password):
    return generate_password_hash(password)    


@app.route('/stretch/login', methods=['GET', 'POST'])
def login():
    #Login
    form = LoginForm()
    if form.validate_on_submit(): #checks that input follows forms rules
        if verify_password(form.username._value(), form.password._value()): #checks if password and username match
        #question? how to get info from form to python?
            return redirect(url_for('home'))
            #question? how to get user info threwout app after they login?
    #else render login page   
    return render_template('login.html', title='Sign In', form=form)

@app.route('/stretch/home')
# @auth.login_required #requires you to log in before you can see this page
def home():
    #Home
    users = use.find()
    return render_template('home.html', users=users)

@app.route('/stretch/trade')
# @auth.login_required
def trade():
    #Trade - Comming Soon
    return render_template('trade.html')

@app.route('/stretch/profile')
# @auth.login_required
def profile():
    #Profile
    users = use.find()
    return render_template('profile.html', users=users)    

@app.route('/stretch/deck')
# @auth.login_required
def deck():
    #Deck
    users = use.find()
    return render_template('deck.html', users=users)



# runs flask if ran with terminal command $python3 app.py
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
