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
    # 빈도수 기준 내림차순 정렬된 (단어, 카운트) 리스트 반환
    sorted_word_count = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
    return sorted_word_count