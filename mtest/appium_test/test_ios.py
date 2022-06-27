import os
from appium import webdriver
from appium.options.ios import XCUITestOptions
from appium.webdriver.common.appiumby import AppiumBy

from appium.webdriver.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction

options = XCUITestOptions().\
    set_capability('autoAcceptAlerts', 'true').\
    set_capability('platformName', 'iOS').\
    set_capability('platformVersion', '15.0').\
    set_capability('deviceName', 'iPhone Simulator').\
    set_capability('app', os.path.abspath('./Realtor.com.app')).\
    set_capability('automationName', "XCUITest")

driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', options=options)

def wait_for_element(web_driver, locator, value, timeout_sec=10):
    return WebDriverWait(web_driver, timeout_sec).until(EC.presence_of_element_located((locator, value)))

def test_zip_search():
    el1 = driver.find_element(by=AppiumBy.IOS_UIAUTOMATION, value='new UiSelector().resourceId("com.move.realtor.qa:id/on_boarding_location")')
    el1.click()
    el2 = wait_for_element(driver, AppiumBy.IOS_UIAUTOMATION, value='new UiSelector().resourceId("com.move.realtor.qa:id/search_edit_text")')
    el2.click()
    el2.set_value("66206")
    TouchAction(driver).tap(x=1321, y=2745).perform()
