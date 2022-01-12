const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', async (req, res) => {
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
        res.status(200)
          .send({
            message: "User Registered successfully"
          })
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

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      var token = jwt.sign({
        id: user.id
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400
      });
      //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: "Login successfull",
          accessToken: token,
          
        });
    });
  });

  const verifyToken = require('../middlewares/authJWT');

  router.get("/hiddencontent", verifyToken, function (req, res) {
    if (!user) {
      res.status(403)
        .send({
          message: "Invalid JWT token"
        });
    }
    if (req.user == "admin") {
      res.status(200)
        .send({
          message: "Congratulations! but there is no hidden content"
        });
    } else {
      res.status(403)
        .send({
          message: "Unauthorised access"
        });
    }
  });
  
module.exports = router;