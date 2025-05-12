from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# 1. 크롬 브라우저를 연다
driver = webdriver.Chrome()  # 크롬 드라이버 실행

# 2. 구글 홈페이지로 이동한다
driver.get("https://news.naver.com/")

# 돋보기 버튼 클릭
search = driver.find_element(By.CLASS_NAME, "Nicon_search");
search.click()

# 3. 검색창을 찾는다 (name 속성이 'q'인 입력창)
search_box = driver.find_element(By.NAME, "query")

# 4. 검색창에 '고양이'를 입력한다
search_box.send_keys("고양이")

# 5. 엔터 키를 누른다 (검색 실행)
search_box.send_keys(Keys.RETURN)

# 6. 5초 동안 결과 페이지를 볼 수 있도록 기다린다
time.sleep(5)

# 7. 브라우저를 닫는다
driver.quit()
