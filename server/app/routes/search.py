from flask import Blueprint, request, jsonify
from services.searchingWord import searchingWord
from services.crawlingNews import crawlingNews
from services.scrapArticle import scrapArticle
from services.korean_article_analysis import korean_article_analysis
from threading import Thread

# Blueprint 객체 생성 (이름, 모듈명)
search_bp = Blueprint('search', __name__)

last_news = None
last_article_analysis = None
article_crawling_in_progress = False

def background_article_crawling(news):
    global last_article_analysis, article_crawling_in_progress
    article_crawling_in_progress = True
    content = []
    for idx, article in enumerate(news, 1):
        print(f"[크롤링 진행] : {idx}")
        text = scrapArticle(article.url)
        content.append(text)
    last_article_analysis = korean_article_analysis(content)
    article_crawling_in_progress = False

# Blueprint에 라우트 등록
@search_bp.route('/search')
def search_items():
    word = request.args.get('word')
    articles = searchingWord(word)
    return jsonify({"results": articles})

@search_bp.route('/news')
def news_items():
    global last_news, last_article_analysis, article_crawling_in_progress
    news = crawlingNews()
    last_news = news
    last_article_analysis = None
    Thread(target=background_article_crawling, args=(news,)).start()
    return jsonify({"results": news})

@search_bp.route('/article')
def article_content():
    global last_article_analysis, article_crawling_in_progress
    if last_article_analysis is not None:
        return jsonify({"count": last_article_analysis, "status": "done"})
    elif article_crawling_in_progress:
        return jsonify({"status": "processing"})
    else:
        return jsonify({"status": "not_started"})