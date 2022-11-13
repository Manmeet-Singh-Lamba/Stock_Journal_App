from stock_journal_app.__init__ import app
from flask import render_template, url_for, flash, redirect, request, jsonify, make_response
from stock_journal_app.Models.user import User, db
from stock_journal_app.api.utility import token_required
from stock_journal_app.schema import user_schema, users_schema
from stock_journal_app.forms import RegistrationForm, LoginForm
from datetime import datetime, timedelta
import uuid
import jwt
from stock_journal_app.api.utility import token_required, bcrypt


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


# @app.route("/register", methods = ['GET', 'POST'])
# def register():
#     form = RegistrationForm()
#     if form.validate_on_submit():
#         flash(f'Acount created for {form.username.data} successfully!', 'success')
#         return redirect(url_for('home'))
#     hashed_pw = bcrypt.generate_password_hash("password")
#     bcrypt.check_password_hash(hashed_pw, "password")
#     #return { "username": "username", "password": "password"}
#     return render_template('register.html', title ="Register", form=form)


# @app.route("/")
# @app.route("/home")
# def home():
#     return {"message" :"This is the home page, here is your watchlist, and search bar for searching stocks"}


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














