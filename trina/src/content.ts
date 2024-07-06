const scrapeProductDetails = () => {
  const materialDetails =
    (document.querySelector(".material-details") as HTMLElement)?.innerText ||
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
