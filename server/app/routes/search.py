from flask import Blueprint, request, jsonify

# Blueprint 객체 생성 (이름, 모듈명)
search_bp = Blueprint('search', __name__)

# Blueprint에 라우트 등록
@search_bp.route('/search')
def search_items():
    search = request.args.get('word')
    print("search 값:", search)
    if search == "고양이":
        results = "성공"
    else:
        results = []
    return jsonify({"results": results})