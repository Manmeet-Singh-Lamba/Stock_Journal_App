from stock_journal_app.__init__ import app
from flask_marshmallow import Marshmallow

#initialize marshmallow
ma = Marshmallow(app)

# User schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('public_id', 'username', 'email', 'password', 'watchlist_name')

#Initialize schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Note schema
class NoteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'stock_price', 'stock_symbol', 'price_date', 'rating', 'reason', 'date_posted')

#Initialize schema
note_schema = NoteSchema()
notes_schema = NoteSchema(many=True)

# item schema for watchlist
class ItemSchema(ma.Schema):
    class Meta:
        fields = ('id', 'item_name', 'user_id')

#Initialize schema
item_schema = ItemSchema()
items_schema = ItemSchema(many=True)