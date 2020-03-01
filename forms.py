from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
# from app.models import User


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    # remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class PlayForm(FlaskForm):
    card1 = StringField('card1', validators=[DataRequired()])
    card2 = StringField('card2', validators=[DataRequired()])
    submit = SubmitField('mix')


# functions might have to go into a models.py file
#class characterForm(FlaskForm):
#class collect_cardsForm(FlaskForm):
#   def display_deck()
#class unlockForm(FlaskForm):
#   def display_unlocked()