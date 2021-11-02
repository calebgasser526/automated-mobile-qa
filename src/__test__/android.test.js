const wdio = require("webdriverio");
const Mitmproxy = require('mitmproxy').default
const expect = require("chai").expect;


// webdriverio/appium setup 
const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    "platformName": "Android",
    "platformVersion": "11",
    "deviceName": "Android Emulator",
    "app": "/Users/cgasser/StudioProjects/Android/apps/BuyRent/build/outputs/apk/core/debug/BuyRent-core-debug.apk",
    "appPackage": "com.move.realtor.qa",
    "appActivity": "com.move.realtor.splash.SplashActivity",
    "appWaitActivity": "com.move.realtor.onboarding.OnBoardingActivity",
    "automationName": "UiAutomator2"
  }
};
let proxy, driver
let interceptedMessages = []

describe("Android", () => {
  // TODO: Mocha gobal before hook research
  before(async () => {
    // proxy/mitmproxy setup
    let requestHandler = (message) => {
      // TODO
      // Write out network data for later testing.
      // let req = message.request
      // console.log('************************************')
      // console.log('mitmproxy intercepted a requests')
      // console.log(message)
      // console.log(req.method)
      // TODO
      // api.segment.io
      // Catch batch of segments
      // Next batch of segemets could cause issues?
      // console.log(req.rawUrl)
      // console.log(message.requestBody.toString())
      // console.log('************************************')
      interceptedMessages.push(message)
    }

    // // start mitmproxy
    proxy = await Mitmproxy.Create(requestHandler, [], true, true)
  });

  after(async () => {
    // Wait 10 seconds before shutting down the app/proxy to make sure we have all the messages.
    await new Promise(resolve => setTimeout(resolve, 30000));
    await driver.deleteSession();
    await proxy.shutdown();
  });

  describe("Android Test", () => {
    it("android stuff", async () => {
      driver = await wdio.remote(opts);
      driver.setImplicitTimeout(30000)
      let el1 = await driver.$("//android.widget.TextView[contains(@resource-id,'on_boarding_location')]");
      await el1.click();
      let el2 = await driver.$("//android.widget.EditText[contains(@resource-id,'search_edit_text')]");
      await el2.click();
      await el2.setValue("66206");
      await driver.touchAction({action: 'tap', x: 1316, y: 2271})
      await new Promise(resolve => setTimeout(resolve, 5000));
    });
  });
});

module.exports = {
  interceptedMessages: interceptedMessages
};