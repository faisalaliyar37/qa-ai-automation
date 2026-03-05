describe('My Web App', () => {
    it('should have the correct title', async () => {
        await browser.url('https://webdriver.io');
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
    });

    it('should be able to search', async () => {
        await browser.url('https://webdriver.io');
        const searchInput = await $('.DocSearch-Button');
        await searchInput.click();

        const searchBox = await $('.DocSearch-Input');
        await searchBox.setValue('click');

        // Wait for results
        const results = await $('.DocSearch-Hit');
        await results.waitForExist();

        await expect(results).toExist();
    });
});
