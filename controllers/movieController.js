const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
var jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    res.render("movie/addOrEdit", {
        viewTitle: "MyMovieApp"
    });
});

router.post('/', async (req, res) => {
    if (req.body._id == '')
        insertMovie(req, res);
    else
        updateMovie(req, res);
});


function insertMovie(req, res) {
    var movie = new Movie();
    movie.movieName = req.body.movieName;
    movie.genre = req.body.genre;
    movie.mainActor = req.body.mainActor;
    movie.rating = req.body.rating;
    movie.save((err, doc) => {
        if (!err)
            res.redirect('movie/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("movie/addOrEdit", {
                    viewTitle: "Insert Movie",
                    movie: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateMovie(req, res) {
    Movie.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('movie/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("movie/addOrEdit", {
                    viewTitle: 'Update Movie',
                    movie: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', async (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            res.render("movie/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving movie list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'movieName':
                body['movieNameError'] = err.errors[field].message;
                break;
            case 'genre':
                body['genreError'] = err.errors[field].message;
                break;
            case 'mainActor':
                body['mainActorError'] = err.errors[field].message;
                break;    
            case 'rating':
                body['ratingError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', async (req, res) => {
    Movie.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("movie/addOrEdit", {
                viewTitle: "Update Movie",
                movie: doc
            });
        }
    });
});

router.get('/delete/:id', async (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/movie/list');
        } else {
            console.log('Error in movie delete :' + err);
        }
    });
});

module.exports = router;