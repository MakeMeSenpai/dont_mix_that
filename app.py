from flask import Flask, render_template, request, redirect, url_for
from random import randint

#mongodb
import requests
from pymongo import MongoClient
import json
from bson.objectid import ObjectId
import os


host = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/dontmixthat')
client = MongoClient(host=f'{host}')
db = client.get_default_database()
dontmixthat = db.dontmixthat
recs = db.recipes
# host = os.environ.get('MONGODB_URI', 'mongodb://MakeMeSenpai:password1@ds233268.mlab.com:33268/heroku_3jndmb7c')
# client = MongoClient(host=f'{host}?retryWrites=false')
# db = client.get_default_database()
# shop_carts = db.shop_carts

app = Flask(__name__)

@app.route('/test')
def test():
    z = randint(0, 12) * 2.56
    if z > 20:
        item1 = "bleach"
    elif z > 15:
        item1 = "salt"
    elif z > 10:
        item1 = "dirt"
    else:
        item1 = "water"

    z = randint(0, 12) * 2.56
    if z > 20:
        item2 = "bleach"
    elif z > 15:
        item2 = "salt"
    elif z > 10:
        item2 = "dirt"
    else:
        item2 = "water"

    if item1 == "bleach" and item2 == "bleach":
        prod = "Super Bleach"
    elif item1 == "bleach" and item2 == "salt":
        prod = "Redneck's Weedkiller"
    elif item1 == "salt" and item2 == "salt":
        prod = "Super Salt"
    elif item1 == "bleach" and item2 == "dirt":
        prod = "Clean Dirt"
    elif item1 == "dirt" and item2 == "salt":
        prod = "Super Dirt"
    elif item1 == "bleach" and item2 == "water":
        prod = "Mystery Milk"
    elif item1 == "bleach" and item2 == "salt":
        prod = "Lake"
    elif item1 == "dirt" and item2 == "salt":
        prod = "Slug Trap"
    elif item1 == "water" and item2 == "salt":
        prod = "Salt Water"
    elif item1 == "dirt" and item2 == "water":
        prod = "Mud"
    else:
        return "<h1>Don't Mix That!</h1>" + "<h3>You exploded -trying to mix the unmixable!<h3>"
    return "<h1>Don't Mix That!</h1>" + f"<h3>You mixed <i>{item1}</i> and <i>{item2}</i>, and got <i>{prod}</i></h3>"

@app.route('/mix')
def mix():
    #Mix
    recipes = recs.find()
    ingredient = dontmixthat.find()
    return render_template('mix.html', ingredients=ingredient, recipes=recipes)

@app.route('/')
def home():
    #Home
    return render_template('home.html')

@app.route('/index')
def index():
    #Index
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
    test()