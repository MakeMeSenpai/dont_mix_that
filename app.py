<<<<<<< HEAD
from jinja2 import Environment, PackageLoader, select_autoescape
from flask import Flask, render_template

app = Flask(__name__, static_url_path="")

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debugger=True)
=======
from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

def test():
  print("action page test")

@app.route('/')
def home():
    #Home
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
    test()
>>>>>>> 55b4197d2492d6d524967200dd42902b1eb96bab
