import { getMotorById, updateMotor } from "../data/motors.js";
import { createSubmitHandler } from "../data/util.js";
import { html, page, render } from "../lib.js";

const editTemp = (motor, onEdit) => html`
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${motor.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${motor.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${motor.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${motor.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${motor.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                .value=${motor.about}
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    
    const motor = await getMotorById(id);
    

    render(editTemp(motor, createSubmitHandler(onEdit)));

    async function onEdit(data, form) {
        const { model, imageUrl, year, mileage, contact, about } = data;
        if (!model || !imageUrl || !year || !mileage || !contact || !about) {
            return alert("All fields are required!")
        };
        

        await updateMotor(id, data);
        page.redirect('/catalog/' + id);
    };
};




