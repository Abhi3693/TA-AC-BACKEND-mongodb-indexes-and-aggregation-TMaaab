let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let questionSchema = new Schema({
  user:{type:Schema.Types.ObjectId, ref:"User"},
  questionText:{type:String, required:true},
  answers:[{type:Schema.Types.ObjectId, ref:"Answer"}],
  tags:[String],
  views:Number
}, {timestamps:true});

questionSchema.index({tags:1});

let Question = mongoose.model("Question", questionSchema);

module.exports = Question;