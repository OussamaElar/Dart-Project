const bcrypt = require("bcryptjs");
const User = require("../../models/users")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// login usres 
router.get("/login", (req, res) => {
      const { errors, isValid } = validateLoginInput(req.body);

      if (!isValid) {
            return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email }).then((user) => {
            if (!user) {
                  errors.email = "This email does not exist";
                  return res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password).then((user) => {
                  if (isMatch) {
                        const payload = {
                              id: user.id,
                              email: user.email
                        }
                        jwt.sign(
                              payload,
                              keys.secretOrKey,
                              { expiresIn: 3600 },
                              (err, token) => {
                                    res.json({ success: true , token: "Bearer " + token})
                              }
                        )
                  } else {
                        errors.password = "Incorrect password";
                        return res.status(400).json(errors);
                  }
            })
      })
})

// register users 

router.post("/register", ( req, res ) => {
      const { errors, isValid } = validateRegisterInput(req.body);
      
      if (!isValid) {
            return res.status(400).json(errors);
      }

      User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                  errors.email = "User already exists"
                  return res.status(400).json(errors)
            } else {
                  const newUser = new User({
                        userName: req.body.userName,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: req.body.lastName,
                        phoneNumber: req.body.phoneNumber
                  });
                  bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                              if (err) throw err;
                              newUser.password = hash;
                              newUser
                                    .save()
                                    .then((user) => {
                                          const payload = {
                                                id: user.id,
                                                email: user.email,
                                                userName: user.userName,
                                                phoneNumber: user.phoneNumber
                                          };
                                          jwt.sign(
                                                payload,
                                                keys.secretOrKey,
                                                { expiresIn: 3600 },
                                                (err, token) => {
                                                      res.json({
                                                            success: true,
                                                            token: "Bearer " + token
                                                      })
                                                }
                                          )
                                    })
                                    .catch((err) => console.log(err));
                        });
                  });
            }
      })
})

// current user 
router.get(
      "/current",
      passport.authenticate("jwt", { session: false }),
      (req, res) => {
            res.json({
                  id: req.user.id,
                  email: req.user.email,
                  userName: req.user.userName
            })
      }
)

module.exports = router;