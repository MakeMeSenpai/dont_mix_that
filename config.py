import os
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-would-never-guess'