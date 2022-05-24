const wdio = require("webdriverio");
const expect = require("chai").expect;
const Mitmproxy = require('mitmproxy').default

const android_opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "platformName": "Android",
    "platformVersion": "11",
    "deviceName": "Android Emulator",
    "app": "./BuyRent-core-debug.apk",
    "appPackage": "com.move.realtor.qa",
    "appActivity": "com.move.realtor.splash.SplashActivity",
    "appWaitActivity": "com.move.realtor.onboarding.OnBoardingActivity",
    "automationName": "UiAutomator2"
  }
};

const ios_opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "autoAcceptAlerts": "true",
    "platformName": "iOS",
    "platformVersion": "15.0",
    "deviceName": "iPhone Simulator",
    "app": "./Realtor.com.app",
    "automationName": "XCUITest"
  }
};

let driver
androidMessages = []
iosMessages = []

describe("Android Appium Automation", () => {
  before(async () => {
    let requestHandler = (message) => {
      androidMessages.push(message);
     }
     proxy = await Mitmproxy.Create(requestHandler, [], true, true);
     
     driver = await wdio.remote(android_opts);
     driver.setImplicitTimeout(30000);
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    await driver.deleteSession();
    await proxy.shutdown()
  });

  describe("Data Collection", () => {
    it("loads the app and searches via zip code", async () => {
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id,'on_boarding_location')]");
      await el1.click();
      
      let el2 = await driver.$("//android.widget.EditText[contains(@resource-id,'search_edit_text')]");
      await el2.click();
      await el2.setValue("64064");

      await driver.touchAction({action: 'tap', x: 1333, y: 2741});

      let el3 = await driver.$("//android.widget.Button[contains(@text, 'List')]");
      await el3.click();

      // let el4 = await driver.$("//android.widget.FrameLayout");
      // await el4.click();
      
      await driver.pause(5000);
      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("saves a search on SRP", async () => {
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id, 'save_search_top')]");
      await el1.click();
      await el1.click(); // two clicks to dispose of popup

      await driver.pause(5000);
      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("saves a listing on SRP", async () => {
      let el1 = await driver.$("//android.widget.ImageButton[contains(@content-desc, 'Save listing')][1]");
      await el1.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("submits a lead on SRP", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@resource-id, 'lead_button')]");
      await el1.click();

      let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Name')]");
      await el2.click();
      await driver.pause(2000);
      await el2.setValue("Test Test");
      await driver.pause(2000);

      let el3 = await driver.$("//android.widget.EditText[contains(@text, 'Email')]");
      await el3.click();
      await driver.pause(2000);
      await el3.setValue("moveqatest@test.com");
      await driver.pause(2000);

      let el4 = await driver.$("//android.widget.EditText[contains(@text, 'Phone')]");
      await el4.click();
      await driver.pause(2000);
      await el4.setValue("8162859038");
      await driver.pause(2000);

      let el5 = await driver.$("//android.widget.FrameLayout");
      await el5.click();

      let el6 = await driver.$("//android.widget.Button[contains(@resource-id, 'advertiser_lead_send_button')]");
      await el6.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("navigates to a listing", async () => {
      let el1 = await driver.$("//android.widget.ImageView[contains(@resource-id, 'listingImageView')]");
      await el1.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("saves a listing on LDP", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Save listing')]");
      await el1.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("submits a text lead on LDP", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Text')]");
      await el1.click();

      let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Mobile phone number')]");
      await el2.click();
      await driver.pause(2000);
      await el2.setValue("8164828922");
      await driver.pause(2000);

      let el3 = await driver.$("//android.widget.FrameLayout");
      await el3.click();

      let el4 = await driver.$("//android.widget.Button[contains(@content-desc, 'Text me')]");
      await el4.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("submits a lead on LDP", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Contact agent')]");
      await el1.click();

      let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Name')]");
      await el2.click();
      await driver.pause(2000);
      await el2.setValue("Test Test");
      await driver.pause(2000);

      let el3 = await driver.$("//android.widget.EditText[contains(@text, 'Email')]");
      await el3.click();
      await driver.pause(2000);
      await el3.setValue("moveqatest@test.com");
      await driver.pause(2000);

      let el4 = await driver.$("//android.widget.EditText[contains(@text, 'Phone')]");
      await el4.click();
      await driver.pause(2000);
      await el4.setValue("8162859038");
      await driver.pause(2000);

      let el5 = await driver.$("//android.widget.FrameLayout");
      await el5.click();

      let el6 = await driver.$("//android.widget.Button[contains(@content-desc, 'Send message')]");
      await el6.click();

      await new Promise(resolve => setTimeout(resolve, 5000));
    });
  })
});

describe("iOS Appium Automation", () => {
  before(async () => {
    let requestHandler = (message) => {
      iosMessages.push(message)
     }
    proxy = await Mitmproxy.Create(requestHandler, [], true, true)
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 50000));
    await driver.deleteSession();
    await proxy.shutdown()
  });

  describe("Gather data for example test", () => {
    it("goes to the search page and looks for zip code", async () => {
      driver = await wdio.remote(ios_opts);
      driver.setImplicitTimeout(30000)
      let el1 = await driver.$("~closeButton");
      await el1.click();
      let el2 = await driver.$("//XCUIElementTypeApplication[@name=\"(d)Realtor.com\"]/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeTextField");
      await el2.click();
      let el3 = await driver.$("~City, ZIP, School, or Address");
      await el3.click();
      await el3.setValue("66206");
      let el5 = await driver.$("//XCUIElementTypeCell[@name=\"searchCellAutocompletePlaces\"]/XCUIElementTypeOther[1]/XCUIElementTypeOther");
      await el5.click();
      await new Promise(resolve => setTimeout(resolve, 5000));
    });
  });
});

module.exports = {
  androidMessages: androidMessages,
  iosMessages: iosMessages
};
