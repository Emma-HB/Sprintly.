const router = require("express").Router();
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer({ dest: '/tmp' });
const path = require('path');
const fs = require("fs");
//const csvtojsonV2 = require("csvtojson")

const StoryCard = require('../models/StoryCard.model')

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedIn = require("../middleware/isLoggedIn");



// ROUTE 1 POST: CREATE NEW STORYCARD
router.post ('/storycards', isLoggedIn, (req, res, next) => {
    console.log('Console.log', req.body)
    StoryCard.create({
        project_id : req.body.project_id, 
        external_id: req.body.external_id,
        epic: req.body.epic,
        summary :req.body.summary,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority || undefined,
        estimation: req.body.estimation,
        sprint_label: req.body.sprint_label || undefined
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        res.json(err);
    })
});

//ROUTE 2 POST: IMPORT STORYCARDS FROM CSV FILE 
//const content = fs.readFileSync(req.file.path)

router.post('/storycards/import', isLoggedIn, upload.single('file'), (req, res, next) => {
    console.log("check req.file", req.file);
    res.json(req.file); 
});

// ROUTE 3 PUT: EDIT A STORYCARD
router.put('/storycards/:id', isLoggedIn, (req, res, next) => {

    StoryCard.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.json({ message: `Story Card ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})

// ROUTE 4 DELETE: DELETE A STORYCARD
router.delete('/storycards/:id', isLoggedIn, (req, res, next) => {
    StoryCard.findByIdAndRemove(req.params.id)
    .then(() => {
        res.json({ message: `Story Card ${req.params.id} is removed successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
})

// ROUTE 5 GET: DISPLAY ALL STORYCARD OF A PROJECT
router.get('/storycards', isLoggedIn, (req, res, next) => {


    StoryCard.find({project_id: req.query.project_id}) 
    //AMELIORATION: FILTRER EGALEMENT SUR LE USER_ID POUR QUE LE USER DE LA SESSION NE PUISSE PAS ACCEDER A DES PROJETS QUI NE SONT PAS LES SIENS
    .then(projectStoryCard =>{
        res.json(projectStoryCard);
    })
    .catch( err =>{
        res.json(err);
    })
})

// ROUTE 6 GET: DISPLAY DETAILED STORYCARD
router.get('/storycards/:id', (req, res, next) => {
    
    StoryCard.findById(req.params.id)
    .then(filteredStoryCard =>{
        res.json(filteredStoryCard);
    })
    .catch( err =>{
        res.json(err);
    })
})





module.exports = router;