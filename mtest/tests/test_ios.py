import time
import pytest
from mtest.common.appium_wrapper import IOS
from mtest.data import postgresql
from appium.webdriver.common.appiumby import AppiumBy

ios = IOS()

def test_appium_zip_search():
    ios.click_element(AppiumBy.ACCESSIBILITY_ID, "closeButton")
    ios.click_element(AppiumBy.IOS_PREDICATE, 'value == "City, ZIP, School, or Address in US"')
    ios.set_value(AppiumBy.ACCESSIBILITY_ID, "City, ZIP, School, or Address", "66206")
    ios.touch(326, 711)
    time.sleep(30)

@pytest.mark.depends(on=['test_appium_zip_search'])
def test_data_zip_search():
    data = postgresql.get_latest_test_data_properties('test_ios.py::test_appium_zip_search')
    has_pagename = False
    for item in data:
        if "pageName" in item:
            has_pagename = True
            assert item["pageName"] == "for_sale:srp_list"
    assert has_pagename
