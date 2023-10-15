import { showConfirmationMenu } from "./popup.js";
let env = undefined;
browser.storage.local.onChanged.addListener((changes, areaName) => {
  console.log(changes);
  if (
    areaName === "local" &&
    changes.NOTION_DATABASE_ID &&
    changes.NOTION_KEY
  ) {
    env = {
      NOTION_KEY: changes.NOTION_KEY,
      NOTION_DATABASE_ID: changes.NOTION_DATABASE_ID,
    };
  }
});

const addWishlistItem = async (product) => {
  const env = await browser.storage.local.get([
    "NOTION_DATABASE_ID",
    "CLOUDFLARE_AUTH",
  ]);

  const NOTION_DATABASE_ID = env["NOTION_DATABASE_ID"];
  const CLOUDFLARE_AUTH = env["CLOUDFLARE_AUTH"];

  const newItem = {
    parent: {
      type: "database_id",
      database_id: NOTION_DATABASE_ID,
    },
    properties: {
      Item: {
        type: "title",
        title: [{ type: "text", text: { content: product.name } }],
      },
      Brand: {
        rich_text: [
          {
            type: "text",
            text: {
              content: product.brand,
            },
          },
        ],
      },
      Price: {
        type: "number",
        number: product.price,
      },
      Link: {
        type: "url",
        url: product.url,
      },
      Priority: {
        type: "checkbox",
        checkbox: true,
      },
      Model: {
        type: "rich_text",
        rich_text: [
          {
            text: {
              content: "Test",
            },
          },
        ],
      },
      Color: {
        select: {
          name: "Red",
        },
      },
      // Size: {
      //   select: {
      //     name: "Red",
      //   },
      // },
      // "Date Added": {
      //   type: "created_time",
      // },
      Details: {
        rich_text: [
          {
            text: {
              content: "Test details",
            },
          },
        ],
      },
      Category: {
        relation: [],
      },
      Tags: {
        multi_select: [{ name: "test_tag_1" }, { name: "test_tag_2" }],
      },
    },
  };
  const url =
    "https://notion-wishlist-extension-cors.wt22.workers.dev/createPage";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Basic ${CLOUDFLARE_AUTH}`,
    },
    body: JSON.stringify(newItem),
  };
  browser;
  fetch(url, options)
    .then(function (response) {
      showConfirmationMenu();
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export { addWishlistItem };
