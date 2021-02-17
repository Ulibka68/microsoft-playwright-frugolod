import { chromium } from "playwright";
import { Page } from "playwright";
import * as pathUtils from "path";
import * as fs from "fs";
// import { promisify } from "util";

async function mDelay(msDelay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, msDelay);
  });
}

type OneGood = {
  imgs: Array<string>;
  prodName: string;
  prodDescription: string;
};

async function parceOnePageItem(page: Page, newUrl: string): Promise<OneGood> {
  await page.goto(newUrl);
  mDelay(1500);

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
  parceResultItem.URL = newUrl;
  return parceResultItem;
}

export const mainFunc = async (): Promise<void> => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  await page.goto("https://frugolod.ru/preprice");
  await page.innerText("div.js-product");

  // Click text=/.*Загрузить еще.*!/
  for (let i = 1; i <= 5; i++) {
    await page.click(
      "div.t-store__load-more-btn-wrap.t-align_center > div > table"
    );
  }

  console.log("start1");
  await mDelay(2000);
  console.log("start2");

  console.log("start query");

  const parceResult: Array<any> = await page.$$eval(
    "div.js-store-grid-cont div.js-product",
    (divs: Array<HTMLDivElement>) => {
      const funcInner = (div: HTMLDivElement) => {
        const resultSet: any = {};
        // console.log(div);
        // console.log(div.dataset);

        resultSet.productUid = div.dataset.productUid;
        resultSet.productUrl = div.dataset.productUrl;
        resultSet.productImg = div.dataset.productImg;

        const newD: HTMLDivElement = div.querySelector(
          ".t-store__card__mark-wrapper .t-store__card__mark"
        );

        resultSet.New = !!newD; // либо New либо пусто

        resultSet.prodName = div.querySelector(
          ".t-store__card__textwrapper .js-store-prod-name"
        ).textContent;

        resultSet.prodDescr = (div.querySelector(".js-store-prod-descr")
          .innerHTML as string).trim();

        resultSet.prodPrice = parseInt(
          div.querySelector(".js-product-price").textContent
        );

        resultSet.prodSoldOut = !!div.querySelector(".js-store-prod-sold-out");

        return resultSet;
      };

      console.log("Всего найдено : ", divs.length);
      const mainResult = [];
      let i = 0;
      divs.forEach((div) => {
        console.log(++i);
        if (i < 100) {
          mainResult.push(funcInner(div));
        }
      });
      // const res = funcInner(divs[0]);
      return mainResult;
    }
  );
  //
  //
  //
  console.log(parceResult);
  const dataDir = pathUtils.resolve(__dirname, "..", "data");
  console.log(dataDir);

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(dataDir + "/main.json", JSON.stringify(parceResult));

  // return;

  console.log("----------------------");
  console.log("----------------------");
  console.log("----------------------");
  //
  const oneProdArray: Array<OneGood> = [];
  //

  for (let i = 0; i < parceResult.length; i++) {
    const oneGood = await parceOnePageItem(page, parceResult[i].productUrl);
    oneProdArray.push(oneGood);
  }

  console.log(oneProdArray);
  fs.writeFileSync(dataDir + "/child.json", JSON.stringify(oneProdArray));
};

mainFunc();
