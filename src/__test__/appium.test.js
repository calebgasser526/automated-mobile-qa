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
    'autoAcceptAlerts': 'true',
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
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    await driver.deleteSession();
    await proxy.shutdown()
  });

  describe("Gather data for example test", () => {
    it("goes to the search page and looks for a zip code", async () => {
      driver = await wdio.remote(android_opts);
      driver.setImplicitTimeout(30000)
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id,'on_boarding_location')]");
      await el1.click();
      let el2 = await driver.$("//android.widget.EditText[contains(@resource-id,'search_edit_text')]");
      await el2.click();
      await el2.setValue("66206");
      await driver.touchAction({action: 'tap', x: 1333, y: 2741})
      await new Promise(resolve => setTimeout(resolve, 5000));
    });
  });
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
