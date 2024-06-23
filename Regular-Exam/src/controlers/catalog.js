const { Router } = require('express');
const { getAll, getById, searchRecipes } = require('../services/recipe');

const catalogRouter = Router();

catalogRouter.get('/catalog', async (req, res) => {
    const recipes = await getAll();

    res.render('catalog', { recipes });
});


catalogRouter.get('/catalog/:id', async (req, res) => {

    const recipe = await getById(req.params.id);

    if (!recipe) {
        res.render('404');
        return;
    }

    recipe.reccomends = recipe.reccomendList.length;
    recipe.hasUser = res.locals.hasUser;
    recipe.isOwner = req.user?._id == recipe.author.toString();
    const hasReccomended = Boolean(recipe.reccomendList.find(l => req.user?._id == l.toString()));

    res.render('details', { recipe, hasReccomended });
});


catalogRouter.get('/search', async (req, res) => {

    const { search } = req.query;
    let recipes = [];

    if (search) {
        recipes = await searchRecipes(search);
    } else {
        recipes = await getAll();
    }

    res.render('search', { data: { search }, recipes });
});

module.exports = { catalogRouter };