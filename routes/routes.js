const express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
require('dotenv').config();
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');

function authToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.redirect(301, 'user/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.redirect(301, 'user/login');
        req.user = user
        next()
    })
}

router.get('/register', (req, res) => {
    res.redirect('user/register')
});

router.get('/login', (req, res) => {
    res.redirect('user/login')
});

router.get('/', authToken,(req, res) => {
    res.redirect('movie/main')
});

router.use('/movie', movieController);
router.use('/user', userController);

module.exports = router;
