const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { getRecent, create, getById, update, deleteById, voteVolcano } = require('../services/volcano');
const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');




// to replace with real exam router
const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');


});
volcanoRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be atleast 2 characters long'),
    body('location').trim().isLength({ min: 3 }).withMessage('location must be atleast 3 characters long'),
    body('elevation').trim().isInt({ min: 0 }).withMessage(' Elevation Must be atleast 0'),
    body('lastErruption').trim().isInt({ min: 0, max: 2024 }).withMessage('Invalid year of eruption'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Must be a valid URL'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('description Must be atleast 10 characters long'),
    async (req, res) => {
        const userId = req.user._id;
        try {
            // Check validation result
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw (validation.errors);
            }

            // Call register service
            const result = await create(req.body, userId);
            res.redirect('/catalog');
        } catch (err) {
            // Log error and render with error messages
            console.error(err);
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });

volcanoRouter.get('/edit/:id', isUser(), async (req, res) => {
    const volcano = await getById(req.params.id);


    if (!volcano) {
        res.render('404');
        return;
    }
    if (volcano.author.toString() != req.user._id) {

        res.redirect('/login');
    };


    res.render('edit', { data: volcano });


});
volcanoRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be atleast 2 characters long'),
    body('location').trim().isLength({ min: 3 }).withMessage('location must be atleast 3 characters long'),
    body('elevation').trim().isInt({ min: 0 }).withMessage(' Elevation Must be atleast 0'),
    body('lastErruption').trim().isInt({ min: 0, max: 2024 }).withMessage('Invalid year of eruption'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Must be a valid URL'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('description Must be atleast 10 characters long'),
    async (req, res) => {
        const volcanoId = req.params.id;
        const userId = req.user._id;
        try {
            // Check validation result
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw (validation.errors);
            }

            // Call register service
            const result = await update(volcanoId, req.body, userId);
            res.redirect('/catalog/' + volcanoId);
        } catch (err) {
            // Log error and render with error messages
            console.error(err);
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }
    });
volcanoRouter.get('/vote/:volcanoId', isUser(),
    async (req, res) => {
        const volcanoId = req.params.id;
        const userId = req.user._id;
        try {

            const result = await voteVolcano(volcanoId, userId);
            res.redirect('/catalog/' + volcanoId);
        } catch (err) {
            // Log error and render with error messages
            res.render('details', {errors: parseError(err).errors});
        }
    });

volcanoRouter.get('/delete/:volcanoId', isUser(),
    async (req, res) => {
        const volcanoId = req.params.id;
        const userId = req.user._id;
        try {

            const result = await deleteById(volcanoId, userId);
            res.redirect('/catalog');
        } catch (err) {
            // Log error and render with error messages
            res.redirect('/catalog/' + volcanoId);
        }
    });
    

module.exports = { volcanoRouter };