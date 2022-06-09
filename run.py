from stock_journal_app.__init__ import app
from flask import request, render_template

from flask_marshmallow import Marshmallow
from flask_cors import CORS


#initialize marshmallow
ma = Marshmallow(app)

CORS(app)


if __name__ == "__main__":
    app.run(debug = True)