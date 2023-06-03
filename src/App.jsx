import { Client } from "@notionhq/client";
import axios from "axios";

function App() {
  // const notion = new Client({ auth: process.env.NOTION_KEY });
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

    // let response;
    // try {
    //   response = await notion.pages.create();
    // } catch (error) {
    //   console.error(error.body);
    // }
    // console.log(response);
  };
  return (
    <div className="flex flex-col w-20 h-20 bg-black ">
      <span>Hello There</span>
      <button className="bg-white" onClick={addWishlistItem}>
        Test
      </button>
    </div>
  );
}

export default App;
