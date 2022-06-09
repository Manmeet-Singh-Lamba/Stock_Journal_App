from stock_journal_app.__init__ import app
from flask import render_template, url_for, flash, redirect, request
from stock_journal_app.models import User, Note
from stock_journal_app.forms import RegistrationForm, LoginForm
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

@app.route("/register", methods = ['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Acoount created for {form.username.data} successfully!', 'success')
        return redirect(url_for('home'))
    hashed_pw = bcrypt.generate_password_hash("password")
    bcrypt.check_password_hash(hashed_pw, "password")
    #return { "username": "username", "password": "password"}
    return render_template('register.html', title ="Register", form=form)

@app.route("/")
@app.route("/home")
def home():
    return {"message" :"This is the home page, here is your watchlist, and search bar for searching stocks"}

@app.route("/login")
def login():
    form = LoginForm()
    return render_template('login.html', title ="Login", form = form)

@app.route("/about")
def about():
    return render_template('about.html', title = "About")

@app.route("/tickerSymbol")
def symbol():
    return "<h1>This is thepage where ticker symbol's price chart is dispalyed along with the Journal notes</h1>"