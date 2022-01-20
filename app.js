require('./models/db');
const path = require('path');
const express = require('express');
const exphbs = require('express3-handlebars');
const bodyparser = require('body-parser');
const routes = require('./routes/routes');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('html', exphbs({ extname: 'html', defaultLayout: 'main', layoutsDir: __dirname + '/views/movie/'}));
app.set('view engine', 'html');
app.use('/', routes);
app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}.`))
