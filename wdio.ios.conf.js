/**
 * WebdriverIO Configuration - iOS
 * 
 * Inherits from wdio.base.conf.js
 * 
 * Prerequisites:
 * 1. macOS with Xcode installed
 * 2. iOS Simulator running (or real device connected)
 * 3. Run: npm run test:ios
 * 
 * TODO: Update the placeholder values below with your actual iOS app details
 */

const { config: baseConfig } = require('./wdio.base.conf.js');

exports.config = {
    ...baseConfig,

    specs: [
        './test/specs/login.unified.e2e.js'
    ],

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15',                    // TODO: Update with your simulator/device name
        'appium:platformVersion': '17.0',                    // TODO: Update with your iOS version
        'appium:automationName': 'XCUITest',
        'appium:app': '/path/to/your/app.app',               // TODO: Update with your .app or .ipa path
        'appium:bundleId': 'io.nexquare.parent',             // TODO: Verify bundle ID
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 120,
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 240000,
    }],

    services: ['appium'],
};
