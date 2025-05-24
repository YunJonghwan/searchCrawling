from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes.search import search_bp

load_dotenv()

app = Flask(__name__)
CORS(app, origins=f"http://localhost:{os.getenv('CLIENT_PORT')}");

# Blueprint 등록
app.register_blueprint(search_bp)

if __name__ == '__main__':
    app.run(debug=os.getenv('DEBUG'), port=os.getenv('SERVER_PORT'));