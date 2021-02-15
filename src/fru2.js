"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.mainFunc = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var chromium = require("playwright").chromium;
var mainFunc = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, parceResultItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chromium.launch({
                    headless: false
                })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _a.sent();
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
                return [4 /*yield*/, page.goto("https://frugolod.ru/testhtml/tproduct/227213205-340652234845-tomati")];
            case 4:
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
                _a.sent();
                return [4 /*yield*/, page.$eval("div.t-container", function (div) {
                        var resultSet = {};
                        var tempImgs = new Set();
                        var a = div.querySelectorAll("div.t-store__prod-popup__slider div.t-slds__imgwrapper ");
                        a.forEach(function (val) {
                            tempImgs.add(val.dataset.imgZoomUrl);
                        });
                        console.log(tempImgs);
                        resultSet.imgs = Array.from(tempImgs);
                        resultSet.prodName = div.querySelector(".js-store-prod-name").textContent;
                        resultSet.prodDescription = div.querySelector(".js-store-prod-text").innerHTML;
                        return resultSet;
                    })];
            case 5:
                parceResultItem = _a.sent();
                console.log("----------------------");
                console.log(parceResultItem);
                return [2 /*return*/];
        }
    });
}); };
exports.mainFunc = mainFunc;
exports.mainFunc();
