from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def searchingWord(word):
  driver = webdriver.Chrome()  # 크롬 드라이버 실행
  driver.get("https://news.naver.com/")

  search = driver.find_element(By.CLASS_NAME, "Nicon_search")
  search.click()

  search_box = driver.find_element(By.NAME, "query")
  search_box.send_keys(word)
  search_box.send_keys(Keys.RETURN)
  
  titles = driver.find_elements(By.CSS_SELECTOR, "span.sds-comps-text")
  print("기사 타이틀", titles)

  time.sleep(5)
  driver.quit()
