const scrapeProductDetails = () => {
  console.log("im here");
  const compositionElement = document.getElementById("Composition");
  console.log(document.getElementById("Composition"), "wtf");
  console.log(document.querySelector(".StyleContent"), "wtf2");

  console.log(compositionElement?.textContent, "compositionelement");
  const materialDetails = compositionElement
    ? compositionElement.textContent
    : "No materials found";

  // Send the scraped details to the background script
  chrome.runtime.sendMessage({ materials: materialDetails });
};

const waitForElementToLoad = (
  selector: string,
  className: string
): Promise<Element> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    console.log(element, "elementinwait");
    if (element && element.classList.contains(className)) {
      console.log(element, "element2");
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
