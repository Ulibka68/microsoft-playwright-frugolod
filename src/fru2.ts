// eslint-disable-next-line @typescript-eslint/no-var-requires
const { chromium } = require("playwright");

export const mainFunc = async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  /*
  await page.goto("https://frugolod.ru/preprice");

  console.log("start query");

  const parceResult = await page.$$eval(
    "div.js-product",
    (divs: Array<HTMLDivElement>) => {
      const funcInner = (div: HTMLDivElement) => {
        const resultSet: any = {};

        resultSet.productUid = div.dataset.productUid;
        resultSet.productUrl = div.dataset.productUrl;
        resultSet.productImg = div.dataset.productImg;

        // const img: HTMLDivElement = div.querySelector(".js-product-img");
        // console.log(img.dataset["original"]);

        const newD: HTMLDivElement = div.querySelector(
          ".t-store__card__mark-wrapper .t-store__card__mark"
        );

        resultSet.New = !!newD?.textContent; // либо New либо пусто

        const prodName: HTMLDivElement = div.querySelector(
          ".t-store__card__textwrapper .js-store-prod-name"
        );
        resultSet.prodName = prodName.textContent;

        const prodDescr: HTMLDivElement = div.querySelector(
          ".js-store-prod-descr"
        );
        resultSet.prodDescr = (prodDescr.innerHTML as string).trim();

        const prodPrice: HTMLDivElement = div.querySelector(
          ".js-product-price"
        );
        resultSet.prodPrice = parseInt(prodPrice.textContent);

        const prodSoldOut: HTMLDivElement = div.querySelector(
          ".js-store-prod-sold-out"
        );
        resultSet.prodSoldOut = !!prodSoldOut;

        return resultSet;
      };

      console.log("Всего найдено : ", divs.length);
      // divs.forEach((div) => {
      const res = funcInner(divs[0]);
      return res;
    }
  );
  console.log(parceResult);
  */

  // await page.goto(parceResult.productUrl);
  await page.goto(
    "https://frugolod.ru/testhtml/tproduct/227213205-340652234845-tomati"
  );

  const parceResultItem = await page.$eval(
    "div.t-container",
    (div: HTMLDivElement) => {
      const resultSet: any = {};

      const tempImgs = new Set<string>();

      const a: NodeListOf<HTMLDivElement> = div.querySelectorAll(
        "div.t-store__prod-popup__slider div.t-slds__imgwrapper "
      );
      a.forEach((val) => {
        tempImgs.add(val.dataset.imgZoomUrl);
      });
      console.log(tempImgs);
      resultSet.imgs = Array.from(tempImgs);

      resultSet.prodName = div.querySelector(".js-store-prod-name").textContent;
      resultSet.prodDescription = div.querySelector(
        ".js-store-prod-text"
      ).innerHTML;

      return resultSet;
    }
  );
  console.log("----------------------");
  console.log(parceResultItem);
};

mainFunc();
