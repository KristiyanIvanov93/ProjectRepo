const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { create, getById, update, deleteById, reccomendRecipe } = require('../services/recipe');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');

const recipeRouter = Router();


recipeRouter.get('/create', isUser(), async (req, res) => {

    res.render('create');
});

recipeRouter.post('/create', isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('Title must be atleast 2 characters long'),
    body('description').trim().isLength({ min: 10, max: 2024 }).withMessage('Description must be atleast 10 and no more than 100 characters long'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('Ingredients must be between 10 and 200 characters long'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('Instructions must be atleast 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Must enter a valid URL'),
    async (req, res) => {
        const userId = req.user._id;
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw (validation.errors);
            }

            const result = await create(req.body, userId);
            res.redirect('/catalog');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });

    recipeRouter.get('/edit/:id', isUser(), async (req, res) => {

    const recipe = await getById(req.params.id);

    if (!recipe) {
        res.render('404');
        return;
    }

    if (recipe.author.toString() != req.user._id) {

        res.redirect('/login');
    };


    res.render('edit', { data: recipe });
});

recipeRouter.post('/edit/:id', isUser(),
body('title').trim().isLength({ min: 2 }).withMessage('Title must be atleast 2 characters long'),
body('description').trim().isLength({ min: 10, max: 2024 }).withMessage('Description must be atleast 10 and no more than 100 characters long'),
body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('Ingredients must be between 10 and 200 characters long'),
body('instructions').trim().isLength({ min: 10 }).withMessage('Instructions must be atleast 10 characters long'),
body('image').trim().isURL({ require_tld: false }).withMessage('Must enter a valid URL'),
    async (req, res) => {

        const recipeId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw (validation.errors);
            }

            const result = await update(recipeId, req.body, userId);
            res.redirect('/catalog/' + recipeId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });

        }
    });

    recipeRouter.get('/recommend/:recipeId', isUser(),
    async (req, res) => {
        const recipeId = req.params.recipeId;
        const userId = req.user._id;
        try {

            const result = await reccomendRecipe(recipeId, userId); 
            res.redirect('/catalog/' + recipeId);  

        } catch (err) {

            res.render('details', { errors: parseError(err).errors });
        }
    });

    recipeRouter.get('/delete/:recipeId', isUser(),
    async (req, res) => {
        const recipeId = req.params.recipeId;
        const userId = req.user._id;
        try {

            const result = await deleteById(recipeId, userId);
            res.redirect('/catalog');
        } catch (err) {
            res.redirect('/catalog/' + recipeId);
        }
    });
    

module.exports = { recipeRouter };