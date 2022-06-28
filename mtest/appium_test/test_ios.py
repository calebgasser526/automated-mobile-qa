import os
form .common.appium_wrapper import ios_driver
from .common.appium_helpers import wait_for_element


def test_zip_search():
    driver = ios_driver()
    el1 = driver.find_element(by=AppiumBy.IOS_UIAUTOMATION, value='new UiSelector().resourceId("com.move.realtor.qa:id/on_boarding_location")')
    el1.click()
    el2 = wait_for_element(driver, AppiumBy.IOS_UIAUTOMATION, value='new UiSelector().resourceId("com.move.realtor.qa:id/search_edit_text")')
    el2.click()
    el2.set_value("66206")
    TouchAction(driver).tap(x=1321, y=2745).perform()
