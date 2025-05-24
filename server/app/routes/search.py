from flask import Blueprint, request, jsonify

# Blueprint 객체 생성 (이름, 모듈명)
search_bp = Blueprint('search', __name__)

# Blueprint에 라우트 등록
@search_bp.route('/search')
def search_items():
    word = request.args.get('word')
    return jsonify({"results": word})