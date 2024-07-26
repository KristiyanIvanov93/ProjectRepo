const { Router } = require('express');
const { Volcano } = require('../models/Volcano');
const { getRecent, getAll, getById } = require('../services/volcano');



// to replace with real exam router
const errorRouter = Router();

errorRouter.get('*', async (req, res) => {
    const volcanos = await getRecent();



    res.render('404');
});





module.exports = { errorRouter };