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
    "app": "/Users/dfox/Projects/evo/automated-mobile-qa/BuyRent-core-debug.apk",
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
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 30000));
    await driver.deleteSession();
    await proxy.shutdown()
  });

  describe("Gather data for example test", () => {
    before(async() => {
      driver = await wdio.remote(android_opts);
      driver.setImplicitTimeout(30000);
    })

    beforeEach(async() => {
      // search for_sale in 64064
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id,'on_boarding_location')]");
      await el1.click();
      
      let el2 = await driver.$("//android.widget.EditText[contains(@resource-id,'search_edit_text')]");
      await el2.click();
      await el2.setValue("64064");

      await driver.touchAction({action: 'tap', x: 1333, y: 2741});

      // select single listing
      let el3 = await driver.$("//android.view.View[contains(@content-desc, 'Marker. ')][1]");
      await el3.waitForDisplayed();
      await el3.click();
      await el3.click(); // two clicks to dispose of popup

      // enter ldp
      let el4 = await driver.$("//android.widget.ImageView[contains(@resource-id, 'listingImageView')]");
      await el4.waitForDisplayed();
      await el4.click();
    });

    afterEach(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await driver.reset();
    });

    it("submits a lead - LDP - contact agent button", async () => {
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
      await driver.pause(7000);
    })
    
    it("submits a lead - LDP - inline form", async () => {
      let el1 = await driver.$("//android.widget.EditText[contains(@content-desc, 'Name')]");
      await el1.scrollIntoView(); // scrolling not working
      await el1.waitForDisplayed();
      await el1.click();
      await el1.setValue("Test Test");
      await el1.waitUntil(async function () {
        return (await this.getText()) === "Test Test, Name"
      });

      let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Email')]");
      await el2.click();
      await driver.pause(2000);
      await el2.setValue("moveqatest@test.com");
      await driver.pause(2000);

      let el3 = await driver.$("//android.widget.EditText[contains(@text, 'Phone')]");
      await el3.click();
      await driver.pause(2000);
      await el3.setValue("8162859038");
      await driver.pause(2000);

      let el4 = await driver.$("//android.widget.FrameLayout");
      await el4.click();

      let el5 = await driver.$("//android.widget.Button[contains(@content-desc, 'Send message')]");
      await el5.click();
    })

    it("submits a lead - LDP - contact agent for details", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Contact agent for details')]");
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
      await driver.pause(7000);
    })
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
    beforeEach(async () => {
      driver = await wdio.remote(ios_opts);
      driver.setImplicitTimeout(60000);

      // close popup
      let el1 = await driver.$("~closeButton");
      await el1.click();

      // select search bar and search for_sale in 64064
      let el2 = await driver.$("//XCUIElementTypeApplication[@name=\"(d)Realtor.com\"]/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeTextField");
      await el2.click();
      
      let el3 = await driver.$("~City, ZIP, School, or Address");
      await el3.click();
      await el3.setValue("64064");

      let el4 = await driver.$("//XCUIElementTypeCell[@name=\"searchCellAutocompletePlaces\"]/XCUIElementTypeOther[1]/XCUIElementTypeOther");
      await el4.click();
    });

    afterEach(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    it("submits a lead - LDP - persistent footer", async () => {

    })

    it("submits a lead - LDP - inline form", async () => {
      
    })

    it("submits a lead - LDP - contact agent for details", async () => {
      
    })
  });
});

module.exports = {
  androidMessages: androidMessages,
  iosMessages: iosMessages
};
