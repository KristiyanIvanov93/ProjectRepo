const { Router } = require('express');

const errorRouter = Router();

errorRouter.get('*', async (req, res) => {

    res.render('404');
});



module.exports = { errorRouter };