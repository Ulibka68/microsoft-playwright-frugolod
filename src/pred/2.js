const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to https://www.wikipedia.org/
    await page.goto('https://www.wikipedia.org/');

    // Click text="Русский"
    await page.click('text="Русский"');
    // assert.equal(page.url(), 'https://ru.wikipedia.org/wiki/Заглавная_страница');

    // Click text="Случайная статья"
    await page.click('text="Случайная статья"');
    // assert.equal(page.url(), 'https://ru.wikipedia.org/wiki/Кедрова,_Анна_Генриховна');

    // Close page
    // await page.close();

    // ---------------------
    // await context.close();
    // await browser.close();
})();
