from stock_journal_app.__init__ import app
from flask import render_template, url_for, flash, redirect, request, jsonify, make_response
from stock_journal_app.models import User, Note, Watchlist_item, db
from stock_journal_app.schema import user_schema, users_schema, note_schema, notes_schema, item_schema, items_schema
from stock_journal_app.forms import RegistrationForm, LoginForm
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from functools import wraps
import uuid
import jwt


bcrypt = Bcrypt()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': "Token is missing"}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': "Token is missing"}), 401

        return f(current_user, *args, **kwargs)
    return decorated


# @app.route("/users", methods=['GET'])
# @token_required
# def get_all_users(current_user):
#     users = User.query.all()
#     users = users_schema.dump(users)
#     return jsonify(users)


@app.route("/user/<public_id>", methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    user = User.query.filter_by(public_id).first()

    if not user:
        return jsonify({'message': "no user found"})

    user_data = {}
    user_data["username"] = user.username
    user_data["email"] = user.email
    user_data["password"] = user.password

    return jsonify(user_data)
    # user= user_schema.dump(current_user)
    # return jsonify(user)


@app.route("/user", methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data["password"])
    new_user = User(public_id=str(uuid.uuid4()), username= data["username"], password=hashed_pw, email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "new user created!"})


@app.route("/user/<public_id>", methods=['PUT'])
def promote_user():
    return ''


@app.route("/user/<public_id>", methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    user = User.query.filter_by(public_id = public_id).first()

    if not user:
        return jsonify({'message': "no user found"})

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User has been deletd"})


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
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response("Could not verify", 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})
    
    user = User.query.filter_by(username = auth.username).first()

    if not user:
        return make_response("Could not verify", 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})

    if bcrypt.check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token})
#jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    else:
        return make_response("Could not verify", 401, {'WWW-Authenticate' : 'Basic realm="Login required!'})

# @app.route("/login")
# def login():
#     form = LoginForm()
#     return render_template('login.html', title ="Login", form = form)

@app.route("/about")
def about():
    return render_template('about.html', title = "About")

@app.route("/tickerSymbol")
def symbol():
    return "<h1>This is thepage where ticker symbol's price chart is dispalyed along with the Journal notes</h1>"


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


@app.route("/get_watchlist", methods = ['GET'])
@token_required
def get_watchlist(current_user):
    user_id = current_user.id
    result = Watchlist_item.query.filter_by(user_id = user_id)
    result = items_schema.dump(result)
    return jsonify(result)


@app.route("/addsymbol", methods = ['POST'])
@token_required
def add_to_watchlist(current_user):
    print(current_user)
    user_id = current_user.id
    item_name = request.json['item_name']

    if Watchlist_item.query.filter_by(item_name= item_name).first():
        return jsonify({"message": "symbol already exists in the watchlist"})

    new_item = Watchlist_item(item_name = item_name, user_id= user_id)
    db.session.add(new_item)
    db.session.commit()
    return item_schema.jsonify(new_item)
