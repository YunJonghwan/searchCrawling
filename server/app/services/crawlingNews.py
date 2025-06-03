from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from schemas.news import NewsDTO
import time

def crawlingNews():
  driver = webdriver.Chrome()  # 크롬 드라이버 실행
  try:
    search_url = f"https://news.naver.com/breakingnews/section/105/732"
    driver.get(search_url)
    WebDriverWait(driver, 20).until(
      EC.presence_of_all_elements_located((By.CLASS_NAME, "sa_text_lede"))
    )
    time.sleep(2)
    a_tag_list = driver.find_elements(By.CLASS_NAME, "sa_thumb_link")
    title_list = driver.find_elements(By.CLASS_NAME, "sa_text_strong")
    summary_list = driver.find_elements(By.CLASS_NAME, "sa_text_lede")

    news_list = []
    length = min(len(a_tag_list), len(title_list), len(summary_list))
    for i in range(length):
      a_tag = a_tag_list[i]
      title_elem = title_list[i]
      summary_elem = summary_list[i]
      url = a_tag.get_attribute("href")
      image = a_tag.find_element(By.TAG_NAME, "img").get_attribute("src") if a_tag.find_elements(By.TAG_NAME, "img") else ""
      title = title_elem.text
      summary = summary_elem.get_attribute("innerHTML")
      news_list.append(NewsDTO(title=title, summary=summary, image=image, url=url))
    return news_list
  except Exception as e:
    print("크롤링 에러:", e)
    return []
  finally:
    print("드라이버 종료")
    driver.quit()