const express = require('express');
const cookieParser = require('cookie-parser');
const { session } = require('../middlewares/session');

const secret = 'itASecret';

function configExpress(app) {



    app.use(cookieParser(secret));
    // add session middleware
    app.use(session());

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));


};



module.exports = {
    configExpress
};