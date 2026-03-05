/**
 * Base Page Object
 * 
 * All page objects should extend this class.
 * Provides shared utilities for navigation, waits, and platform detection.
 */

const PlatformHelper = require('../helpers/platform.helper');

class BasePage {

    /**
     * Platform detection accessors (delegates to PlatformHelper)
     */
    get isAndroid() { return PlatformHelper.isAndroid; }
    get isIOS() { return PlatformHelper.isIOS; }
    get isMobile() { return PlatformHelper.isMobile; }
    get isWeb() { return PlatformHelper.isWeb; }
    get platformName() { return PlatformHelper.platformName; }

    /**
     * Navigate to a URL (web only)
     * @param {string} path - URL or path to navigate to
     */
    async open(path) {
        if (this.isWeb) {
            await browser.url(path);
        }
    }

    /**
     * Returns the appropriate element based on current platform
     * @param {object} selectors - { web: '...', android: '...', ios: '...' }
     * @returns {WebdriverIO.Element}
     */
    async crossPlatformElement(selectors) {
        const sel = PlatformHelper.selector(selectors);
        return await $(sel);
    }

    /**
     * Wait for the page/screen to be fully loaded
     * @param {number} timeout - Max wait time in ms
     */
    async waitForPageLoad(timeout = 10000) {
        if (this.isMobile) {
            // On mobile, wait for the activity to be stable
            await browser.pause(3000);
        } else {
            // On web, wait for document ready state
            await browser.waitUntil(
                async () => {
                    const state = await browser.execute(() => document.readyState);
                    return state === 'complete';
                },
                { timeout, timeoutMsg: 'Page did not load in time' }
            );
        }
    }

    /**
     * Take a screenshot and save it with a platform prefix
     * @param {string} name - Screenshot name
     */
    async takeScreenshot(name) {
        const platform = this.platformName;
        await browser.saveScreenshot(`./screenshots/${platform}_${name}.png`);
    }
}

module.exports = BasePage;
