from konlpy.tag import Okt
from collections import Counter

def korean_article_analysis(content):
    okt = Okt()
    # content가 리스트라면 모든 텍스트를 하나의 문자열로 합침
    if isinstance(content, list):
        text = ' '.join(content)
    else:
        text = str(content)
    nouns = okt.nouns(text)
    word_count = Counter(nouns)
    return dict(word_count)