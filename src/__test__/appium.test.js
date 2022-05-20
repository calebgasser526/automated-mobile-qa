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
    "app": "/Users/dfox/Projects/evo/automated-mobile-qa/Realtor.com.app",
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

  describe("Test Data - SRP", () => {
    beforeEach(async() => {
      await driver.launchApp();

      // search for_sale in 64064
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id,'on_boarding_location')]");
      await el1.click();
      
      let el2 = await driver.$("//android.widget.EditText[contains(@resource-id,'search_edit_text')]");
      await el2.click();
      await el2.setValue("64064");

      await driver.touchAction({action: 'tap', x: 1333, y: 2741});

      let el3 = await driver.$("//android.widget.FrameLayout");
      await el3.click();

      let el4 = await driver.$("//android.widget.Button[contains(@text, 'List')]");
      await el4.click();
      
      await driver.pause(2000);
    })

    afterEach(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await driver.closeApp();
    });

    // it("submits a lead - SRP - contact agent button", async () => {
    //   let el1 = await driver.$("//android.widget.Button[contains(@resource-id, 'lead_button')]");
    //   await el1.click();

    //   let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Name')]");
    //   await el2.click();
    //   await driver.pause(2000);
    //   await el2.setValue("Test Test");
    //   await driver.pause(2000);

    //   let el3 = await driver.$("//android.widget.EditText[contains(@text, 'Email')]");
    //   await el3.click();
    //   await driver.pause(2000);
    //   await el3.setValue("moveqatest@test.com");
    //   await driver.pause(2000);

    //   let el4 = await driver.$("//android.widget.EditText[contains(@text, 'Phone')]");
    //   await el4.click();
    //   await driver.pause(2000);
    //   await el4.setValue("8162859038");
    //   await driver.pause(2000);

    //   let el5 = await driver.$("//android.widget.FrameLayout");
    //   await el5.click();

    //   let el6 = await driver.$("//android.widget.Button[contains(@text, 'CONTACT AGENT')]");
    //   await el6.click();
    //   await driver.pause(7000);
    // })
    // it("saves a listing - SRP - list view", async () => {
    //   let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Save listing')][1]");
    //   await el1.click();
    //   await driver.pause(2000);
    // })
  })

  describe("Test Data - LDP", () => {
    beforeEach(async() => {
      await driver.launchApp();

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
      await driver.pause(2000);
    });

    afterEach(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await driver.closeApp();
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
    
    // it("submits a lead - LDP - inline form", async () => {
    //   await driver.pause(3000);
    //   for (let i = 0; i < 10; i++) {
    //     await driver.touchAction([ {action: 'longPress', x: 0, y: 2500}, { action: 'moveTo', x: 0, y: 10}, 'release' ]);
    //   }

    //   await driver.pause(5000);
    //   let el1 = await driver.$("//android.widget.EditText[contains(@elementId, '00000000-0000-001b-0000-00ae0000023a')]");
    //   await el1.click();
    //   await driver.pause(2000);
    //   await el1.setValue("Test Test");
    //   await driver.pause(2000);

    //   let el2 = await driver.$("//android.widget.EditText[contains(@text, 'Email')]");
    //   await el2.click();
    //   await driver.pause(2000);
    //   await el2.setValue("moveqatest@test.com");
    //   await driver.pause(2000);

    //   let el3 = await driver.$("//android.widget.EditText[contains(@text, 'Phone')]");
    //   await el3.click();
    //   await driver.pause(2000);
    //   await el3.setValue("8162859038");
    //   await driver.pause(2000);

    //   let el4 = await driver.$("//android.widget.FrameLayout");
    //   await el4.click();

    //   let el5 = await driver.$("//android.widget.Button[contains(@content-desc, 'Send message')]");
    //   await el5.click();
    //   await driver.pause(7000);
    // })

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

    it("submits a lead - LDP - text", async () => {
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
      await driver.pause(7000);
    })
    // it("submits a lead - LDP - phone", async () => {

    // })
    it("saves a listing - LDP - photo gallery", async () => {
      let el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Save listing')]");
      await el1.click();
      await driver.pause(2000);
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
