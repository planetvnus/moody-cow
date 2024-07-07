(function () {
  // The element you took from the VS page
  // NOTE: this returns null (which in javascript is falsy if it cant find "Composition")
  const details = document.getElementById("Composition");

  if (details) {
    chrome.storage.local.set({ materialText: details.innerText });
  } else {
    chrome.storage.local.set({ materialText: "Could not find materials."})
  }
})();