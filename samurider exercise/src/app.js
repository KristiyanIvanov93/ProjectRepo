import { html, render } from "./lib.js";
import { updateNav } from "./data/util.js";
import { logout } from "./data/users.js";
import { showLogin } from "./views/login.js";
import { page } from "./lib.js";
import { showHome } from "./views/home.js";
import { showRegister } from "./views/register.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showSearch } from "./views/search.js";

updateNav();

page('/home', showHome)
page('/', showHome)
page('/login', showLogin)
page('/register', showRegister)
page('/catalog', showCatalog)
page('/create', showCreate)
page('/catalog/:id', showDetails)
page('/edit/:id', showEdit)
page('/search', showSearch)








page.start();




document.getElementById('logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});