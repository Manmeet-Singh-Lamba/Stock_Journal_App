from stock_journal_app import db
from datetime import date, datetime
from stock_journal_app.__init__ import migrate


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20),  nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    watchlist_name = db.Column(db.String(20), nullable=False, default= 'Watchlist') 
    notes = db.relationship('Note', backref='author', lazy=True)
    watchlist_items = db.relationship('Watchlist_item', backref='author', lazy=True)

    def __init__(self,public_id, username, email, password):
        self.public_id = public_id
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f"User('{self.username}','{self.email}','{self.image_file}', {self.watchlist_name})"

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_price = db.Column(db.Float, nullable=False)
    stock_symbol = db.Column(db.String, nullable=False)
    price_date = db.Column(db.DateTime, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    rating = db.Column(db.String(20), nullable=False, default= 'No rating')    
    reason = db.Column(db.Text,  nullable=False, default= 'reasoning missing')  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, stock_price, stock_symbol, price_date, rating, reason, user_id, date_posted = datetime.utcnow()):
        self.stock_price = stock_price
        self.stock_symbol = stock_symbol
        self.price_date = price_date
        self.rating = rating
        self.reason = reason
        self.user_id = user_id
        self.date_posted = date_posted


    def __repr__(self):
        return f"Note('{self.stock_symbol}','{self.stock_price}', '{self.price_date}','{self.rating}')"

class Watchlist_item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(20), nullable=False)   #to store stock symbols
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"User('{self.item_name}','{self.user_id}')"