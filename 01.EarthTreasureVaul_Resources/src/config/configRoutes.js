// todo import routers

const { homeRouter } = require('../controlers/home');
const { stoneRouter } = require('../controlers/stone');
const { userRouter } = require('../controlers/user');



function configRoutes(app) {
    //todo register routes
    app.use(homeRouter);
    app.use(userRouter);
    app.use(stoneRouter);

}

module.exports = {
    configRoutes
};