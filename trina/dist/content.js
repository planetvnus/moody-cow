"use strict";
const scrapeProductDetails = () => {
    var _a;
    const materialDetails = ((_a = document.querySelector(".material-details")) === null || _a === void 0 ? void 0 : _a.innerText) ||
        "No materials found";
    fetch("http://localhost:8000/scrape", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ materials: materialDetails }),
    })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
};
scrapeProductDetails();
