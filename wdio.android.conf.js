/**
 * WebdriverIO Configuration - Android
 * 
 * Inherits from wdio.base.conf.js
 * 
 * Prerequisites:
 * 1. Start Android Emulator: Medium_Phone_API_36.1
 * 2. Run: npm run test:android
 */

const { config: baseConfig } = require('./wdio.base.conf.js');

// Set environment variables so Appium can find Android SDK and Java
process.env.ANDROID_HOME = 'C:\\Users\\faisa\\AppData\\Local\\Android\\Sdk';
process.env.JAVA_HOME = 'C:\\Program Files\\Android\\Android Studio\\jbr';

// Add platform-tools to PATH so Appium can find adb
process.env.PATH = process.env.PATH + ';' + process.env.ANDROID_HOME + '\\platform-tools';

exports.config = {
    ...baseConfig,

    specs: [
        './test/specs/login.unified.e2e.js'
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'C:\\Users\\faisa\\.gemini\\antigravity\\playground\\qa-ai-automation\\app\\6-1-10_force-update.apk',
        'appium:appPackage': 'io.nexquare.parent',
        'appium:appActivity': 'io.nexquare.parent.MainActivity',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 120,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:adbExecTimeout': 60000,
    }],

    services: ['appium'],
};
