from flask import Flask
from routes.search import search_bp

app = Flask(__name__)

# Blueprint 등록
app.register_blueprint(search_bp)

if __name__ == '__main__':
    app.run(debug=True)