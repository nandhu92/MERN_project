const router = require('express').Router();
const { request } = require('express');
let violationData = require('../models/dataModel');

// router.route('/').get((req,res)=> {
//     violationData.find().limit(5)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// router.route('/').get((req,res)=>{
//     violationData.find({description:req.body}).limit(5)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// router.get('/search', function(req,res){
//     var desc = req.query.Description;
//     violationData.find({"Description":/req.query.Description/gmi}).limit(5)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

// router.post('/search', function(req,res){
//     violationData.find().limit(5)
//     .then(data => res.json(data))
//     .catch(err => res.status(400).json('Error: ' + err));
// })

router.route('/search/:description').get((req, res) => {
    var desc = req.params.description;
   //var regEx = "/" + desc+ "/gmi";
    violationData.find({"description":{$regex: new RegExp(desc), $options:"gmi"}}).limit(10)
    .then(data => {
    console.log(data);
      res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
  })

  router.route('/searchPage/:description').get((req, res) => {
    var desc = req.params.description;
   //var regEx = "/" + desc+ "/gmi";
    violationData.find({"description":{$regex: new RegExp(desc), $options:"gmi"}}).limit(10)
    .then(data => {
    console.log(data);
      res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
  })

  router.route('/geoSearch/:longitude/:latitude').get((req, res) => {
    var long = req.params.longitude;
    var lat = req.params.latitude;
    violationData.find({
        geoLoc:{
            $near:{
                $geometry: {
                    type:"Point",
                    coordinates: [long, lat]
                },
                $maxDistance: 500
            }
        }
    }).limit(10)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Error: ' + err));
  })

  router.route('/addComments/:id/:comment').put((req, res) => {
    violationData.findById(req.params.id)
      .then(document => {
        document.commentText = req.params.comment;
        document.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
    })

module.exports = router;