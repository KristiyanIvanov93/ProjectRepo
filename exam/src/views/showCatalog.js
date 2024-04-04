import { getAllItems } from "../data/Items.js";
import { html, render, } from "../lib.js";

const catalogTemplate = (item) => html`
        <h3 class="heading">Market</h3>
        <section id="dashboard">
            ${item.length ? item.map(itemTemplate) : html`<h3 class="empty">No Items Yet</h3>`}
        </section>
`;

const itemTemplate = (item) => html`
          <div class="item">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.item}</h3>
            <div class="item-info">
              <p class="price">Price: ${item.price}</p>
              <p class="availability">${item.availability}</p>
              <p class="type">Type: ${item.type}</p>
            </div>
            <a class="details-btn" href="/catalog/${item._id}">Uncover More</a>
          </div>
`;

export async function showCatalog(ctx) {
    const item = await getAllItems();


    render(catalogTemplate(item));
};

