from stock_journal_app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20),  nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    notes = db.relationship('Note', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}','{self.email}','{self.image_file}')"

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_price = db.Column(db.Float, nullable=False)
    stock_symbol = db.Column(db.String, nullable=False)
    price_date = db.Column(db.DateTime, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    rating = db.Column(db.String(20), unique=True, nullable=False, default= 'No rating')    
    reason = db.Column(db.Text,  nullable=False, default= 'reasoning missing')  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Note('{self.stock_symbol}','{self.stock_price}', '{self.price_date}','{self.rating}')"
