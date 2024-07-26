// todo import routers

const { homeRouter } = require('../controlers/home');
const { volcanoRouter } = require('../controlers/volcano');
const { userRouter } = require('../controlers/user');
const { catalogRouter } = require('../controlers/catalog');
const { errorRouter } = require('../controlers/404');



function configRoutes(app) {
    //todo register routes
    app.use(homeRouter);
    app.use(catalogRouter);
    app.use(userRouter);
    app.use(volcanoRouter);
    app.use(errorRouter);

}

module.exports = {
    configRoutes
};