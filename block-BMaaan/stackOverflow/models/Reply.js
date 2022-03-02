let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let replySchema = new Schema({
  user:{type:Schema.Types.ObjectId, ref:"User", required:true},
  replyText:{type:String, required:true},
  answer:[{type:Schema.Types.ObjectId, ref:"Answer",required:true}],
  question:[{type:Schema.Types.ObjectId, ref:"Question", required:true}],
  likes:Number,
  disLikes:Number,
},{timestamps:true});

let Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;