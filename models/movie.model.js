const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    mainActor: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    }
});

mongoose.model('Movie', movieSchema);