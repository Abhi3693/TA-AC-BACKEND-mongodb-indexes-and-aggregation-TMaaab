var express = require('express');
var router = express.Router();
let Answer = require("../models/Answer");
let Question = require("../models/Question");
let User = require("../models/User");
let Reply = require("../models/Reply");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/", (req,res,next)=>{


  //  find by tag
  Question.aggregate([
    {
      $unwind: "$tags"
    }
  ]);
  Question.distinct("tags");


  // question count
  Question.aggregate([
    {
      $group: {
        _id:null,
        count: { $sum: 1 }
      }
    }
  ])


  // answer count
  Answer.aggregate([
    {
      $group: {
        _id:null,
        count: { $sum: 1 }
      }
    }
  ])

    //  Question specific answer count
    Question.aggregate(
      [
  //  Match question
        { $match: {"text" : "specific"}},
        {
          $group:
            {
              _id: null, 
              count: { $sum: 1 }
            }
        }
      ]
  )

//  Count total reputation of a user

  User.aggregate([
  //  Match question
    { $match: {"username" : "specific"}},
    {
      $group:
        {
          _id: null, 
          totalReputation: { $sum: "$reputation" },
          count: { $sum: 1 }
        }
    }
  ])

  Question.aggregate([
    { $match: {"date": "specific date"}},
    {
      $group:
      {
        _id: null,
        totalViews: { $sum: "$reputation" },
        count: { $sum: 1 }
      }
    }
  ])

  User.aggregate([
    { $match: {"username": "specific user"}},
    {
      $group: {
        _id:null,
        count: { $sum: 1 }
      }
    }
  ])
})
module.exports = router;
