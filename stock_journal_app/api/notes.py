from os import environ
from stock_journal_app.__init__ import app
from flask import request, jsonify
from stock_journal_app.Models.user import User
from stock_journal_app.Models.note import Note
from stock_journal_app.Models.watchlist import Watchlist_item, db
from stock_journal_app.schema import note_schema, notes_schema
from stock_journal_app.forms import RegistrationForm, LoginForm
from datetime import datetime, timedelta
from stock_journal_app.api.utility import token_required
import requests

# fetch notes only for the requested ticker symbol
@app.route("/notes/<ticker_symbol>")
@token_required
def symbol(current_user, ticker_symbol):
    user_id = current_user.id
    result = Note.query.filter_by(user_id=user_id, stock_symbol=ticker_symbol).all()
    result = notes_schema.dump(result)
    return jsonify(result)


# fetch all notes
@app.route("/notes", methods = ['GET'])
@token_required
def get_notes(current_user):
    user_id = current_user.id
    result = Note.query.filter_by(user_id=user_id)
    result = notes_schema.dump(result)
    return jsonify(result)


# Add single note
@app.route("/addnote", methods = ['POST'])
@token_required
def add_note(current_user):
    try:
        price_date = datetime.strptime(request.json['price_date'], '%b %d %Y %I:%M%p')
    except:
        price_date = datetime.strptime(request.json['price_date'], '%Y-%m-%d')
    stock_price = request.json['stock_price']
    stock_symbol = request.json['stock_symbol']
    reason = request.json['reason']
    rating = request.json['rating']
    user_id = current_user.id
    
    try:
        date_posted = datetime.strptime(request.json['date_posted'], '%b %d %Y %I:%M%p')
    except:
        date_posted = datetime.strptime(request.json['date_posted'], '%Y-%m-%d')

    new_note = Note(stock_price, stock_symbol, price_date, rating, reason, user_id, date_posted)
    db.session.add(new_note)
    db.session.commit()
    return note_schema.jsonify(new_note)


# Delete single note
@app.route('/deletenote/<note_id>', methods =['DELETE'])
@token_required
def delete_single_note(current_user, note_id):
    result = Note.query.get(note_id)
    if result.user_id is current_user.id:
        db.session.delete(result)
        db.session.commit()
        return note_schema.jsonify(result) 



# get stock chart data from third party API
@app.route('/stockchart/<ticker_symbol>', methods =['GET'])
def get_stock_chart_data(ticker_symbol):

    API_key = environ.get('API_KEY')
    # API_call = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker_symbol}&outputsize=full&apikey={API_key}'
    API_call = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={ticker_symbol}&outputsize=full&apikey={API_key}'
    data = requests.get(API_call)
    data = data.json()

    return jsonify(data) 