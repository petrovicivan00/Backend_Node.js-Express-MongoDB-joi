require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express3-handlebars');
const bodyparser = require('body-parser');
var jwt = require("jsonwebtoken");
const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController');
require('dotenv').config();

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

function getCookies(req) {
    if (req.headers.cookie == null) return {};
  
    const rawCookies = req.headers.cookie.split(';');
    const parsedCookies = {};
  
    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
  
    return parsedCookies;
};
  
  
function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, 'user/login');
  
    jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, 'user/login');
    
        req.user = user;
    
        next();
    });
}

app.get('/register', (req, res) => {
    res.redirect('user/register')
});

app.get('/login', (req, res) => {
    res.redirect('user/login')
});

app.get('/', authToken, (req, res) => {
   // res.sendFile('main.html', { root: './views/movie' });
    res.redirect('movie/main')
});

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('html', exphbs({ extname: 'html', defaultLayout: 'main', layoutsDir: __dirname + '/views/movie/'}));
app.set('view engine', 'html');
app.use('/movie', movieController);
app.use('/user', userController);
const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}.`))
