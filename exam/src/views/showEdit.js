import { getItemById, updateItem } from "../data/Items.js";
import { createSubmitHandler } from "../data/util.js";
import { html, page, render } from "../lib.js";
import { showError } from "../data/errors.js";

const editTemp = (item, onEdit) => html`
        <section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input type="text" name="item" id="item" placeholder="Item" .value=${item.item}/>
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${item.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${item.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${item.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${item.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value=${item.description}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    
    const item = await getItemById(id);
    

    render(editTemp(item, createSubmitHandler(onEdit)));

    async function onEdit(data, form) {
        const { item, imageUrl, price, availability, type, description } = data;
        if (!item || !imageUrl || !price || !availability || !type || !description) {
            return showError("All fields are required!")
        };
        

        await updateItem(id, data);
        page.redirect('/catalog/' + id);
    };
};




