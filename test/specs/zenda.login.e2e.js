describe('Zenda Login Automation', () => {

    // Step 1: Land on https://sps1.zenda.com/
    it('Step 1: Land on Zenda Login Page', async () => {
        await browser.url('https://sps1.zenda.com');
        await expect(browser).toHaveTitleContaining('Sharjah Public School');
        await browser.pause(3000);
        console.log('Step 1 Complete: Landed on page');
    });

    // Step 2: Switch to Staff tab from Guardian
    it('Step 2: Switch to Staff Tab', async () => {
        const staffTab = await $('#staffTabLink');

        // Wait for it to be clickable
        await staffTab.waitForClickable();
        await staffTab.click();

        // Verify the switch happened (Staff tab content visible)
        const staffLoginBox = await $('#staffTab');
        await expect(staffLoginBox).toBeDisplayed();
        await browser.pause(3000);
        console.log('Step 2 Complete: Switched to Staff tag');
    });

    // Step 3: Click on Username field
    it('Step 3: Click on Username Field', async () => {
        const usernameInput = await $('#txtuser');

        // Wait for it to be interactable
        await usernameInput.waitForDisplayed();
        await usernameInput.click();

        // Verify it has focus
        await expect(usernameInput).toBeFocused();
        await browser.pause(3000);
        console.log('Step 3 Complete: Clicked Username field');
    });
});
