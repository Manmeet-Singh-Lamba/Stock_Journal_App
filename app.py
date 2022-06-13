from stock_journal_app.__init__ import app
from flask import request, render_template


from flask_cors import CORS


CORS(app)


if __name__ == "__main__":
    app.run(debug = True)