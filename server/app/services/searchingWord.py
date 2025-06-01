from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from schemas.news import NewsDTO
import time

def searchingWord(word):
  driver = webdriver.Chrome()  # 크롬 드라이버 실행
  try:
    search_url = f"https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query={word}"
    
    driver.get(search_url)
    
    WebDriverWait(driver, 20).until(
      EC.presence_of_all_elements_located((By.CLASS_NAME, "sds-comps-text-type-headline1"))
    )
    titles = driver.find_elements(By.CLASS_NAME, "sds-comps-text-type-headline1")
    summarys = driver.find_elements(By.CLASS_NAME, "sds-comps-text-type-body1")
    imgs = driver.find_elements(By.CLASS_NAME, "sds-rego-thumb-overlay")

    # 각 div 안의 a 태그의 href 추출
    img_list = []
    url_list = []
    title_list = []
    summary_list = []
    for img_div, title, summary in zip(imgs, titles, summarys):
        title_list.append(title.text)
        summary_list.append(summary.text)
        try:
            img_tag = img_div.find_element(By.TAG_NAME, "img")
            img_list.append(img_tag.get_attribute("src"))
            a_tag = title.find_element(By.XPATH, "./ancestor::a[1]")
            url_list.append(a_tag.get_attribute("href"))
        except Exception as e:
            print("스크랩 에러:", e)

    # DTO 객체로 묶어서 반환
    news_list = []
    for title, sub, img_link, url in zip(title_list, summary_list, img_list, url_list):
        news_list.append(NewsDTO(title=title, summary=sub, image=img_link, url=url))
        time.sleep(0.5)
    return news_list
  except Exception as e:
    print("크롤링 에러:", e)
    return []
  finally:
    print("드라이버 종료")
    driver.quit()