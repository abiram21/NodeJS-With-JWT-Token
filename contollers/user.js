const User = require("../models/user");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error, validation } = require("../helpers/response");

exports.userSignup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json(error("User already exists", res.statusCode));
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json(error("Something went wrong", res.statusCode));
                    }
                    else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(doc => {
                                res.status(201).json(success("User created",doc,res.statusCode));
                            })
                            .catch(error => {
                                res.status(500).json(error("Something went wrong", res.statusCode))
                            });
                    }

                });
            }
        })
}

exports.userLogin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        
                        return res.status(401).json(error("Unauthorised attempt", res.statusCode))
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        )

                        return res.status(200).json(success("OK",token,res.statusCode))
                    }
                    return res.status(401).json(error("Unauthorised attempt", res.statusCode))
                })
            }
            else {
                return res.status(401).json(error("Unauthorised attempt", res.statusCode))
            }
        })
        .catch(err => {
            res.status(500).json(error("Something went wrong", res.statusCode))
        })
}
