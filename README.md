# Prerequisite

You must have the Android/iOS project built and the corrisponding emulators you want to use for testing installed. The installation of emulators can be managed in android studio or xcode respectively.

# Android Setup

Start Emulator with proxy

`emulator -avd test-proxy -writable-system &`

Where `test-proxy` is the name of the emulator you want to run. This needs to match up with the version of android you are setup to test against in appium's compatilibilty options. 

Then run these commands to give your emulator the ssl cert it needs. This only needs to be done once bu if you delete the emulator this will need to be redone. 

`
adb root
adb shell avbctl disable-verification
adb reboot
adb root
adb remount
adb reboot
ca=~/.mitmproxy/mitmproxy-ca-cert.pem && hash=$(openssl x509 -noout -subject_hash_old -in $ca) && hash=c8750f0d && adb push $ca /system/etc/security/cacerts/$hash.0
adb unroot
`

# IOS setup

You don't need to setup the emulator seperately, appium should manage and start that for you. 

# Settings and Options for Appium
 You will want to put the full path for the `app` setting
#### iOS

```
capabilities: {
    'autoAcceptAlerts': 'true',
    "platformName": "iOS",
    "platformVersion": "15.0",
    "deviceName": "iPhone Simulator",
    "app": "/path/to/app/output",
    "automationName": "XCUITest"
  }
```

#### Android 

For `appActivity` and `appPackage`, these will need to point to where the app is initialized. 

```
  capabilities: {
    "platformName": "Android",
    "platformVersion": "11",
    "deviceName": "Android Emulator",
    "app": "path/to/app/output",
    "appPackage": "com.move.realtor.qa",
    "appActivity": "com.move.realtor.splash.SplashActivity",
    "appWaitActivity": "com.move.realtor.onboarding.OnBoardingActivity",
    "automationName": "UiAutomator2"
  }
```
# Capturing Network traffic

#### Note: You must install mitmproxy version 6.0.0 via pip

https://appiumpro.com/editions/63-capturing-android-emulator-network-traffic-with-appium

Examples of how to start the proxy programaticaly can be found in `/src/__test__/ios.test.js` or `/src/__test__/android.test.js`