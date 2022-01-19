require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express3-handlebars');
const bodyparser = require('body-parser');
var jwt = require("jsonwebtoken");
require('dotenv').config();
const movieController = require('./controllers/movieController');
const userController = require('./controllers/userController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/register', (req, res) => {
    res.redirect('user/register')
});

app.get('/login', (req, res) => {
    res.redirect('user/login')
});

app.get('/', (req, res) => {
    res.redirect('movie/main')
});

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('html', exphbs({ extname: 'html', defaultLayout: 'main', layoutsDir: __dirname + '/views/movie/'}));
app.set('view engine', 'html');
app.use('/movie', movieController);
app.use('/user', userController);
const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}.`))
