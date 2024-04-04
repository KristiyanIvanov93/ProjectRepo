import { getAllMotors } from "../data/motors.js";
import { html, render, } from "../lib.js";

const catalogTemplate = (motor) => html`
        <h2>Available Motorcycles</h2>
        <section id="dashboard">
            ${motor.length ? motor.map(motorTemplate) : html` <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
        </section>
`;

const motorTemplate = (motor) => html`
          <div class="motorcycle">
            <img src="${motor.imageUrl}" alt="example1" />
            <h3 class="model">${motor.model}</h3>
            <p class="year">Year: ${motor.year}</p>
            <p class="mileage">Mileage: ${motor.mileage}.</p>
            <p class="contact">Contact Number: ${motor.contact}</p>
            <a class="details-btn" href="/catalog/${motor._id}">More Info</a>
          </div>
        </section>
`;

export async function showCatalog(ctx) {
    const motor = await getAllMotors();


    render(catalogTemplate(motor));
};

