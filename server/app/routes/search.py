from flask import Blueprint, request, jsonify
from services.searchingWord import searchingWord
from services.crawlingNews import crawlingNews
from services.scrapArticle import scrapArticle

# Blueprint 객체 생성 (이름, 모듈명)
search_bp = Blueprint('search', __name__)

# Blueprint에 라우트 등록
@search_bp.route('/search')
def search_items():
    word = request.args.get('word')
    articles = searchingWord(word)
    return jsonify({"results": articles})

@search_bp.route('/news')
def news_items():
    news = crawlingNews()
    return jsonify({"results": news})

@search_bp.route('/article')
def article_content():
    url = request.args.get('url')
    content = scrapArticle(url)
    return jsonify({"content": content})