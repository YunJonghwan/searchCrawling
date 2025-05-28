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
  urls = driver.find_elements(By.CLASS_NAME, "_wQLg_3VK6OUyNYiF7VY")

  # 각 div 안의 a 태그의 href 추출
  img_links = []
  url_links = []
  for img_div, url_div in zip(img_items, urls):
      try:
          img_tag = img_div.find_element(By.TAG_NAME, "img")
          a_tag = url_div.find_element(By.TAG_NAME, "a");
          
          src = img_tag.get_attribute("src")
          href = a_tag.get_attribute('href');
      except Exception:
          src = ""
          href = ""
      img_links.append(src)
      url_links.append(href)
  print(url_links)
  title_list = [title.text for title in titles]
  subTitle_list = [sub.text for sub in subTitles]

  # DTO 객체로 묶어서 반환
  news_list = []
  for title, subtitle, img_link, url in zip(title_list, subTitle_list, img_links, url):
      news_list.append(NewsDTO(title=title, subtitle=subtitle, image=img_link, url=url))

  driver.quit()

  return news_list