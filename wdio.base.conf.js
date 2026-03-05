/**
 * WebdriverIO Base Configuration
 * 
 * Shared settings inherited by all platform-specific configs.
 * Do NOT run this config directly. Use:
 *   npm run test:web
 *   npm run test:android
 *   npm run test:ios
 */

exports.config = {
    runner: 'local',

    specs: [
        './test/specs/**/*.e2e.js'
    ],

    exclude: [],

    suites: {
        login: [
            './test/specs/login.unified.e2e.js'
        ],
        web: [
            './test/specs/web.e2e.js',
            './test/specs/zenda.login.e2e.js'
        ],
        mobile: [
            './test/specs/mobile.e2e.js'
        ]
    },

    maxInstances: 1,

    logLevel: 'info',
    bail: 0,

    waitforTimeout: 30000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 300000
    },
};
