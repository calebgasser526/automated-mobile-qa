const wdio = require("webdriverio");
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
    "app": "./Realtor.com.app",
    "automationName": "XCUITest"
  }
};
let proxy, driver
let interceptedMessages = []
let certificatePath = path.resolve('/.http-mitm-proxy/certs/', 'ca.pem')
let certificate = await fs.readFile(certificatePath)
await driver.executeScript('mobile:installCertificate', [{content: certificate.toString('base64')}])
describe("iOS", () => {
  before(async () => {
  });

  after(async () => {
    await new Promise(resolve => setTimeout(resolve, 50000));
    await driver.deleteSession();
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
