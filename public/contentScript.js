/* eslint-disable */

window.addEventListener("load", getProductInfo);

function getProductInfo() {
  const productXpath =
    '//*[contains(text(),\'"@context": "http://schema.org/"\')]';

  var productElement = document.evaluate(
    productXpath,
    document.head,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  const product = JSON.parse(productElement.textContent);
  console.log(product);
  const productName = product.name;
  const productOffer = product.offers || product.offers[0];
  const productPrice = productOffer.price;
  console.log(productName + ", " + productPrice);

  alert(productName + ", " + productPrice);
  browser.runtime.sendMessage({
    name: productName,
    price: productPrice,
    url: productOffer.url,
    brand: product.brand.name,
  });
}
