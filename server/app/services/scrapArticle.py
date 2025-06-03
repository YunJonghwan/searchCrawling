from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrapArticle(searching_url):
  try:
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    driver.get(searching_url)
    
    WebDriverWait(driver, 20).until(
      EC.presence_of_all_elements_located((By.ID, "dic_area"))
    )

    article_list = driver.find_elements(By.ID, "dic_area")

    text_list = []
    for article in article_list:
      text_list = article.text
    return text_list
  except Exception as e:
    print("크롤링 에러:", e)
  finally:
    print("기사글 검색 크롤링 종료")
    driver.quit()