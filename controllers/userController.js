const express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/register', (req, res) => {
    res.render("user/register", {
        viewTitle: "Register"
    });
});

router.get('/login', (req, res) => {
    res.render("user/login", {
        viewTitle: "Login"
    });
});

router.post("/register", (req, res) => {

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

        } else {
            res.redirect('user/login');
        }
    });
});

router.post("/login", (req, res) => {
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

            jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 86400
            });
            res.status(200);
            res.redirect('/movie');
        });
});

module.exports = router;
