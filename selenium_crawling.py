import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import time

# 드라이버 생성
options = uc.ChromeOptions()
options.add_argument("--disable-blink-features=AutomationControlled")

driver = uc.Chrome(options=options)

# 구글 접속
driver.get("https://www.google.com")

# 검색어 입력
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Python Selenium")
search_box.submit()

# 기다렸다가 종료
time.sleep(5)
driver.quit()
