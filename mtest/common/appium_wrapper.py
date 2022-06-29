import os
from mtest.common.appium_helpers import wait_for_element
from appium import webdriver
from appium.options.ios import XCUITestOptions
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

from appium.webdriver.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction


ios_options = XCUITestOptions().\
    set_capability('autoAcceptAlerts', 'true').\
    set_capability('platformName', 'iOS').\
    set_capability('platformVersion', '15.0').\
    set_capability('deviceName', 'iPhone Simulator').\
    set_capability('app', os.path.abspath('./Realtor.com.app')).\
    set_capability('automationName', "XCUITest")


class Android:

    def __init__(self):
        self.options = UiAutomator2Options().\
            set_capability('platformVersion', '11').\
            set_capability('deviceName', 'Android Emulator').\
            set_capability('app', os.environ["ANDROID_APK"]).\
            set_capability('appPackage', "com.move.realtor.qa").\
            set_capability('appActivity', "com.move.realtor.splash.SplashActivity").\
            set_capability('appWaitActivity', "com.move.realtor.onboarding.OnBoardingActivity").\
            set_capability('automationName', "UiAutomator2")
        self.driver = webdriver.Remote('http://host.lima.internal:4723/wd/hub', options=self.options)

    def click_element(self, resourceId):
        element = wait_for_element(self.driver, AppiumBy.ANDROID_UIAUTOMATOR, value=f'new UiSelector().resourceId("{resourceId}")')
        element.click()

    def set_value(self, resourceId, value):
        element = wait_for_element(self.driver, AppiumBy.ANDROID_UIAUTOMATOR, value=f'new UiSelector().resourceId("{resourceId}")')
        element.click()
        element.set_value(value)

    def touch(self, x, y):
        TouchAction(self.driver).tap(x=1321, y=2745).perform()
