from stock_journal_app.__init__ import app
from flask import request, jsonify
from stock_journal_app.Models.user import User
from flask_bcrypt import Bcrypt

from functools import wraps
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