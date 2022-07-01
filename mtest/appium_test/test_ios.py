import time
import os
from mtest.common.appium_helpers import wait_for_element
from appium.options.ios import XCUITestOptions
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput


def test_zip_search():
    options = XCUITestOptions().\
       set_capability('autoAcceptAlerts', 'true').\
       set_capability('platformName', 'iOS').\
       set_capability('platformVersion', '15.0').\
       set_capability('deviceName', 'iPhone Simulator').\
       set_capability('app', os.environ["IOS_APP"]).\
       set_capability('automationName', "XCUITest")
    driver = webdriver.Remote('http://host.lima.internal:4723/wd/hub', options=options)
    el1 = wait_for_element(driver, AppiumBy.ACCESSIBILITY_ID, "closeButton")
    el1.click()
    el2 = wait_for_element(driver, AppiumBy.CLASS_NAME, "//XCUIElementTypeApplication[@name=\"(d)Realtor.com\"]/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeTextField")
    el2.click()
    el3 = wait_for_element(driver, AppiumBy.ACCESSIBILITY_ID, value="City, ZIP, School, or Address")
    el3.send_keys("66206")
    actions = ActionChains(driver)
    actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
    actions.w3c_actions.pointer_action.move_to_location(326, 711)
    actions.w3c_actions.pointer_action.pointer_down()
    actions.w3c_actions.pointer_action.pause(0.1)
    actions.w3c_actions.pointer_action.release()
    actions.perform()
