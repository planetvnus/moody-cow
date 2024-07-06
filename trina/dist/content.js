"use strict";
const scrapeProductDetails = () => {
    var _a;
    console.log("scraping");
    const materialDetails = ((_a = document.querySelector("#Composition")) === null || _a === void 0 ? void 0 : _a.innerText) ||
        "No materials found";
    //todo when api deployed
    //   fetch("http://localhost:8000/scrape", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ materials: materialDetails }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log("Success:", data))
    //     .catch((error) => console.error("Error:", error));
    console.log(materialDetails);
};
scrapeProductDetails();
