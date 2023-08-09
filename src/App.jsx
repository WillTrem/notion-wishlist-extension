/*global browser*/
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [product, setProduct] = useState();

  browser.runtime.onMessage.addListener((newProduct) => {
    console.log("PRODUCT RECEIVED: ");
    console.log(newProduct);
    setProduct(newProduct);
  });

  const addWishlistItem = async () => {
    const newItem = {
      parent: {
        type: "database_id",
        database_id: process.env.REACT_APP_NOTION_DATABASE_ID,
      },
      properties: {
        Item: {
          type: "title",
          title: [{ type: "text", text: { content: "Test Item" } }],
        },
        Brand: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Test Brand",
              },
            },
          ],
        },
        Price: {
          type: "number",
          number: 69.69,
        },
        Link: {
          type: "url",
          url: "https://williamtremblay.com",
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
    const options = {
      method: "POST",
      url: "https://notion-wishlist-extension-cors.wt22.workers.dev/createPage",
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        Authorization: `Basic ${btoa(
          process.env.CLOUDFLARE_USERNAME +
            ":" +
            process.env.CLOUDFLARE_PASSWORD
        )}`,
      },
      data: newItem,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="flex flex-col w-20 h-20 border-black border-2 ">
      <span>{product?.name || "No product found"}</span>
      <p>{product?.brand || ""}</p>
      <p>{product?.price || ""}</p>
      <p>{product?.url || ""}</p>
      <button className="bg-green-600" onClick={addWishlistItem}>
        Add Item
      </button>
    </div>
  );
}

export default App;
