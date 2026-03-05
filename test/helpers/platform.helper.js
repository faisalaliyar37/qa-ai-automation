/**
 * Platform Helper
 * 
 * Utility to detect the current execution platform at runtime.
 * Works by inspecting browser/driver capabilities set by WebdriverIO.
 */

class PlatformHelper {

    /**
     * @returns {boolean} true if running on an Android device/emulator
     */
    static get isAndroid() {
        return driver.capabilities.platformName?.toLowerCase() === 'android';
    }

    /**
     * @returns {boolean} true if running on an iOS device/simulator
     */
    static get isIOS() {
        return driver.capabilities.platformName?.toLowerCase() === 'ios';
    }

    /**
     * @returns {boolean} true if running on any mobile platform (Android or iOS)
     */
    static get isMobile() {
        return PlatformHelper.isAndroid || PlatformHelper.isIOS;
    }

    /**
     * @returns {boolean} true if running in a web browser (Chrome, Firefox, etc.)
     */
    static get isWeb() {
        return !PlatformHelper.isMobile;
    }

    /**
     * @returns {string} Current platform name: 'android', 'ios', or 'web'
     */
    static get platformName() {
        if (PlatformHelper.isAndroid) return 'android';
        if (PlatformHelper.isIOS) return 'ios';
        return 'web';
    }

    /**
     * Returns the appropriate selector based on current platform
     * @param {object} selectors - { web: '...', android: '...', ios: '...' }
     * @returns {string} The selector for the current platform
     */
    static selector(selectors) {
        const platform = PlatformHelper.platformName;
        if (selectors[platform]) {
            return selectors[platform];
        }
        // Fallback: mobile → try android/ios, then web
        if (selectors.mobile && PlatformHelper.isMobile) {
            return selectors.mobile;
        }
        throw new Error(`No selector defined for platform: ${platform}`);
    }
}

module.exports = PlatformHelper;
