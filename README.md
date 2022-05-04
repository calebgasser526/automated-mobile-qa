# Mobile Tracking Tester 

## Table of Contents

<!-- vim-markdown-toc GFM -->

* [Getting Started](#getting-started)
  - [Requirments](#requirments)
* [Step-by-step](#step-by-step)
  - [Android](#android)
  - [iOS](#ios)
* [Writing Tests](#writing-tests)
* [Project Description](#project-description)
  - [Tools](#tools)
  - [Structure](#structure)
  - [Resources](#resources)
    + [General](#general)
    + [Appium](#appium)
    + [Proxy](#proxy)
    + [Android](#android-1)

<!-- vim-markdown-toc -->

## Getting Started

### Requirments

|Software |Version   |Resources |
|---------|----------|----------|
|GNU Make |>=3.81    |          |
|NodeJS   |>=14.15.4 |          |
|NPM      |>=6.14.10 |          |
|Xcode    |>=13      |          |

##  Step-by-step

### Android
1. Start android `npm run android`
2. Start proxy `npm run proxy`
3. Start appium `npm run appium`
4. Run tests `npm run test:andriod`

### iOS
TODO

## Writing Tests
TODO

## Project Description
TODO

### Tools
TODO

### Structure
TODO

### Resources

#### General

* [GNU Make](https://www.gnu.org/software/make/manual/html_node/index.html)

#### Appium

* [Appium](https://appium.io/docs/en/about-appium/intro/)

#### Proxy

* [http-mimt-proxy](https://github.com/joeferner/node-http-mitm-proxy)
* [SSL/TSL Basics](https://www.tutorialspoint.com/network_security/network_security_transport_layer.htm)

#### Android

* [Command line tools](https://developer.android.com/studio/command-line)
* [Debugger (ADB)](https://developer.android.com/studio/command-line/adb)
* [AVD Manager](https://developer.android.com/studio/command-line/avdmanager)
* [SDK Manager](https://developer.android.com/studio/command-line/sdkmanager)
* [Installing CA for proxy on android (this is for mimtproxy but the same concept applies to the one used in this project)](https://docs.mitmproxy.org/stable/howto-install-system-trusted-ca-android/)


