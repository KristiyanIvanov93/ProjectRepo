
const { homeRouter } = require('../controlers/home');
const { catalogRouter } = require('../controlers/catalog');
const { userRouter } = require('../controlers/user');
const { recipeRouter } = require('../controlers/recipe');
const { errorRouter } = require('../controlers/404');



function configRoutes(app) {
    app.use(homeRouter);
    app.use(catalogRouter);
    app.use(userRouter);
    app.use(recipeRouter);

    app.use(errorRouter);

}

module.exports = {
    configRoutes
};