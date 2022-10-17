from stock_journal_app import db
#from stock_journal_app.__init__ import migrate


class Watchlist_item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(20), nullable=False)   #to store stock symbols
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


    def __init__(self, item_name, user_id):
        self.item_name = item_name
        self.user_id = user_id


    def __repr__(self):
        return f"User('{self.item_name}','{self.user_id}')"