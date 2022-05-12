# Mobile Tracking Tester

## Table of Contents

<!-- vim-markdown-toc GFM -->

* [Getting Started](#getting-started)
  - [Requirments](#requirments)
* [Step-by-step](#step-by-step)
* [Writing Tests](#writing-tests)
  - [Appium Inspector](#appium-inspector)
  - [Resources](#resources)
    + [General](#general)
    + [Appium](#appium)
    + [Proxy](#proxy)
    + [Android](#android)

<!-- vim-markdown-toc -->

## Getting Started

### Requirments

|Software |Version   |Resources |
|---------|----------|----------|
|GNU Make |>=3.81    |          |
|NodeJS   |>=14.15.4 |          |
|NPM      |>=6.14.10 |          |
|Xcode    |>=13      |          |
|iOS app or android apk |       |      |
| Appium Inspector (Optional, but highly recommended) |         |          |

##  Step-by-step

1. Clone this repository.
2. Place iOS and Android applications in this project folder. (Names need to be `BuyRent-core-debug.apk` and `Realtor.com.app` respectively).
3. Run the application with `./run.sh`. The first run will take a while.
4. Results of tests will be opened in your browser.


## Writing Tests

1. [Download and install appium inspector.](https://github.com/appium/appium-inspector/releases)
2. Start your respective emulator.
  - Android: Run 'make start-emulator` in your terminal. Make sure you're in the project directory.
![](./docs/imgs/make-start-emulator.png)
  - iOS: Run `open -a Simulator.app` in your terminal.
![](./docs/imgs/start-ios-emulator.png)
3. Start the appium server in a seperate console with the command `appium`
![](./docs/imgs/start-appium.png)
4. Copy the `capabilites` section from `src/__test__/appium.test.js` for android (`android_opts`) or ios (`ios_opts`) respectively.
5. Paste the configuration into `JSON Representation` of the appium inspector. **Make sure to save it!**
![](docs/imgs/json-rep.)
6. Make sure `Remote Path` of appium inspector is set to `/wd/hub`
7. Start the appium inspector and use it to generate the code you need for `appium.test.js`
  - To record your actions and generate code, enable the "eye" icon at the top of the inspector.
8. Follow the format of exsisting tests, making sure to add messages to the queue in the `before` clause.
9. Test the captured network data in the `data.test.js` following the format of exsisting tests.

### Appium Inspector

### Resources

#### General

* [GNU Make](https://www.gnu.org/software/make/manual/html_node/index.html)

#### Appium

* [Appium](https://appium.io/docs/en/about-appium/intro/)

#### Proxy

* [Installing CA for proxy on android](https://docs.mitmproxy.org/stable/howto-install-system-trusted-ca-android/)

#### Android

* [Command line tools](https://developer.android.com/studio/command-line)
* [Debugger (ADB)](https://developer.android.com/studio/command-line/adb)
* [AVD Manager](https://developer.android.com/studio/command-line/avdmanager)
* [SDK Manager](https://developer.android.com/studio/command-line/sdkmanager)
