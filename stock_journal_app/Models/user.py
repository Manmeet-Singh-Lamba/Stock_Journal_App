from stock_journal_app import db
#from stock_journal_app.__init__ import migrate


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



