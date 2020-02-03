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
