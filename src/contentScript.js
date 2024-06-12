/* eslint-disable */

window.addEventListener("load", getProductInfo);

// TODO: Execute getProductInfo whenever the url changes

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

// For shopify type websites (following schema.org conventions)
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
    let productMatch;
    try {
      productMatch = JSON.parse(filterNDJSON(productElement.textContent));
    } catch (e) {
      console.log("ERROR: JSON object could not be parsed.");
      console.log(e);
    }
    console.log(productMatch);

    // If no product has been found
    if(!productMatch){
      sendMessageToBackground("clear-product");
    }
    // If a product has been found and its data is structured in an '@graph' array (schema.org)
    else if (productMatch['@graph'] && Array.isArray(productMatch['@graph'])){
      const pageElements = productMatch['@graph'];
      const productElement = pageElements.find((e) => e['@type']==='Product');
      const webSiteElement = pageElements.find((e) => e['@type']==='WebSite');
      if(productElement){
        console.log(productElement);
        const product = extractDataFromProductObject(productElement, webSiteElement?.name);
        sendMessageToBackground("set-product", product)
      }
      else{
        sendMessageToBackground("clear-product");
      }
    }
    // If a product has been found and the product is directly an '@type'='Product' object (schema.org)
    else if(productMatch['@type'] && productMatch['@type']==='Product'){
      if (productMatch && productMatch.name && productMatch.offers) {
        const product = extractDataFromProductObject(productMatch);
        sendMessageToBackground("set-product", product);
      } 
    } else {
      sendMessageToBackground("clear-product");
    }
    }
    else {
      sendMessageToBackground("clear-product");
    }
}

function extractDataFromProductObject(productObject, brand = ''){
  const productName = productObject.name;
  const productOffer = productObject.offers[0] || productObject.offers;
  const productURL = window.location.href;
  const productPrice = productOffer.priceSpecification?.price || productOffer.price;
  const productBrand = productObject?.brand?.name || brand;

  console.log(productName + ", " + productPrice);

  return {
    name: productName,
    price: productPrice,
    url: productURL,
    brand: productBrand,
  }
}

function sendMessageToBackground(type, content = undefined) {
  console.log(content);
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
