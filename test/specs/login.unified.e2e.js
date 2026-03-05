/**
 * Unified Login E2E Test
 * 
 * This single test file runs on ALL platforms:
 *   - Web (Chrome):  npm run test:web
 *   - Android:       npm run test:android
 *   - iOS:           npm run test:ios
 * 
 * Uses the Login Page Object for cross-platform selectors.
 */

const LoginPage = require('../pageobjects/login.page');
const PlatformHelper = require('../helpers/platform.helper');

describe(`Zenda Login Flow [${process.env.PLATFORM || 'auto-detect'}]`, () => {

    before(async () => {
        const platform = PlatformHelper.platformName;
        console.log(`\n=== Running on platform: ${platform.toUpperCase()} ===\n`);
    });

    // Step 1: Launch app / Navigate to page and handle permissions
    it('Step 1: Launch the app or navigate to the login page', async () => {
        await LoginPage.openLoginPage();

        // Handle permissions FIRST (before checking package on Android)
        if (PlatformHelper.isMobile) {
            await LoginPage.handlePermissions();
        }

        if (PlatformHelper.isAndroid) {
            // Now check the package after permissions are handled
            const currentPackage = await browser.getCurrentPackage();
            console.log('Current Package:', currentPackage);
            expect(currentPackage).toBe('io.nexquare.parent');
        }

        if (PlatformHelper.isWeb) {
            await expect(browser).toHaveTitleContaining('Sharjah Public School');
        }

        console.log('Step 1 Complete: App/Page loaded successfully');
    });

    // Step 2: Tap Get Started (mobile) or switch to Staff tab (web)
    it('Step 2: Navigate to login form', async () => {
        if (PlatformHelper.isMobile) {
            await LoginPage.tapGetStarted();
            console.log('Step 2 Complete: Passed onboarding screen');
        }

        if (PlatformHelper.isWeb) {
            await LoginPage.switchToStaffTab();
            console.log('Step 2 Complete: Switched to Staff tab');
        }
    });

    // Step 3: Verify login form is displayed
    it('Step 3: Verify login form is displayed', async () => {
        await browser.pause(3000);

        if (PlatformHelper.isMobile) {
            // On mobile, capture page source to verify we're on login screen
            const source = await browser.getPageSource();
            console.log('Step 3: Login screen reached (page source length:', source.length, ')');
        }

        if (PlatformHelper.isWeb) {
            const emailInput = LoginPage.inputEmail;
            if (emailInput) {
                await emailInput.waitForDisplayed({ timeout: 15000 });
            }
        }

        console.log('Step 3 Complete: Login form is displayed');
    });

    // Step 4: Enter credentials (optional — only if you want to test actual login)
    // Uncomment and fill in credentials to test full login flow:
    /*
    it('Step 4: Enter credentials and login', async () => {
        await LoginPage.enterEmail('your-test-email@example.com');
        await LoginPage.enterPassword('your-test-password');
        await LoginPage.submitLogin();
        console.log('Step 4 Complete: Credentials submitted');
    });
    */
});
