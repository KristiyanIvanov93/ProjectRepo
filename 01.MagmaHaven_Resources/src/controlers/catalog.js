const { Router } = require('express');
const { Volcano } = require('../models/Volcano');
const { getAll, getById, searchVolcanoes } = require('../services/volcano');

const catalogRouter = Router();

catalogRouter.get('/catalog', async (req, res) => {
    const volcanos = await getAll();



    res.render('catalog', { volcanos });
});

catalogRouter.get('/catalog/:id', async (req, res) => {
    const volcano = await getById(req.params.id);


    if (!volcano) {
        res.render('404');
        return;
    }



    volcano.votes = volcano.voteList.length;
    volcano.hasUser = res.locals.hasUser;
    volcano.isOwner = req.user?._id == volcano.author.toString();
    const hasVoted = Boolean(volcano.voteList.find(l => req.user?._id == l.toString()));


    res.render('details', { volcano, hasVoted });


});

catalogRouter.get('/search', async (req, res) => {
    console.log('Received Query Params:', req.query); // Debug log to check received query params
    const { name, typeVolcano } = req.query;

    let volcanos = [];

    if (name || (typeVolcano && typeVolcano !== '---')) {
        volcanos = await searchVolcanoes(name, typeVolcano);
    }else{
        volcanos = await getAll();
    }
console.log(name,typeVolcano);
    console.log('Search Results:', volcanos); // Debug log to check the search results


    res.render('search', { data: { name, typeVolcano }, volcanos });


});
module.exports = { catalogRouter };