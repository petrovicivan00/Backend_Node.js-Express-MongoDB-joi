const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = mongoose.model('User');


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
  
    jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
  }
  
router.get('/', authToken, async (req, res) => {
    res.render("layouts/mainLayout", {
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


router.get('/list', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) {
            res.render("movie/list", {
                list: docs
            });
        }
        else {
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
            res.redirect('movie/list');
        }
        else { console.log('Error in movie delete :' + err); }
    });
});



router.get('/register', async (req, res) => {
    res.render("user/register", {
        viewTitle: "Register"
    });
  });
  
router.get('/login', async (req, res) => {
    res.render("user/login", {
        viewTitle: "Login"
    });
  });
  
  router.post("/register", async (req, res) => {
  
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8)
    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      } else {
        res.redirect('user/login');
       /* res.status(200)
          .send({
            message: "User Registered successfully"
          })*/
      }
    });
  });
  
  router.post("/login", async (req, res) => {
    User.findOne({
      fullName: req.body.fullName
    })
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "User Not found."
          });
      }

    
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      var token = jwt.sign({
        id: user.id
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400
      });
      res.status(200);
      res.redirect('layouts/mainLayout');
    });
  });    

module.exports = router;