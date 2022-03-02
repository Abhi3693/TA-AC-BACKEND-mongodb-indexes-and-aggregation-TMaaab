let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let answerSchema = new Schema({
  user:{type:Schema.Types.ObjectId, ref:"User"},
  question:{type:Schema.Types.ObjectId, ref:"Question", required:true},
  answerText:{type:String, required:true},
  replies:[{type:String}],
  likes:Number,
  disLikes:Number,
},{timestamps:true})

let Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;