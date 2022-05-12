# Mobile Tracking Tester

## Table of Contents

<!-- vim-markdown-toc GFM -->

- [Up coming changes.](#up-coming-changes)
- [Getting Started](#getting-started)
  - [Requirments](#requirments)
- [Running Tests Step-by-step](#running-tests-step-by-step)
- [Writing Tests Step-by-Step](#writing-tests-step-by-step)
  - [Appium Inspector](#appium-inspector)
  - [Mocha Tests](#mocha-tests)
    - [Appium Test](#appium-test)
    - [Data Test](#data-test)
  - [Resources](#resources)
    - [General](#general)
    - [Appium](#appium)
    - [Proxy](#proxy)
    - [Android](#android)

<!-- vim-markdown-toc -->

## Up coming changes.

- [] Migrate from javascript to python. This is needed due to the proxy wrapper for javascript being outdated.
- [] Migrate build system from bash/make to task. A concurrent, easier to use build tool.

## Getting Started

### Requirments

| Software                                            | Version   | Resources |
| --------------------------------------------------- | --------- | --------- |
| GNU Make                                            | >=3.81    |           |
| NodeJS                                              | >=14.15.4 |           |
| NPM                                                 | >=6.14.10 |           |
| Xcode                                               | >=13      |           |
| iOS app or android apk                              |           |           |
| Appium Inspector (Optional, but highly recommended) |           |           |

## Running Tests Step-by-step

1. Clone this repository.
2. Place iOS and Android applications in this project folder. (Names need to be `BuyRent-core-debug.apk` and `Realtor.com.app` respectively).
3. Run the application with `./run.sh`. The first run will take a while.
4. Results of tests will be opened in your browser.

## Writing Tests Step-by-Step

### Appium Inspector

1. [Download and install appium inspector.](https://github.com/appium/appium-inspector/releases)
2. Start your respective emulator. Make sure to give it time to boot up completely.

- Android: Run `make start-emulator` in your terminal. Make sure you're in the project directory.
  ![](./docs/imgs/make-start-emulator.png)
- iOS: Run `open -a Simulator.app` in your terminal.
  ![](./docs/imgs/start-ios-emulator.png)

3. Start the appium server in a seperate console with the command `appium`
   ![](./docs/imgs/start-appium.png)
4. Copy the `capabilites` section from `src/__test__/appium.test.js` for android (`android_opts`) or ios (`ios_opts`) respectively.
   ![](./docs/imgs/capabilites.png)
5. Paste the configuration into `JSON Representation` of the appium inspector. **Make sure to save it!**
6. Make sure `Remote Path` of appium inspector is set to `/wd/hub`
   ![](docs/imgs/appium-inspector-setup.png)
7. Start the appium inspector and use it to generate the code you need for `appium.test.js`.
   ![](docs/imgs/appium-start-session.png)

- To record your actions and generate code, enable the "eye" icon at the top of the inspector. **Do not click inside the emulator its self, only inside the view the inspector gives you!**
  ![](docs/imgs/appium-inspector-element.png)
  ![](docs/imgs/appium-inspector-actions.png)

### Mocha Tests

There are two parts to writing a test. That appium test that triggers the tracking event and the test to compare the actual data.

#### Appium Test

There are 3 important functions to include. `before`, `after`, and the `describe` or your appium test it's self.

- **before:** This should include setting up the proxy and it's handler. The hander needs to push messages to the respective array depending on device.
  - For android `androidMessages`
  - For ios `iosMessages`
- **after:** This is for test cleanup tasks. The important thing to note here is the `setTimeout`. If you find your tests are taking a while and failing due to time out
  increase this number.
- **describe:** This is where the code generated in the appium inspector goes. Chances are the code won't work out-of-the-box. You'll need to tweak how elements are selected.
  If you're having trouble, reference your code against the examles given here.

**Example Android Test** (as seen in `src/__test__/appium.test.js`)

```js
describe("Android Appium Automation", () => {
  before(async () => {
    let requestHandler = (message) => {
      androidMessages.push(message);
    };
    proxy = await Mitmproxy.Create(requestHandler, [], true, true);
  });

  after(async () => {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    await driver.deleteSession();
    await proxy.shutdown();
  });

  describe("Gather data for example test", () => {
    it("goes to the search page and looks for a zip code", async () => {
      driver = await wdio.remote(android_opts);
      driver.setImplicitTimeout(30000);
      let el1 = await driver.$(
        "//android.widget.TextView[contains(@resource-id,'on_boarding_location')]"
      );
      await el1.click();
      let el2 = await driver.$(
        "//android.widget.EditText[contains(@resource-id,'search_edit_text')]"
      );
      await el2.click();
      await el2.setValue("66206");
      await driver.touchAction({ action: "tap", x: 1333, y: 2741 });
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });
  });
});
```

**Example iOS Test** (as seen in `src/__test__/appium.test.js`)

```js
describe("iOS Appium Automation", () => {
  before(async () => {
    let requestHandler = (message) => {
      iosMessages.push(message);
    };
    proxy = await Mitmproxy.Create(requestHandler, [], true, true);
  });

  after(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50000));
    await driver.deleteSession();
    await proxy.shutdown();
  });

  describe("Gather data for example test", () => {
    it("goes to the search page and looks for zip code", async () => {
      driver = await wdio.remote(ios_opts);
      driver.setImplicitTimeout(30000);
      let el1 = await driver.$("~closeButton");
      await el1.click();
      let el2 = await driver.$(
        '//XCUIElementTypeApplication[@name="(d)Realtor.com"]/XCUIElementTypeWindow/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeTextField'
      );
      await el2.click();
      let el3 = await driver.$("~City, ZIP, School, or Address");
      await el3.click();
      await el3.setValue("66206");
      let el5 = await driver.$(
        '//XCUIElementTypeCell[@name="searchCellAutocompletePlaces"]/XCUIElementTypeOther[1]/XCUIElementTypeOther'
      );
      await el5.click();
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });
  });
});
```

#### Data Test

For these tests you'll need to

### Resources

#### General

- [GNU Make](https://www.gnu.org/software/make/manual/html_node/index.html)

#### Appium

- [Appium](https://appium.io/docs/en/about-appium/intro/)

#### Proxy

- [Installing CA for proxy on android](https://docs.mitmproxy.org/stable/howto-install-system-trusted-ca-android/)

#### Android

- [Command line tools](https://developer.android.com/studio/command-line)
- [Debugger (ADB)](https://developer.android.com/studio/command-line/adb)
- [AVD Manager](https://developer.android.com/studio/command-line/avdmanager)
- [SDK Manager](https://developer.android.com/studio/command-line/sdkmanager)
