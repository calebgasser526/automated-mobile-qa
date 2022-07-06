import time
import json
import pytest
from mtest.common.appium_wrapper import Android
from mtest.data import postgresql

android = Android()

def test_zip_search():
    android.click_element("com.move.realtor.qa:id/on_boarding_location")
    android.set_value("com.move.realtor.qa:id/search_edit_text", "66206")
    android.touch(x=1321, y=2745)
    android.click_element("com.move.realtor.qa:id/listSwitchViewBtn")
    time.sleep(30)

@pytest.mark.depends(on=['test_zip_search'])
def test_zip_search_data():
    data = postgresql.get_latest_test_data()
    print(data)
    #for item in data:
    #    for req in item[0]["batch"]:
    #        print(req)
    #


#def test_save_search_srp():
#    android = Android()
#    # Two clicks to dispose of popup
#    android.click_element("com.move.realtor.qa:id/save_search_top")
#    android.click_element("com.move.realtor.qa:id/save_search_top")
#    time.sleep(10)


#  it("saves a listing on SRP", async () => {
#    await driver.pause(5000);
#    let el1 = await driver.$(
#      "//android.widget.ImageButton[contains(@content-desc, 'Save listing')][1]"
#    );
#    await el1.click();
#
#    let el2 = await driver.$(
#      "//android.widget.ImageButton[contains(@content-desc, 'Unsave listing')][1]"
#    );
#    await el2.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });
#
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
#
#  it("navigates to a listing", async () => {
#    let el1 = await driver.$(
#      "//android.widget.ImageView[contains(@resource-id, 'listingImageView')]"
#    );
#    await el1.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });
#
#  it("saves a listing on LDP", async () => {
#    let el1 = await driver.$(
#      "//android.widget.Button[contains(@content-desc, 'Save listing')]"
#    );
#    await el1.click();
#
#    await new Promise((resolve) => setTimeout(resolve, 5000));
#  });
#
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
#
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
