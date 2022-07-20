import time
import pytest
from mtest.common.appium_wrapper import IOS
from mtest.data import postgresql
from appium.webdriver.common.appiumby import AppiumBy


def test_appium_zip_search():
    ios = IOS()
    ios.click_element(AppiumBy.ACCESSIBILITY_ID, "closeButton")
    ios.click_element(AppiumBy.IOS_PREDICATE, 'value == "City, ZIP, School, or Address in US"')
    ios.set_value(AppiumBy.ACCESSIBILITY_ID, "City, ZIP, School, or Address", "66206")
    ios.pressSearchKey()
    ios.click_element(AppiumBy.IOS_PREDICATE, 'label == "List" AND name == "List" AND type == "XCUIElementTypeButton"')
    time.sleep(30)

@pytest.mark.depends(on=['test_appium_zip_search'])
def test_data_zip_search():
    data = postgresql.get_latest_test_data_properties('test_ios.py::test_appium_zip_search')
    page_names = []
    for item in data:
        if "pageName" in item:
            page_names.append(item["pageName"])
    assert "for_sale:srp_list" in page_names
