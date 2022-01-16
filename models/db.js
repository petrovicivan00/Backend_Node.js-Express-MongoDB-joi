const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Movies', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: true
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./movie.model.js');
require('./user.model.js');