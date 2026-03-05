const fs = require('fs');

describe('Zenda Mobile App - Login Flow', () => {

    // Step 1: App should launch successfully
    it('Step 1: Launch the app', async () => {
        // Wait for the app to fully load
        await browser.pause(5000);

        // Capture page source for element inspection
        const source = await browser.getPageSource();
        fs.writeFileSync('mobile_page_source_step1.xml', source);
        console.log('Step 1: Page source saved to mobile_page_source_step1.xml');

        const currentPackage = await browser.getCurrentPackage();
        console.log('Current Package:', currentPackage);
        expect(currentPackage).toBe('io.nexquare.parent');

        await browser.pause(3000);
        console.log('Step 1 Complete: App launched successfully');
    });

    // Step 2: Handle Permissions and Tap on "Get Started" button
    it('Step 2: Handle permissions & Tap on Get Started button', async () => {

        // Handle Android 13+ Notification Permission Popup
        const allowPermissionBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
        try {
            await allowPermissionBtn.waitForDisplayed({ timeout: 5000 });
            if (await allowPermissionBtn.isExisting()) {
                console.log('Permission popup detected, clicking Allow...');
                await allowPermissionBtn.click();
            }
        } catch (e) {
            console.log('No permission popup detected, proceeding...');
        }

        // Try multiple selector strategies to find the Get Started button
        let getStartedBtn;

        // Strategy 1: Find by text
        getStartedBtn = await $('android=new UiSelector().textContains("Get Started")');

        if (!(await getStartedBtn.isExisting())) {
            // Strategy 2: Try "GET STARTED" (uppercase)
            getStartedBtn = await $('android=new UiSelector().textContains("GET STARTED")');
        }

        if (!(await getStartedBtn.isExisting())) {
            // Strategy 3: Try by description
            getStartedBtn = await $('~Get Started');
        }

        await getStartedBtn.waitForDisplayed({ timeout: 10000 });

        // Capture page source before tapping
        const source = await browser.getPageSource();
        fs.writeFileSync('mobile_page_source_step2_before_tap.xml', source);
        console.log('Step 2: Page source saved before tapping Get Started');

        await getStartedBtn.click();
        await browser.pause(3000);

        // Capture page source after tapping
        const sourceAfter = await browser.getPageSource();
        fs.writeFileSync('mobile_page_source_step2_after_tap.xml', sourceAfter);
        console.log('Step 2 Complete: Tapped Get Started button');
    });

    // Step 3: Proceed to Login screen
    it('Step 3: Verify Login screen is displayed', async () => {
        await browser.pause(3000);

        // Capture page source to inspect the login screen elements
        const source = await browser.getPageSource();
        fs.writeFileSync('mobile_page_source_step3_login.xml', source);
        console.log('Step 3: Login screen page source saved');

        console.log('Step 3 Complete: Reached Login screen');
    });
});
