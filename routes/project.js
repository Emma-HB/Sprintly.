const router = require("express").Router({ mergeParams : true });
const mongoose = require('mongoose');

const Project = require('../models/Project.model')

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// ROUTE 1 POST: CREATE NEW PROJECT
router.post ('/projects', isLoggedIn, (req, res, next) => {
    Project.create({
        user_id: req.session.user._id, 
        title: req.body.title, 
        description: req.body.description
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.json(err);
    })
});

// ROUTE 2 GET: DISPLAY LIST OF PROJECTS

router.get('/projects', isLoggedIn, (req, res, next) => {

    Project.find({user_id: req.session.user._id})
    .then(foundProjects => {
        res.json(foundProjects)
    })
    .catch(err => {
        res.json(err)
    });
});

module.exports = router;