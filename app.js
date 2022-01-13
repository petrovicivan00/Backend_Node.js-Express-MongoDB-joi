require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express3-handlebars');
const bodyparser = require('body-parser');
require('dotenv').config();

const movieController = require('./controllers/movieController');
const userController = require("./controllers/userController");


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

  if (token == null) return res.redirect(301, '/login');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  
      if (err) return res.redirect(301, '/login');
  
      req.user = user;
  
      next();
  });
}

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));

app.get('/register', (req, res) => {
  res.sendFile('register.html', { root: './views/user/' });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views/user/' });
});

app.get('/', authToken, (req, res) => {
  res.sendFile('mainLayout.html', { root: './views/layouts/' });
});

app.engine('html', exphbs({ extname: 'html', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'html');
app.use('/users',userController);
app.use('/movies', movieController);
const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}.`))