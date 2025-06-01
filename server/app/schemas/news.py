from dataclasses import dataclass

@dataclass
class NewsDTO:
    title: str
    summary: str
    image: str  # 이미지 URL, 없으면 빈 문자열 등으로 처리
    url: str