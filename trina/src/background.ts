let scrapedData = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.materials) {
    scrapedData = request.materials;
  } else if (request.getScrapedData) {
    sendResponse({ materials: scrapedData });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.executeScript(tab.id, { file: "dist/content.js" });
  }
});
