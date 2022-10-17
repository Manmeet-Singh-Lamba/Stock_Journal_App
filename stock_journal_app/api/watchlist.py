from os import environ
from stock_journal_app.__init__ import app
from flask import request, jsonify
from stock_journal_app.Models.watchlist import Watchlist_item, db
from stock_journal_app.schema import item_schema, items_schema
from stock_journal_app.api.utility import token_required
import requests

# Get all the items from the logged-in user's watchlist
@app.route("/get_watchlist", methods = ['GET'])
@token_required
def get_watchlist(current_user):
    user_id = current_user.id
    result = Watchlist_item.query.filter_by(user_id = user_id)
    result = items_schema.dump(result)
    return jsonify(result)


# add one item to logged-in user's watchlist
@app.route("/addsymbol", methods = ['POST'])
@token_required
def add_to_watchlist(current_user):
    user_id = current_user.id
    item_name = request.json['item_name']

    if Watchlist_item.query.filter_by(item_name= item_name).first():
        return jsonify({"message": "symbol already exists in the watchlist"})

    new_item = Watchlist_item(item_name = item_name, user_id= user_id)
    db.session.add(new_item)
    db.session.commit()
    return item_schema.jsonify(new_item)


# Delete single watchlist item
@app.route('/deletesymbol/<item_id>', methods =['DELETE'])
@token_required
def delete_single_item(current_user, item_id):
    result = Watchlist_item.query.get(item_id)
    if result.user_id is current_user.id:
        db.session.delete(result)
        db.session.commit()
        return item_schema.jsonify(result) 


# search stock symbol from third part API
@app.route("/searchsymbol/<symbol>", methods = ['GET','OPTIONS'])
def search_symbol(symbol):
    
    API_key = environ.get('API_KEY')
    # replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    url = f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={symbol}&apikey={API_key}'
    r = requests.get(url)
    data = r.json()
    # data = dict(data)
    if r.status_code == 404:
        print({"message": "Not found"})
        return jsonify({"message": "Not found"})
    print(data)
    return jsonify(data)