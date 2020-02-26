from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/game')
def game():
  return render_template('game.html')

@app.route('/mixes')
def mixed():
  # d = request.get_json()
  # print(d) 
  # return jsonify(d)
  return render_template('mixed.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
