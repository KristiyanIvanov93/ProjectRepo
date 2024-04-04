import { page } from "./lib.js";
import { showHome } from "./views/showHome.js";
import { showRegister } from "./views/showRegister.js";
import { showLogin } from "./views/showLogin.js";
import { updateNav } from "./data/util.js";
import { logout } from "./data/users.js";
import { showCatalog } from "./views/showCatalog.js";
import { showDetails } from "./views/showDetails.js";
import { showEdit } from "./views/showEdit.js";
import { showCreate } from "./views/showCreate.js";



updateNav();


page('/home', showHome);
page('/', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/sell', showCreate);










page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});