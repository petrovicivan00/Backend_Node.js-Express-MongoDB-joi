require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express3-handlebars');
const bodyparser = require('body-parser');
const movieController = require('./controllers/movieController');
require('dotenv').config();

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.engine('html', exphbs({ extname: 'html', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'html');
app.use('/movies', movieController);
const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}.`))