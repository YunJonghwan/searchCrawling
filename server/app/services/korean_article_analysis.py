from konlpy.tag import Okt
from collections import Counter
from collections import OrderedDict
import re

def korean_article_analysis(content):
    okt = Okt()
    stopwords = {
        "그리고", "하지만", "이", "그", "저", "등", "의", "에", "은", "는", "이", "가", "을", "를", "도", "로", "와", "과", "에서", "에게",
        "한", "하다", "수", "것", "고", "며", "말", "전", "더", "밎", "시", "위", "데", "시", "데", "온", "약", "안", "점", "개", "명", "나",
        "건", "뒤", "레", "번", "섭", "주", "중", "청", "게", "관", "홍", "확", "환", "함", "티", "통", "탈", "통", "티", "채", "초", "및"
    }
    
    if isinstance(content, list):
        text = ' '.join(content)
    else:
        text = str(content)

    # 한글로만 이루어진 명사만 추출
    nouns = [noun for noun in okt.nouns(text) if noun not in stopwords and re.match(r'^[가-힣]+$', noun)]
    word_count = Counter(nouns)
    # 빈도수 기준 내림차순 정렬된 (단어, 카운트) 리스트 반환
    sorted_word_count = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
    return OrderedDict(sorted_word_count)