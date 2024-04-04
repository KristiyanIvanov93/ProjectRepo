import { deleteMotor, getMotorById } from "../data/motors.js";
import { getUserData } from "../data/util.js";
import { html, render, page } from "../lib.js";

const detailsTemplate = (motor, hasUser, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${motor.imageUrl}" alt="example1" />
            <p id="details-title">${motor.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="year">${motor.year}</p>
                    <p class="mileage">Mileage: ${motor.mileage}.</p>
                    <p class="contact">Contact Number: ${motor.contact}</p>
                    <p id="motorcycle-description">${motor.about}</p>
                </div>
                <!--Edit and Delete are only for creator-->
                ${isOwner ? html`
                    <div id="action-buttons">
                        <a href="/edit/${motor._id}" id="edit-btn">Edit</a>
                        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
                    </div>
                ` : null}
            </div>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const motor = await getMotorById(id);

    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id === motor._ownerId;

    render(detailsTemplate(motor, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure?");
        if (choice) {
            await deleteMotor(id);
            page.redirect('/catalog');
        };
    };
};