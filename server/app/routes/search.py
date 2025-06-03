from flask import Blueprint, request, jsonify
from services.searchingWord import searchingWord
from services.crawlingNews import crawlingNews
from services.scrapArticle import scrapArticle
from services.korean_article_analysis import korean_article_analysis

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
    news = crawlingNews()
    content = []
    for article in news:
        text = scrapArticle(article.url)
        content.append(text)
    count = korean_article_analysis(content)
    return jsonify({"count": count})