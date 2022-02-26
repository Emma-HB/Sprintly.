const router = require("express").Router({ mergeParams : true });
const mongoose = require('mongoose');

const PrioSession = require('../models/PrioSession.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");

// ROUTE 1 POST: CREATE NEW PROJECT
router.post ('/prioritizations', isLoggedIn, (req, res, next) => {
  PrioSession.create({
    user_id: req.session.user._id,
    project_id: req.body.project_id, 
    selectedStoryCard:req.body.selectedStoryCard, 
    sessionPIN: Math.floor(100000 + Math.random() * 900000),
    // prioStoryCard: {
    //   participant_email: "",
    //   participant_name: "",
    //   participant_prio : []
    //   }          
  })
  .then(response => {
    res.status(201).json(response);
  })
  .catch(err => {
    res.json(err);
  })
});

// ROUTE 2 PUT: ADD A PARTICIPANT TO A PRIO SESSION
router.put('/prioritizations/participate', (req, res, next) => {
  console.log('test', req.body)

  //TO DO: extra filter the check if captured email does not already exist in DB

  PrioSession.findOneAndUpdate({sessionPIN: req.body.sessionPIN},
    {$push: { prioStoryCard : {
      participant_email: req.body.participant_email,
      participant_name: req.body.participant_name,
      }}}
    )   
    .then((prioSessionFromPIN) => {
      // console.log(prioSessionFromPIN)
      res.json({ prioSessionFromPIN });
    })
    .catch(err => {
      res.json(err);
    })
})

// ROUTE 3 PUT: SUBMIT PARTICIPANT PRIO TO A PRIO SESSION
router.put('/prioritizations/:id/contribute', (req, res, next) => {
  console.log("check sur req.body", req.body)

  PrioSession.findById(req.params.id)
    .then((prioSessionFromDb) => {
      const newPrioritization = prioSessionFromDb.prioStoryCard.map((el) => {
        if (el.participant_email === req.body.participant_email) {
          el.participant_prio = req.body.participant_prio
        } 
      return el
      })
      prioSessionFromDb.prioStoryCard = newPrioritization;
      prioSessionFromDb.save();
      res.json({ message: `SUCCESS.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// ROUTE 4 GET: DISPLAY PRIO SESSION RESULTS
router.get('/prioritizations/:id', (req, res, next) => {
  PrioSession.findById(req.params.id)
    .populate('selectedStoryCard')
    .then(foundPrio => {
      res.json(foundPrio)
    })
    .catch(err => {
      res.json(err)
    });
})

// ROUTE 5 GET : DISPLAY ALL PRIO SESSION
router.get('/prioritizations', isLoggedIn, (req, res, next) => {
  PrioSession.find({user_id: req.session.user._id})
    .populate('project_id')
    .then(foundPrios => {
      res.json(foundPrios)
    })
    .catch(err => {
      res.json(err)
    });
});

module.exports = router;