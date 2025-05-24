from flask import Flask
from flask_cors import CORS
from routes.search import search_bp

app = Flask(__name__)
CORS(app, origins="http://localhost:3030");

# Blueprint 등록
app.register_blueprint(search_bp)

if __name__ == '__main__':
    app.run(debug=True)