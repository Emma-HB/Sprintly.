const router = require("express").Router({ mergeParams : true });
const mongoose = require('mongoose');

const PrioSession = require('../models/PrioSession.model')

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// ROUTE 1 POST: CREATE NEW PROJECT
router.post ('/prioritizations', isLoggedIn, (req, res, next) => {
    console.log("TEST",req.body)
    PrioSession.create({
        user_id: req.session.user._id, 
        selectedStoryCard:req.body.selectedStoryCard, 
        sessionPIN: (req.body._id).slice(7), // Cannot read property 'slice' of undefined
        prioStoryCard: {
            participant_email: req.body.prioStoryCard.participant_email,
            participant_name: req.body.prioStoryCard.participant_name,
            participant_prio : []
        }      
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.json(err);
    })

});

// ROUTE 2 PUT: EDIT A PRIO SESSION WITH PARTICIPANT NAME
router.put('/prioritizations/participate', (req, res, next) => {

    PrioSession.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.json({ message: `Story Card ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})



module.exports = router;