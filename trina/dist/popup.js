"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Request the scraped data from the background script
    chrome.runtime.sendMessage({ getScrapedData: true }, (response) => {
        const materialsDiv = document.getElementById("materials");
        if (materialsDiv && response.materials) {
            materialsDiv.textContent = response.materials;
        }
    });
});
