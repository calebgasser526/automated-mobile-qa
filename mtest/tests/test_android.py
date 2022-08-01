import time
import pytest
from mtest.common.appium_wrapper import Android
from mtest.data import postgresql
from appium.webdriver.common.appiumby import AppiumBy


def test_appium_zip_search():
    android = Android()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/on_boarding_location')
    android.set_value(AppiumBy.ID, 'com.move.realtor.qa:id/search_edit_text', "66206")
    android.pressSearchKey()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/listSwitchViewBtn')


@pytest.mark.depends(on=['test_appium_zip_search'])
def test_data_zip_search():
    data = postgresql.get_latest_test_data_properties('test_android.py::test_appium_zip_search')
    page_names = []
    for item in data:
        if "pageName" in item:
            page_names.append(item["pageName"])
    assert "for_sale:srp_list" in page_names


def test_appium_save_search_srp():
    android = Android()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/on_boarding_location')
    android.set_value(AppiumBy.ID, 'com.move.realtor.qa:id/search_edit_text', "66206")
    android.pressSearchKey()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/listSwitchViewBtn')
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/save_search_top')


@pytest.mark.depends(on=['test_appium_save_search_srp'])
def test_data_save_search_srp():
    data = postgresql.get_latest_test_data_properties('test_android.py::test_appium_save_search_srp')
    page_names = []
    save_items = []
    for item in data:
        if "pageName" in item:
            page_names.append(item["pageName"])
        if "saveItem" in item:
            save_items.append(item["saveItem"])
    assert "for_sale:srp_list" in page_names
    assert "search" in save_items


def test_appium_save_listing_srp():
    android = Android()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/on_boarding_location')
    android.set_value(AppiumBy.ID, 'com.move.realtor.qa:id/search_edit_text', "66206")
    android.pressSearchKey()
    android.click_element(AppiumBy.ID, 'com.move.realtor.qa:id/listSwitchViewBtn')
    android.click_element(AppiumBy.ACCESSIBILITY_ID, "Save listing")
    #android.click_element(AppiumBy.ACCESSIBILITY_ID, "Unsave listing")

@pytest.mark.depends(on=['test_appium_save_listing_srp'])
def test_data_save_listing_srp():
    pass

def test_appium_submit_lead_srp():
    pass

@pytest.mark.depends(on=['test_appium_submit_lead_srp'])
def test_data_submit_lead_srp():
    pass
#  it("submits a lead on SRP", async () => {
#    let el1 = await driver.$(
#      "//android.widget.Button[contains(@resource-id, 'lead_button')]"
#    );
#    await el1.click();
#    await driver.pause(5000);
#    let el2 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Name')]"
#    );
#    await el2.click();
#    await driver.pause(2000);
#    await el2.setValue("Test Test");
#    await driver.pause(2000);
#
#    let el3 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Email')]"
#    );
#    await el3.click();
#    await driver.pause(2000);
#    await el3.setValue("moveqatest@test.com");
#    await driver.pause(2000);
#
#    let el4 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Phone')]"
#    );
#    await el4.click();
#    await driver.pause(2000);
#    await el4.setValue("8162859038");
#    await driver.pause(2000);
#
#    let el5 = await driver.$("//android.widget.FrameLayout");
#    await el5.click();
#
#    let el6 = await driver.$(
#      "//android.widget.Button[contains(@resource-id, 'advertiser_lead_send_button')]"
#    );
#    await el6.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });

def test_appium_navigate_listing():
#  it("navigates to a listing", async () => {
#    let el1 = await driver.$(
#      "//android.widget.ImageView[contains(@resource-id, 'listingImageView')]"
#    );
#    await el1.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });
    pass

@pytest.mark.depends(on=['test_appium_navigate_listing'])
def test_data_navigate_listing():
    pass

def test_appium_save_listing_ldp():
    pass
#  it("saves a listing on LDP", async () => {
#    let el1 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Save listing')]"
#    );
#    await el1.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });

@pytest.mark.depends(on=['test_appium_save_listing_ldp'])
def test_data_save_listing_ldp():
    pass

def test_appium_submit_text_lead_ldp():
    pass
#  it("submits a text lead on LDP", async () => {
#    let el1 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Text')]"
#    );
#    await el1.click();
#
#    let el2 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Mobile phone number')]"
#    );
#    await el2.click();
#    await driver.pause(2000);
#    await el2.setValue("8164828922");
#    await driver.pause(2000);
#
#    let el3 = await driver.$("//android.widget.FrameLayout");
#    await el3.click();
#
#    let el4 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Text me')]"
#    );
#    await el4.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });

@pytest.mark.depends(on=['test_appium_submit_text_lead_ldp'])
def test_data_submit_text_lead_ldp():
    pass

def test_appium_submit_lead_ldp():
    pass
#  it("submits a lead on LDP", async () => {
#    await driver.pause(5000);
#    let el1 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Contact agent')]"
#    );
#    await el1.click();
#
#    await driver.pause(5000);
#    let el2 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Name')]"
#    );
#    await el2.click();
#    await driver.pause(2000);
#    await el2.setValue("Test Test");
#    await driver.pause(2000);
#
#    let el3 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Email')]"
#    );
#    await el3.click();
#    await driver.pause(2000);
#    await el3.setValue("moveqatest@test.com");
#    await driver.pause(2000);
#
#    let el4 = await driver.$(
#      "//android.widget.EditText[contains(@text, 'Phone')]"
#    );
#    await el4.click();
#    await driver.pause(2000);
#    await el4.setValue("8162859038");
#    await driver.pause(2000);
#
#    let el5 = await driver.$("//android.widget.FrameLayout");
#    await el5.click();
#
#    let el6 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Send message')]"
#    );
#    await el6.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });

@pytest.mark.depends(on=['test_appium_submit_lead_ldp'])
def test_data_submit_lead_ldp():
    pass
