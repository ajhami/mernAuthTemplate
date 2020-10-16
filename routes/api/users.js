const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Keys can be set up after determining database usage
const secret = process.env.secret || require("../../config/keys").secret;
// const keys = process.env.MONGODB_URI || "mongodb://localhost/mernauthdemo";

// Load input validation functions and the user model
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

// Route for saving newly registered account to database
router.post("/register", (req, res) => {
    // request validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Unsuccessful registration attempt
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(userFound => {
        // Prevent duplicate accounts created
        if (userFound) {
            return res.status(400).json({ email: "Email is already in use." });
        }
        // saving the new registered user
        else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            // Hashing the save password for security
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });

        };
    });

});


// Route for attempting login
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Checking validation of login attempt
    if (!isValid) {
        return res.status(400).json(errors);
    }

    else {
        const email = req.body.email;
        const password = req.body.password;

        // Searching database for specific user
        User.findOne({ email }).then(userFound => {
            // If user doesn't yet exist
            if (!userFound) {
                return res.status(404).json({ emailNotFound: "Account not found under this email address." });
            }

            else {
                // Retrieve Payload (Variables beyond id are flexible)
                const payload = {
                    id: userFound.id,
                    email: userFound.email
                };

                // Check password
                bcrypt.compare(password, userFound.password)
                    .then(isMatch => {
                        // If incorrect password is entered
                        if (!isMatch) {
                            return res.status(400).json({ passwordIncorrect: "Password incorrect." });
                        }

                        else {
                            jwt.sign(
                                payload,
                                secret,
                                {
                                    expiresIn: 1200
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        // token: "Bearer " + token
                                        token: token
                                    });
                                }
                            );
                        };
                    });
            };
        });
    };
});


module.exports = router;