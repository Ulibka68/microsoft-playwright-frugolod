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
var playwright_1 = require("playwright");
var pathUtils = require("path");
var fs = require("fs");
// import { promisify } from "util";
function mDelay(msDelay) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, msDelay);
                })];
        });
    });
}
function parceOnePageItem(page, newUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var parceResultItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto(newUrl)];
                case 1:
                    _a.sent();
                    mDelay(1500);
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
                case 2:
                    parceResultItem = _a.sent();
                    parceResultItem.URL = newUrl;
                    return [2 /*return*/, parceResultItem];
            }
        });
    });
}
var mainFunc = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, i, parceResult, dataDir, oneProdArray, i, oneGood;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({
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
                return [4 /*yield*/, page.goto("https://frugolod.ru/preprice")];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.innerText("div.js-product")];
            case 5:
                _a.sent();
                i = 1;
                _a.label = 6;
            case 6:
                if (!(i <= 5)) return [3 /*break*/, 9];
                return [4 /*yield*/, page.click("div.t-store__load-more-btn-wrap.t-align_center > div > table")];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9:
                console.log("start1");
                return [4 /*yield*/, mDelay(2000)];
            case 10:
                _a.sent();
                console.log("start2");
                console.log("start query");
                return [4 /*yield*/, page.$$eval("div.js-store-grid-cont div.js-product", function (divs) {
                        var funcInner = function (div) {
                            var resultSet = {};
                            // console.log(div);
                            // console.log(div.dataset);
                            resultSet.productUid = div.dataset.productUid;
                            resultSet.productUrl = div.dataset.productUrl;
                            resultSet.productImg = div.dataset.productImg;
                            var newD = div.querySelector(".t-store__card__mark-wrapper .t-store__card__mark");
                            resultSet.New = !!newD; // либо New либо пусто
                            resultSet.prodName = div.querySelector(".t-store__card__textwrapper .js-store-prod-name").textContent;
                            resultSet.prodDescr = div.querySelector(".js-store-prod-descr")
                                .innerHTML.trim();
                            resultSet.prodPrice = parseInt(div.querySelector(".js-product-price").textContent);
                            resultSet.prodSoldOut = !!div.querySelector(".js-store-prod-sold-out");
                            return resultSet;
                        };
                        console.log("Всего найдено : ", divs.length);
                        var mainResult = [];
                        var i = 0;
                        divs.forEach(function (div) {
                            console.log(++i);
                            if (i < 100) {
                                mainResult.push(funcInner(div));
                            }
                        });
                        // const res = funcInner(divs[0]);
                        return mainResult;
                    })];
            case 11:
                parceResult = _a.sent();
                dataDir = pathUtils.resolve(__dirname, "..", "data");
                console.log(dataDir);
                if (!fs.existsSync(dataDir))
                    fs.mkdirSync(dataDir);
                fs.writeFileSync(dataDir + "/main.json", JSON.stringify(parceResult));
                // return;
                console.log("----------------------");
                console.log("----------------------");
                console.log("----------------------");
                oneProdArray = [];
                i = 0;
                _a.label = 12;
            case 12:
                if (!(i < parceResult.length)) return [3 /*break*/, 15];
                return [4 /*yield*/, parceOnePageItem(page, parceResult[i].productUrl)];
            case 13:
                oneGood = _a.sent();
                oneProdArray.push(oneGood);
                _a.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 12];
            case 15:
                // console.log(oneProdArray);
                fs.writeFileSync(dataDir + "/child.json", JSON.stringify(oneProdArray));
                return [2 /*return*/];
        }
    });
}); };
exports.mainFunc = mainFunc;
exports.mainFunc();
