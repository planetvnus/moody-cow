"use strict";
// Function to check if all child elements have content
const areAllChildrenPopulated = (children) => {
    return Array.from(children).every((child) => child.innerText.trim() !== "");
};
// Function to log innerText of all children of .StyleContent
const logChildrenInnerText = () => {
    // Select the parent element
    const element = document.querySelector(".StyleContent.loaded");
    // Check if the element exists and is visible
    if (element) {
        console.log("Parent element found:", element);
        // Get all child elements
        const children = element.children;
        // Check if all child elements are present and populated
        if (children.length === 3 && areAllChildrenPopulated(children)) {
            console.log(`Found ${children.length} children`);
            // Iterate over the array and log the innerText of each child
            Array.from(children).forEach((child, index) => {
                console.log(`Child ${index + 1}:`, child);
                console.log(`Child ${index + 1} innerText:`, child.innerText);
            });
            // Disconnect the observer since we have what we need
            observer.disconnect();
            const materialDetails = {
                composition: children[2].innerText,
                material: children[1].innerText,
                style: children[0].innerText,
            };
            chrome.runtime.sendMessage({ materials: materialDetails });
        }
    }
    else {
        console.log("Parent element not found or not visible");
    }
};
// Observe changes to the DOM
const observer = new MutationObserver(logChildrenInnerText);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
});
// Initial check in case the content is already loaded
document.addEventListener("DOMContentLoaded", logChildrenInnerText);
