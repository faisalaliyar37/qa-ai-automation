/**
 * WebdriverIO Configuration - Android (GitHub Actions CI)
 * 
 * This config is designed to run on GitHub Actions Linux runners
 * with the reactivecircus/android-emulator-runner action.
 * 
 * Usage:
 *   npm run test:android:ci
 * 
 * Environment Variables (optional overrides):
 *   ANDROID_DEVICE_NAME - Emulator device name (default: "emulator-5554")
 *   ANDROID_APP_PATH    - Path to .apk file (default: ./app/app.apk)
 */

const { config: baseConfig } = require('./wdio.base.conf.js');

exports.config = {
    ...baseConfig,

    specs: [
        './test/specs/login.unified.e2e.js'
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.ANDROID_APP_PATH || './app/app.apk',
        'appium:appPackage': 'io.nexquare.parent',
        'appium:appActivity': 'io.nexquare.parent.MainActivity',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 120,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:adbExecTimeout': 60000,
    }],

    services: [
        ['appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true,
            },
        }],
    ],

    // Longer timeouts for CI environment
    waitforTimeout: 45000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 5,
};
