var express = require('express');
var router = express.Router();
let Article = require("../models/Article");
let User = require("../models/User");


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users)=>{
    if(err) return next(err);
    res.render("users", {users});
  });
});

router.get("/new", (req,res,next)=>{
  res.render("addUser");
});

router.post("/", (req,res,next)=>{
  User.create(req.body, (err, user)=>{
    res.redirect("/users/" + user._id);
  });
});

router.get("/:id", (req,res,next)=>{
  let id = req.params.id;
  User.findById(id, (err, user)=>{
    res.render("userDetails", {user});
  });
});

module.exports = router;
