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
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const [tab] = yield chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scrapeProductDetails,
        }, (results) => {
            const materialsDiv = document.getElementById("materials");
            if (materialsDiv && results[0].result) {
                materialsDiv.textContent = results[0].result;
            }
        });
    }
}), { passive: true });
function scrapeProductDetails() {
    var _a;
    console.log("Scraping product details");
    console.log("hi");
    const materialDetails = ((_a = document.querySelector(".material-details")) === null || _a === void 0 ? void 0 : _a.innerText) ||
        "No materials found";
    return materialDetails;
}
