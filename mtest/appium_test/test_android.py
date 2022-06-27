import os
import time
# Android environment
from appium import webdriver
# Options are only available since client version 2.3.0
# If you use an older client then switch to desired_capabilities
# instead: https://github.com/appium/python-client/pull/720
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

from appium.webdriver.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction

options = UiAutomator2Options().\
    set_capability('platformVersion', '11').\
    set_capability('deviceName', 'Android Emulator').\
    set_capability('app', os.path.abspath('./BuyRent-core-debug.apk')).\
    set_capability('appPackage', "com.move.realtor.qa").\
    set_capability('appActivity', "com.move.realtor.splash.SplashActivity").\
    set_capability('appWaitActivity', "com.move.realtor.onboarding.OnBoardingActivity").\
    set_capability('automationName', "UiAutomator2")
# Appium1 points to http://127.0.0.1:4723/wd/hub by default

driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', options=options)

def wait_for_element(web_driver, locator, value, timeout_sec=10):
    return WebDriverWait(web_driver, timeout_sec).until(EC.presence_of_element_located((locator, value)))

def test_zip_search():
    el1 = wait_for_element(driver, AppiumBy.ANDROID_UIAUTOMATOR, value='new UiSelector().resourceId("com.move.realtor.qa:id/on_boarding_location")')
    el1.click()
    el2 = wait_for_element(driver, AppiumBy.ANDROID_UIAUTOMATOR, value='new UiSelector().resourceId("com.move.realtor.qa:id/search_edit_text")')
    el2.click()
    el2.set_value("66206")
    TouchAction(driver).tap(x=1321, y=2745).perform()
    time.sleep(3)
