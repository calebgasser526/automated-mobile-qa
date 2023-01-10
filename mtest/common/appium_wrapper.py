import os
import time
import base64
import platform
from mtest.common.appium_helpers import wait_for_element
from appium import webdriver
from appium.options.ios import XCUITestOptions
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

from appium.webdriver.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput


host = "localhost"
if platform.system() == "Linux":
    host = "host.lima.internal"

class IOS:

    def __init__(self):
        #cert_file = open("/src/mitmproxy-ca-cert.pem")
        self.options = XCUITestOptions().\
            set_capability('autoAcceptAlerts', 'true').\
            set_capability('platformName', 'iOS').\
            set_capability('platformVersion', '15.0').\
            set_capability('deviceName', 'appium').\
            set_capability('app', os.environ["IOS_APP"]).\
            set_capability('udid', os.environ["IOS_UDID"]).\
            set_capability('automationName', "XCUITest").\
            set_capability('noReset', 'true')
        self.driver = webdriver.Remote(f'http://{host}:4723/wd/hub', options=self.options)
        #cert = {
        #    "content": str(base64.b64encode(cert_file.read().encode("utf-8")), "utf-8"),
        #    "isRoot": True
        #}
        #cert_file.close()
        #self.driver.execute_script("mobile:installCertificate", cert)


    def __del__(self):
        self.driver.quit()

    def click_element(self, by, resourceId):
        element = wait_for_element(self.driver, by, resourceId)
        element.click()

    def set_value(self, by, resourceId, value):
        element = wait_for_element(self.driver, by, resourceId)
        element.send_keys(value)

    def touch(self, x, y):
        actions = ActionChains(self.driver)
        actions.w3c_actions = ActionBuilder(self.driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
        actions.w3c_actions.pointer_action.move_to_location(x, y)
        actions.w3c_actions.pointer_action.pointer_down()
        actions.w3c_actions.pointer_action.pause(0.1)
        actions.w3c_actions.pointer_action.release()
        actions.perform()

    def pressSearchKey(self):
        self.click_element(AppiumBy.IOS_PREDICATE, 'label == "search"')

class Android:

    def __init__(self):
        self.options = UiAutomator2Options().\
            set_capability('platformVersion', '11').\
            set_capability('deviceName', 'Android Emulator').\
            set_capability('app', os.environ["ANDROID_APK"]).\
            set_capability('appPackage', "com.move.realtor.qa").\
            set_capability('appActivity', "com.move.realtor.splash.SplashActivity").\
            set_capability('appWaitActivity', "com.move.realtor.onboarding.OnBoardingActivity").\
            set_capability('automationName', "UiAutomator2").\
            set_capability("autoDissmissAlerts", "true")
        self.driver = webdriver.Remote('http://host.lima.internal:4723/wd/hub', options=self.options)

    def __del__(self):
        time.sleep(30)
        if (self.driver):
            self.driver.quit()
        time.sleep(5)

    def click_element(self, by, resourceId):
        element = wait_for_element(self.driver, by, resourceId)
        element.click()

    def set_value(self, by, resourceId, value):
        element = wait_for_element(self.driver, by, resourceId)
        element.click()
        element.set_value(value)

    def touch(self, x, y):
        actions = ActionChains(self.driver)
        actions.w3c_actions = ActionBuilder(self.driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
        actions.w3c_actions.pointer_action.move_to_location(x, y)
        actions.w3c_actions.pointer_action.pointer_down()
        actions.w3c_actions.pointer_action.pause(0.1)
        actions.w3c_actions.pointer_action.release()
        actions.perform()

    def pressDoneKey(self):
        self.driver.execute_script('mobile: performEditorAction', {'action': 'done'})

    def pressSearchKey(self):
        self.driver.execute_script('mobile: performEditorAction', {'action': 'search'})
