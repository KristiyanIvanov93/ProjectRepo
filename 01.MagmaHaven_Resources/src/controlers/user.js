const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const { createToken } = require('../services/jwt');
const { login, register } = require('../services/user');
const { parseError } = require('../util');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post(
    '/register',
    isGuest(),
    // Validation middleware
    body('email').trim().isLength({ min: 10 }).isEmail().withMessage('Email must be at least 10 characters long'),
    body('username').trim().isLength({ min: 2 }).withMessage('Username must be at least 2 characters long'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),
    body('repass')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { email, username, password } = req.body;

        try {
            // Check validation result
            const validation = validationResult(req);
            if (validation.errors.length) {
                throw (validation.errors);
            }

            // Call register service
            const result = await register(email, username, password);
            const token = createToken(result);
            res.cookie('token', token);
            res.redirect('/');
        } catch (err) {
            // Log error and render with error messages
            console.error(err);
            const parsedErrors = parseError(err);
            res.render('register', { data: { email }, errors: parsedErrors.errors });
        }
    }
);

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post(
    '/login',
    isGuest(),
    // Validation middleware
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {

            // Call login service
            const result = await login(email, password);
            const token = createToken(result);
            res.cookie('token', token);
            res.redirect('/');
        } catch (err) {
            // Log error and render with error messages
            console.error(err);
            const parsedErrors = parseError(err);
            res.render('login', { data: { email }, errors: parsedErrors.errors });
        }
    }
);

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = { userRouter };
