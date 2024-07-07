const scrapeProductDetails = () => {
  const element = document.querySelector(".StyleContent");
  // set style to display: block;
  element?.setAttribute("style", "display: block;");

  // Check if the element exists
  if (element) {
    // Get all child elements and convert HTMLCollection to an array using spread operator
    const childrenArray = [...element.children];
    console.log(childrenArray.length, "childrenArray");

    // Iterate over the array and log the innerText of each child
    childrenArray.forEach((child, index) => {
      console.log(`Child ${index + 1}:`, child);
      console.log(
        `Child ${index + 1} innerText:`,
        (child as HTMLElement).innerText
      );
    });
    const materialDetails = childrenArray || "No materials";
    chrome.runtime.sendMessage({ materials: materialDetails });
  } else {
    console.log("Parent element not found");
  }

  // Send the scraped details to the background script
};

const waitForElementToLoad = (
  selector: string,
  className: string
): Promise<Element> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element && element.classList.contains(className)) {
      console.log(element, "its loaded");
      resolve(element);
    } else {
      console.log("observer");
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.target instanceof Element
          ) {
            const target = mutation.target as HTMLElement;
            if (
              target.matches(selector) &&
              target.classList.contains(className)
            ) {
              observer.disconnect();
              resolve(target);
            }
          }
        });
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  });
};

// Wait for the element with class "StyleContent loaded" to be loaded
waitForElementToLoad(".StyleContent", "loaded").then(() => {
  scrapeProductDetails();
});
