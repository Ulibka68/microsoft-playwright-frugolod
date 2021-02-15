const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to https://frugolod.ru/
    await page.goto('https://frugolod.ru/preprice');

/*    // Click text="Узнать цену"
    await Promise.all([
        page.waitForNavigation(/!*{ url: 'https://frugolod.ru/preprice' }*!/),
        page.click('text="Узнать цену"')
    ]);*/


    /*
    // Click text=/.*Загрузить еще.*!/
    await page.click('text=/.*Загрузить еще.*!/');

    // Click text=/.*Загрузить еще.*!/
    await page.click('text=/.*Загрузить еще.*!/');

    // Click text=/.*Загрузить еще.*!/
    await page.click('text=/.*Загрузить еще.*!/');

    // Click text=/.*Загрузить еще.*!/
    await page.click('text=/.*Загрузить еще.*!/');

    // Click text=/.*Загрузить еще.*!/
    await page.click('text=/.*Загрузить еще.*!/');

*/
    // Close page
    // await page.close();
    //
    // // ---------------------
    // await context.close();
    // await browser.close();

    // <div class="js-store-prod-namclassNameproduct-name t-store__card__title t-name t-name_xs" style="font-weight:700;"
    //      field="st_title__221159607854" data-redactor-toolbar="no">Кешью сырой</div>
    console.log('start query')
    const text = await page.textContent('.js-store-prod-name');
    const text1 = await page.innerHTML('.js-store-prod-descr');
    const text2 = await page.textContent('.js-product-price');
    const text3 = await page.textContent('.js-store-prod-sold-out');
    const text4 = await page.textContent('.js-product');
    const text5 = await page.innerHTML('.js-product');
    console.log(text)
    console.log(text1)
    console.log(text2)
    console.log(text3)
    // console.log(text4)
    // console.log(typeof text5)
    // console.log(text5)
    const bodyHandle = await page.$('body');
    console.log(typeof bodyHandle)
    console.log( bodyHandle)

    // const html = await page.evaluate(([body, suffix]) => body.innerHTML + suffix, [bodyHandle, 'hello']);
    // await bodyHandle.dispose();
})();

