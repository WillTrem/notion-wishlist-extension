// Setting environment variables
browser.storage.local.set({
  NOTION_DATABASE_ID: "39d58288362f4f8bb6029dad2eff4900",
  CLOUDFLARE_AUTH: btoa("wt22@videotron.ca:CLWTplatine22$"),
});

browser.runtime.onMessage.addListener((message) => {
  // console.log(JSON.stringify(product));
  // alert("Open the Browser Console.");
  switch (message.type) {
    case "set-product":
      browser.storage.local.set({ product: JSON.stringify(message.content) });
      break;
    case "clear-product":
      browser.storage.local.remove("product");
      break;
  }
});

// browser.tabs.onUpdated.addListener(requestProductInfo);
browser.tabs.onActivated.addListener(requestProductInfo);

function requestProductInfo() {
  browser.tabs.query({ active: true }).then((tabs) => {
    const currentTab = tabs[0];
    browser.tabs.sendMessage(currentTab.id, { type: "request-product" });
  });
}
