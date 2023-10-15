import { addWishlistItem } from "./notionHelper.js";

let product = undefined;
const addItemButton = document.getElementById("addItemBtn");
const productInfoDiv = document.getElementById("productInfo");
const productFoundDiv = document.getElementById("productFound");
const noProductDiv = document.getElementById("noProduct");
const productAddedSpan = document.getElementById("productAdded");
const errorMessageSpan = document.getElementById("errorMessage");

addItemButton.addEventListener("click", () => {
  if (product) {
    errorMessageSpan.style.display = "none";
    addWishlistItem(product);
    // product = undefined;
  }
});

browser.storage.local.get("product").then((result) => {
  product = JSON.parse(result.product);
  if (product) {
    console.log(product);
    productInfoDiv.innerHTML = formatProductToHTML(product);
    productFoundDiv.style.display = "flex";
    noProductDiv.style.display = "none";
  } else {
    productFoundDiv.style.display = "none";
    noProductDiv.style.display = "inline-block";
  }
});

const formatProductToHTML = (product) => {
  const html = `
  <span>${product.name}</span>
  <span>${product.brand}</span>
  <span>${product.price}</span>
  `;

  return html;
};

const showConfirmationMenu = () => {
  productAddedSpan.style.display = "inline-block";
};

const displayErrorMessage = (message) => {
  errorMessageSpan.innerText = message;
  errorMessageSpan.style.display = "inline-block";
};

export { showConfirmationMenu, displayErrorMessage };
