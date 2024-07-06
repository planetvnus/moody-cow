"use strict";
// document.addEventListener(
//   "DOMContentLoaded",
//   async () => {
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true,
//     });
//     if (tab.id) {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tab.id },
//           func: scrapeProductDetails,
//         },
//         (results) => {
//           const materialsDiv = document.getElementById("materials");
//           if (materialsDiv && results[0].result) {
//             materialsDiv.textContent = results[0].result;
//           }
//         }
//       );
//     }
//   },
//   { passive: true }
// );
// function scrapeProductDetails() {
//   console.log("Scraping product details");
//   console.log("hi");
//   const materialDetails =
//     (document.querySelector(".material-details") as HTMLElement)?.innerText ||
//     "No materials found";
//   return materialDetails;
// }
