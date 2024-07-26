const { Router } = require('express');
const { Volcano } = require('../models/Volcano');
const { getRecent, getAll, getById } = require('../services/volcano');



// to replace with real exam router
const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const volcanos = await getRecent();



    res.render('home', { volcanos });
});





module.exports = { homeRouter };