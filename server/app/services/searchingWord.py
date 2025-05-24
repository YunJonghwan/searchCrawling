from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

def searchingWord(word):
  driver = webdriver.Chrome()  # 크롬 드라이버 실행
  
  search_url = f"https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query={word}"
  
  driver.get(search_url)
  
  WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "sds-comps-text-type-headline1"))
  )
  titles = driver.find_elements(By.CLASS_NAME, "sds-comps-text-type-headline1")
  title_list = [title.text for title in titles]
  print("기사 타이틀", title_list)

  time.sleep(5)
  driver.quit()
