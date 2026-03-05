/**
 * Login Page Object
 * 
 * Cross-platform Page Object for the Zenda login flow.
 * Works on Web (Chrome), Android, and iOS using platform-aware selectors.
 * 
 * Web:     Targets https://sps1.zenda.com/ (Staff login)
 * Android: Targets io.nexquare.parent app (Get Started → Login)
 * iOS:     Targets io.nexquare.parent app (Get Started → Login)
 */

const BasePage = require('./base.page');

class LoginPage extends BasePage {

    // ========================
    // ELEMENT SELECTORS
    // ========================

    /**
     * "Get Started" button (mobile only)
     */
    get btnGetStarted() {
        if (this.isAndroid) {
            return $('android=new UiSelector().textContains("Get started")');
        }
        if (this.isIOS) {
            return $('-ios predicate string:label CONTAINS "Get started"');
        }
        // Web: not applicable
        return null;
    }

    /**
     * Android notification permission "Allow" button
     */
    get btnAllowPermission() {
        if (this.isAndroid) {
            return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
        }
        // iOS handles permissions differently (via capability or alert handler)
        return null;
    }

    /**
     * Staff tab link (web only)
     */
    get tabStaff() {
        if (this.isWeb) {
            return $('#staffTabLink');
        }
        return null;
    }

    /**
     * Staff tab content container (web only)
     */
    get staffTabContent() {
        if (this.isWeb) {
            return $('#staffTab');
        }
        return null;
    }

    /**
     * Username / Email input field
     */
    get inputEmail() {
        if (this.isWeb) {
            return $('#txtuser');
        }
        if (this.isAndroid) {
            // Try accessibility ID first, fallback strategies in methods
            return $('~emailInput');
        }
        if (this.isIOS) {
            return $('~emailInput');
        }
        return null;
    }

    /**
     * Password input field
     */
    get inputPassword() {
        if (this.isWeb) {
            return $('#txtpassword');
        }
        if (this.isAndroid) {
            return $('~passwordInput');
        }
        if (this.isIOS) {
            return $('~passwordInput');
        }
        return null;
    }

    /**
     * Login / Sign-in button
     */
    get btnLogin() {
        if (this.isWeb) {
            return $('#btnLogin');
        }
        if (this.isAndroid) {
            return $('android=new UiSelector().textContains("Login")');
        }
        if (this.isIOS) {
            return $('-ios predicate string:label CONTAINS "Login"');
        }
        return null;
    }

    // ========================
    // PAGE ACTIONS
    // ========================

    /**
     * Open the login page (web only)
     */
    async openLoginPage() {
        if (this.isWeb) {
            await this.open('https://sps1.zenda.com');
            await this.waitForPageLoad();
            console.log('[Web] Navigated to Zenda login page');
        } else {
            // Mobile: app launches automatically via Appium capabilities
            await browser.pause(5000);
            console.log(`[${this.platformName}] App launched`);
        }
    }

    /**
     * Handle OS-level permission dialogs (mobile only)
     */
    async handlePermissions() {
        if (!this.isMobile) return;

        if (this.isAndroid) {
            try {
                const allowBtn = this.btnAllowPermission;
                await allowBtn.waitForDisplayed({ timeout: 5000 });
                if (await allowBtn.isExisting()) {
                    console.log('[Android] Permission popup detected, clicking Allow...');
                    await allowBtn.click();
                }
            } catch (e) {
                console.log('[Android] No permission popup detected, proceeding...');
            }
        }

        if (this.isIOS) {
            // iOS: Permissions are typically handled via Appium capabilities:
            // 'appium:autoAcceptAlerts': true
            console.log('[iOS] Permissions handled via capabilities');
        }
    }

    /**
     * Tap the "Get Started" button (mobile only)
     */
    async tapGetStarted() {
        if (!this.isMobile) return;

        let btn = this.btnGetStarted;

        // Android fallback: try uppercase text
        if (this.isAndroid && !(await btn.isExisting())) {
            btn = await $('android=new UiSelector().textContains("GET STARTED")');
        }

        // Android fallback: try accessibility ID
        if (this.isAndroid && !(await btn.isExisting())) {
            btn = await $('~Get started');
        }

        await btn.waitForDisplayed({ timeout: 10000 });
        await btn.click();
        await browser.pause(3000);
        console.log(`[${this.platformName}] Tapped "Get Started"`);
    }

    /**
     * Switch to Staff tab (web only)
     */
    async switchToStaffTab() {
        if (!this.isWeb) return;

        const staffTab = this.tabStaff;
        await staffTab.waitForClickable();
        await staffTab.click();

        const staffContent = this.staffTabContent;
        await expect(staffContent).toBeDisplayed();
        console.log('[Web] Switched to Staff tab');
    }

    /**
     * Enter email/username
     * @param {string} email
     */
    async enterEmail(email) {
        const input = this.inputEmail;
        if (!input) {
            console.log(`[${this.platformName}] Email input not available`);
            return;
        }
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(email);
        console.log(`[${this.platformName}] Entered email: ${email}`);
    }

    /**
     * Enter password
     * @param {string} password
     */
    async enterPassword(password) {
        const input = this.inputPassword;
        if (!input) {
            console.log(`[${this.platformName}] Password input not available`);
            return;
        }
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(password);
        console.log(`[${this.platformName}] Entered password`);
    }

    /**
     * Click/tap the login button
     */
    async submitLogin() {
        const btn = this.btnLogin;
        if (!btn) {
            console.log(`[${this.platformName}] Login button not available`);
            return;
        }
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
        console.log(`[${this.platformName}] Submitted login`);
    }

    /**
     * Full login flow — works on all platforms
     * @param {string} email
     * @param {string} password
     */
    async performLogin(email, password) {
        await this.openLoginPage();
        await this.handlePermissions();

        if (this.isMobile) {
            await this.tapGetStarted();
        }

        if (this.isWeb) {
            await this.switchToStaffTab();
        }

        await this.enterEmail(email);
        if (password) {
            await this.enterPassword(password);
            await this.submitLogin();
        }
    }
}

module.exports = new LoginPage();
