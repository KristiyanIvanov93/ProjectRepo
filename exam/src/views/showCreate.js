import { createItem } from "../data/Items.js";
import { createSubmitHandler } from "../data/util.js";
import { html, page, render } from "../lib.js";
import { showError } from "../data/errors.js";

const createTemp = (onCreate) => html`
        <section id="create">
          <div class="form form-item">
            <h2>Share Your item</h2>
            <form class="create-form" @submit=${onCreate}>
              <input type="text" name="item" id="item" placeholder="Item" />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export function showCreate(ctx) {
    render(createTemp(createSubmitHandler(onCreate)));

}

async function onCreate({ item, imageUrl, price, availability, type, description }, form) {
    if (!item || !imageUrl || !price || !availability || !type || !description) {
        showError("All fields are required!"); 
        return;
    };

    try {
        await createItem(item, imageUrl, price, availability, type, description);
        page.redirect('/catalog');
    } catch (error) {
        showError(error.message); 
    };
};


