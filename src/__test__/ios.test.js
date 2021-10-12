const wdio = require("webdriverio");
const Mitmproxy = require('mitmproxy').default
const expect = require("chai").expect;


// webdriverio/appium setup 
const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    'autoAcceptAlerts': 'true',
    "platformName": "iOS",
    "platformVersion": "15.0",
    "deviceName": "iPhone Simulator",
    "app": "",
    "automationName": "XCUITest"
  }
};
let proxy, driver
let interceptedMessages = []

describe("iOS", () => {
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
    await new Promise(resolve => setTimeout(resolve, 50000));
    await driver.deleteSession();
    await proxy.shutdown();
  });

  describe("iOS Test", () => {
    it("iOS stuff", async () => {
      driver = await wdio.remote(opts);
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
  interceptedMessages: interceptedMessages
};