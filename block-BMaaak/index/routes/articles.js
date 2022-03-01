let express = require("express");
let router = express.Router();
let Article = require("../models/Article");
let User = require("../models/User");

router.get("/", (req,res,next)=>{
  Article.find({}, (err, articles)=>{
    if(err) return next(err);
    res.render("articles", {articles})
  });
});


router.get("/new", (req,res,next)=>{
  res.render("addArticle");
});

router.post("/", (req,res,next)=>{
  // console.log(req.body.tags.split(" "))
  let newTags = req.body.tags.split(" ");
  console.log(newTags,"---------");
  req.body.tags = newTags;
  Article.create(req.body, (err, article)=>{
    res.redirect("/articles/" + article._id);
  });
});


router.get("/:id", (req,res,next)=>{
  let id = req.params.id;
  Article.findById(id, (err, article)=>{
    res.render("articleDetails", {article});
  });
});


module.exports = router;