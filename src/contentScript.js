/* eslint-disable */

window.addEventListener("load", getProductInfo);

browser.runtime.onMessage.addListener((message) => {
  // console.log(JSON.stringify(product));
  // alert("Open the Browser Console.");
  switch (message.type) {
    case "request-product":
      console.log("REQUEST_PRODUCT");
      getProductInfo();
      break;
  }
});

function getProductInfo() {
  const productXpath = "//*[contains(text(),'schema.org')]";

  var productElement = document.evaluate(
    productXpath,
    document.head,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  // If a product schema has been found
  if (productElement) {
    let product;
    try {
      product = JSON.parse(filterNDJSON(productElement.textContent));
    } catch (e) {
      console.log("ERROR: JSON object could not be parsed.");
      console.log(e);
    }
    console.log(product);
    // If an actual product from the schema has been found
    if (product && product.name && product.offers) {
      const productName = product.name;
      const productOffer = product.offers[0] || product.offers;
      const productPrice = productOffer.price;
      console.log(productName + ", " + productPrice);

      //alert(productName + ", " + productPrice);
      sendMessageToBackground("set-product", {
        name: productName,
        price: productPrice,
        url: productOffer.url,
        brand: product.brand.name,
      });
    } else {
      sendMessageToBackground("clear-product");
    }
  } else {
    sendMessageToBackground("clear-product");
  }
}

function sendMessageToBackground(type, content = undefined) {
  browser.runtime.sendMessage({
    type,
    content,
  });
}

function filterNDJSON(ndJSONText) {
  let newText = ndJSONText.replace(/}\n{/g, "},\n{"); // Separates newline-delimited objects with commas
  // newText = newText.replace(/,\s*$/, ""); // Removes comma at the end of string
  console.log(newText);
  return newText;
}
