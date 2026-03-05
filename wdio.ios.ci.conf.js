/**
 * WebdriverIO Configuration - iOS (GitHub Actions CI)
 * 
 * This config is designed to run on GitHub Actions macOS runners.
 * It uses environment variables so you can customize device/app settings
 * from the workflow file without editing this config.
 * 
 * Usage:
 *   npm run test:ios:ci
 * 
 * Environment Variables (optional overrides):
 *   IOS_DEVICE_NAME    - Simulator device name (default: "iPhone 15")
 *   IOS_PLATFORM_VERSION - iOS version (default: "17.2")
 *   IOS_APP_PATH       - Path to .app file (default: ./app/Zenda.app)
 */

const { config: baseConfig } = require('./wdio.base.conf.js');

exports.config = {
    ...baseConfig,

    specs: [
        './test/specs/login.unified.e2e.js'
    ],

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.2',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.IOS_APP_PATH || './app/Zenda.app',
        'appium:bundleId': 'io.nexquare.parent',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 120,
        'appium:wdaLaunchTimeout': 120000,
        'appium:wdaConnectionTimeout': 240000,
        'appium:autoAcceptAlerts': true,            // Auto-accept iOS permission popups
        'appium:isHeadless': false,                 // Simulator runs with UI on CI
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
