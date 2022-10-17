from stock_journal_app import db
from datetime import date, datetime
#from stock_journal_app.__init__ import migrate


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

