from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from schemas.news import NewsDTO
import time

def searchingWord(word):
  driver = webdriver.Chrome()  # 크롬 드라이버 실행
  
  search_url = f"https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query={word}"
  
  driver.get(search_url)
  
  WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "sds-comps-text-type-headline1"))
  )
  titles = driver.find_elements(By.CLASS_NAME, "sds-comps-text-type-headline1")
  subTitles = driver.find_elements(By.CLASS_NAME, "sds-comps-text-type-body1")
  img_items = driver.find_elements(By.CLASS_NAME, "sds-rego-thumb-overlay")

  # 각 div 안의 a 태그의 href 추출
  img_links = []
  for div in img_items:
      try:
          img_tag = div.find_element(By.TAG_NAME, "img")
          src = img_tag.get_attribute("src")
      except Exception:
          src = ""
      img_links.append(src)

  title_list = [title.text for title in titles]
  subTitle_list = [sub.text for sub in subTitles]

  # DTO 객체로 묶어서 반환
  news_list = []
  for title, subtitle, img_link in zip(title_list, subTitle_list, img_links):
      news_list.append(NewsDTO(title=title, subtitle=subtitle, image=img_link))

  driver.quit()

  return news_list