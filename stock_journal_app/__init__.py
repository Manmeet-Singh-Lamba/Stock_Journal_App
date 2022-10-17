from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy


import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config.from_pyfile('config.py')


#Database
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')  # 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['TEMPLATES_AUTO_RELOAD'] = True


#initialize database
db = SQLAlchemy(app)

from stock_journal_app.api import notes, user, watchlist
#from flask_migrate import Migrate

#migrate = Migrate(app, db)