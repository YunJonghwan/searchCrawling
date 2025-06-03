from konlpy.tag import Okt
from collections import Counter
from collections import OrderedDict

def korean_article_analysis(content):
    okt = Okt()
    stopwords = {"그리고", "하지만", "이", "그", "저", "등", "의", "에", "은", "는", "이", "가", "을", "를", "도", "로", "와", "과", "에서", "에게", "한", "하다"}
    
    if isinstance(content, list):
        text = ' '.join(content)
    else:
        text = str(content)

    nouns = [noun for noun in okt.nouns(text) if noun not in stopwords]
    word_count = Counter(nouns)
    # 빈도수 기준 내림차순 정렬된 (단어, 카운트) 리스트 반환
    sorted_word_count = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
    return OrderedDict(sorted_word_count)