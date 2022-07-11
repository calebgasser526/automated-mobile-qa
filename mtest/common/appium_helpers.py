from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def wait_for_element(web_driver, locator, value, timeout_sec=30):
    return WebDriverWait(web_driver, timeout_sec).until(EC.presence_of_element_located((locator, value)))
